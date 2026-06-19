import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const recommendationHistoryTable = pgTable("recommendation_history", {
  id: serial("id").primaryKey(),
  query: text("query").notNull(),
  resultCount: integer("result_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertRecommendationHistorySchema = createInsertSchema(
  recommendationHistoryTable
).omit({ id: true, createdAt: true });

export type InsertRecommendationHistory = z.infer<
  typeof insertRecommendationHistorySchema
>;
export type RecommendationHistory =
  typeof recommendationHistoryTable.$inferSelect;
