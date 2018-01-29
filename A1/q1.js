const a = require("./SixPuzzle");

const EMPTY = 'E';

const copy = (a) => (JSON.parse(JSON.stringify(a)));

const BFS = (puz) => {
  const queue = [puz];
  while (queue.length) {
    const cur = queue.shift();

    if (JSON.stringify(cur.goal) === JSON.stringify(cur.state)) {
      return cur.history;
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

// Uniform Cost Search is the same as Breadth-First Search in
// our case because all steps have unit cost.
const UCS = BFS;

const DFS = (puz, maxDepth) => {
  const NO_MAX_DEPTH = -1;
  let res;

  maxDepth = maxDepth || NO_MAX_DEPTH;

  const _DFSHelper = (cur, visited, depth) => {
    visited[cur.state.join('')] = true;

    if (JSON.stringify(cur.state) === JSON.stringify(cur.goal)) {
      res = cur;
    }

    const emptyIndex = cur.getEmpty();
    const adjacentIndexes = cur.getAdjacent(emptyIndex);
    depth++;

    adjacentIndexes.forEach((adj) => {
      const clone = cur.clone();
      clone.swap(emptyIndex, adj);
      if (!visited[clone.state.join('')] && (maxDepth === NO_MAX_DEPTH || depth <= maxDepth)) {
        _DFSHelper(clone, visited, depth);
      } 
    });
  }
    
  _DFSHelper(puz, {}, 0);

  return res && res.history || [];
}

const IDFS = (puz) => {
  let res = [];
  let depth = 1;
  while(!res.length) {
    res = DFS(puz, depth);
    depth++;
  }

  return res;
}

const puzzle = new a([1,4,2,5,3,EMPTY], [EMPTY,1,2,5,4,3]);

switch(process.argv[2]) {
  case "--bfs":
    const result = BFS(puzzle);
    result.forEach(line => {
      console.log(line);
    });
  case "--dfs":
    const result = DFS(puzzle);
    result.forEach(line => {
      console.log(line);
    });
    break;
  case  "--ucs":
    const result = UCS(puzzle);
    result.forEach(line => {
      console.log(line);
    });
  case "--idfs":
    const result = IDFS(puzzle);
    result.forEach(line => {
      console.log(line);
    });
}