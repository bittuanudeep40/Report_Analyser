import { TestResult } from "@/components/TestResultsTable";

// Mock analysis data for demonstration
export interface AnalysisResult {
  patientInfo: {
    name: string;
    age: string;
    gender: string;
    reportDate: string;
  };
  testResults: TestResult[];
  riskScore: number;
  confidenceScore: number;
  confidenceFactors: string[];
  emergencyAlerts: {
    level: "warning" | "critical";
    title: string;
    reason: string;
    risk: string;
    action: string;
  }[];
  patientSummary: {
    keyFindings: string[];
    abnormalParameters: string[];
    simpleExplanation: string;
  };
  possibleConditions: {
    condition: string;
    likelihood: "possible" | "likely" | "unlikely";
    basedOn: string;
  }[];
  riskAssessment: {
    level: "low" | "moderate" | "high";
    immediateRisks: string[];
    longTermRisks: string[];
  };
  predictions: {
    progressionOutlook: string;
    recoveryEstimate: string;
    factorsAffecting: string[];
  };
  recommendations: {
    lifestyle: string[];
    preventive: string[];
    warningSignsToMonitor: string[];
  };
  doctorSummary: {
    clinicalFindings: string;
    suspectedConditions: string;
    recommendedFollowUp: string[];
  };
  topRiskContributors: string[];
}

