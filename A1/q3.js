const fn = (x) => ( Math.sin(Math.pow(x,2) / 2) / Math.log2(x + 4) );

const hillClimb = (startPos, stepSize, minBound, maxBound, fn) => {
  let pos = startPos;
  let isMax = false;
  let numSteps = 0;

  while (!isMax) {
    const val = fn(pos);
    const neighbors = [pos + stepSize, pos - stepSize]
      .filter(n => n >= minBound && n <= maxBound);
    const neighborValues = neighbors
      .map(n => fn(n));
    if (val >= Math.max(...neighborValues)) {
      isMax = true;
    } else {
      pos = neighbors.find(n => fn(n) === Math.max(...neighborValues));
      numSteps++;
    }
  }
  console.log(`${startPos},${stepSize},${pos},${fn(pos)}${numSteps}`);
}

const simulatedAnnealing = (startPos, stepSize, minBound, maxBound, fn, startTemp, coolingRate) => {
  let pos = startPos;
  let temp = startTemp;
  let isMax = false;
  let numSteps = 0;

  const getProbability = (curr, next) => {
    const a = Math.pow(Math.E, (next - curr) / temp);
    return a;
  };

  while (temp > 1) {
    const val = fn(pos);
    const neighbors = [pos + stepSize, pos - stepSize]
      .filter(n => n >= minBound && n <= maxBound);
    const neighborValues = neighbors
      .map(n => fn(n));

    const index = (neighbors.length > 1) ? Math.round(Math.random()) : 0;
    const nextMove = {
      pos: neighbors[index],
      val: neighborValues[index],
    }

    if (val < nextMove.val || getProbability(val, nextMove.val) < Math.random()) {
      pos = nextMove.pos;
    }

    numSteps++;

    temp *= (1 - coolingRate);
  }
  console.log(`${startPos},${stepSize},${startTemp},${coolingRate},${pos},${fn(pos)},${numSteps}`);
}

const stepSizes = Array(10).fill().map((v,i) => (i+1)*0.01);
const startingPoints = Array(11).fill().map((v,i) => i);

const MIN_BOUND = 0;
const MAX_BOUND = 10; 

console.log('"Start Position","Step Size","Final Position","Value","Steps to Convergence"');
stepSizes.forEach(size => {
  startingPoints.forEach(pos => {
    hillClimb(pos, size, MIN_BOUND, MAX_BOUND, fn);
  });
});

const stepSizes2 = [0.01, 0.02, 0.1];
const temperatures = [10, 100, 1000, 10000];
const coolingRates = [10, 1, 0.1, 0.01, 0.001, 0.0001, 0.00001];

// console.log('"Start Position","Step Size","Temperature","Cooling Rate","Final Position","Value","Steps to Convergence"');
// startingPoints.forEach(pos => {
//   stepSizes2.forEach(size => {
//     temperatures.forEach(temp => {
//       coolingRates.forEach(rate => {
//         simulatedAnnealing(pos, size, MIN_BOUND, MAX_BOUND, fn, temp, rate);
//       });
//     });
//   });
// });