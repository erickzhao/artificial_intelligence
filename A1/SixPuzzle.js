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
    return j+i*WIDTH;
  }

  // gets indexes of adjacent indexes
  getAdjacent(i) {
    const adjIndexes = [];
    const iPos = this.getCoordinatesFromIndex(i);
    // checks if coordinates are adjacent on the grid
    const isAdjacent = (a, b) => (Math.abs(a[0] - b[0]) === 1 && a[1] === b[1]) || (Math.abs(a[1] - b[1]) === 1 && a[0] === b[0]);

    // gets adjacent coordinates and pushes them as indexes
    for (let j = 0; j < this.WIDTH*this.HEIGHT; j++) {
      const jPos = this.getCoordinatesFromIndex(j);
      if (isAdjacent(iPos, jPos)) {
        adjIndexes.push(j);
      }
    }

    // sort by value to return array in order of smallest puzzle number
    adjIndexes.sort((a,b) => this.state[a] > this.state[b]);

    return adjIndexes;
  }

  // get index of empty tile
  getEmpty() {
    return this.state.indexOf('E');
  }

  // swap two tiles
  swap(a, b) {
    const tmp = this.state[a];
    this.state[a] = this.state[b];
    this.state[b] = tmp;
    this.history.push(this.state);
  }

  // create deep clone of puzzle state
  clone() {
    const clone = new SixPuzzle(this.state.slice(), this.goal.slice());
    clone.history = this.history.slice();

    return clone;
  }

}

module.exports = SixPuzzle;