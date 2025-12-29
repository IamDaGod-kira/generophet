import React, { useState, useEffect } from 'react';
import DashboardLayout from './components/Layout/DashboardLayout';
import GeneInput from './components/Controls/GeneInput';
import PunnettGrid from './components/Visualization/PunnettGrid';
import StepWalker from './components/Visualization/StepWalker';
import RatioPanel from './components/Stats/RatioPanel';
import Learn from './components/Layout/Learn';
import About from './components/Layout/About';
import { generateGametes, calculatePunnett, analyzePhenotypes } from './logic/genetics';

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
          {/* Left Column: Controls (1/3 width on large screens) */}
          <div className="lg:col-span-4">
            <GeneInput
              genes={genes}
              onUpdateGenes={setGenes}
              onCalculate={handleCalculate}
            />
          </div>

          {/* Middle Column: Visualizer (Main area) */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Step-by-Step Guide */}
            {results && <StepWalker genes={genes} results={results} />}

            <div className="glass-panel p-6 rounded-2xl min-h-[500px] flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif font-bold text-stone-800 dark:text-stone-100">
                  Punnett Square ({genes.length}-Gene Cross)
                </h2>

                {/* View Mode Toggle */}
                <div className="bg-stone-100 dark:bg-stone-900 p-1 rounded-lg flex text-sm font-medium">
                  <button
                    onClick={() => setViewMode('genotype')}
                    className={`px-3 py-1 rounded-md transition-all ${viewMode === 'genotype' ? 'bg-white dark:bg-stone-800 shadow text-primary-600 dark:text-primary-400' : 'text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'}`}
                  >
                    Genotype
                  </button>
                  <button
                    onClick={() => setViewMode('phenotype')}
                    className={`px-3 py-1 rounded-md transition-all ${viewMode === 'phenotype' ? 'bg-white dark:bg-stone-800 shadow text-primary-600 dark:text-primary-400' : 'text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'}`}
                  >
                    Phenotype
                  </button>
                  <button
                    onClick={() => setViewMode('both')}
                    className={`px-3 py-1 rounded-md transition-all ${viewMode === 'both' ? 'bg-white dark:bg-stone-800 shadow text-primary-600 dark:text-primary-400' : 'text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'}`}
                  >
                    Both
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-hidden">
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

            {/* Stats Panel (Below grid on mobile, maybe sidebar on super wide? sticking to bottom for now) */}
            {results && <RatioPanel stats={results.phenotypeStats} />}
          </div>
        </React.Fragment>
      )}

      {currentPage === 'learn' && (
        <div className="col-span-12 h-full">
          <Learn />
        </div>
      )}

      {currentPage === 'about' && (
        <div className="col-span-12 h-full">
          <About />
        </div>
      )}

    </DashboardLayout>
  );
}

export default App;
