import React, { useState } from 'react';

export default function StepWalker({ genes, results }) {
    const [currentStep, setCurrentStep] = useState(0);

    if (!results) return null;

    // Reset step when results change (new calculation)
    React.useEffect(() => {
        setCurrentStep(0);
    }, [results]);

    const steps = [
        {
            title: '1. Identify Parents',
            description: 'Determine the genotypes of both parents for each trait.',
            render: () => (
                <div className="flex gap-8 justify-center items-center py-6">
                    <div className="text-center">
                        <div className="text-sm uppercase tracking-wide text-stone-500 mb-2">Parent 1</div>
                        <div className="text-2xl font-mono font-bold text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-lg border border-primary-200 dark:border-primary-800">
                            {genes.map(g => g.p1Genotype).join('')}
                        </div>
                    </div>
                    <div className="text-stone-400">x</div>
                    <div className="text-center">
                        <div className="text-sm uppercase tracking-wide text-stone-500 mb-2">Parent 2</div>
                        <div className="text-2xl font-mono font-bold text-sky-600 bg-sky-50 dark:bg-sky-900/20 px-4 py-2 rounded-lg border border-sky-200 dark:border-sky-800">
                            {genes.map(g => g.p2Genotype).join('')}
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: '2. Form Gametes',
            description: 'Through meiosis, parents pass one allele for each gene to their gametes. We find all possible combinations.',
            render: () => (
                <div className="grid grid-cols-2 gap-8 py-4">
                    <div>
                        <div className="text-center text-sm font-medium text-stone-500 mb-3">Parent 1 Gametes (Rows)</div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {results.p1Gametes.map((g, i) => (
                                <span key={i} className="font-mono bg-primary-100 dark:bg-primary-900/40 text-primary-700 px-3 py-1 rounded">
                                    {g}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="text-center text-sm font-medium text-stone-500 mb-3">Parent 2 Gametes (Columns)</div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {results.p2Gametes.map((g, i) => (
                                <span key={i} className="font-mono bg-sky-100 dark:bg-sky-900/40 text-sky-700 px-3 py-1 rounded">
                                    {g}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: '3. Fill Square',
            description: 'Combine row and column gametes to predict offspring genotypes.',
            render: () => (
                <div className="text-center py-4">
                    <p className="text-stone-600 dark:text-stone-400 italic">
                        See the main Punnett Square grid below for the full combination table.
                    </p>
                    <div className="mt-4 inline-block text-left bg-stone-50 dark:bg-stone-900 p-4 rounded border border-stone-200 dark:border-stone-800">
                        <div className="font-mono text-sm space-y-1">
                            <div>Ex: {results.p1Gametes[0]} (P1) + {results.p2Gametes[0]} (P2)</div>
                            <div className="font-bold text-primary-600">&rarr; {results.grid[0][0]}</div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: '4. Analyze Ratios',
            description: 'Count phenotypes to determine probabilities.',
            render: () => (
                <div className="py-2">
                    <ul className="space-y-2 max-w-md mx-auto">
                        {results.phenotypeStats.slice(0, 3).map((stat, i) => (
                            <li key={i} className="flex justify-between text-sm border-b border-stone-100 dark:border-stone-800 pb-1">
                                <span>{stat.name}</span>
                                <span className="font-mono font-bold">{stat.ratio}</span>
                            </li>
                        ))}
                        {results.phenotypeStats.length > 3 && <li className="text-center text-xs text-stone-400 pt-1">...and more</li>}
                    </ul>
                </div>
            )
        }
    ];

    return (
        <div className="glass-panel p-6 rounded-2xl mb-6 bg-gradient-to-br from-white to-stone-50 dark:from-stone-900 dark:to-stone-950">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif font-bold text-lg flex items-center gap-2">
                    <span className="bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">?</span>
                    How it works
                </h3>
                <div className="flex gap-1">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 w-6 rounded-full transition-colors ${i === currentStep ? 'bg-primary-500' : 'bg-stone-200 dark:bg-stone-700'}`}
                        ></div>
                    ))}
                </div>
            </div>

            <div className="min-h-[180px]">
                <h4 className="font-bold text-stone-800 dark:text-stone-100 mb-1">{steps[currentStep].title}</h4>
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-4">{steps[currentStep].description}</p>

                <div className="bg-white/50 dark:bg-black/20 rounded-xl p-2 animate-fadeIn">
                    {steps[currentStep].render()}
                </div>
            </div>

            <div className="flex justify-between mt-4 pt-4 border-t border-stone-100 dark:border-stone-800">
                <button
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep(c => c - 1)}
                    className="text-sm font-medium text-stone-500 disabled:opacity-30 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentStep(c => (c + 1) % steps.length)}
                    className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1"
                >
                    {currentStep === steps.length - 1 ? 'Start Over' : 'Next Step'}
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
                </button>
            </div>
        </div>
    );
}
