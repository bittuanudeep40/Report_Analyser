import { Activity, Shield, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="relative w-full border-b border-white/10 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
      {/* Glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative p-2.5 rounded-xl bg-primary/20 border border-primary/30 glow-primary">
              <Activity className="h-6 w-6 text-primary" />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-accent animate-glow-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                MedVerse AI
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                  COSMOS
                </span>
              </h1>
              <p className="text-xs text-muted-foreground">
                Intelligent Medical Report Analysis
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground glass-strong px-3 py-1.5 rounded-full">
            <Shield className="h-4 w-4 text-success" />
            <span>HIPAA Compliant</span>
          </div>
        </div>
      </div>
    </header>
  );
}