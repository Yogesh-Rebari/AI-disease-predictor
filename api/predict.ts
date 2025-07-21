// Note: This file should be placed in the `api` directory at the root of your project.
// e.g., /api/predict.ts
// Vercel automatically turns this into a serverless function endpoint.

import { GoogleGenAI, Type } from "@google/genai";
import type { UserInput, Prediction } from "../types";

// This is the Vercel Edge Function handler
export const config = {
  runtime: 'edge',
};

// Define the schema once, as it's static.
const predictionSchema = {
    type: Type.OBJECT,
    properties: {
      predictedDisease: { type: Type.STRING, description: "The most likely disease based on the symptoms." },
      confidenceScore: { type: Type.NUMBER, description: "A confidence score between 0 and 1 for the main prediction." },
      explanation: { type: Type.STRING, description: "A brief, easy-to-understand explanation of why this disease is predicted, mentioning key symptoms." },
      importantSymptoms: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of 2-3 of the most influential symptoms from the user's list that led to this prediction."
      },
      differentialDiagnosis: {
        type: Type.ARRAY,
        description: "A list of 2-3 other possible diseases with their confidence scores, sorted from most to least likely.",
        items: {
          type: Type.OBJECT,
          properties: {
            disease: { type: Type.STRING },
            confidence: { type: Type.NUMBER }
          },
          required: ["disease", "confidence"]
        }
      },
      precautions: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "A list of 2-4 general precautions for the predicted disease."
      },
      treatment: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "A list of 2-4 common, general, over-the-counter or home-care treatment suggestions. This should not include prescription medications."
      }
    },
    required: ["predictedDisease", "confidenceScore", "explanation", "importantSymptoms", "differentialDiagnosis", "precautions", "treatment"]
};


export default async function handler(request: Request) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  }

  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
     return new Response(JSON.stringify({ error: 'Server configuration error: API_KEY not set.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const userInput: UserInput = await request.json();

    // Initialize the AI client inside the handler, using the secure environment variable.
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const prompt = `
      Analyze the following patient data and predict a possible disease.
      Patient Data:
      - Age: ${userInput.age}
      - Gender: ${userInput.gender}
      - Symptoms: ${userInput.selectedSymptoms.join(', ')}

      Based on this information, provide a primary disease prediction, a confidence score, a clear explanation, identify the key symptoms that influenced the decision, and list a few other potential differential diagnoses.

      Additionally, for the primary predicted disease, provide:
      1. A list of general precautions.
      2. A list of common, non-prescription treatment suggestions or home care advice. Emphasize that this is not a substitute for professional medical advice.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: predictionSchema,
        temperature: 0.2,
      },
    });
    
    const jsonText = response.text.trim();
    const predictionResult: Prediction = JSON.parse(jsonText);
    predictionResult.differentialDiagnosis.sort((a, b) => b.confidence - a.confidence);
    
    // Send the successful result back to the frontend
    return new Response(JSON.stringify(predictionResult), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in serverless function:", error);
    return new Response(JSON.stringify({ error: 'Failed to get prediction from AI.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
