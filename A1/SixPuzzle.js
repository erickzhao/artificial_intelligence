class SixPuzzle {

  constructor(initial, goal) {
    this.state = initial;
    this.history = [initial];
    this.goal = goal;
    this.WIDTH = 3;
    this.HEIGHT = 2;
  }

  getCoordinatesFromIndex(i) {
    return ([Math.floor((i) / this.WIDTH), i % this.WIDTH]);
  }

  getIndexFromCoordinates(i,j) {
    return j+i*3;
  }

  getAdjacent(i) {
    const adjIndexes = [];
    const iPos = this.getCoordinatesFromIndex(i);
    const isAdjacent = (a, b) => (Math.abs(a[0] - b[0]) === 1 && a[1] === b[1]) || (Math.abs(a[1] - b[1]) === 1 && a[0] === b[0]);

    for (let j = 0; j < this.WIDTH*this.HEIGHT; j++) {
      const jPos = this.getCoordinatesFromIndex(j);
      if (isAdjacent(iPos, jPos)) {
        adjIndexes.push(j);
      }
    }

    return adjIndexes;
  }

  getEmpty() {
    return this.state.indexOf('E');
  }

  swap(a, b) {
    const tmp = this.state[a];
    this.state[a] = this.state[b];
    this.state[b] = tmp;
    this.history.push(this.state);
  }

  print() {
    console.log(this.state);
  }

  clone() {
    const clone = new SixPuzzle(this.state.slice(), this.goal.slice());
    clone.history = this.history.slice();

    return clone;
  }

}

module.exports = SixPuzzle;