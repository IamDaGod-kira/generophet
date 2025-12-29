import React from 'react';

export default function RatioPanel({ stats }) {
    if (!stats || stats.length === 0) return null;

    return (
        <div className="glass-panel w-full p-6 rounded-2xl">
            <h3 className="text-xl font-serif font-bold text-stone-800 dark:text-stone-100 mb-6">Phenotypic Ratios</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="relative">
                        <div className="flex justify-between items-end mb-2">
                            <span className="font-medium text-stone-700 dark:text-stone-300 text-sm">
                                {stat.name}
                            </span>
                            <div className="text-right">
                                <span className="block text-2xl font-bold text-primary-600 font-mono">
                                    {stat.percentage.toFixed(1)}%
                                </span>
                                <span className="text-xs text-stone-500 font-mono">
                                    {stat.ratio} ({stat.count} offspring)
                                </span>
                            </div>
                        </div>

                        {/* Visual Bar */}
                        <div className="w-full bg-stone-200 dark:bg-stone-800 rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-primary-500 h-full rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${stat.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-2 text-sm text-stone-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                    <p>Probabilities assume independent assortment (unlinked genes).</p>
                </div>
            </div>
        </div>
    );
}
