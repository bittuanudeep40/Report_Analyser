import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, Minus, AlertCircle } from "lucide-react";

export interface TestResult {
  id: string;
  testName: string;
  observedValue: number | string;
  unit: string;
  referenceRange: string;
  status: "normal" | "borderline" | "high" | "low" | "critical";
}

interface TestResultsTableProps {
  results: TestResult[];
  title?: string;
}

export function TestResultsTable({ results, title = "Test Results" }: TestResultsTableProps) {
  const getStatusConfig = (status: TestResult["status"]) => {
    switch (status) {
      case "normal":
        return { 
          label: "Normal", 
          className: "status-normal",
          icon: null
        };
      case "borderline":
        return { 
          label: "Borderline", 
          className: "status-warning",
          icon: <Minus className="h-3 w-3" />
        };
      case "high":
        return { 
          label: "High", 
          className: "status-warning",
          icon: <ArrowUp className="h-3 w-3" />
        };
      case "low":
        return { 
          label: "Low", 
          className: "status-warning",
          icon: <ArrowDown className="h-3 w-3" />
        };
      case "critical":
        return { 
          label: "Critical", 
          className: "status-critical",
          icon: <AlertCircle className="h-3 w-3" />
        };
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        {title}
      </h3>
      
      <div className="overflow-x-auto rounded-xl card-space">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-4 py-4 text-left text-sm font-semibold text-foreground">
                Test Name
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-foreground">
                Result
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-foreground hidden sm:table-cell">
                Reference Range
              </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => {
              const statusConfig = getStatusConfig(result.status);
              
              return (
                <tr 
                  key={result.id}
                  className={cn(
                    "border-b border-white/5 last:border-0 transition-all hover:bg-white/5",
                    result.status === "critical" && "bg-critical/5"
                  )}
                  style={{ 
                    animation: `fade-in 0.3s ease-out forwards`,
                    animationDelay: `${index * 50}ms`,
                    opacity: 0,
                  }}
                >
                  <td className="px-4 py-3">
                    <span className="font-medium text-foreground text-sm md:text-base">
                      {result.testName}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "font-mono text-sm md:text-base",
                      result.status === "critical" ? "text-critical font-bold glow-text" :
                      result.status !== "normal" ? "text-warning font-semibold" :
                      "text-foreground"
                    )}>
                      {result.observedValue} <span className="text-muted-foreground text-xs">{result.unit}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-muted-foreground text-sm">
                      {result.referenceRange}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border",
                      statusConfig.className
                    )}>
                      {statusConfig.icon}
                      <span className="hidden sm:inline">{statusConfig.label}</span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}