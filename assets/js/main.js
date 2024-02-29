/* IL MALE!!! da fare refactoring */
let bombList = []
let gameBox = []
let gridBox = 0;

/* riferimento ad HTML */
const difficultyValue = document.getElementById("difficulty_value")
const myGame = document.getElementById("my_game")

/* click sul bottone per avviare */
document.getElementById("generate_box").addEventListener('click', function (e) {
  e.preventDefault();
  pickDifficulty()
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

  getRandomNumb()

  campoMinato(difficulty)
  console.log(gridBox)
  return gridBox
}


/* add 16 bombs */
/* produci il numero casuale */
function getRandomNumb(min, max) {
  bombList.length = 0
  /* check */
  console.log("random numb is reading gridBox: " + gridBox)
  min = 1;
  max = gridBox;
  let mushroomCount = 0;
  let avoidLoop = 0;

  while (mushroomCount < 16) {
    let numbToAdd = parseInt(Math.random() * (max - min + 1) + min);
    console.log("random numb is " + numbToAdd)

    if (bombList.includes(numbToAdd) === false) {
      bombList.push(numbToAdd);
      mushroomCount++;
    }

    console.log(bombList)
  }
  return bombList
}

/* crea le box */
function campoMinato(difficulty) {

  /* esegui finchè myGame ha un figlio */
  while (myGame.firstChild) {
    myGame.removeChild(myGame.firstChild);

  }

  for (index = 1; index < gridBox + 1; index++) {
    let box = document.createElement("div")

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

  gameEvent();
}

/* aggiungi eventi di gioco */
function gameEvent() {
  gameBox.forEach(box => {
    box.addEventListener('click', toggleEvent);
  })

}

function toggleEvent() {
  if (this.classList.contains('bomb')) {
    this.innerHTML = ('<i class="fa-solid fa-bomb"></i>');
    youLost();
  }
  else {
    if (this.classList.contains('azure') === false) {
      this.classList.toggle('azure');
    }
  }

  /* verifica quando l'utente clicca su una bomba */
  function youLost() {
    gameBox.forEach(box => {
      box.removeEventListener('click', toggleEvent);
    });
    bombList.length = 0
    console.log("you lost!");
  }
}


