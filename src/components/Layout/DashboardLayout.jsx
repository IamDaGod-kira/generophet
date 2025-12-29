import React, { useState, useEffect } from 'react';

export default function DashboardLayout({ children, currentPage, onNavigate }) {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100 font-sans transition-colors duration-300">
            {/* Vibrant Header */}
            <header className="sticky top-0 z-50 glass-panel border-b border-stone-200/50 dark:border-stone-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
                        <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg shadow-primary-500/20 text-white">
                            {/* Simple Leaf Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3v18" /><path d="M7 11.5a4.5 4.5 0 1 1 5.67-4.14" /><path d="M7 11.5a4.5 4.5 0 1 0 5.67 4.14" /></svg>
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                            Gene<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600">Prophet</span>
                        </h1>
                    </div>

                    <nav className="flex items-center gap-4 text-sm font-medium text-stone-600 dark:text-stone-400">
                        <button
                            onClick={() => onNavigate('dashboard')}
                            className={`px-3 py-1.5 rounded-lg transition-all ${currentPage === 'dashboard' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'hover:text-primary-600'}`}
                        >
                            Practice
                        </button>
                        <button
                            onClick={() => onNavigate('learn')}
                            className={`px-3 py-1.5 rounded-lg transition-all ${currentPage === 'learn' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'hover:text-primary-600'}`}
                        >
                            Learn
                        </button>
                        <button
                            onClick={() => onNavigate('about')}
                            className={`px-3 py-1.5 rounded-lg transition-all ${currentPage === 'about' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'hover:text-primary-600'}`}
                        >
                            About
                        </button>

                        <div className="w-px h-4 bg-stone-300 dark:bg-stone-700 mx-2"></div>

                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors text-stone-500 dark:text-yellow-400"
                            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {darkMode ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2" /><path d="M12 21v2" /><path d="M4.22 4.22l1.42 1.42" /><path d="M18.36 18.36l1.42 1.42" /><path d="M1 12h2" /><path d="M21 12h2" /><path d="M4.22 19.78l1.42-1.42" /><path d="M18.36 5.64l1.42-1.42" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                            )}
                        </button>
                    </nav>
                </div>
            </header>

            {/* Main Dashboard Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {children}
                </div>
            </main>
        </div>
    );
}
