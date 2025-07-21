import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Prediction } from '../types';

// Define the props interface for the PredictionResult component.
interface PredictionResultProps {
  /** The prediction data object received from the API. */
  prediction: Prediction;
}

/**
 * A custom tooltip component for the Recharts bar chart.
 * It provides a styled tooltip when hovering over a bar.
 */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-gray-700 text-white rounded-md shadow-lg">
        <p className="label">{`${label}`}</p>
        <p className="intro">{`Confidence: ${(payload[0].value * 100).toFixed(0)}%`}</p>
      </div>
    );
  }
  return null;
};

/**
 * A component to display the detailed analysis results, including charts and text.
 */
const PredictionResult: React.FC<PredictionResultProps> = ({ prediction }) => {
  // Prepare data for the confidence chart.
  // It combines the primary prediction with the list of differential diagnoses.
  const chartData = [
    { disease: prediction.predictedDisease, confidence: prediction.confidenceScore },
    ...prediction.differentialDiagnosis,
  ].map(d => ({ name: d.disease, confidence: d.confidence }));
  
  // Sort the data so the highest confidence bar is at the top of the chart.
  chartData.sort((a, b) => b.confidence - a.confidence);

  return (
    // The main container with a fade-in animation.
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Analysis Result</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Contains all textual information about the prediction. */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section for the Primary Prediction and Confidence Score */}
          <div className="bg-blue-50 dark:bg-gray-700/50 p-6 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 uppercase tracking-wide">Primary Prediction</h3>
            <p className="text-3xl font-bold text-blue-900 dark:text-white mt-1">{prediction.predictedDisease}</p>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mt-3">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${prediction.confidenceScore * 100}%` }}
              ></div>
            </div>
            <p className="text-right text-sm font-medium text-blue-900 dark:text-gray-300 mt-1">
              {(prediction.confidenceScore * 100).toFixed(0)}% Confidence
            </p>
          </div>

          {/* Section for the AI's Explanation */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide flex items-center">
              <i className="fa-solid fa-comment-medical mr-2"></i>
              Explanation
            </h3>
            <p className="text-gray-800 dark:text-gray-200 mt-2">{prediction.explanation}</p>
          </div>

          {/* Section for Key Influential Symptoms */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
             <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide flex items-center">
               <i className="fa-solid fa-star-of-life mr-2"></i>
               Key Symptoms
             </h3>
             <div className="flex flex-wrap gap-2 mt-3">
               {prediction.importantSymptoms.map((symptom) => (
                 <span key={symptom} className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 dark:text-green-200 dark:bg-green-900 rounded-full">
                   {symptom}
                 </span>
               ))}
             </div>
          </div>
          
          {/* Section for Precautions */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
             <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide flex items-center">
               <i className="fa-solid fa-shield-virus mr-2"></i>
               Precautions
             </h3>
             <ul className="list-disc list-inside mt-3 space-y-2 text-gray-800 dark:text-gray-200">
               {prediction.precautions.map((precaution, index) => (
                 <li key={index}>{precaution}</li>
               ))}
             </ul>
          </div>

          {/* Section for Suggested Treatment */}
          <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
             <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide flex items-center">
               <i className="fa-solid fa-pills mr-2"></i>
               Suggested Treatment
             </h3>
             <ul className="list-disc list-inside mt-3 space-y-2 text-gray-800 dark:text-gray-200">
               {prediction.treatment.map((treat, index) => (
                 <li key={index}>{treat}</li>
               ))}
             </ul>
             <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Note: These are general suggestions. Always consult a healthcare professional.</p>
          </div>

        </div>

        {/* Right Side: Contains the confidence distribution chart */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide mb-4">
            Confidence Distribution
          </h3>
          <div style={{ width: '100%', height: 300 }}>
            {/* ResponsiveContainer ensures the chart adapts to its parent container's size. */}
            <ResponsiveContainer>
              <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                <XAxis type="number" domain={[0, 1]} tickFormatter={(tick) => `${tick * 100}%`} className="text-xs" />
                <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} interval={0} className="text-xs" />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(200, 200, 200, 0.1)' }} />
                <Bar dataKey="confidence" fill="#3B82F6" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PredictionResult;
