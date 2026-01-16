import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateContent } from '../../logic/aiService';

export default function Learn() {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAsk = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        try {
            const result = await generateContent(`You are an expert biology teacher specializing in genetics. Explain the following concept or answer the question clearly and concisely for a student: ${query}`);
            setResponse(result);
        } catch (err) {
            setError(err.message || "Failed to generate response. Please check your API key in Settings.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 h-full flex flex-col">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-serif font-bold text-stone-800 dark:text-stone-100">
                    Learn Genetics
                </h2>
                <p className="text-stone-600 dark:text-stone-400">
                    Ask questions and explore genetic concepts with our AI tutor.
                </p>
            </div>

            <div className="flex-1 flex flex-col gap-6">
                {/* Chat Area */}
                <div className="glass-panel p-6 rounded-2xl min-h-[400px] flex-1 overflow-y-auto max-h-[60vh]">
                    {response ? (
                        <div className="prose prose-stone dark:prose-invert max-w-none">
                            <ReactMarkdown>{response}</ReactMarkdown>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 text-primary-500 mb-4"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                            <p className="text-lg font-medium text-stone-600 dark:text-stone-300">What would you like to learn today?</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl mt-6 px-4">
                                {[
                                    "How to use a Punnett Square?",
                                    "Explain Dominant vs Recessive",
                                    "What is Genotype vs Phenotype?",
                                    "Law of Segregation",
                                    "Incomplete Dominance examples",
                                    "What is a Dihybrid Cross?"
                                ].map((topic) => (
                                    <button
                                        key={topic}
                                        onClick={() => setQuery(topic)}
                                        className="text-left px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-stone-200 dark:border-stone-700 hover:border-primary-200 dark:hover:border-primary-800 transition-all text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-primary-700 dark:hover:text-primary-400"
                                    >
                                        {topic}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl mt-4 border border-red-100 dark:border-red-900/50">
                            {error}
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <form onSubmit={handleAsk} className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask about genetics..."
                        className="w-full px-6 py-4 pr-16 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        disabled={loading || !query.trim()}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary-600 hover:bg-primary-700 disabled:bg-stone-400 text-white p-2.5 rounded-xl transition-colors shadow-md"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
