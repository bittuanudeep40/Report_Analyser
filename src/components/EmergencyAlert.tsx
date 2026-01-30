import { AlertTriangle, Phone, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmergencyAlertProps {
  level: "warning" | "critical";
  title: string;
  reason: string;
  risk: string;
  action: string;
  onDismiss?: () => void;
}

export function EmergencyAlert({ 
  level, 
  title, 
  reason, 
  risk, 
  action,
  onDismiss 
}: EmergencyAlertProps) {
  const isCritical = level === "critical";

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-2xl p-6",
        "border backdrop-blur-xl",
        isCritical 
          ? "border-critical/50 bg-critical/10 animate-pulse-glow" 
          : "border-warning/50 bg-warning/10"
      )}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={cn(
            "absolute -inset-1 opacity-30",
            isCritical ? "bg-critical" : "bg-warning"
          )}
          style={{
            maskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative">
        <div className="flex items-start gap-4">
          <div className={cn(
            "flex-shrink-0 p-3 rounded-xl",
            isCritical ? "bg-critical/20 glow-critical" : "bg-warning/20"
          )}
          style={{ boxShadow: isCritical ? "0 0 20px rgba(239,68,68,0.4)" : "0 0 20px rgba(245,158,11,0.4)" }}
          >
            {isCritical ? (
              <Zap className="h-6 w-6 text-critical" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-warning" />
            )}
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className={cn(
                "px-3 py-1 text-xs font-bold uppercase rounded-full",
                "animate-pulse",
                isCritical 
                  ? "bg-critical text-critical-foreground" 
                  : "bg-warning text-warning-foreground"
              )}>
                🚨 {isCritical ? "Emergency" : "Warning"} Alert
              </span>
              <h3 className={cn(
                "font-semibold text-lg glow-text",
                isCritical ? "text-critical" : "text-warning"
              )}>
                {title}
              </h3>
            </div>

            <div className="grid gap-2 text-sm">
              <div className="glass rounded-lg p-2">
                <span className="font-medium text-foreground">Trigger: </span>
                <span className="text-muted-foreground">{reason}</span>
              </div>
              <div className="glass rounded-lg p-2">
                <span className="font-medium text-foreground">Potential Risk: </span>
                <span className="text-muted-foreground">{risk}</span>
              </div>
              <div className="glass rounded-lg p-2">
                <span className="font-medium text-foreground">Recommended Action: </span>
                <span className="text-muted-foreground">{action}</span>
              </div>
            </div>

            {isCritical && (
              <div className="flex items-center gap-2 pt-2">
                <Phone className="h-4 w-4 text-critical animate-pulse" />
                <span className="text-sm font-medium text-critical">
                  Please seek immediate medical attention
                </span>
              </div>
            )}
          </div>

          {onDismiss && (
            <button
              onClick={onDismiss}
              className="flex-shrink-0 p-2 rounded-lg glass hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}