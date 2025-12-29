/**
 * Genetics Logic Engine for GeneProphet
 */

/**
 * Generates all possible gametes from a parent genotype.
 * 
 * @param {Array} genes - Array of gene objects [{ symbol: 'A', dominant: true/false }, ...]
 *                        Each 'gene' in the input represents one allele pair for a trait.
 *                        Input structure: [{ id: 1, dom: 'A', rec: 'a', genotype: 'Aa' }, ...]
 * @returns {Array} Array of gamete strings (e.g., ['AB', 'Ab', 'aB', 'ab'])
 */
export function generateGametes(parentGenes) {
    if (!parentGenes || parentGenes.length === 0) return [];

    // Arrays of alleles for each gene
    // e.g., 'Aa' -> ['A', 'a']
    const alleleSets = parentGenes.map(gene => {
        // If exact genotype is provided (e.g., 'Aa'), split it
        // If not, assume heterozygous for simplicity or handle errors
        return gene.genotype.split('');
    });

    // Cartesian product of allele sets
    const combine = (sets) => {
        if (sets.length === 1) return sets[0];
        const head = sets[0];
        const tail = combine(sets.slice(1));
        const result = [];

        for (let h of head) {
            for (let t of tail) {
                result.push(h + t);
            }
        }
        return result;
    };

    return combine(alleleSets);
}

/**
 * Calculates the Punnett Square grid and outcomes.
 * 
 * @param {Array} gametes1 - Gametes from Parent 1
 * @param {Array} gametes2 - Gametes from Parent 2
 * @returns {Object} { grid: [[genotype]], outcomes: { genotype: count } }
 */
export function calculatePunnett(gametes1, gametes2) {
    const grid = [];
    const outcomes = {};
    const totalOffspring = gametes1.length * gametes2.length;

    for (let r = 0; r < gametes1.length; r++) {
        const row = [];
        for (let c = 0; c < gametes2.length; c++) {
            // Combine gametes to form zygote
            const g1 = gametes1[r];
            const g2 = gametes2[c];

            // Sort alleles for consistency (AaBb, not aABb)
            // Logic: Merge gene by gene. 
            // Assumption: Gametes are ordered respective to genes.
            let genotype = '';
            for (let i = 0; i < g1.length; i++) {
                // Pair alleles from same gene index
                const pair = [g1[i], g2[i]].sort().join(''); // 'a' + 'A' -> "Aa"
                genotype += pair;
            }

            row.push(genotype);

            // Count outcomes
            outcomes[genotype] = (outcomes[genotype] || 0) + 1;
        }
        grid.push(row);
    }

    return { grid, outcomes, totalOffspring };
}

/**
 * Analyzes genotypes to produce phenotypic ratios.
 * 
 * @param {Object} outcomes - The outcomes object from calculatePunnett
 * @param {Array} geneDefinitions - Metadata about genes to determine dominance
 *                                  [{ domSymbol: 'A', recSymbol: 'a', trait: 'Height', domPheno: 'Tall', recPheno: 'Short' }]
 * @returns {Array} Array of phenotype stats [{ phenotype: "Tall, Red", count: 9, probability: 0.5625 }]
 */
export function analyzePhenotypes(outcomes, geneDefinitions) {
    const phenotypeCounts = {};
    let total = 0;

    Object.entries(outcomes).forEach(([genotype, count]) => {
        total += count;

        // Determine phenotype for this genotype
        // genotype e.g. "AaBb"
        const traits = [];

        for (let i = 0; i < geneDefinitions.length; i++) {
            const def = geneDefinitions[i];
            // Extract pair for this gene: index is 2*i and 2*i+1
            const p1 = genotype[2 * i];
            const p2 = genotype[2 * i + 1];

            const hasDominant = (p1 === def.domSymbol || p2 === def.domSymbol);

            // Handle incomplete/codominance later. For MVP: Simple Dominance.
            if (hasDominant) {
                traits.push(def.domPheno);
            } else {
                traits.push(def.recPheno);
            }
        }

        const phenotypeStr = traits.join(', ');
        phenotypeCounts[phenotypeStr] = (phenotypeCounts[phenotypeStr] || 0) + count;
    });

    // Convert to array
    return Object.entries(phenotypeCounts).map(([name, count]) => ({
        name,
        count,
        percentage: (count / total) * 100,
        ratio: `${count}/${total}`
    })).sort((a, b) => b.count - a.count); // sort most likely first
}
