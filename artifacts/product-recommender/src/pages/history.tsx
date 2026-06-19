import { Layout } from "@/components/layout";
import { useListRecommendationHistory } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History as HistoryIcon, Clock, Zap, ArrowRight, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useLocation } from "wouter";
import { formatDistanceToNow } from "date-fns";

export default function History() {
  const { data: history, isLoading } = useListRecommendationHistory();
  const [, setLocation] = useLocation();

  // In a real app we might want to navigate to home and pre-fill the search, 
  // but for this demo, we can just navigate to home which is where they can search again.
  // We'll store the query in local storage or state if we wanted to auto-run it, 
  // but let's just make it visually distinct for now.

  return (
    <Layout>
      <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center gap-3 border-b border-border pb-6">
          <div className="bg-primary/10 p-3 rounded-lg">
            <HistoryIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Intelligence Log</h1>
            <p className="text-muted-foreground mt-1">Review past AI recommendation queries and analysis runs.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))}
          </div>
        ) : !history || history.length === 0 ? (
          <Card className="border-dashed bg-card/50">
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <Activity className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="text-xl font-bold text-foreground">No queries logged yet</p>
              <p className="text-muted-foreground mt-2 max-w-sm">
                Run searches from the main catalog to see your history appear here.
              </p>
              <Link href="/">
                <Badge className="mt-6 cursor-pointer px-4 py-2 hover:bg-primary/90 text-sm">
                  Go to Catalog
                </Badge>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4 relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-4 bottom-4 w-px bg-border/50 hidden sm:block"></div>
            
            {history.map((item, i) => (
              <Card 
                key={item.id} 
                className="relative overflow-hidden group hover:border-primary/30 transition-colors sm:ml-12"
                data-testid={`card-history-${item.id}`}
              >
                {/* Timeline dot */}
                <div className="absolute -left-14 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary hidden sm:block z-10 group-hover:bg-primary transition-colors"></div>
                
                <CardContent className="p-0 flex flex-col sm:flex-row items-stretch">
                  <div className="p-6 flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground font-mono">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</span>
                    </div>
                    <p className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      "{item.query}"
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 p-6 sm:w-48 flex sm:flex-col items-center justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-border gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-extrabold font-mono text-foreground">{item.resultCount}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mt-1">Matches</p>
                    </div>
                    <Link href="/">
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all gap-1">
                        Run Again <ArrowRight className="h-3 w-3" />
                      </Badge>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
