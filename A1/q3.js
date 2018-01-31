// function to analyze
const fn = (x) => ( Math.sin(Math.pow(x,2) / 2) / Math.log2(x + 4) );

// hill climbing helper function
const hillClimb = (startPos, stepSize, minBound, maxBound, fn) => {
  let pos = startPos;
  let isMax = false;
  let numSteps = 0;

  while (!isMax) {
    const val = fn(pos);
    const neighbors = [pos + stepSize, pos - stepSize] // filter neighbors to keep them in bounds
      .filter(n => n >= minBound && n <= maxBound);
    const neighborValues = neighbors
      .map(n => fn(n));
    if (val >= Math.max(...neighborValues)) { // if curr value is higher than both neighbors, exit
      isMax = true;
    } else {
      pos = neighbors.find(n => fn(n) === Math.max(...neighborValues));
      numSteps++;
    }
  }
  console.log(`${startPos} & ${stepSize} & ${pos.toFixed(2)} & ${fn(pos)} & ${numSteps} \-\ \hline`);
}

// annealing helper
const simulatedAnnealing = (startPos, stepSize, minBound, maxBound, fn, startTemp, coolingRate) => {
  let pos = startPos;
  let temp = startTemp;
  let isMax = false;
  let numSteps = 0;

  // returns the probability of keeping bad solution according
  // to boltzmann distribution
  const getKeepProbability = (curr, next) => (Math.pow(Math.E, -(curr - next) / temp));

  // loop until stop condition of 0 temperature
  while (temp > 0) {
    const val = fn(pos);
    const neighbors = [pos + stepSize, pos - stepSize] // filter to keep neighbours in bounds
      .filter(n => n >= minBound && n <= maxBound);

    // select random neighbor (index 0 or 1)
    const index = (neighbors.length > 1) ? (Math.round(Math.random())) : 0;
    // set that neighbor as potential next move
    const nextMove = {
      pos: neighbors[index],
      val: fn(neighbors[index]),
    }

    // if our value is good, or we decide to keep our value regardless, set as next position
    if (val < nextMove.val || getKeepProbability(val, nextMove.val) > Math.random()) {
      pos = nextMove.pos;
    }

    numSteps++;
    temp -= coolingRate; // decrement by linear cooling rate at every iteration
  }
  console.log(`${startPos} & ${stepSize} & ${startTemp} & ${coolingRate} & ${pos.toFixed(2)} & ${(fn(pos)).toFixed(3)} & ${numSteps} - hline`);
}

// shared parameters between the two algorithms
const MIN_BOUND = 0;
const MAX_BOUND = 10;
const startingPoints = Array(11).fill().map((v,i) => i); // starting points 0 1 .. 10

// execute hill climbs
const climb = () => {
  // set step sizes
  const stepSizes = Array(10).fill().map((v,i) => (i+1)*0.01); // step sizes 0.01 0.02 .. 0.1
  console.log('"Start Position","Step Size","Final Position","Value","Steps to Convergence"');
  stepSizes.forEach(size => {
    startingPoints.forEach(pos => {
      hillClimb(pos, size, MIN_BOUND, MAX_BOUND, fn);
    });
  });
}

// execute annealing
const anneal = () => { 
  // set parameters
  const stepSizes = [0.04, 0.07, 0.1];
  const temperatures = [1, 0.7, 0.5, 0.3, 0.1];
  const coolingRates = [0.0001, 0.00005, 0.00001];
  console.log('"Start Position","Step Size","Temperature","Cooling Rate","Final Position","Value","Steps to Convergence"');
  stepSizes.forEach(size => {
    coolingRates.forEach(rate => {
      temperatures.forEach(temp => {
        startingPoints.forEach(pos => {
          simulatedAnnealing(pos, size, MIN_BOUND, MAX_BOUND, fn, temp, rate);
        });
      });
    });
  });
}

// handle CLI logic
switch(process.argv[2]) {
  case "--h":
    climb();
    break;
  case "--a":
    anneal();
    break;
  default:
    anneal();
    break;
}