let win = false;
let stone = null;
const a = document.getElementById("bottom-row")
const b = document.getElementById("middle-row")
const c = document.getElementById("top-row")
const selectionBox = document.getElementById("selection-box")
let numOfMoves = document.getElementById("numOfMoves")
const stoneOne = document.getElementById("1")
const stoneTwo = document.getElementById("2")
const stoneThree = document.getElementById("3")
const stoneFour = document.getElementById("4")
let currentStoneSize;
let lastStoneSize;
let startingSize = parseInt(c.childElementCount)
let numberOfMoves = 0;
let stoneSelection = null;

const checkForWin = () => {
  if (a.childElementCount == startingSize || b.childElementCount == startingSize) {
    setTimeout(function() {
      if (numberOfMoves === 15) {
        alert("You Win! That's a perfect score!")
        document.getElementById("resetButton").style.visibility = "visible";
      } else {
        alert("You Win! But it can be done with less moves. See if you can do beter.")
      }
    }, 500)
    win = true;
  }
}

const selectRow = (row) => {
  // const currentRow = row.getAttribute("data-row")
  const selectedRow = row.id;
  const selectedRowID = document.getElementById(selectedRow)
  console.log("selected Row " + selectedRow)
  console.log("There are stones to pickup = " + row.hasChildNodes())
  if (row.hasChildNodes() && !stone) {
    pickUpStone(selectedRow)
  } else if (row.hasChildNodes() && stone) {
    lastStoneSize = parseInt(selectedRowID.lastElementChild.getAttribute("data-size"))
    console.log("lastStoneSize" + lastStoneSize)
    if (lastStoneSize > currentStoneSize) {
      dropStone(selectedRow, stone)
      stone = null
    } else {
      console.log("illegal Move")
      console.log((lastStoneSize > currentStoneSize))
      console.log(lastStoneSize)
      console.log(currentStoneSize)
    }
  } else if (stone) {
    dropStone(selectedRow, stone)
    stone = null
    
  }
} 

// stone = selectedRow.removeChild(selectedRow.lastElementChild);

const pickUpStone = (rowID) => {
  console.log("stone picked up")
  const selectedRow = document.getElementById(rowID);
  stone = selectedRow.removeChild(selectedRow.lastElementChild);
  selectionBox.appendChild(stone)
  currentStoneSize = parseInt(stone.getAttribute('data-size'))
  if (selectedRow.lastElementChild != null) {
    lastStoneSize = parseInt(selectedRow.lastElementChild.getAttribute("data-size"))
  } else {
    document.getElementById(rowID).innerHTML = null;
  }
  console.log("current stone size: " + currentStoneSize)
  console.log("Last Stone Size " + lastStoneSize)
  
  lastStoneSize = null;
  // console.log(selectedRow.lastElementChild.getAttribute("data-size"))
  // console.log(stone)
}



const dropStone = (rowID, stone) => {
  console.log("stone dropped")
  numberOfMoves++
  numOfMoves.innerHTML = `Moves: ${numberOfMoves}`
  document.getElementById(rowID).appendChild(stone)
  // console.log("dropped")
  if (document.getElementById(rowID) === "bottom-row") {
    movePiece()
  }
  currentStoneSize = null;
 
  checkForWin();
}

const resetBoard = () => {
  numOfMoves.innerHTML = "Moves: 0"
  numberOfMoves = 0;
  a.innerHTML = null
  b.innerHTML = null
  c.appendChild(stoneFour)
  c.appendChild(stoneThree)
  c.appendChild(stoneTwo)
  c.appendChild(stoneOne)
}