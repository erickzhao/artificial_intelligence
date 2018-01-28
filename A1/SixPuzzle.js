class SixPuzzle {


  constructor() {
    this.state = [1,4,2,5,3,'E'];
    this.WIDTH = 3;
  }

  getCoordinatesFromIndex(i) {
    return ([Math.floor((i) / this.WIDTH), i % this.WIDTH]);
  }

  getIndexFromCoordinates(i,j) {
    return j+i*3;
  }

  print() {
    console.log(this.state);
  }

}

module.exports = SixPuzzle;