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
        <div className="overflow-x-auto pb-4 custom-scrollbar">
            <div className="inline-block min-w-full align-middle">
                <div
                    className="grid gap-2 mb-2"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `auto repeat(${gametes2.length}, minmax(80px, 1fr))`
                    }}
                >
                    {/* Top Left Corner (Empty) */}
                    <div className="sticky left-0 bg-stone-100 dark:bg-stone-950/90 z-20"></div>

                    {/* Top Header (Gametes Parent 2) */}
                    {gametes2.map((g, i) => (
                        <div key={`col-${i}`} className="p-3 text-center font-mono font-bold text-primary-600 bg-primary-50/50 dark:bg-primary-900/20 rounded-lg">
                            {g}
                        </div>
                    ))}

                    {/* Rows */}
                    {grid.map((row, r) => (
                        <React.Fragment key={`row-${r}`}>
                            {/* Row Header (Gametes Parent 1) */}
                            <div className="sticky left-0 z-10 p-3 flex items-center justify-center font-mono font-bold text-primary-600 bg-primary-50/50 dark:bg-primary-900/20 rounded-lg">
                                {gametes1[r]}
                            </div>

                            {/* Grid Cells */}
                            {row.map((genotype, c) => {
                                const phenotype = resolvePhenotype(genotype);
                                return (
                                    <div key={`cell-${r}-${c}`} className="relative group p-2 bg-white dark:bg-stone-800 border-2 border-transparent hover:border-primary-300 dark:hover:border-primary-700 rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-1 flex flex-col items-center justify-center min-h-[80px]">

                                        {(viewMode === 'genotype' || viewMode === 'both') && (
                                            <div className="font-mono text-lg font-semibold text-stone-800 dark:text-stone-200 tracking-wider">
                                                {/* Highlight dominant alleles maybe? */}
                                                {genotype}
                                            </div>
                                        )}

                                        {(viewMode === 'phenotype' || viewMode === 'both') && (
                                            <div className="text-xs text-center font-medium text-stone-500 dark:text-stone-400 mt-1 leading-tight">
                                                {phenotype}
                                            </div>
                                        )}

                                        {/* Tooltip on hover for packed views */}
                                        <div className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-2 bg-stone-900 text-white text-xs p-2 rounded pointer-events-none whitespace-nowrap z-30 transition-opacity drop-shadow-lg">
                                            <span className="font-mono">{genotype}</span>: {phenotype}
                                        </div>
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {isLargeGrid && (
                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg text-sm border border-yellow-200 dark:border-yellow-800 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    Large grids may impact performance. Consider using the "Probabilities" view for 3+ genes.
                </div>
            )}
        </div>
    );
}
