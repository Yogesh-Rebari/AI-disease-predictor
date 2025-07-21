/**
 * Represents a single selectable symptom in the UI.
 */
export interface Symptom {
  /** A unique identifier for the symptom (e.g., 'fever'). */
  id: string;
  /** The human-readable label for the symptom (e.g., 'Fever'). */
  label: string;
  /** A React node, typically an icon, for visual representation. */
  icon: React.ReactNode;
}

/**
 * Represents the data collected from the user via the input form.
 */
export interface UserInput {
  /** The user's age. */
  age: number;
  /** The user's selected gender. */
  gender: 'male' | 'female' | 'other';
  /** An array of symptom IDs selected by the user. */
  selectedSymptoms: string[];
}

/**
 * Represents a single differential diagnosis (an alternative possibility).
 */
export interface DifferentialDiagnosis {
  /** The name of the alternative predicted disease. */
  disease: string;
  /** The confidence score for this alternative diagnosis, from 0 to 1. */
  confidence: number;
}

/**
 * Represents the entire prediction result object received from the Gemini API.
 */
export interface Prediction {
  /** The primary disease predicted by the model. */
  predictedDisease: string;
  /** The confidence score for the primary prediction, from 0 to 1. */
  confidenceScore: number;
  /** A text explanation of the reasoning behind the prediction. */
  explanation: string;
  /** A list of symptoms that were most influential in the prediction. */
  importantSymptoms: string[];
  /** An array of other possible diseases and their confidence scores. */
  differentialDiagnosis: DifferentialDiagnosis[];
  /** A list of general precautions for the predicted disease. */
  precautions: string[];
  /** A list of general, non-prescription treatment suggestions. */
  treatment: string[];
}
