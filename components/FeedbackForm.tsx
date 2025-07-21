import React, { useState } from 'react';
import Spinner from './icons/Spinner';

/**
 * A form for collecting user feedback on the prediction results.
 * It appears after a prediction is successfully displayed.
 */
const FeedbackForm: React.FC = () => {
  // State to manage form inputs.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // State to handle submission status.
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Handles the form submission.
   * @param e - The form event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate an API call to submit feedback.
    console.log('Feedback Submitted:', { name, email, message });
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000); // Simulate a 1-second network delay.
  };

  // If the form has been submitted, display a thank you message.
  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center animate-fade-in">
        <div className="text-5xl text-green-500 mb-4">
          <i className="fa-solid fa-check-circle"></i>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Thank You!</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Your feedback has been received and will help us improve.</p>
      </div>
    );
  }

  // Render the feedback form.
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg animate-slide-up">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">Was this analysis helpful?</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Let us know what you think!</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
          <textarea
            id="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 focus:ring-green-500 disabled:bg-green-300 dark:disabled:bg-green-800 transition-colors"
        >
          {isSubmitting ? <Spinner /> : <><i className="fa-solid fa-paper-plane mr-2"></i>Submit Feedback</>}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
