import { useState, useCallback } from "react";
import { SpaceBackground } from "@/components/SpaceBackground";
import { Header } from "@/components/Header";
import { FileUpload } from "@/components/FileUpload";
import { ApiKeyConfig } from "@/components/ApiKeyConfig";
import { RiskGauge } from "@/components/RiskGauge";
import { EmergencyAlert } from "@/components/EmergencyAlert";
import { TestResultsTable } from "@/components/TestResultsTable";
import { ConfidenceScore } from "@/components/ConfidenceScore";
import { SummaryCard } from "@/components/SummaryCard";
import { AnalysisResult } from "@/lib/mockAnalysis";
import { useToast } from "@/hooks/use-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { 
  User, 
  Stethoscope, 
  TrendingUp, 
  Heart, 
  Lightbulb,
  AlertTriangle,
  Activity,
  FileText,
  ChevronRight,
  Clock,
  Shield,
  Sparkles,
  Orbit
} from "lucide-react";
import { cn } from "@/lib/utils";

const Index = () => {
  const { toast } = useToast();
  
  
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem("medanalyze_api_key") || "";
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);

  const handleApiKeySave = useCallback((key: string) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem("medanalyze_api_key", key);
    } else {
      localStorage.removeItem("medanalyze_api_key");
    }
  }, []);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!apiKey) {
      toast({
        title: "API Key Missing",
        description: "Please configure your Gemini API key in the settings.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysis(null);
    setDismissedAlerts([]);

    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const base64Data = (e.target?.result as string).split(",")[1];
          
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ 
            model: "gemini-3-flash-preview",
            generationConfig: { responseMimeType: "application/json" } 
          });
          

          const prompt = `You are a medical analysis AI. Analyze the provided medical report and return a JSON object strictly matching this interface:
          interface AnalysisResult {
            patientInfo: { name: string; age: string; gender: string; reportDate: string; };
            testResults: { id: string; testName: string; observedValue: number; unit: string; referenceRange: string; status: "low" | "normal" | "high" | "critical" | "borderline"; }[];
            riskScore: number;
            confidenceScore: number;
            confidenceFactors: string[];
            emergencyAlerts: { level: "warning" | "critical"; title: string; reason: string; risk: string; action: string; }[];
            patientSummary: { keyFindings: string[]; abnormalParameters: string[]; simpleExplanation: string; };
            possibleConditions: { condition: string; likelihood: "possible" | "likely" | "unlikely"; basedOn: string; }[];
            riskAssessment: { level: "low" | "moderate" | "high"; immediateRisks: string[]; longTermRisks: string[]; };
            predictions: { progressionOutlook: string; recoveryEstimate: string; factorsAffecting: string[]; };
            recommendations: { lifestyle: string[]; preventive: string[]; warningSignsToMonitor: string[]; };
            doctorSummary: { clinicalFindings: string; suspectedConditions: string; recommendedFollowUp: string[]; };
            topRiskContributors: string[];
          }`;

          const result = await model.generateContent([
            prompt,
            {
              inlineData: {
                data: base64Data,
                mimeType: file.type
              },
            },
          ]);

          const response = await result.response;
          const parsedResult = JSON.parse(response.text());

          setAnalysis(parsedResult);
          
          toast({
            title: "Analysis Complete",
            description: "Report processed successfully using Gemini 3 Flash.",
          });
        } catch (innerError: any) {
          throw innerError;
        } finally {
          setIsAnalyzing(false);
        }
      };

      reader.onerror = () => {
        throw new Error("Failed to read file.");
      };

      reader.readAsDataURL(file);

    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      setIsAnalyzing(false);
    }
  }, [apiKey, toast]);

  const handleDismissAlert = useCallback((index: number) => {
    setDismissedAlerts((prev) => [...prev, index]);
  }, []);

  return (
    <div className="relative min-h-screen">
      <SpaceBackground />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <section className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong mb-6">
              <Orbit className="h-4 w-4 text-primary animate-spin" style={{ animationDuration: "10s" }} />
              <Sparkles className="h-4 w-4 text-accent animate-glow-pulse" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              <span className="bg-gradient-to-r from-primary via-info to-accent bg-clip-text text-transparent">
                AI-Powered
              </span> Medical Analysis
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Upload your medical report and receive intelligent insights, risk assessments, 
              and personalized recommendations.
            </p>
          </section>

          <section className="mb-8 animate-fade-in">
            <ApiKeyConfig onSave={handleApiKeySave} savedKey={apiKey} />
          </section>

          <section className="mb-12 animate-fade-in">
            <FileUpload onFileSelect={handleFileSelect} isAnalyzing={isAnalyzing} />
          </section>

          {analysis && (
            <div className="space-y-8">
              {analysis.emergencyAlerts.length > 0 && (
                <section className="space-y-4 animate-fade-in">
                  {analysis.emergencyAlerts
                    .filter((_, index) => !dismissedAlerts.includes(index))
                    .map((alert, index) => (
                      <EmergencyAlert key={index} {...alert} onDismiss={() => handleDismissAlert(index)} />
                    ))}
                </section>
              )}

              <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
                <div className="card-space p-6 flex flex-col items-center">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Health Risk Score
                  </h3>
                  <RiskGauge score={analysis.riskScore} size="md" />
                  <div className="mt-4 w-full space-y-2">
                    <p className="text-xs text-muted-foreground text-center font-medium">Top Risk Contributors:</p>
                    {analysis.topRiskContributors.map((contributor, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm glass rounded-lg p-2">
                        <span className="w-5 h-5 rounded-full bg-critical/20 text-critical flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        <span className="text-muted-foreground text-xs">{contributor}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <ConfidenceScore score={analysis.confidenceScore} factors={analysis.confidenceFactors} />
                </div>
              </section>

              <section className="animate-fade-in">
                <TestResultsTable results={analysis.testResults} />
              </section>

              <section className="animate-fade-in">
                <SummaryCard title="Patient-Friendly Summary" icon={<User className="h-5 w-5" />} variant="patient">
                  <div className="space-y-4">
                    <p className="text-foreground leading-relaxed">{analysis.patientSummary.simpleExplanation}</p>
                    <div>
                      <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-warning" /> Key Findings
                      </h4>
                      <ul className="space-y-2">
                        {analysis.patientSummary.keyFindings.map((finding, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground glass rounded-lg p-3">
                            <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SummaryCard>
              </section>
            </div>
          )}

          {!analysis && !isAnalyzing && (
            <section className="text-center py-16 animate-fade-in">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full glass-strong mb-6 animate-float">
                <FileText className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No Report Analyzed Yet</h3>
            </section>
          )}
        </main>
        <footer className="border-t border-white/10 glass mt-16">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">© 2026 MedVerse AI • For informational purposes only</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-success" /> Secure & Private</span>
                <span className="hidden sm:inline">Konagala Anudeep</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;