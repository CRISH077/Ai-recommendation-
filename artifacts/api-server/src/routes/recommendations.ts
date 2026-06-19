import { Router } from "express";
import { db } from "@workspace/db";
import { recommendationHistoryTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { GetRecommendationsBody } from "@workspace/api-zod";
import { PRODUCTS } from "./products.js";

export const recommendationsRouter = Router();

const OPENROUTER_API_KEY = process.env["OPENROUTER_API_KEY"];
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
const MODEL = "meta-llama/llama-3.3-70b-instruct";

recommendationsRouter.post("/", async (req, res) => {
  const parsed = GetRecommendationsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { query } = parsed.data;

  if (!OPENROUTER_API_KEY) {
    res.status(500).json({ error: "OPENROUTER_API_KEY not configured" });
    return;
  }

  const productList = PRODUCTS.map(
    (p) =>
      `ID:${p.id} | ${p.name} | ${p.category} | $${p.price} | Rating:${p.rating}/5 | Tags:${p.tags.join(",")} | InStock:${p.inStock} | ${p.description}`
  ).join("\n");

  const systemPrompt = `You are a helpful product recommendation assistant. You have access to a catalog of electronics products. Your job is to recommend the BEST matching products based on the user's preferences.

PRODUCT CATALOG:
${productList}

INSTRUCTIONS:
- Analyze the user's query carefully
- Select 1-5 products that best match their needs
- For each product, provide a brief, specific reason why it matches
- Give a match score from 60-100 (only recommend products that score ≥60)
- Write a short summary paragraph explaining your overall recommendations
- Respond ONLY with valid JSON in this exact format:
{
  "recommendations": [
    {
      "productId": <number>,
      "reason": "<specific reason why this matches the query>",
      "matchScore": <60-100>
    }
  ],
  "summary": "<2-3 sentence overview of recommendations>"
}`;

  let aiResponse: string;
  try {
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://replit.com",
        "X-Title": "AI Product Recommender",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 8192,
        temperature: 0.3,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      req.log.error({ status: response.status, body: errText }, "OpenRouter error");
      res.status(502).json({ error: "AI service error" });
      return;
    }

    const data = (await response.json()) as {
      choices: Array<{ message: { content: string } }>;
    };
    aiResponse = data.choices[0]?.message?.content ?? "{}";
  } catch (err) {
    req.log.error({ err }, "Failed to call OpenRouter");
    res.status(502).json({ error: "Failed to connect to AI service" });
    return;
  }

  let parsed2: {
    recommendations: Array<{
      productId: number;
      reason: string;
      matchScore: number;
    }>;
    summary: string;
  };

  try {
    parsed2 = JSON.parse(aiResponse);
  } catch {
    req.log.error({ aiResponse }, "Failed to parse AI JSON response");
    res.status(502).json({ error: "AI returned invalid response" });
    return;
  }

  const recommendations = (parsed2.recommendations ?? [])
    .map((rec) => {
      const product = PRODUCTS.find((p) => p.id === rec.productId);
      if (!product) return null;
      return {
        product,
        reason: rec.reason,
        matchScore: rec.matchScore,
      };
    })
    .filter(Boolean)
    .sort((a, b) => (b!.matchScore - a!.matchScore));

  await db
    .insert(recommendationHistoryTable)
    .values({ query, resultCount: recommendations.length });

  res.json({
    query,
    recommendations,
    summary: parsed2.summary ?? "",
    totalFound: recommendations.length,
  });
});

recommendationsRouter.get("/history", async (req, res) => {
  const history = await db
    .select()
    .from(recommendationHistoryTable)
    .orderBy(desc(recommendationHistoryTable.createdAt))
    .limit(20);

  res.json(
    history.map((h) => ({
      id: h.id,
      query: h.query,
      resultCount: h.resultCount,
      createdAt: h.createdAt.toISOString(),
    }))
  );
});
