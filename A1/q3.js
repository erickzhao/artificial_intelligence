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

  console.log(`Start: ${startPos}  `, `Step Size: ${stepSize}`);
  console.log(`  Max: ${pos.toFixed(2)}`, `Value: ${fn(pos).toFixed(3)}`, `Steps: ${numSteps}`);
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

  console.log(pos, numSteps);
}

const stepSizes = Array(10).fill().map((v,i) => (i+1)*0.01);
const startingPoints = Array(11).fill().map((v,i) => i);

const MIN_BOUND = 0;
const MAX_BOUND = 10; 

stepSizes.forEach(size => {
  startingPoints.forEach(pos => {
    hillClimb(pos, size, MIN_BOUND, MAX_BOUND, fn);
  });
});

const stepSizes2 = Array(5).fill().map((v,i) => (i+1)*0.01);
const temperatures = Array(1).fill().map((v,i) => 1000);
const coolingRates = Array(1).fill().map((v,i) => 0.1);

simulatedAnnealing(0, 0.01, MIN_BOUND, MAX_BOUND, fn, 100, 0.001);