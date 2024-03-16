var player = 1;

function createBoard() {
  var contInput = 0;
  var board_container = document.getElementById("board-container");
  for (var i = 0; i < 9; i++) {
    var divTable = document.createElement("div");
    divTable.className = "table";

    for (var j = 0; j < 3; j++) {
      var divLine = document.createElement("div");
      for (var k = 0; k < 3; k++) {
        var divCell = document.createElement("div");
        divCell.className = "cell";
        var input = document.createElement("input");
        input.type = "button";
        input.id = `input-${contInput}`;
        contInput++;
        divCell.appendChild(input);
        divTable.appendChild(divCell);
      }
    }
    board_container.appendChild(divTable);
  }

  var inputs = document.querySelectorAll("input");
  var i = 0;
  inputs.forEach((input) => {
    input.value = "";
  });

  inputs.forEach((input) => {
    input.addEventListener("click", interaction);
  });
}

function interaction() {
  checkPlayer(this);
  nextTable(this);
  checkWinner(this);
  getBoardValues();
}

function checkWinner(inputClicked) {
  var tableHTMLClicked = inputClicked.parentElement.parentElement;
  var matriz = [];

  let inputs = tableHTMLClicked.querySelectorAll('input[type="button"]');
  inputs.forEach((input) => {
    matriz.push(input.value);
  });

  var winner = checkWinnerInMatrix(matriz);

  if (winner !== null) {
    alert("O jogador " + winner + " venceu!");
  } else {
    var tie = checkTie();
    if (tie) {
      alert("Empate!");
    }
  }
}

function checkWinnerInMatrix(matriz) {
  for (let i = 0; i < 3; i++) {
    if (
      matriz[i * 3] === matriz[i * 3 + 1] &&
      matriz[i * 3] === matriz[i * 3 + 2] &&
      matriz[i * 3] !== ""
    ) {
      return matriz[i * 3];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      matriz[i] === matriz[i + 3] &&
      matriz[i] === matriz[i + 6] &&
      matriz[i] !== ""
    ) {
      return matriz[i];
    }
  }

  if (
    (matriz[0] === matriz[4] && matriz[0] === matriz[8] && matriz[0] !== "") ||
    (matriz[2] === matriz[4] && matriz[2] === matriz[6] && matriz[2] !== "")
  ) {
    return matriz[4];
  }

  return null;
}

function checkTie() {
  var boards = document.querySelectorAll(".table");
  for (let i = 0; i < boards.length; i++) {
    var inputs = boards[i].querySelectorAll('input[type="button"]');
    for (let j = 0; j < inputs.length; j++) {
      if (inputs[j].value === "") {
        return false;
      }
    }
  }
  return true;
}

function checkPlayer(thisInput) {
  thisInput.value = player % 2 != 0 ? "X" : "O";
  thisInput.className = "inputOff";
  player++;
}

function nextTable(lastMove) {
  var focusTable = lastMove.id.slice(6) % 9;
  var index = 0;

  document.querySelectorAll(".table").forEach((board) => {
    if (index != focusTable) {
      board.style.pointerEvents = "none";
      board.style.opacity = 0.5;
      board.style.cursor = "not-allowed";
    }

    if (index == focusTable && board.style.cursor == "not-allowed") {
      board.style.pointerEvents = "auto";
      board.style.opacity = 1;
      board.style.cursor = "auto";
    }

    index++;
  });
  return getBoardValues()[focusTable];
}

function getBoardValues() {
  var boardValues = [];
  var boards = document.querySelectorAll(".table");

  boards.forEach((board) => {
    var boardMatrix = [];
    var cells = board.querySelectorAll(".cell input");
    cells.forEach((cell, index) => {
      if (index % 3 === 0) boardMatrix.push([]);
      boardMatrix[boardMatrix.length - 1].push(cell.value);
    });
    boardValues.push(boardMatrix);
  });

  return boardValues;
}

function startGame() {
  createBoard();
}

startGame();
