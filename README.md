
# 🩺 AI Disease Predictor

[![Status: Active](https://img.shields.io/badge/status-active-success.svg)]()
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)

Visit live web app for preview : [![Website](https://ai-disease-predictor-blue.vercel.app/)]
An intelligent, symptom-based disease analysis tool that leverages the Google Gemini API to provide potential predictions, differential diagnoses, and helpful health information.

---

## 🌟 Overview

AI Disease Predictor is a modern, responsive web application designed to demonstrate the power of large language models in the healthcare space. Users can input their age, gender, and a set of symptoms to receive an AI-generated analysis. The results include a primary predicted condition, confidence score, a plain-language explanation, other possibilities (differential diagnosis), and general advice on precautions and treatments.

This project is built with a professional, real-world application structure in mind, showcasing a clean frontend, robust API communication, and a focus on user experience.

## ✨ Key Features

-   **Interactive Symptom Selection:** A user-friendly interface to input age, gender, and select from a list of common symptoms.
-   **AI-Powered Analysis:** Utilizes the Google Gemini API for sophisticated disease prediction based on user input.
-   **Detailed Results:** Provides comprehensive results including:
    -   A primary predicted disease with a confidence score.
    -   A clear, easy-to-understand explanation of the prediction.
    -   A list of the most influential symptoms.
    -   General precautions and non-prescription treatment suggestions.
-   **Confidence Distribution Chart:** Visualizes the primary prediction alongside other potential diagnoses (differential diagnosis) in a clean bar chart.
-   **Feedback Mechanism:** A built-in form to collect user feedback for continuous improvement.
-   **Responsive & Modern UI:** Built with Tailwind CSS for a sleek, responsive design that works on all devices and includes light/dark modes.
-   **Engaging Micro-interactions:** Subtle animations and hover effects enhance the user experience.

## 💻 Technology Stack

| Technology        | Description                                      |
| ----------------- | ------------------------------------------------ |
| **React**         | A JavaScript library for building user interfaces. |
| **TypeScript**    | Adds static typing to JavaScript for robustness. |
| **@google/genai** | The official Google Gemini API client for browsers.    |
| **Tailwind CSS**  | A utility-first CSS framework for rapid UI development. |
| **Recharts**      | A composable charting library for React.         |
| **Font Awesome**  | Provides high-quality icons for the UI.          |

## 📸 Screenshots

| Symptom Input Form                                       | Analysis Result                                              |
| -------------------------------------------------------- | ------------------------------------------------------------ |
|  |  |

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have a modern web browser and a way to serve the `index.html` file. You will also need a Google Gemini API Key.

### API Key Setup

This application requires a Google Gemini API key to function.

  **Set Environment Variable:** The application is hardcoded to read the key from `process.env.API_KEY`. You must make this environment variable available to your application when you run it.

    For example, if deploying on a platform like **Vercel** or **Netlify**, you would set the `API_KEY` in the project's environment variable settings in their web UI.

    For local development using a simple server, this can be tricky as `index.html` cannot directly access shell variables. You would typically use a build tool like Vite or Create React App, which can inject environment variables.

### Installation & Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ai-disease-predictor.git
    cd ai-disease-predictor
    ```

2.  **Serve the project:**
    Since this project uses bare module imports (`type="importmap"`), you can run it with any simple local web server. One of the easiest is `http-server`:
    ```bash
    # Install the server if you don't have it
    npm install -g http-server

    # Run the server from the project root
    http-server .
    ```
    > **Note:** For the API key to work locally without a build tool, you would need to temporarily replace `process.env.API_KEY` in `services/geminiService.ts` with your actual key. **This is NOT recommended for production or if you are sharing your code.**

    ```javascript
    // In services/geminiService.ts (for local testing ONLY)
    // const API_KEY = process.env.API_KEY; // Replace this line
    const API_KEY = "YOUR_GEMINI_API_KEY_HERE"; // With this line
    ```
    **Remember to revert this change before committing your code!**

3.  Open your browser and navigate to the local server address (e.g., `http://localhost:8080`).

## 📁 Project Structure

The project follows a standard React application structure:

```
/
├── components/           # Reusable React components
│   ├── icons/
│   ├── FeedbackForm.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── PredictionResult.tsx
│   └── SymptomForm.tsx
├── services/             # API communication logic
│   └── geminiService.ts
├── App.tsx               # Main application component
├── constants.tsx         # Application-wide constants (e.g., symptom list)
├── index.html            # The main HTML entry point
├── index.tsx             # React application root
├── metadata.json         # Application metadata
├── types.ts              # TypeScript type definitions
└── README.md             # This file
```

## ⚠️ Disclaimer

This tool is for informational and educational purposes only. **It is not a substitute for professional medical advice, diagnosis, or treatment.** Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
