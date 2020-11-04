/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
const resetButton = document.querySelector(".resetButton");
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i=0; i<HEIGHT; i++) {
    board.push(new Array(WIDTH));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById("board")

  // TODO: This code creates a top row with the size of WIDTH of the board with an click event listener and appends to htmlBoard
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: This code creates a row with size of WIDTH for the Size of WIDTH and appends to htmlBoard
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {
    let check = (document.getElementById(`${y}-${x}`));
    if (!check.hasChildNodes()){
      return y;
    }
  }; return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let check = (document.getElementById(`${y}-${x}`));
  let check1 = document.createElement('div');
  check1.classList.add("piece", `p${currPlayer}`);
  check.append(check1);
  board[y][x] = currPlayer;
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  let top = document.querySelector("#column-top");
  setTimeout(() => alert(msg), 100);
  top.removeEventListener("click", handleClick());
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(i => i.every(j => !j))) {
    return endGame("Draw!");
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = (currPlayer === 1) ? 2: 1;
  document.querySelector("h3").innerHTML = `Player ${currPlayer}'s Turn`;
}




/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO:  
  //for loop runs through nested arrays, second runs within each array.
  //horiz creates array of current y, x and 3 items to right
  //ver creates array of current y, x and 3 items above in other nested array at same index
  //diag dr creates array of current y,x and 3 items 1 to right and 1 above previous 
  // diag dl creates array of current y,x and 3 items 1 to left and 1 above previous
  //if checks if all are with in the boundaries of the board and if they belong to currPlayer, it they do they return true

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

// Removes the pieces div and clears the board
function remove() {
  const pieces = document.querySelectorAll(".piece");
  for (let i= 0; i < pieces.length; i++) {
    pieces[i].remove();
  }
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      if (board[y][x] === 1 || 2) {
        board[y][x] = undefined;
      }
    }
  }
}
// adds event listener to reset buttona and executes remove function
function reset() {
  resetButton.addEventListener("click", remove)
}

makeBoard();
makeHtmlBoard();
reset();