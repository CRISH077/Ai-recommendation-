import { Product, RecommendedProduct } from "@workspace/api-client-react/src/generated/api.schemas";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, CheckCircle, XCircle, Zap, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

interface ProductCardProps {
  product: Product;
  recommendation?: RecommendedProduct;
  isDeemphasized?: boolean;
}

export function ProductCard({ product, recommendation, isDeemphasized }: ProductCardProps) {
  const isRecommended = !!recommendation;

  return (
    <Link href={`/product/${product.id}`} className="block h-full group" data-testid={`card-product-${product.id}`}>
      <Card 
        className={`h-full overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg ${
          isRecommended 
            ? "border-accent ring-1 ring-accent/20 shadow-md shadow-accent/10" 
            : isDeemphasized
              ? "opacity-60 grayscale-[0.2] hover:opacity-100 hover:grayscale-0"
              : "border-border"
        }`}
      >
        <div className="relative aspect-video bg-muted flex items-center justify-center p-6 overflow-hidden">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="object-contain w-full h-full mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="text-4xl text-muted-foreground/30 font-mono">{product.category}</div>
          )}
          
          {isRecommended && (
            <div className="absolute top-2 right-2 flex flex-col gap-2 items-end z-10">
              <Badge className="bg-accent text-accent-foreground font-mono font-bold shadow-lg shadow-accent/20 border-0">
                {recommendation.matchScore}% MATCH
              </Badge>
            </div>
          )}
          
          <Badge variant="secondary" className="absolute top-2 left-2 font-mono text-xs uppercase bg-card/80 backdrop-blur-md">
            {product.category}
          </Badge>
        </div>

        <CardContent className="p-5 flex flex-col gap-3">
          <div className="space-y-1">
            <h3 className="font-bold text-lg leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center justify-between mt-2">
              <div className="text-xl font-bold tracking-tight">${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className="flex items-center text-sm font-medium text-amber-500">
                <Star className="h-4 w-4 fill-amber-500 mr-1" />
                <span>{product.rating.toFixed(1)}</span>
                <span className="text-muted-foreground ml-1 font-normal">({product.reviewCount})</span>
              </div>
            </div>
          </div>

          {isRecommended && (
            <div className="bg-accent/5 border border-accent/20 rounded-md p-3 mt-2">
              <div className="flex items-start gap-2">
                <Zap className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <p className="text-sm text-foreground/90 leading-snug font-medium">
                  {recommendation.reason}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            {product.inStock ? (
              <Badge variant="outline" className="text-emerald-600 border-emerald-600/20 bg-emerald-600/5">
                <CheckCircle className="h-3 w-3 mr-1" /> In Stock
              </Badge>
            ) : (
              <Badge variant="outline" className="text-destructive border-destructive/20 bg-destructive/5">
                <XCircle className="h-3 w-3 mr-1" /> Out of Stock
              </Badge>
            )}
            {product.tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant="secondary" className="font-normal text-xs text-muted-foreground">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
