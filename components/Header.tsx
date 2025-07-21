
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-4">
          <div className="text-blue-600 dark:text-blue-400">
            <i className="fa-solid fa-stethoscope fa-2x"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              AI Disease Predictor
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Symptom-based analysis using Gemini
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
