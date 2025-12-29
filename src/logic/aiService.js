import { GoogleGenerativeAI } from "@google/generative-ai";

export const getApiKey = () => {
    return import.meta.env.VITE_GOOGLE_AI_KEY || '';
};

export const generateContent = async (prompt) => {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error("API Key is missing. Please set it in the Settings tab.");
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-09-2025" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error("Error generating content:", error);
        throw error;
    }
};
