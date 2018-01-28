const a = require("./SixPuzzle");

const EMPTY = 'E';

const copy = (a) => (JSON.parse(JSON.stringify(a)));

const BFS = (puz) => {
  const queue = [puz];
  while (queue.length) {
    const cur = queue.shift();

    if (JSON.stringify(cur.goal) === JSON.stringify(cur.state)) {
      console.log(cur.history);
      break;
    }

    const emptyIndex = cur.getEmpty();
    const adjacentIndexes = cur.getAdjacent(emptyIndex);

    adjacentIndexes.forEach(adj => {
      const curCopy = cur.clone();
      curCopy.swap(emptyIndex, adj);
      queue.push(curCopy);
    });
  }
}

const b = new a([1,4,2,5,3,EMPTY], [EMPTY,1,2,5,4,3]);
BFS(b);