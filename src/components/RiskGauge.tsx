import { cn } from "@/lib/utils";

interface RiskGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function RiskGauge({ score, size = "md", showLabel = true }: RiskGaugeProps) {
  const clampedScore = Math.max(0, Math.min(100, score));
  
  const getRiskCategory = (score: number) => {
    if (score <= 30) return { label: "Low Risk", color: "success" };
    if (score <= 60) return { label: "Moderate Risk", color: "warning" };
    return { label: "High Risk", color: "critical" };
  };

  const { label, color } = getRiskCategory(clampedScore);

  const sizeConfig = {
    sm: { width: 140, strokeWidth: 10, fontSize: "text-2xl", padding: 20 },
    md: { width: 200, strokeWidth: 14, fontSize: "text-4xl", padding: 25 },
    lg: { width: 260, strokeWidth: 18, fontSize: "text-5xl", padding: 30 },
  };

  const config = sizeConfig[size];
  const radius = (config.width - config.strokeWidth) / 2;
  const circumference = radius * Math.PI;
  const offset = circumference - (clampedScore / 100) * circumference;

  const gradientColors = {
    success: { start: "#22c55e", end: "#4ade80", glow: "0 0 30px rgba(34, 197, 94, 0.5)" },
    warning: { start: "#f59e0b", end: "#fbbf24", glow: "0 0 30px rgba(245, 158, 11, 0.5)" },
    critical: { start: "#ef4444", end: "#f87171", glow: "0 0 30px rgba(239, 68, 68, 0.5)" },
  };

  const colors = gradientColors[color as keyof typeof gradientColors];

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: config.width, height: config.width / 2 + config.padding }}>
        <svg
          width={config.width}
          height={config.width / 2 + config.padding}
          className="transform -rotate-180 drop-shadow-lg"
        >
          <defs>
            <linearGradient id={`space-gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.start} />
              <stop offset="100%" stopColor={colors.end} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background arc */}
          <path
            d={`M ${config.strokeWidth / 2} ${config.width / 2} A ${radius} ${radius} 0 0 1 ${config.width - config.strokeWidth / 2} ${config.width / 2}`}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
          />
          
          {/* Progress arc with glow */}
          <path
            d={`M ${config.strokeWidth / 2} ${config.width / 2} A ${radius} ${radius} 0 0 1 ${config.width - config.strokeWidth / 2} ${config.width / 2}`}
            fill="none"
            stroke={`url(#space-gradient-${color})`}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            filter="url(#glow)"
            className="transition-all duration-1000 ease-out"
            style={{ filter: `drop-shadow(${colors.glow})` }}
          />
        </svg>

        {/* Score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span 
            className={cn(config.fontSize, "font-bold glow-text", {
              "text-success": color === "success",
              "text-warning": color === "warning",
              "text-critical": color === "critical",
            })}
          >
            {clampedScore}
          </span>
          {showLabel && (
            <span className="text-sm text-muted-foreground font-medium mt-1">
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}