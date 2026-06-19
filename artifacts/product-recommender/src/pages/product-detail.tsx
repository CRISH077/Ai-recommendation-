import { Layout } from "@/components/layout";
import { useGetProduct } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, CheckCircle, XCircle, ShoppingCart, ShieldCheck, Box } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function ProductDetail() {
  const params = useParams();
  const id = Number(params.id);
  
  const { data: product, isLoading, isError } = useGetProduct(id, {
    query: {
      enabled: !isNaN(id),
      queryKey: [`/api/products/${id}`]
    }
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
          <Skeleton className="h-10 w-32" />
          <div className="grid md:grid-cols-2 gap-10">
            <Skeleton className="aspect-square rounded-2xl w-full" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (isError || !product) {
    return (
      <Layout>
        <div className="p-10 text-center space-y-4">
          <h2 className="text-2xl font-bold text-destructive">Product not found</h2>
          <Link href="/">
            <Button variant="outline">Return to Catalog</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground -ml-4" data-testid="btn-back">
            <ArrowLeft className="h-4 w-4" /> Back to Catalog
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery Area */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-2xl border border-border flex items-center justify-center p-8 overflow-hidden relative">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500" 
                />
              ) : (
                <Box className="h-32 w-32 text-muted-foreground/30" />
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-card text-foreground border-border shadow-sm backdrop-blur-md">
                  {product.category}
                </Badge>
                {product.inStock && (
                  <Badge className="bg-emerald-600/10 text-emerald-600 border-emerald-600/20 backdrop-blur-md">
                    In Stock
                  </Badge>
                )}
              </div>
            </div>
            {/* Thumbnails placeholder */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`aspect-square rounded-lg border ${i === 1 ? 'border-primary ring-1 ring-primary/30' : 'border-border'} bg-muted/50 flex items-center justify-center p-2 cursor-pointer hover:bg-muted`}>
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt="" className="w-full h-full object-contain mix-blend-multiply opacity-70 hover:opacity-100" />
                  ) : (
                    <Box className="h-6 w-6 text-muted-foreground/30" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Details Area */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center text-amber-500">
                  <Star className="h-5 w-5 fill-amber-500 mr-1.5" />
                  <span className="font-bold text-lg">{product.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground ml-1">({product.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center text-muted-foreground font-mono">
                  ID: {product.id.toString().padStart(6, '0')}
                </div>
              </div>
            </div>

            <div className="text-5xl font-black text-foreground tracking-tighter">
              ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="px-3 py-1 font-medium bg-secondary/20 hover:bg-secondary/30">
                  {tag}
                </Badge>
              ))}
            </div>

            <Card className="border-border shadow-sm p-6 space-y-6 bg-card/50">
              <div className="flex items-center gap-3 text-sm font-medium">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>Verified Official Retailer • 1 Year Warranty Included</span>
              </div>
              
              <Button 
                size="lg" 
                className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20"
                disabled={!product.inStock}
                data-testid="button-add-to-cart"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
