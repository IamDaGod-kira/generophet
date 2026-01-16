import React from 'react';

export default function PunnettGrid({ gametes1, gametes2, grid, geneDefinitions, viewMode = 'both' }) {
    if (!grid || grid.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-stone-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
                <p className="text-lg">Configure genes and click Calculate to start.</p>
            </div>
        );
    }

    // Handle large grids - safeguard
    const totalCells = gametes1.length * gametes2.length;
    const isLargeGrid = totalCells > 64; // Dihybrid is 16, Trihybrid is 64. Quad is 256.

    const resolvePhenotype = (genotype) => {
        const traits = [];
        for (let i = 0; i < geneDefinitions.length; i++) {
            const def = geneDefinitions[i];
            // Parse current gene alleles from genotype string
            // Genotype string is flattened e.g "AaBb" -> 0:A, 1:a, 2:B, 3:b
            const p1 = genotype[2 * i];
            const p2 = genotype[2 * i + 1];
            const hasDominant = (p1 === def.domSymbol || p2 === def.domSymbol);
            traits.push(hasDominant ? def.domPheno : def.recPheno);
        }
        return traits.join(', ');
    };

    return (
        <div className="relative w-full overflow-hidden flex flex-col h-full bg-stone-50 dark:bg-stone-900/50 rounded-xl border border-stone-200 dark:border-stone-800">
            {/* Hint for mobile users if grid is wide */}
            <div className="md:hidden text-xs text-center p-2 text-stone-400 bg-stone-100 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700">
                Swipe to view full grid
            </div>

            <div className="flex-1 overflow-auto custom-scrollbar p-1">
                <div className="inline-block min-w-full align-middle">
                    <div
                        className="grid gap-1 md:gap-2 mb-2 p-1"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `auto repeat(${gametes2.length}, minmax(70px, 1fr))`
                        }}
                    >
                        {/* Top Left Corner (Empty) */}
                        <div className="sticky top-0 left-0 bg-stone-100 dark:bg-stone-900/90 z-30 shadow-sm border-r border-b border-stone-200 dark:border-stone-800/10"></div>

                        {/* Top Header (Gametes Parent 2) */}
                        {gametes2.map((g, i) => (
                            <div key={`col-${i}`} className="sticky top-0 z-20 p-2 md:p-3 text-center font-mono font-bold text-sm md:text-base text-primary-600 bg-primary-50 dark:bg-primary-900/20 backdrop-blur-sm rounded-lg border border-primary-100 dark:border-primary-800/30">
                                {g}
                            </div>
                        ))}

                        {/* Rows */}
                        {grid.map((row, r) => (
                            <React.Fragment key={`row-${r}`}>
                                {/* Row Header (Gametes Parent 1) */}
                                <div className="sticky left-0 z-20 p-2 md:p-3 flex items-center justify-center font-mono font-bold text-sm md:text-base text-primary-600 bg-primary-50 dark:bg-primary-900/20 backdrop-blur-sm rounded-lg border border-primary-100 dark:border-primary-800/30">
                                    {gametes1[r]}
                                </div>

                                {/* Grid Cells */}
                                {row.map((genotype, c) => {
                                    const phenotype = resolvePhenotype(genotype);
                                    return (
                                        <div key={`cell-${r}-${c}`} className="relative group p-1 md:p-2 bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 hover:border-primary-300 dark:hover:border-primary-700 rounded-lg md:rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 flex flex-col items-center justify-center min-h-[60px] md:min-h-[80px]">

                                            {(viewMode === 'genotype' || viewMode === 'both') && (
                                                <div className="font-mono text-sm md:text-lg font-semibold text-stone-800 dark:text-stone-200 tracking-wider">
                                                    {genotype}
                                                </div>
                                            )}

                                            {(viewMode === 'phenotype' || viewMode === 'both') && (
                                                <div className="text-[10px] md:text-xs text-center font-medium text-stone-500 dark:text-stone-400 mt-0.5 md:mt-1 leading-tight line-clamp-2">
                                                    {phenotype}
                                                </div>
                                            )}

                                            {/* Tooltip on hover for packed views */}
                                            <div className="hidden md:block absolute opacity-0 group-hover:opacity-100 bottom-full mb-2 bg-stone-900 text-white text-xs p-2 rounded pointer-events-none whitespace-nowrap z-40 transition-opacity drop-shadow-lg left-1/2 -translate-x-1/2">
                                                <span className="font-mono">{genotype}</span>: {phenotype}
                                            </div>
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {isLargeGrid && (
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 text-xs md:text-sm border-t border-yellow-200 dark:border-yellow-800 flex items-center gap-2 justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    Large grids may impact performance.
                </div>
            )}
        </div>
    );
}
