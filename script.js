const board = [ // this is the initial board. All boards are generated based on this board
    3, 9, 1, 2, 8, 6, 5, 7, 4, +
    4, 8, 7, 3, 5, 9, 1, 2, 6, +
    6, 5, 2, 7, 1, 4, 8, 3, 9, +
    8, 7, 5, 4, 3, 1, 6, 9, 2, +
    2, 1, 3, 9, 6, 7, 4, 8, 5, +
    9, 6, 4, 5, 2, 8, 7, 1, 3, +
    1, 4, 9, 6, 7, 3, 2, 5, 8, +
    5, 3, 8, 1, 4, 2, 9, 6, 7, +
    7, 2, 6, 8, 9, 5, 3, 4, 1,
  ];


////// Function definitions //////

  
// this function prints a sudoku board on console
function printSudoku(elems) {
  for (let i = 0; i <= 72; i += 9) {
    console.log(...elems.slice(i, i + 9));
  }
}
  
// a helper function to switch the positions of two rows
function switchRows(row1, row2, elems) {
  let temp = 0;
  
  let ro1 = row1 * 9;
  let ro2 = row2 * 9;
  for (let i = 0; i < 9; i++) {
    temp = elems[ro1];
    elems[ro1] = elems[ro2];
    elems[ro2] = temp;
    ro1++;
    ro2++;
  }
}
  
// a helper function to switch the positions of to columns
function switchColumns(column1, column2, elems) {
  let temp = 0;

  let col1 = column1;
  let col2 = column2;
  for (let i = 0; i < 9; i++) {
    temp = elems[col1];
    elems[col1] = elems[col2];
    elems[col2] = temp;
    col1 += 9;
    col2 += 9;
  }
}
  
// this function randomly changed the positions of rows and columns to create a new unique board
// it uses switchColumns and switchRows helper functions.
// Important!: Only place of the rows and columns that are on the same blocks can be changed (row 1-2-3, row, 4-5-6, column 1-2-3 etc.)
function shuffle(elems) {
  const loop_ct = Math.floor(Math.random() * 100) + 1;

  for (let i = 0; i < loop_ct; i++) {
    for (let j = 0; j < 7; j += 3) {
      let col1 = Math.floor(Math.random() * 3 + j);
      let col2 = Math.floor(Math.random() * 3 + j);
      switchColumns(col1, col2, elems);

      let row1 = Math.floor(Math.random() * 3 + j);
      let row2 = Math.floor(Math.random() * 3 + j);
      switchRows(row1, row2, elems);
    }
  }
}

// This function takes a complete sudoku board and makes some random cells blank to create the puzzle
// The formula works like this: If nth item is removed from the board, (81-n) item is also removed and
// finally the item on the center of the board is removed as well
// This function returns a new sudoku board array
function create_puzzle(elems) {

  const temp = Array.from(elems);

  let counter = 0;

  while (counter < 20){

      let rand_num = Math.floor(Math.random() * 39 + 1);

      if (temp[rand_num] !== ""){
          temp[rand_num] = "";
          temp[81-rand_num] = "";
          counter++;
      }

  }

  temp[40] = ""; //make middle cell blank

  return temp;

}

// This function fills the board with the numbers of the puzzle
function fill_board(elems){

  for (let i = 0; i < 81; i++){
      document.querySelector("#cell-" + (i+1)).value = elems[i];
  }

}

