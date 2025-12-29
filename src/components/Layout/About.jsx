import React from 'react';
import { getApiKey } from '../../logic/aiService';

export default function About() {
    const apiKey = getApiKey();

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-serif font-bold text-stone-800 dark:text-stone-100">
                    About GeneProphet
                </h2>
                <p className="text-stone-600 dark:text-stone-400">
                    Exploring the code of life, powered by AI.
                </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl space-y-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg text-primary-600 dark:text-primary-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" /><path d="M8.5 8.5v.01" /><path d="M16 16v.01" /><path d="M12 12v.01" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100">Built by Antigravity</h3>
                </div>
                <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                    This application was co-created with <strong>Antigravity</strong>, an advanced AI coding agent from Google DeepMind.
                    It demonstrates the power of human-AI collaboration in building modern, interactive web experiences.
                </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl space-y-6">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                        System Status
                    </h3>

                    <div className="flex items-center gap-3 p-4 bg-stone-50 dark:bg-stone-900/50 rounded-xl border border-stone-200 dark:border-stone-700">
                        <div className={`w-3 h-3 rounded-full ${apiKey ? 'bg-emerald-500 shadow-lg shadow-emerald-500/20' : 'bg-amber-500 shadow-lg shadow-amber-500/20'}`}></div>
                        <div>
                            <p className="font-semibold text-stone-800 dark:text-stone-100">
                                {apiKey ? 'AI Service Active' : 'AI Service Pending'}
                            </p>
                            <p className="text-sm text-stone-500 dark:text-stone-400">
                                {apiKey ? 'Ready to generate insights.' : 'Waiting for configuration.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
