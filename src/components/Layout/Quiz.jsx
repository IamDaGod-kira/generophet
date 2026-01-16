import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateContent } from '../../logic/aiService';

export default function Quiz() {
    const [quizState, setQuizState] = useState('start'); // start, loading, active, review
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({}); // { 0: 'A', 1: 'B' }
    const [score, setScore] = useState(0);
    const [topic, setTopic] = useState('General Genetics');

    const generateQuiz = async () => {
        setQuizState('loading');
        try {
            const prompt = `Generate a genetics quiz with 5 multiple choice questions about "${topic}". 
            Format the output strictly as a JSON array of objects. 
            Each object must have: 
            "question" (string), 
            "options" (array of 4 strings, e.g. ["A) ...", "B) ..."]), 
            "correctAnswer" (index 0-3), 
            "explanation" (string explaining why).
            Do not include any markdown formatting like \`\`\`json, just the raw JSON.`;

            const result = await generateContent(prompt);
            console.log("Raw AI Result:", result);

            // Robust JSON extraction: Find the first '[' and last ']'
            const start = result.indexOf('[');
            const end = result.lastIndexOf(']');

            if (start === -1 || end === -1) {
                throw new Error("AI response did not contain a valid JSON array.");
            }

            const jsonStr = result.substring(start, end + 1);
            const parsed = JSON.parse(jsonStr);

            setQuestions(parsed);
            setQuizState('active');
            setUserAnswers({});
        } catch (error) {
            console.error("Quiz Generation Error:", error);
            alert(`Failed to generate quiz: ${error.message}`);
            setQuizState('start');
        }
    };

    const handleAnswer = (qIndex, optionIndex) => {
        setUserAnswers(prev => ({
            ...prev,
            [qIndex]: optionIndex
        }));
    };

    const submitQuiz = () => {
        let newScore = 0;
        questions.forEach((q, i) => {
            if (userAnswers[i] === q.correctAnswer) {
                newScore++;
            }
        });
        setScore(newScore);
        setQuizState('review');
    };

    if (quizState === 'start') {
        return (
            <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[50vh] space-y-8 text-center">
                <div>
                    <h2 className="text-4xl font-serif font-bold text-stone-800 dark:text-stone-100 mb-4">Genetics Quiz</h2>
                    <p className="text-stone-600 dark:text-stone-400 text-lg">Test your knowledge with AI-generated questions.</p>
                </div>

                <div className="w-full max-w-md space-y-4">
                    <label className="block text-left font-medium text-stone-700 dark:text-stone-300">Choose a Topic</label>
                    <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full p-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    >
                        <option>General Genetics</option>
                        <option>Mendelian Inheritance</option>
                        <option>Punnett Squares</option>
                        <option>DNA & RNA</option>
                        <option>Meiosis & Mitosis</option>
                    </select>

                    <button
                        onClick={generateQuiz}
                        className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-primary-500/30 transition-all hover:scale-[1.02]"
                    >
                        Start Quiz
                    </button>
                </div>
            </div>
        );
    }

    if (quizState === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
                <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                <p className="text-stone-500 dark:text-stone-400 animate-pulse font-medium">Generating unique questions...</p>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8 pb-10">
            {/* Header */}
            <div className="flex justify-between items-center bg-white dark:bg-stone-900 p-4 rounded-xl shadow-sm border border-stone-100 dark:border-stone-800 sticky top-20 z-10">
                <h3 className="font-bold text-stone-800 dark:text-stone-100">Topic: {topic}</h3>
                {quizState === 'review' && (
                    <div className="px-4 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full font-bold">
                        Score: {score} / {questions.length}
                    </div>
                )}
            </div>

            <div className="space-y-6">
                {questions.map((q, idx) => (
                    <div key={idx} className={`p-6 rounded-2xl border transition-all ${quizState === 'review'
                        ? userAnswers[idx] === q.correctAnswer
                            ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                            : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                        : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800'
                        }`}>
                        <div className="flex gap-4">
                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-stone-100 dark:bg-stone-800 rounded-full font-bold text-stone-500 text-sm">
                                {idx + 1}
                            </span>
                            <div className="space-y-4 flex-1">
                                <p className="font-medium text-lg text-stone-800 dark:text-stone-100">{q.question}</p>

                                <div className="grid gap-3">
                                    {q.options.map((opt, optIdx) => (
                                        <button
                                            key={optIdx}
                                            disabled={quizState === 'review'}
                                            onClick={() => handleAnswer(idx, optIdx)}
                                            className={`text-left p-3 rounded-xl border transition-all ${quizState === 'review'
                                                ? optIdx === q.correctAnswer
                                                    ? 'bg-green-500 text-white border-green-600 shadow-md'
                                                    : userAnswers[idx] === optIdx
                                                        ? 'bg-red-500 text-white border-red-600 shadow-md'
                                                        : 'opacity-50 border-transparent bg-stone-50 dark:bg-stone-800 text-stone-500'
                                                : userAnswers[idx] === optIdx
                                                    ? 'bg-primary-600 text-white border-primary-700 shadow-md ring-2 ring-primary-200 dark:ring-primary-900'
                                                    : 'bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border-transparent text-stone-700 dark:text-stone-300'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>

                                {quizState === 'review' && (
                                    <div className="pt-4 mt-4 border-t border-stone-200 dark:border-stone-700/50 text-sm text-stone-600 dark:text-stone-400">
                                        <span className="font-bold">Explanation:</span> {q.explanation}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {quizState === 'active' && (
                <div className="flex justify-end pt-4">
                    <button
                        onClick={submitQuiz}
                        disabled={Object.keys(userAnswers).length < questions.length}
                        className="px-8 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        Submit Answers
                    </button>
                </div>
            )}

            {quizState === 'review' && (
                <div className="flex justify-center pt-8">
                    <button
                        onClick={() => setQuizState('start')}
                        className="px-8 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/30 transition-all"
                    >
                        Take Another Quiz
                    </button>
                </div>
            )}
        </div>
    );
}