// this function checks if the current solution is correct
function check_solution(){

  let temp = [];
  let compare = [1,2,3,4,5,6,7,8,9];


/////check each box/////
  for (let i = 0; i < 9; i++){
      let cell = document.querySelector("#box-" + (i+1)).firstElementChild;

      for (let j = 0; j < 9; j++){

          temp.push(cell.value);
          cell = cell.nextElementSibling; 
            
      }
    
      temp.sort();
      console.log(temp);

      if (temp.toString() != compare.toString()){
          console.log ("False");
          return false;
      }

      else {
          temp = [];
          
      }
       

  }


  /////check each row/////
  for (let i = 1; i <= 72; i += 9){
      let cell = document.querySelector("#cell-" + (i));
        

      for (let j = 0; j < 9; j++){

          cell = document.querySelector("#cell-" + (i+j));
          temp.push(cell.value);
          console.log(cell.value);
    
            
      }
    
      temp.sort();
      console.log(temp);

      if (temp.toString() != compare.toString()){
          console.log ("False");
          return false;
      }

      else {
          temp = [];
          
      }
       

  }


  /////check each column/////
  for (let i = 1; i < 10; i++){
    let cell = document.querySelector("#cell-" + (i));
            
    
    for (let j = 0; j <= 72; j+= 9){
    
      cell = document.querySelector("#cell-" + (i+j));
      temp.push(cell.value);
      console.log(cell.value);
        
                
    }
        
      temp.sort();
      console.log(temp);
    
      if (temp.toString() != compare.toString()){
        console.log ("False");
        return false;
      }
    
      else {
        temp = [];
              
      }
           
    
  }

 
  return true;
    

}



// a helper function to determine the index of a cell
function getIndex(row, col) {
    return row * 9 + col;
}
 
// a function to check if the board is valid with a new number on the board  
function isValid(board, row, col, num) {
  
  const index = getIndex(row, col);
  let numStr = num.toString(); // convert number to string to compare with the board's strings
  
  for (let i = 0; i < 9; i++) {
    if (board[getIndex(row, i)] == numStr || board[getIndex(i, col)] == numStr) {
      return false;
    }
  }

  let startRow = row - row % 3, startCol = col - col % 3;
  for (let i = 0; i < 3; i++) {
    
    for (let j = 0; j < 3; j++) {
       
      if (board[getIndex(i + startRow, j + startCol)] == numStr) {
        return false;
      }
    }
  }

  return true;

}
  
// sudoku solver function. It solves the sudoku and increments the counter to determine 
// how many possible solutions exists 
function solveSudoku(board, solutionCount = { count: 0 }) {

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const index = getIndex(row, col);
      if (board[index] === "") { // check for empty string
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[index] = num.toString(); // place number as a string
            solveSudoku(board, solutionCount);
            board[index] = ""; // backtrack
          }
        }
        return;
      }
    }
  }
  solutionCount.count += 1;

}
  


////// Main section //////


  
let solutionCount = { count: 0 };
let puzzle = [];

while(solutionCount.count != 1){
    solutionCount = { count: 0 };
    shuffle(board);
    puzzle = create_puzzle(board);
    solveSudoku(puzzle, solutionCount);
    fill_board(puzzle);
    console.log("Number of solutions found: ", solutionCount.count);
    
   
}



///// Button events /////

// reset button
const resetButton = document.querySelector("#reset");
const resetOnClick =  () => fill_board(puzzle);
resetButton.addEventListener('click', resetOnClick);

// solve button
const solveButton = document.querySelector("#solve");
const solveOnClick = () => fill_board(board);
solveButton.addEventListener('click', solveOnClick);

//regenerate button
const regenerateButton = document.querySelector("#regenerate");
const regenerateOnClick = () => {
    let solutionCount = { count: 0 };

    while(solutionCount.count != 1){
        solutionCount = { count: 0 };
        shuffle(board);
        puzzle = create_puzzle(board);
        solveSudoku(puzzle, solutionCount);
        console.log("Number of solutions found: ", solutionCount.count);
        fill_board(puzzle);
    }
}
regenerateButton.addEventListener('click', regenerateOnClick);

//check button
const checkButton = document.querySelector("#check");
const checkOnClick = () => {
    if (check_solution()){
        window.alert("Puzzle Solved!");
    }

    else{
        window.alert("Incorret");
    }
}
checkButton.addEventListener('click', checkOnClick);