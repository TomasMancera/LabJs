// Tamaño del tablero
const N = 10;

// Función para generar una solución aleatoria
function generateSolution() {
  const solution = new Array(N);
  for (let i = 0; i < N; i++) {
    solution[i] = Math.floor(Math.random() * N);
    
  }
  
  return solution;
}

// Función para calcular la aptitud de una solución
function fitness(solution) {
  let conflicts = 0;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      // Verificar si las reinas se atacan entre sí
      if (solution[i] === solution[j] || Math.abs(i - j) === Math.abs(solution[i] - solution[j])) {
        conflicts++;
      }
     
    }
  }
  return conflicts;
}

// Función para seleccionar un individuo de la población
function tournamentSelection(population) {
  const tournamentSize = 5;
  let bestSolution = null;
  let bestFitness = Infinity;
  for (let i = 0; i < tournamentSize; i++) {
    const solution = population[Math.floor(Math.random() * population.length)];
    const solutionFitness = fitness(solution);
    if (solutionFitness < bestFitness) {
      bestSolution = solution;
      bestFitness = solutionFitness;
    }
  }
  return bestSolution;
}

// Función para cruzar dos soluciones
function crossover(solution1, solution2) {
  const child = new Array(N);
  const crossoverPoint = Math.floor(Math.random() * (N - 1)) + 1;
  for (let i = 0; i < N; i++) {
    child[i] = i < crossoverPoint ? solution1[i] : solution2[i];
  }
  return child;
}

// Función para mutar una solución
function mutate(solution) {
  const mutationPoint = Math.floor(Math.random() * N);
  const mutationValue = Math.floor(Math.random() * N);
  solution[mutationPoint] = mutationValue;
  return solution;
}

// Algoritmo genético
function geneticAlgorithm() {
    // Generar población inicial
    let population = new Array(100);
    for (let i = 0; i < 100; i++) {
      population[i] = generateSolution();
    }
  
    // Bucle de evolución
    let generation = 0;
    while (true) {
      // Seleccionar padres
      const parent1 = tournamentSelection(population);
      const parent2 = tournamentSelection(population);
  
      // Cruzar padres para generar hijo
      let child = crossover(parent1, parent2);
  
      // Mutar hijo
      child = mutate(child);
  
      // Evaluar hijo
      const childFitness = fitness(child);
  
      // Reemplazar peor solución de la población con el hijo
      let worstSolution = null;
      let worstFitness = -Infinity;
      for (let i = 0; i < population.length; i++) {
        const solutionFitness = fitness(population[i]);
        if (solutionFitness > worstFitness) {
          worstSolution = population[i];
          worstFitness = solutionFitness;
        }
      }
      if (childFitness < worstFitness) {
        worstSolution = child;
      }
  
      // Verificar si se ha encontrado solución
      if (childFitness === 0) {
        console.log(`Solución encontrada en la generación ${generation}: ${child}`);
        return child;
      }
  
      // Reemplazar peor solución de la población con el hijo
      population[population.indexOf(worstSolution)] = child;
  
      // Incrementar número de generación
      generation++;
    }
  }
  
  // Ejecutar algoritmo genético
  geneticAlgorithm();
  