import { useState } from "react";
import { Key, Eye, EyeOff, CheckCircle, AlertCircle, Settings, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface ApiKeyConfigProps {
  onSave: (apiKey: string) => void;
  savedKey?: string;
}

export function ApiKeyConfig({ onSave, savedKey }: ApiKeyConfigProps) {
  const [apiKey, setApiKey] = useState(savedKey || "");
  const [showKey, setShowKey] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!savedKey);

  const handleSave = () => {
    if (apiKey.trim()) {
      onSave(apiKey.trim());
    }
  };

  return (
    <div className="rounded-2xl card-space overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/20 border border-primary/30"
            style={{ boxShadow: "0 0 15px rgba(0,200,200,0.2)" }}
          >
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">API Configuration</h3>
            <p className="text-sm text-muted-foreground">
              {savedKey ? "API key configured" : "Configure your AI API key"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {savedKey ? (
            <span className="flex items-center gap-1.5 text-sm text-success glass-strong px-3 py-1.5 rounded-full">
              <CheckCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Connected</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-sm text-warning glass-strong px-3 py-1.5 rounded-full">
              <AlertCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Not configured</span>
            </span>
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-5 pb-5 pt-2 border-t border-white/10 space-y-4 animate-fade-in">
          <div className="p-4 rounded-xl glass border-info/30">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> Your API key is stored locally in your browser 
              and is used to analyze medical reports using AI. For production use, configure this through 
              environment variables or a secure backend.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              AI API Key
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key..."
                className={cn(
                  "w-full pl-10 pr-12 py-3 rounded-xl glass",
                  "text-foreground placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
                  "transition-all"
                )}
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                {showKey ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleSave}
              disabled={!apiKey.trim()}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all",
                "bg-gradient-to-r from-primary to-info text-primary-foreground",
                "hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
                "glow-primary"
              )}
            >
              <Rocket className="h-4 w-4" />
              Save API Key
            </button>
            {savedKey && (
              <button
                onClick={() => {
                  setApiKey("");
                  onSave("");
                }}
                className="px-5 py-2.5 rounded-xl font-medium glass hover:bg-white/10 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}