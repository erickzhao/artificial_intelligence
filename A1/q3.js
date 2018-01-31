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
  console.log(`${startPos} & ${stepSize} & ${pos.toFixed(2)} & ${fn(pos)} & ${numSteps} \-\ \hline`);
}

const simulatedAnnealing = (startPos, stepSize, minBound, maxBound, fn, startTemp, coolingRate) => {
  let pos = startPos;
  let temp = startTemp;
  let isMax = false;
  let numSteps = 0;

  const getKeepProbability = (curr, next) => {
    const a = Math.pow(Math.E, -(curr - next) / temp);
    return a;
  };

  while (temp > 0) {
    const val = fn(pos);
    const neighbors = [pos + stepSize, pos - stepSize]
      .filter(n => n >= minBound && n <= maxBound);

    const index = (neighbors.length > 1) ? (Math.round(Math.random())) : 0;
    const nextMove = {
      pos: neighbors[index],
      val: fn(neighbors[index]),
    }

    if (val < nextMove.val) {
      pos = nextMove.pos;
    } else if (getKeepProbability(val, nextMove.val) > Math.random()) {
      pos = nextMove.pos;
    }

    numSteps++;
    temp -= coolingRate;
  }
  console.log(`${startPos} & ${stepSize} & ${startTemp} & ${coolingRate} & ${pos.toFixed(2)} & ${(fn(pos)).toFixed(3)} & ${numSteps} - hline`);
}

const stepSizes = Array(10).fill().map((v,i) => (i+1)*0.01);
const startingPoints = Array(11).fill().map((v,i) => i);

const MIN_BOUND = 0;
const MAX_BOUND = 10; 

const climb = () => {
  console.log('"Start Position","Step Size","Final Position","Value","Steps to Convergence"');
  stepSizes.forEach(size => {
    startingPoints.forEach(pos => {
      hillClimb(pos, size, MIN_BOUND, MAX_BOUND, fn);
    });
  });
}

const stepSizes2 = [0.04, 0.07, 0.1];
const temperatures = [1, 0.7, 0.5, 0.3, 0.1];
const coolingRates = [0.0001, 0.00005, 0.00001];

const anneal = () => { 
  console.log('"Start Position","Step Size","Temperature","Cooling Rate","Final Position","Value","Steps to Convergence"');
  stepSizes2.forEach(size => {
    coolingRates.forEach(rate => {
      temperatures.forEach(temp => {
        startingPoints.forEach(pos => {
          simulatedAnnealing(pos, size, MIN_BOUND, MAX_BOUND, fn, temp, rate);
        });
      });
    });
  });
}

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