import type { UserInput, Prediction } from "../types";

/**
 * Asynchronously fetches a disease prediction by calling our own secure serverless function.
 * This function acts as a proxy to the Gemini API, keeping the API key safe.
 * @param userInput - The data provided by the user (age, gender, symptoms).
 * @returns A Promise that resolves to a Prediction object.
 * @throws An error if the API call to our own backend fails.
 */
export const getDiseasePrediction = async (userInput: UserInput): Promise<Prediction> => {
  try {
    // Make a POST request to our own serverless function endpoint.
    const response = await fetch('/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Send the user input in the request body.
      body: JSON.stringify(userInput),
    });

    // If the response is not successful, throw an error.
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }

    // Parse the JSON response from our serverless function.
    const predictionResult: Prediction = await response.json();
    return predictionResult;

  } catch (error) {
    // If an error occurs during the fetch call, log it and re-throw a user-friendly error.
    console.error("Error calling backend API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get prediction: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching the prediction.");
  }
};
