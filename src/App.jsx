import React, { useState, useEffect } from 'react';
import DashboardLayout from './components/Layout/DashboardLayout';
import GeneInput from './components/Controls/GeneInput';
import PunnettGrid from './components/Visualization/PunnettGrid';
import StepWalker from './components/Visualization/StepWalker';
import RatioPanel from './components/Stats/RatioPanel';
import Learn from './components/Layout/Learn';
import About from './components/Layout/About';
import { generateGametes, calculatePunnett, analyzePhenotypes } from './logic/genetics';

import Quiz from './components/Layout/Quiz';

function App() {
  const [genes, setGenes] = useState([
    {
      id: 1,
      name: 'Height',
      domSymbol: 'T',
      recSymbol: 't',
      domPheno: 'Tall',
      recPheno: 'Short',
      p1Genotype: 'Tt',
      p2Genotype: 'Tt'
    }
  ]);

  const [results, setResults] = useState(null);
  const [viewMode, setViewMode] = useState('both'); // 'genotype', 'phenotype', 'both'
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleCalculate = () => {
    // 1. Prepare Parents
    // Need to construct array of { genotype: 'Aa' } objects per gene for logic engine
    const p1Genes = genes.map(g => ({ ...g, genotype: g.p1Genotype }));
    const p2Genes = genes.map(g => ({ ...g, genotype: g.p2Genotype }));

    // 2. Generate Gametes
    const p1Gametes = generateGametes(p1Genes);
    const p2Gametes = generateGametes(p2Genes);

    // 3. Make Grid
    const { grid, outcomes } = calculatePunnett(p1Gametes, p2Gametes);

    // 4. Analyze Phenotypes
    // Logic engine needs { domSymbol, trait, etc }
    const geneDefs = genes.map(g => ({
      domSymbol: g.domSymbol,
      recSymbol: g.recSymbol,
      domPheno: g.domPheno,
      recPheno: g.recPheno
    }));

    const phenotypeStats = analyzePhenotypes(outcomes, geneDefs);

    setResults({
      p1Gametes,
      p2Gametes,
      grid,
      phenotypeStats
    });
  };

  // Auto-calculate on mount for demo
  useEffect(() => {
    handleCalculate();
  }, []);

  return (
    <DashboardLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'dashboard' && (
        <React.Fragment>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Controls (Full width on mobile, 4 cols on large) */}
            <div className="lg:col-span-4 space-y-6">
              <GeneInput
                genes={genes}
                onUpdateGenes={setGenes}
                onCalculate={handleCalculate}
              />

              {/* On Large screens, Stats might look good under controls if tall, 
                  but for now let's keep it separate or put below on mobile.
                  Actually, putting stats here on Desktop makes use of vertical space 
                  if the grid is huge. */}

              <div className="hidden lg:block">
                {results && <RatioPanel stats={results.phenotypeStats} />}
              </div>
            </div>

            {/* Middle Column: Visualizer (Main area) */}
            <div className="lg:col-span-8 flex flex-col gap-6">

              {/* Step-by-Step Guide */}
              {results && <StepWalker genes={genes} results={results} />}

              <div className="glass-panel p-4 md:p-6 rounded-2xl min-h-[500px] flex flex-col shadow-sm border border-stone-200 dark:border-stone-800">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h2 className="text-xl font-serif font-bold text-stone-800 dark:text-stone-100">
                    Punnett Square
                  </h2>

                  {/* View Mode Toggle */}
                  <div className="bg-stone-100 dark:bg-stone-900 p-1 rounded-lg flex text-sm font-medium w-full sm:w-auto">
                    <button
                      onClick={() => setViewMode('genotype')}
                      className={`flex-1 sm:flex-none px-3 py-1 rounded-md transition-all ${viewMode === 'genotype' ? 'bg-white dark:bg-stone-800 shadow text-primary-600 dark:text-primary-400' : 'text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'}`}
                    >
                      Genotype
                    </button>
                    <button
                      onClick={() => setViewMode('phenotype')}
                      className={`flex-1 sm:flex-none px-3 py-1 rounded-md transition-all ${viewMode === 'phenotype' ? 'bg-white dark:bg-stone-800 shadow text-primary-600 dark:text-primary-400' : 'text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'}`}
                    >
                      Phenotype
                    </button>
                    <button
                      onClick={() => setViewMode('both')}
                      className={`flex-1 sm:flex-none px-3 py-1 rounded-md transition-all ${viewMode === 'both' ? 'bg-white dark:bg-stone-800 shadow text-primary-600 dark:text-primary-400' : 'text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'}`}
                    >
                      Both
                    </button>
                  </div>
                </div>

                <div className="flex-1 w-full">
                  {results ? (
                    <PunnettGrid
                      gametes1={results.p1Gametes}
                      gametes2={results.p2Gametes}
                      grid={results.grid}
                      geneDefinitions={genes}
                      viewMode={viewMode}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-stone-400 animate-pulse">
                      Preparing genetics engine...
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Only Stats Location */}
              <div className="block lg:hidden">
                {results && <RatioPanel stats={results.phenotypeStats} />}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}

      {currentPage === 'quiz' && (
        <div className="w-full">
          <Quiz />
        </div>
      )}

      {currentPage === 'learn' && (
        <div className="w-full h-full">
          <Learn />
        </div>
      )}

      {currentPage === 'about' && (
        <div className="w-full h-full">
          <About />
        </div>
      )}

    </DashboardLayout>
  );
}

export default App;