// Mock data generator for demonstration
export function generateMockAnalysis(): AnalysisResult {
  return {
    patientInfo: {
      name: "Not specified in report",
      age: "45",
      gender: "Male",
      reportDate: new Date().toLocaleDateString(),
    },
    testResults: [
      {
        id: "1",
        testName: "Hemoglobin (Hb)",
        observedValue: 12.1,
        unit: "g/dL",
        referenceRange: "13.0 - 17.0",
        status: "low",
      },
      {
        id: "2",
        testName: "Fasting Blood Glucose",
        observedValue: 142,
        unit: "mg/dL",
        referenceRange: "70 - 100",
        status: "high",
      },
      {
        id: "3",
        testName: "HbA1c",
        observedValue: 7.2,
        unit: "%",
        referenceRange: "< 5.7",
        status: "critical",
      },
      {
        id: "4",
        testName: "Total Cholesterol",
        observedValue: 245,
        unit: "mg/dL",
        referenceRange: "< 200",
        status: "high",
      },
      {
        id: "5",
        testName: "LDL Cholesterol",
        observedValue: 165,
        unit: "mg/dL",
        referenceRange: "< 100",
        status: "high",
      },
      {
        id: "6",
        testName: "HDL Cholesterol",
        observedValue: 42,
        unit: "mg/dL",
        referenceRange: "> 40",
        status: "normal",
      },
      {
        id: "7",
        testName: "Triglycerides",
        observedValue: 195,
        unit: "mg/dL",
        referenceRange: "< 150",
        status: "borderline",
      },
      {
        id: "8",
        testName: "Creatinine",
        observedValue: 1.1,
        unit: "mg/dL",
        referenceRange: "0.7 - 1.3",
        status: "normal",
      },
      {
        id: "9",
        testName: "Blood Urea Nitrogen",
        observedValue: 18,
        unit: "mg/dL",
        referenceRange: "7 - 20",
        status: "normal",
      },
      {
        id: "10",
        testName: "TSH",
        observedValue: 2.5,
        unit: "mIU/L",
        referenceRange: "0.4 - 4.0",
        status: "normal",
      },
    ],
    riskScore: 68,
    confidenceScore: 82,
    confidenceFactors: [
      "Complete blood panel provided",
      "Clear reference ranges available",
      "Patient age and gender specified",
      "Missing: lifestyle information",
      "Missing: past medical history",
    ],
    emergencyAlerts: [
      {
        level: "critical",
        title: "Elevated HbA1c Levels",
        reason: "HbA1c at 7.2% indicates uncontrolled diabetes",
        risk: "Long-term complications including cardiovascular disease, neuropathy, and kidney damage",
        action: "Consult an endocrinologist or primary care physician within the next 1-2 days for diabetes management",
      },
    ],
    patientSummary: {
      keyFindings: [
        "Blood sugar levels are elevated, suggesting diabetes that needs management",
        "Cholesterol levels are higher than optimal, which affects heart health",
        "Mild anemia detected - hemoglobin is slightly below normal",
      ],
      abnormalParameters: ["HbA1c", "Fasting Glucose", "Total Cholesterol", "LDL Cholesterol", "Hemoglobin"],
      simpleExplanation:
        "Your blood tests show signs of diabetes with elevated sugar levels. Additionally, your cholesterol levels are high, which combined with diabetes, increases your risk for heart problems. Your hemoglobin is slightly low, which might explain any fatigue you may be experiencing. These findings are manageable with proper medical care and lifestyle changes.",
    },
    possibleConditions: [
      {
        condition: "Type 2 Diabetes Mellitus",
        likelihood: "likely",
        basedOn: "Elevated fasting glucose (142 mg/dL) and HbA1c (7.2%)",
      },
      {
        condition: "Dyslipidemia (High Cholesterol)",
        likelihood: "likely",
        basedOn: "Elevated total cholesterol, LDL, and triglycerides",
      },
      {
        condition: "Mild Anemia",
        likelihood: "possible",
        basedOn: "Hemoglobin below normal range (12.1 g/dL)",
      },
      {
        condition: "Metabolic Syndrome",
        likelihood: "possible",
        basedOn: "Combination of elevated glucose, cholesterol, and triglycerides",
      },
    ],
    riskAssessment: {
      level: "high",
      immediateRisks: [
        "Hyperglycemic episodes if blood sugar not controlled",
        "Fatigue and weakness due to anemia",
      ],
      longTermRisks: [
        "Cardiovascular disease (heart attack, stroke)",
        "Diabetic nephropathy (kidney damage)",
        "Diabetic neuropathy (nerve damage)",
        "Diabetic retinopathy (eye damage)",
        "Atherosclerosis from prolonged high cholesterol",
      ],
    },
    predictions: {
      progressionOutlook:
        "Without intervention, diabetes and cholesterol levels are likely to worsen over the next 6-12 months. With proper treatment and lifestyle changes, significant improvement can be expected within 3-6 months.",
      recoveryEstimate: "Medium-term (3-6 months for noticeable improvement with treatment)",
      factorsAffecting: [
        "Adherence to prescribed medication",
        "Dietary modifications (reduced sugar and saturated fats)",
        "Regular physical activity",
        "Weight management",
        "Regular monitoring and follow-up",
      ],
    },
    recommendations: {
      lifestyle: [
        "Adopt a low-glycemic, heart-healthy diet (Mediterranean or DASH diet)",
        "Engage in at least 150 minutes of moderate aerobic activity per week",
        "Limit refined carbohydrates and added sugars",
        "Include iron-rich foods like leafy greens and lean red meat",
        "Maintain healthy sleep patterns (7-8 hours)",
        "Manage stress through relaxation techniques",
      ],
      preventive: [
        "Regular blood glucose monitoring (as advised by doctor)",
        "Annual eye examination for diabetic retinopathy screening",
        "Regular kidney function tests",
        "Blood pressure monitoring",
        "Annual lipid profile testing",
      ],
      warningSignsToMonitor: [
        "Excessive thirst or frequent urination",
        "Unexplained weight loss",
        "Blurred vision",
        "Chest pain or shortness of breath",
        "Numbness or tingling in extremities",
        "Slow-healing wounds",
      ],
    },
    doctorSummary: {
      clinicalFindings:
        "45-year-old male presenting with HbA1c 7.2%, fasting glucose 142 mg/dL, hypercholesterolemia (TC 245, LDL 165), hypertriglyceridemia (195), and mild normocytic anemia (Hb 12.1). Renal and thyroid function within normal limits.",
      suspectedConditions:
        "Type 2 Diabetes Mellitus (uncontrolled), Mixed Dyslipidemia, Mild Anemia (etiology to be determined - consider iron studies, B12, folate)",
      recommendedFollowUp: [
        "Initiate or optimize antidiabetic therapy (consider metformin if not contraindicated)",
        "Start statin therapy for LDL reduction",
        "Order complete iron studies, B12, and folate to evaluate anemia",
        "Lifestyle counseling for diet and exercise",
        "Recheck HbA1c in 3 months",
        "Refer to dietitian and diabetes educator",
        "Consider cardiology referral given combined risk factors",
      ],
    },
    topRiskContributors: [
      "Uncontrolled blood sugar (HbA1c 7.2%)",
      "High LDL cholesterol (165 mg/dL)",
      "Elevated fasting glucose (142 mg/dL)",
    ],
  };
}