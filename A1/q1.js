const a = require("./SixPuzzle");

const EMPTY = 'E';

// run BFS on initial puzzle
const BFS = (puz) => {
  const queue = [puz];
  while (queue.length) {
    const cur = queue.shift();

    if (JSON.stringify(cur.goal) === JSON.stringify(cur.state)) {
      return cur.history;
    }

    // get tiles adjacent to empty tile
    const emptyIndex = cur.getEmpty();
    const adjacentIndexes = cur.getAdjacent(emptyIndex);

    adjacentIndexes.forEach(adj => {
      const curCopy = cur.clone();
      // for each tile, swap with empty
      curCopy.swap(emptyIndex, adj);
      // push new state to queue
      queue.push(curCopy);
    });
  }
}

// Uniform Cost Search is the same as Breadth-First Search in
// our case because all steps have unit cost.
const UCS = BFS;

// run DFS on initial puzzle

// max depth parameter to allow IDS.
const DFS = (puz, maxDepth) => {
  const NO_MAX_DEPTH = -1;
  let res;

  // If maxDepth parameter isn't passed, set maxDepth to NO_MAX_DEPTH
  maxDepth = maxDepth || NO_MAX_DEPTH;

  // recursion helper
  const _DFSHelper = (cur, visited, depth) => {
    // track visited states with a hash table
    // key is stringified state array
    visited[cur.state.join('')] = true;

    // if found, set result
    if (JSON.stringify(cur.state) === JSON.stringify(cur.goal)) {
      res = cur;
    } else { // otherwise, go deeper if possible
      // get tiles adjacent to empty
      const emptyIndex = cur.getEmpty();
      const adjacentIndexes = cur.getAdjacent(emptyIndex);

      depth++;

      // for each adjacent, swap and recurse with swapped child
      adjacentIndexes.forEach((adj) => {
        const clone = cur.clone();
        clone.swap(emptyIndex, adj);
        if (!visited[clone.state.join('')] && (maxDepth === NO_MAX_DEPTH || depth <= maxDepth)) {
          _DFSHelper(clone, visited, depth);
        } 
      });
    }
  }
    
  // call helper with initial puzzle and empty history
  _DFSHelper(puz, {}, 0);

  // if result found, return its history
  // otherwise, return empty array
  return res && res.history || [];
}

// run IDS with DFS function
const IDS = (puz) => {
  let res = [];
  let depth = 1;

  // until we've found a solution, run DFS with increasing depths
  while(!res.length) {
    res = DFS(puz, depth);
    depth++;
  }

  return res;
}

// initialize problem
const puzzle = new a([1,4,2,5,3,EMPTY], [EMPTY,1,2,5,4,3]);
let result;

// handle CLI logic
switch(process.argv[2]) {
  case "--bfs":
    result = BFS(puzzle);
    break;
  case "--dfs":
    result = DFS(puzzle);
    break;
  case  "--ucs":
    result = UCS(puzzle);
    break;
  case "--ids":
    result = IDS(puzzle);
    break;
}

// log results to STDOUT
result.forEach(step => {
  console.log(step);
})