import { Layout } from "@/components/layout";
import { AiSearchBar } from "@/components/ai-search-bar";
import { ProductCard } from "@/components/product-card";
import { useListProducts, useListCategories, useGetRecommendations, getListRecommendationHistoryQueryKey } from "@workspace/api-client-react";
import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Zap, Tag, Box, AlertCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const queryClient = useQueryClient();
  const { data: products, isLoading: isLoadingProducts } = useListProducts();
  const { data: categories } = useListCategories();
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState<string | null>(null);

  const getRecsMutation = useGetRecommendations();

  const handleSearch = (query: string) => {
    setLastQuery(query);
    getRecsMutation.mutate({ data: { query } }, {
      onSuccess: () => {
        // Invalidate history after successful recommendation
        queryClient.invalidateQueries({ queryKey: getListRecommendationHistoryQueryKey() });
        setSelectedCategory(null); // Clear category filter when searching
      }
    });
  };

  const clearSearch = () => {
    getRecsMutation.reset();
    setLastQuery(null);
  };

  // Process data to show:
  // 1. If searching, show recommended products first, then non-recommended.
  // 2. If filtering by category, show only category products.
  // 3. Otherwise show all products.
  
  const displayProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products;
    
    if (selectedCategory) {
      filtered = products.filter(p => p.category === selectedCategory);
    }

    if (getRecsMutation.data?.recommendations) {
      const recs = getRecsMutation.data.recommendations;
      const recIds = new Set(recs.map(r => r.product.id));
      
      // Separate recommended and non-recommended
      const nonRecommended = filtered.filter(p => !recIds.has(p.id));
      
      // Map recommendations to the current filtered list so we don't show recs for filtered-out products
      const activeRecs = recs.filter(r => 
        selectedCategory ? r.product.category === selectedCategory : true
      );

      return {
        isSearching: true,
        recs: activeRecs,
        nonRecs: nonRecommended
      };
    }

    return {
      isSearching: false,
      products: filtered
    };
  }, [products, selectedCategory, getRecsMutation.data]);

  return (
    <Layout>
      <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-500">
        
        {/* Header Area */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
              Tech Catalog <span className="text-primary">Intelligence</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Natural language catalog search. Describe your exact requirements, budget, and use case.
            </p>
          </div>
          
          <AiSearchBar onSearch={handleSearch} isLoading={getRecsMutation.isPending} />
        </div>

        {/* Categories / Summary area */}
        <div className="space-y-6">
          {!getRecsMutation.data && !getRecsMutation.isPending && categories && (
            <div className="flex flex-wrap gap-2 justify-center pb-4 border-b border-border/50">
              <Badge 
                variant={selectedCategory === null ? "default" : "outline"}
                className={`cursor-pointer px-4 py-1.5 text-sm ${selectedCategory === null ? "bg-primary text-primary-foreground font-bold shadow-md" : ""}`}
                onClick={() => setSelectedCategory(null)}
                data-testid="chip-category-all"
              >
                All Products
              </Badge>
              {categories.map(c => (
                <Badge 
                  key={c.category}
                  variant={selectedCategory === c.category ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-1.5 text-sm ${selectedCategory === c.category ? "bg-primary text-primary-foreground font-bold shadow-md" : "hover:bg-secondary/10"}`}
                  onClick={() => setSelectedCategory(c.category)}
                  data-testid={`chip-category-${c.category}`}
                >
                  <Tag className="h-3 w-3 mr-1 opacity-70" />
                  {c.category} <span className="ml-2 opacity-50 font-mono">({c.count})</span>
                </Badge>
              ))}
            </div>
          )}

          {getRecsMutation.data && (
            <Alert className="bg-accent/10 border-accent/30 text-accent-foreground max-w-4xl mx-auto shadow-lg shadow-accent/5">
              <Zap className="h-5 w-5 text-accent" />
              <div className="flex justify-between items-start w-full gap-4">
                <div>
                  <AlertTitle className="font-bold text-lg flex items-center gap-2">
                    AI Analysis Complete
                    <Badge variant="secondary" className="font-mono text-xs bg-accent text-accent-foreground ml-2">
                      {getRecsMutation.data.totalFound} matches
                    </Badge>
                  </AlertTitle>
                  <AlertDescription className="mt-2 text-base leading-relaxed font-medium">
                    {getRecsMutation.data.summary}
                  </AlertDescription>
                  <div className="mt-4 text-sm opacity-80 font-mono bg-background/50 inline-block px-3 py-1 rounded border border-border/50">
                    Query: "{getRecsMutation.data.query}"
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover:bg-background/80 whitespace-nowrap shrink-0 border-accent/30"
                  onClick={clearSearch}
                  data-testid="button-clear-search"
                >
                  Clear Results
                </Badge>
              </div>
            </Alert>
          )}

          {getRecsMutation.isError && (
            <Alert variant="destructive" className="max-w-4xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Failed to generate recommendations. Please try again.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Product Grid */}
        <div className="space-y-8">
          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-[200px] w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : !products || products.length === 0 ? (
            <div className="text-center py-20 border border-dashed rounded-xl border-border bg-card">
              <Box className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
              <h3 className="text-xl font-bold">Catalog Empty</h3>
              <p className="text-muted-foreground mt-2">No products available to display.</p>
            </div>
          ) : (
            <>
              {/* Searching State View */}
              {'isSearching' in displayProducts && displayProducts.isSearching && (
                <div className="space-y-12">
                  {displayProducts.recs.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 border-b border-border pb-2">
                        <Zap className="h-5 w-5 text-accent" />
                        <h2 className="text-2xl font-bold text-foreground">Top Recommendations</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {displayProducts.recs.map(rec => (
                          <ProductCard 
                            key={rec.product.id} 
                            product={rec.product} 
                            recommendation={rec} 
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {displayProducts.nonRecs.length > 0 && (
                    <div className="space-y-4 opacity-80">
                      <div className="flex items-center gap-3 border-b border-border pb-2">
                        <Box className="h-5 w-5 text-muted-foreground" />
                        <h2 className="text-xl font-bold text-muted-foreground">Other Catalog Items</h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {displayProducts.nonRecs.map(product => (
                          <ProductCard 
                            key={product.id} 
                            product={product} 
                            isDeemphasized={true} 
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Standard View */}
              {'isSearching' in displayProducts && !displayProducts.isSearching && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {displayProducts.products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                  
                  {displayProducts.products.length === 0 && selectedCategory && (
                    <div className="col-span-full text-center py-12">
                      <p className="text-muted-foreground">No products found in this category.</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </Layout>
  );
}
