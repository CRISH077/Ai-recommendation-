import { Link, useLocation } from "wouter";
import { Search, History, Zap } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      <aside className="w-64 border-r border-border bg-sidebar text-sidebar-foreground flex flex-col hidden md:flex">
        <div className="p-6">
          <div className="flex items-center gap-2 font-bold text-xl text-sidebar-primary">
            <Zap className="h-6 w-6 text-sidebar-primary" />
            <span>TechAssist AI</span>
          </div>
          <p className="text-sidebar-muted-foreground text-xs mt-1 font-mono tracking-wider opacity-60">CATALOG NAVIGATOR v1.0</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/">
            <div
              className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                location === "/" 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm" 
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              data-testid="link-nav-home"
            >
              <Search className="h-4 w-4" />
              <span>Catalog & AI Search</span>
            </div>
          </Link>
          <Link href="/history">
            <div
              className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${
                location === "/history" 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm" 
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              data-testid="link-nav-history"
            >
              <History className="h-4 w-4" />
              <span>Recommendation History</span>
            </div>
          </Link>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden border-b border-border bg-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg text-primary">
            <Zap className="h-5 w-5" />
            <span>TechAssist AI</span>
          </div>
          <nav className="flex gap-4">
            <Link href="/" className={`text-sm font-medium ${location === "/" ? "text-primary" : "text-muted-foreground"}`}>Search</Link>
            <Link href="/history" className={`text-sm font-medium ${location === "/history" ? "text-primary" : "text-muted-foreground"}`}>History</Link>
          </nav>
        </header>

        <div className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
