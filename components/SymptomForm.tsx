import React, { useState } from 'react';
import { SYMPTOMS_LIST } from '../constants';
import type { UserInput } from '../types';
import Spinner from './icons/Spinner';

// Define the props interface for the SymptomForm component.
interface SymptomFormProps {
  /** A callback function to be executed when the form is submitted. */
  onSubmit: (data: UserInput) => void;
  /** A boolean flag to indicate if the form is currently submitting (loading). */
  isLoading: boolean;
}

/**
 * A form component for users to input their age, gender, and select symptoms.
 */
const SymptomForm: React.FC<SymptomFormProps> = ({ onSubmit, isLoading }) => {
  // State for the user's age, initialized to 30.
  const [age, setAge] = useState<number>(30);
  // State for the user's gender.
  const [gender, setGender] = useState<UserInput['gender']>('male');
  // State for the selected symptoms. A Set is used for efficient add/delete operations.
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());

  /**
   * Handles toggling a symptom's selection state.
   * @param symptomId - The ID of the symptom to toggle.
   */
  const handleSymptomToggle = (symptomId: string) => {
    setSelectedSymptoms(prev => {
      const newSet = new Set(prev); // Create a new copy to avoid direct mutation.
      if (newSet.has(symptomId)) {
        newSet.delete(symptomId); // If symptom exists, remove it.
      } else {
        newSet.add(symptomId); // Otherwise, add it.
      }
      return newSet;
    });
  };

  /**
   * Handles the form submission event.
   * @param e - The form event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default browser form submission.
    if (selectedSymptoms.size === 0) {
        alert("Please select at least one symptom.");
        return;
    }
    // Call the onSubmit prop with the structured user data.
    onSubmit({
      age,
      gender,
      selectedSymptoms: Array.from(selectedSymptoms), // Convert the Set to an array.
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Patient Information</h2>
        
        {/* Input fields for age and gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Age</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value, 10) || 0)}
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition"
              min="1"
              max="120"
              required
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as UserInput['gender'])}
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Select Symptoms</h2>
        {/* Grid of selectable symptom buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {SYMPTOMS_LIST.map(symptom => (
            <button
              type="button"
              key={symptom.id}
              onClick={() => handleSymptomToggle(symptom.id)}
              // Dynamically apply classes based on whether the symptom is selected.
              className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none ${
                selectedSymptoms.has(symptom.id)
                  ? 'bg-blue-100 dark:bg-blue-900 border-blue-500 dark:border-blue-400 ring-2 ring-blue-500'
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
              }`}
            >
              <div className={`text-3xl mb-2 ${selectedSymptoms.has(symptom.id) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                {symptom.icon}
              </div>
              <span className="text-sm text-center font-medium text-gray-800 dark:text-gray-200">{symptom.label}</span>
            </button>
          ))}
        </div>

        {/* Submit button, which is disabled and shows a spinner when isLoading is true. */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-blue-500 disabled:bg-blue-300 dark:disabled:bg-blue-800 transition-colors duration-200"
        >
          {isLoading ? <Spinner /> : <><i className="fa-solid fa-brain mr-2"></i>Analyze Symptoms</>}
        </button>
      </form>
    </div>
  );
};

export default SymptomForm;
