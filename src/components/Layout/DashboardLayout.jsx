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
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100 font-sans transition-colors duration-300 flex flex-col">

            {/* Desktop Header - Hiden on mobile */}
            <header className="hidden md:block sticky top-0 z-50 glass-panel border-b border-stone-200/50 dark:border-stone-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
                        <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg shadow-primary-500/20 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3v18" /><path d="M7 11.5a4.5 4.5 0 1 1 5.67-4.14" /><path d="M7 11.5a4.5 4.5 0 1 0 5.67 4.14" /></svg>
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                            Gene<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600">Prophet</span>
                        </h1>
                    </div>

                    <nav className="flex items-center gap-4 text-sm font-medium text-stone-600 dark:text-stone-400">
                        <NavButton active={currentPage === 'dashboard'} onClick={() => onNavigate('dashboard')} icon="grid">Practice</NavButton>
                        <NavButton active={currentPage === 'quiz'} onClick={() => onNavigate('quiz')} icon="brain">Quiz</NavButton>
                        <NavButton active={currentPage === 'learn'} onClick={() => onNavigate('learn')} icon="book">Learn</NavButton>
                        <NavButton active={currentPage === 'about'} onClick={() => onNavigate('about')} icon="info">About</NavButton>

                        <div className="w-px h-4 bg-stone-300 dark:bg-stone-700 mx-2"></div>

                        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
                    </nav>
                </div>
            </header>

            {/* Mobile Header - Logo & Theme Toggle only */}
            <header className="md:hidden sticky top-0 z-50 glass-panel border-b border-stone-200/50 dark:border-stone-800/50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2" onClick={() => onNavigate('dashboard')}>
                    <div className="p-1.5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3v18" /><path d="M7 11.5a4.5 4.5 0 1 1 5.67-4.14" /><path d="M7 11.5a4.5 4.5 0 1 0 5.67 4.14" /></svg>
                    </div>
                    <span className="text-lg font-serif font-bold tracking-tight">GeneProphet</span>
                </div>
                <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-8 w-full">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl border-t border-stone-200 dark:border-stone-800 pb-safe-area">
                <div className="flex justify-around items-center h-16 px-2">
                    <MobileNavItem active={currentPage === 'dashboard'} onClick={() => onNavigate('dashboard')} label="Practice" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>} />
                    <MobileNavItem active={currentPage === 'quiz'} onClick={() => onNavigate('quiz')} label="Quiz" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3M3.343 6.343l.707.707m12.728 12.728l-.707-.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>} />
                    <MobileNavItem active={currentPage === 'learn'} onClick={() => onNavigate('learn')} label="Learn" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>} />
                    <MobileNavItem active={currentPage === 'about'} onClick={() => onNavigate('about')} label="About" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>} />
                </div>
            </nav>
        </div>
    );
}

// Subcomponents for cleaner code
function NavButton({ children, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1.5 rounded-lg transition-all ${active ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 font-semibold' : 'hover:text-primary-600 text-stone-500'}`}
        >
            {children}
        </button>
    );
}

function MobileNavItem({ active, onClick, label, icon }) {
    return (
        <button onClick={onClick} className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${active ? 'text-primary-600 dark:text-primary-400' : 'text-stone-400 dark:text-stone-500'}`}>
            <div className={`transition-transform duration-200 ${active ? 'scale-110' : ''}`}>
                {icon}
            </div>
            <span className="text-[10px] font-medium">{label}</span>
        </button>
    );
}

function ThemeToggle({ darkMode, setDarkMode }) {
    return (
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
    );
}
