
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md" role="alert">
          <p className="font-bold">Disclaimer</p>
          <p>This tool is for informational and educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
