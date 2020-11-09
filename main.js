'use strict';

// Towers of Hanoi plan

// Move a piece-
//     pop from one column to another

// legal move- 
//     smallest piece is 1
//     biggest piece is  4
//     base is           0

//     so to make a legal move the base has to be less than the piece your moving.  This makes it always put a smaller piece
//     on top of a bigger piece.  The biggest piece would = 1 and the base would = 0.

// check for win-
//     This function should run after every move.  It should also compare a winning set (array) to the current set (array).  If it 
//     matches, then you win and a alert pops up notifying user.  If not, then it allows next move.

// Towers of Hanoi- 
//     main function that iterates throught the other functions
//         legal move
//         move a piece
//         check for win
//         if no win then allow another move

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

//stacks is our starting array defined
let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing? 
//This is printing out what our "board" will look like when it shows up in our terminal.
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
//This is the core function for us actually moving a piece.  It's returning our new stack after we have popped from the old and pushed to the new.  
const movePiece = (startStack, endStack) => {
  return stacks[endStack].push(stacks[startStack].pop());
  
}


//This function test the stack to make sure we are choosing allowed inputs.  This prevents the code from crashing if you were to put a wrong input like a 
//special character.
const stackTest = (startStack, endStack)=> {
  if (startStack === "a" && (endStack === "b" || endStack === "c")) {
    return true;
  } 
  else if (startStack === "b" && (endStack === "a" || endStack === "c")) {
    return true;
  }
  else if (startStack === "c" && (endStack === "a" || endStack === "b")) {
    return true;  
  }
  else {
    return false;
  }
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2?
//This checks if the move is allowed or not.  It checked if the last index of each stack meet the criteria to be allowed. Your start number has to be less 
//than where you are going. Or if the stack you are going to is equals 0 (nothing in the stack), it will allow to you make the move.
const isLegal = (startStack, endStack) => {
  if (stackTest(startStack, endStack)) {
  let start = stacks[startStack][stacks[startStack].length -1];
  let end = stacks[endStack][stacks[endStack].length -1];
  // let moveFrom = stacks[startStack];
  // let moveTo = stacks[endStack];
  // if (moveFrom[stacks[startStack].length -1] < moveTo[stacks[endStack].length -1]) {
    if (start < end || stacks[endStack].length === 0) {
      return true;
    }
    else {
      console.log("Illegal Input!")
      return false
  }
}
}

// What is a win in Towers of Hanoi? When should this function run?
//A win in this case is when your stack legally reaches a length of 4.  Or you could write exactly what you want it to be in whatever stack you wanted.
const checkForWin = () => {
  if (stacks.b.length === 4) {
    console.log("Congrats, you win!");
    return true;
  }
  else {
    return false;
  }

}

// When is this function called? What should it do with its argument?
//This is our main funciton that kind of navigates everything for us.  It's called directly from the getPrompt() function and we input our selections into
//it.  The selections become (startStack, endStack) and then the function distributes those "values" out the other needed function.  First it makes sure 
//whatever we are selecting is valid and legal and if so it allows us to run the movePiece function.  After that, it checks for a win.
const towersOfHanoi = (startStack, endStack) => {
  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack);
    checkForWin();
  }
  // else {
  //   towersOfHanoi()
  // }
}

//this is the code that enables us to play in prompt
const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests
//These are the tests we need to pass in order to make sure our code is good.

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });
  describe('#stackTest()', () => {
    it('should only allow illegal input', () => {
      towersOfHanoi('a', 'd');
      assert.equal(stackTest('a', 'd'), false);
        });
    it('should only allow legal input', () => {
      towersOfHanoi('b', 'c');
      assert.equal(stackTest('b', 'c'), true);
        });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}