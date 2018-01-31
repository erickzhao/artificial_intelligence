# COMP 424 - Assignment 1

The code to assignment 1 is contained here, and is written in JavaScript. This contains the 4 search algorithms implemented for the Six-Puzzle in question 1, and the hill climbing and simulated annealing  algorithms for question 3.

## How to run

All code should be run using the nodeJS runtime environment. Check if node is installed by running `node -v` on your computer.

### Question 1

Run `node q1.js [flag]`. The flag passed into the command determines which search is run.

* `node q1.js --bfs`: Runs breadth-first search
* `node q1.js --ucs`: Runs uniform cost search
* `node q1.js --dfs`: Runs depth-first search
* `node q1.js --ids`: Runs iterative deepening search

Output is given as a series of arrays logged onto STDOUT like so `[1, 2, 3, 4, 5, 'E']`. Indexes 0 to 2 represent the first row of the Six-Puzzle from left to right, while indexes 3 to 5 represent the second.

### Question 3

Run `node q3.js [flag]`. The flag passed onto the command determines which optimization is run.

* `node q3.js -h`: Runs hill-climbing
* `node q3.js -a`: Runs simulated annealing

Output is given to STDOUT as the columns of a Latex table. The columns are labeled.