let bombList = [];
let gameGrid = [];
let gridBox = 0;
let userPoint = 0;

const difficultyValue = document.getElementById("difficulty_value");
const myGame = document.getElementById("my_game");
const didYouWinSon = document.getElementById("did_you_win_son");
const endGameResult = document.getElementById("endgame_screen");
const yourScore = document.getElementById("your_score");

document.getElementById("generate_box").addEventListener('click', function (e) {
  e.preventDefault();
  startGame();
});

function startGame() {
  const difficulty = difficultyValue.value;

  switch (difficulty) {
    case "1":
      gridBox = 100;
      break;
    case "2":
      gridBox = 81;
      break;
    case "3":
      gridBox = 49;
      break;
    default:
      gridBox = 100;
      break;
  }

  initializeGame(difficulty);
}

function initializeGame(difficulty) {
  while (myGame.firstChild) {
    myGame.removeChild(myGame.firstChild);
  }

  generateBombs();

  for (let i = 0; i < gridBox; i++) {
    let box = document.createElement("div");
    box.classList.add('box', 'box_' + difficulty);
    box.dataset.index = i;

    if (bombList.includes(i)) {
      box.classList.add('bomb');
    }

    box.addEventListener('click', handleClick);
    myGame.appendChild(box);
    gameGrid.push(box);
  }
}

function generateBombs() {
  bombList.length = 0;
  let bombCount = 0;

  while (bombCount < 16) {
    let numbToAdd = parseInt(Math.random() * gridBox);
    if (!bombList.includes(numbToAdd)) {
      bombList.push(numbToAdd);
      bombCount++;
    }
  }
}

function handleClick() {
  const index = parseInt(this.dataset.index);

  if (bombList.includes(index)) {
    youLost();
  } else {
    const adjacentBombs = calculateAdjacentBombs(index);
    this.textContent = adjacentBombs;
    this.classList.add('checked');
  }
}

function calculateAdjacentBombs(index) {
  let bombCount = 0;
  const deltas = [-1, 0, 1];

  deltas.forEach(deltaX => {
    deltas.forEach(deltaY => {
      const x = index % Math.sqrt(gridBox) + deltaX;
      const y = Math.floor(index / Math.sqrt(gridBox)) + deltaY;
      const newIndex = y * Math.sqrt(gridBox) + x;

      if (x >= 0 && x < Math.sqrt(gridBox) && y >= 0 && y < Math.sqrt(gridBox)) {
        if (bombList.includes(newIndex)) {
          bombCount++;
        }
      }
    });
  });

  return bombCount;
}

function youLost() {
  gameGrid.forEach(box => {
    box.removeEventListener('click', handleClick);
    if (box.classList.contains('bomb')) {
      box.textContent = '*';
      box.classList.add('exploded');
    }
  });

  showResult();
}

function showResult() {
  didYouWinSon.textContent = "Game Over";
  yourScore.textContent = "You made a total of " + userPoint + " points!!";
}
