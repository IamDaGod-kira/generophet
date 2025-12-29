import React, { useState } from 'react';

// Default gene template
const createNewGene = (usageId) => ({
    id: usageId,
    name: `Gene ${usageId}`,
    domSymbol: 'A',
    recSymbol: 'a',
    domPheno: 'Dominant',
    recPheno: 'Recessive',
    p1Genotype: 'Aa', // Default heterozygous
    p2Genotype: 'Aa'
});

export default function GeneInput({ genes, onUpdateGenes, onCalculate }) {

    const addGene = () => {
        onUpdateGenes([...genes, createNewGene(genes.length + 1)]);
    };

    const removeGene = (id) => {
        onUpdateGenes(genes.filter(g => g.id !== id));
    };

    const updateGene = (id, field, value) => {
        onUpdateGenes(genes.map(g => g.id === id ? { ...g, [field]: value } : g));
    };

    return (
        <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-serif font-semibold text-stone-800 dark:text-stone-200">Genetic Setup</h2>
                    <span className="text-xs font-mono bg-stone-200 dark:bg-stone-800 px-2 py-1 rounded text-stone-500">
                        {genes.length} Genes
                    </span>
                </div>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {genes.map((gene, idx) => (
                        <div key={gene.id} className="p-4 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm transition-all hover:shadow-md">

                            {/* Header & Remove */}
                            <div className="flex justify-between items-center mb-3">
                                <input
                                    type="text"
                                    value={gene.name}
                                    onChange={(e) => updateGene(gene.id, 'name', e.target.value)}
                                    className="font-medium text-stone-700 dark:text-stone-300 bg-transparent border-b border-transparent focus:border-primary-400 focus:outline-none w-full mr-2"
                                    placeholder="Trait Name"
                                />
                                <button
                                    onClick={() => removeGene(gene.id)}
                                    className="text-stone-400 hover:text-red-500 transition-colors p-1"
                                    disabled={genes.length <= 1}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18" /><path d="M6 6l12 12" /></svg>
                                </button>
                            </div>

                            {/* Symbols & Genotypes */}
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-1 block">Symbols</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            maxLength={1}
                                            value={gene.domSymbol}
                                            onChange={(e) => updateGene(gene.id, 'domSymbol', e.target.value)}
                                            className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded px-2 py-1 text-center font-mono text-primary-700 dark:text-primary-400"
                                            placeholder="Dom"
                                        />
                                        <input
                                            type="text"
                                            maxLength={1}
                                            value={gene.recSymbol}
                                            onChange={(e) => updateGene(gene.id, 'recSymbol', e.target.value)}
                                            className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded px-2 py-1 text-center font-mono text-stone-600 dark:text-stone-400"
                                            placeholder="Rec"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs uppercase tracking-wider text-stone-500 font-bold mb-1 block">Parents</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={gene.p1Genotype}
                                            onChange={(e) => updateGene(gene.id, 'p1Genotype', e.target.value)}
                                            className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded px-2 py-1 text-center font-mono"
                                            placeholder="P1"
                                        />
                                        <input
                                            type="text"
                                            value={gene.p2Genotype}
                                            onChange={(e) => updateGene(gene.id, 'p2Genotype', e.target.value)}
                                            className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded px-2 py-1 text-center font-mono"
                                            placeholder="P2"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Phenotype Names (Optional Collapsible) */}
                            <div className="bg-stone-50 dark:bg-stone-800/50 p-2 rounded text-xs space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-primary-700 dark:text-primary-400 font-medium">Dom:</span>
                                    <input
                                        value={gene.domPheno}
                                        onChange={(e) => updateGene(gene.id, 'domPheno', e.target.value)}
                                        className="bg-transparent text-right w-24 focus:outline-none border-b border-stone-300 dark:border-stone-600 focus:border-primary-400"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-stone-600 dark:text-stone-400">Rec:</span>
                                    <input
                                        value={gene.recPheno}
                                        onChange={(e) => updateGene(gene.id, 'recPheno', e.target.value)}
                                        className="bg-transparent text-right w-24 focus:outline-none border-b border-stone-300 dark:border-stone-600 focus:border-stone-400"
                                    />
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

                <button
                    onClick={addGene}
                    className="w-full py-3 mt-4 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-xl text-stone-500 hover:text-primary-600 hover:border-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-all flex items-center justify-center gap-2 font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Add Another Gene
                </button>

                <button
                    onClick={onCalculate}
                    className="w-full py-3 mt-6 bg-primary-600 hover:bg-primary-700 text-white rounded-xl shadow-lg shadow-primary-600/30 font-bold tracking-wide transform active:scale-95 transition-all"
                >
                    Calculate Outcomes
                </button>
            </div>
        </div>
    );
}
