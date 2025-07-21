import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SymptomForm from './components/SymptomForm';
import PredictionResult from './components/PredictionResult';
import FeedbackForm from './components/FeedbackForm';
import { getDiseasePrediction } from './services/geminiService';
import type { Prediction, UserInput } from './types';

/**
 * The main component of the application.
 * It manages the overall state, orchestrates child components, and handles the API call logic.
 */
const App: React.FC = () => {
  // State to store the prediction result from the API. Null when no prediction has been made.
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  // State to track whether an API call is in progress.
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // State to store any error messages that occur during the API call.
  const [error, setError] = useState<string | null>(null);
  // State to control the visibility of the feedback form.
  const [showFeedbackForm, setShowFeedbackForm] = useState<boolean>(false);

  /**
   * Handles the submission of the symptom form.
   * This function is memoized with `useCallback` to prevent re-creation on every render.
   * @param data - The user input data from the SymptomForm.
   */
  const handlePredict = useCallback(async (data: UserInput) => {
    // Set loading state to true and clear any previous results or errors.
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    setShowFeedbackForm(false); // Hide feedback form on new prediction
    try {
      // Call the service to get the prediction from the Gemini API.
      const result = await getDiseasePrediction(data);
      // On success, update the prediction state with the result.
      setPrediction(result);
      // Show the feedback form after results are displayed
      setShowFeedbackForm(true); 
    } catch (e: any) {
      // On failure, update the error state with a message.
      setError(e.message || 'An unknown error occurred.');
    } finally {
      // Regardless of success or failure, set loading state back to false.
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-8">
          {/* The form for user input. It receives the handlePredict callback and loading state. */}
          <SymptomForm onSubmit={handlePredict} isLoading={isLoading} />
          
          {/* Conditional Rendering: Display an error message if an error exists. */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-lg animate-fade-in" role="alert">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {/* Conditional Rendering: Display the prediction result if it exists and we are not loading. */}
          {prediction && !isLoading && (
             <PredictionResult prediction={prediction} />
          )}

          {/* Conditional Rendering: Display the feedback form after a successful prediction */}
          {showFeedbackForm && !isLoading && (
            <FeedbackForm />
          )}

          {/* Conditional Rendering: Display a more engaging placeholder on initial load. */}
          {!prediction && !isLoading && !error && (
            <div className="text-center py-12 px-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-fade-in">
                <div className="text-6xl text-blue-400 dark:text-blue-500 mb-4 animate-pulse-once">
                    <i className="fa-solid fa-robot"></i>
                </div>
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">AI Health Analysis Awaits</h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-prose mx-auto">
                    Select your symptoms using the interactive form above. Our AI will analyze the data to provide insights. Let's begin!
                </p>
            </div>
          )}
          
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
