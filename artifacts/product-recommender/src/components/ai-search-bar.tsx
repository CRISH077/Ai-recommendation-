import { Search, Sparkles, Loader2, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface AiSearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export function AiSearchBar({ onSearch, isLoading }: AiSearchBarProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <Card className="w-full bg-card border-border shadow-lg shadow-primary/5 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-transparent pointer-events-none" />
      <form onSubmit={handleSubmit} className="relative flex items-center p-2 z-10">
        <div className="pl-4 pr-2 text-primary">
          <Sparkles className="h-6 w-6" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask AI to find exactly what you need... (e.g. 'gaming laptop under $1500')"
          className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground/60 text-lg font-medium px-2 py-4"
          disabled={isLoading}
          data-testid="input-ai-search"
        />
        <div className="pr-2">
          <Button 
            type="submit" 
            size="lg" 
            disabled={!query.trim() || isLoading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md shadow-primary/20"
            data-testid="button-ai-search-submit"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Thinking
              </>
            ) : (
              <>
                <Cpu className="mr-2 h-5 w-5" />
                Analyze Catalog
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
