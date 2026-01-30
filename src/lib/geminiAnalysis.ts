import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the SDK with your API Key
// It is recommended to use an environment variable: import.meta.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI("AIzaSyDMVb7bVSxf4tw5TAM-HoPOEYv06u2AE7o");

export interface AnalysisResult {
  imageIdentification: {
    modality: string;
    bodyPart: string;
    orientation: string;
    quality: string;
  };
  visualFindings: {
    abnormalities: string[];
    normalStructures: string[];
    symmetry: string;
  };
  patientSummary: string;
  possibleConditions: Array<{
    condition: string;
    probability: string;
    description: string;
  }>;
  severity: 'mild' | 'moderate' | 'severe';
  immediateConcerns: string[];
  recommendations: string[];
  confidenceScore: number;
}

export async function analyzeImage(base64Image: string): Promise<AnalysisResult> {
  // Use the Gemini 3 Flash Preview model
  const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

  const prompt = `Analyze this medical image and return a detailed report in JSON format. 
  Focus on identifying abnormalities and providing a patient-friendly summary.
  Return ONLY a valid JSON object matching the AnalysisResult interface.`;

  // Extract base64 data without the prefix
  const base64Data = base64Image.split(",")[1];

  const result = await model.generateContent([
    prompt,
    {
      inlineData: {
        data: base64Data,
        mimeType: "image/jpeg",
      },
    },
  ]);

  const response = await result.response;
  const text = response.text();
  
  // Clean the response in case the model includes markdown formatting
  const cleanedJson = text.replace(/```json|```/g, "").trim();
  
  return JSON.parse(cleanedJson) as AnalysisResult;
}