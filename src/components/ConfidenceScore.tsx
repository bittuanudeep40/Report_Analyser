import { Info, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfidenceScoreProps {
  score: number;
  factors: string[];
}

export function ConfidenceScore({ score, factors }: ConfidenceScoreProps) {
  const clampedScore = Math.max(0, Math.min(100, score));
  
  const getScoreLevel = (score: number) => {
    if (score >= 80) return { label: "High Confidence", color: "success" };
    if (score >= 50) return { label: "Moderate Confidence", color: "warning" };
    return { label: "Low Confidence", color: "critical" };
  };

  const { label, color } = getScoreLevel(clampedScore);

  return (
    <div className="p-5 rounded-2xl card-space h-full">
      <div className="flex items-center gap-3 mb-5">
        <div className={cn(
          "p-2.5 rounded-xl",
          color === "success" && "bg-success/20",
          color === "warning" && "bg-warning/20",
          color === "critical" && "bg-critical/20"
        )}
        style={{
          boxShadow: color === "success" 
            ? "0 0 20px rgba(34,197,94,0.3)" 
            : color === "warning" 
            ? "0 0 20px rgba(245,158,11,0.3)"
            : "0 0 20px rgba(239,68,68,0.3)"
        }}
        >
          {color === "success" ? (
            <CheckCircle className="h-5 w-5 text-success" />
          ) : (
            <AlertCircle className={cn(
              "h-5 w-5",
              color === "warning" ? "text-warning" : "text-critical"
            )} />
          )}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            AI Confidence Score
            <Sparkles className="h-4 w-4 text-accent animate-glow-pulse" />
          </h4>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
        <div className={cn(
          "text-3xl font-bold glow-text",
          color === "success" && "text-success",
          color === "warning" && "text-warning",
          color === "critical" && "text-critical"
        )}>
          {clampedScore}%
        </div>
      </div>

      {/* Progress bar with glow */}
      <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-5 relative">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-1000 relative",
            color === "success" && "bg-gradient-to-r from-success to-emerald-400",
            color === "warning" && "bg-gradient-to-r from-warning to-amber-400",
            color === "critical" && "bg-gradient-to-r from-critical to-red-400"
          )}
          style={{ 
            width: `${clampedScore}%`,
            boxShadow: color === "success" 
              ? "0 0 15px rgba(34,197,94,0.5)" 
              : color === "warning" 
              ? "0 0 15px rgba(245,158,11,0.5)"
              : "0 0 15px rgba(239,68,68,0.5)"
          }}
        />
      </div>

      {/* Factors */}
      {factors.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="h-3 w-3" />
            <span>Confidence factors:</span>
          </div>
          <ul className="text-sm text-muted-foreground space-y-2">
            {factors.map((factor, index) => (
              <li 
                key={index} 
                className="flex items-start gap-2 glass rounded-lg p-2"
                style={{
                  animation: `fade-in 0.3s ease-out forwards`,
                  animationDelay: `${index * 100}ms`,
                  opacity: 0,
                }}
              >
                <span className="text-primary mt-0.5">•</span>
                <span className="text-xs md:text-sm">{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}