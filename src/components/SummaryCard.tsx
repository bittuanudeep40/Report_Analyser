import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  icon: ReactNode;
  variant?: "default" | "patient" | "doctor";
  children: ReactNode;
  className?: string;
}

export function SummaryCard({ 
  title, 
  icon, 
  variant = "default",
  children,
  className 
}: SummaryCardProps) {
  return (
    <div className={cn(
      "rounded-2xl overflow-hidden card-space",
      className
    )}>
      <div className={cn(
        "px-5 py-4 border-b border-white/10 flex items-center gap-3",
        variant === "patient" && "bg-gradient-to-r from-primary/10 to-info/5",
        variant === "doctor" && "bg-gradient-to-r from-secondary/50 to-muted/30",
        variant === "default" && "bg-white/5"
      )}>
        <div className={cn(
          "p-2.5 rounded-xl",
          variant === "patient" && "bg-primary/20 text-primary",
          variant === "doctor" && "bg-accent/20 text-accent",
          variant === "default" && "bg-white/10 text-muted-foreground"
        )}
        style={{
          boxShadow: variant === "patient" 
            ? "0 0 15px rgba(0,200,200,0.2)" 
            : variant === "doctor"
            ? "0 0 15px rgba(250,200,100,0.2)"
            : "none"
        }}
        >
          {icon}
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}