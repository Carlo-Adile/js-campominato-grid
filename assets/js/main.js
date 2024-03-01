/* IL MALE!!! da fare refactoring */
let bombList = []
let gameBox = []
let gridBox = 0;
let userPoint = 0;

/* riferimento ad HTML */
const difficultyValue = document.getElementById("difficulty_value")
const myGame = document.getElementById("my_game")
const didYouWinSon = document.getElementById("did_you_win_son")
const endGameResult = document.getElementById("endgame_screen")
const yourScore = document.getElementById("your_score")

/* START GAME
click sul bottone per avviare */
document.getElementById("generate_box").addEventListener('click', function (e) {
  e.preventDefault();
  pickDifficulty();
  gameEvent();
  didYouWinSon.innerHTML = ('')
  yourScore.innerHTML = ('')
  i = 0;
  i2 = 0;
})

/* determina la difficoltà */
function pickDifficulty() {
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

  getRandomBomb()

  campoMinato(difficulty)
  console.log(gridBox)
}


/* Aggiungi 16 bombe
genera 16 numeri casuali differenti da 1 a gridBox e li assegna a bombList */

function getRandomBomb() {
  bombList.length = 0
  min = 1;
  max = gridBox;
  let bombCount = 0;

  while (bombCount < 16) {
    let numbToAdd = parseInt(Math.random() * (max - min + 1) + min);
    console.log("random numb is " + numbToAdd)

    if (bombList.includes(numbToAdd) === false) {
      bombList.push(numbToAdd);
      bombCount++;
    }

    console.log("bombs are placed in these box... " + bombList)
  }
}

/* GENERA LE BOX
- sistema reset se l'utente clicka nuovamente su start
- swtich per il corretto stile css delle box
- 
 */
function campoMinato(difficulty) {

  /* esegui finchè myGame ha un figlio */
  while (myGame.firstChild) {
    myGame.removeChild(myGame.firstChild);

  }

  /* size delle box + contenuto interno */
  for (index = 1; index < gridBox + 1; index++) {
    let box = document.createElement("div")

    /* stile CSS */
    switch (difficulty) {
      case "1":
        box.classList.add('box_easy')
        break;
      case "2":
        box.classList.add('box_medium')
        break;
      case "3":
        box.classList.add('box_hard')
        break;
      default:
        box.classList.add('box_easy')
        break;
    }

    /* gestisci il contenuto html */
    if (bombList.includes(index)) {
      box.innerHTML = (index)

      box.classList.add('bomb')
      
    }
    else {
      box.innerHTML = (index)
    }
    myGame.appendChild(box);
    gameBox.push(box);
  }

  
}

/* CENTRO GESTIONE EVENTI
aggiungi eventi di gioco */
function gameEvent() {
  gameBox.forEach(box => {
    box.addEventListener('click', toggleEvent);
  })

}

/* EVENTI TOGGLE INTERESSATI:
- clicka sulla \
- colora di azzurro 
- accumula punti
*/
function toggleEvent() {
  
  if (this.classList.contains('bomb')) {
    this.innerHTML = ('<i class="fa-solid fa-bomb"></i>');
    youLost();
  }
  else if(this.classList.contains('azure') === false){
    this.classList.toggle('azure');
      userPoint ++;
      console.log("current score is " + userPoint)
  }

  return userPoint;
}

/* GAME OVER
verifica quando l'utente clicca su una bomba */
function youLost() {
  gameBox.forEach(box => {
    box.removeEventListener('click', toggleEvent);
    box.classList.add('shake');
  });
  bombList.length = 0
  showResult();
}

/* MOSTRA I RISULTATI - REFACTOR */
let i = 0;
let i2 = 0;
let speed = 100;
let gameOverText = 'Game Over';
let userPointText = "you made a total of ";

function showResult() {

  if (i < gameOverText.length) {
    didYouWinSon.innerHTML += gameOverText.charAt(i);
    i++;
    setTimeout(showResult, speed);
  }
  else if (i2 < userPointText.length) {
    yourScore.innerHTML += userPointText.charAt(i2);
    i2++;
    setTimeout(showResult, speed);
  }
  else if(i2 = userPointText.length){
    yourScore.innerHTML += userPoint + " points!!";
  }
}

