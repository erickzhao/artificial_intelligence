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
  console.log(`  Max: ${pos}`     , `Max value: ${fn(pos)}`, `Steps: ${numSteps}`);

}
const stepSizes = Array(10).fill().map((v,i) => (i+1)*0.01);
const startingPoints = Array(11).fill().map((v,i) => i);

const MIN_BOUND = 0;
const MAX_BOUND = 10; 

const fn = (x) => ( Math.sin(Math.pow(x,2) / 2) / Math.log2(x + 4) );

stepSizes.forEach(size => {
  startingPoints.forEach(pos => {
    hillClimb(pos, size, MIN_BOUND, MAX_BOUND, fn);
  });
});