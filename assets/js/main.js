let bombList = []
/* riferimento ad HTML */
const difficultyValue = document.getElementById("difficulty_value")
const myGame = document.getElementById("my_game")

let gridBox = 0;

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

    /* gestisci il contenuto e il toggle */
    if (bombList.includes(index)) {
      box.innerHTML = ("bomb")
      box.classList.add('bomb')
    }
    else {
      box.innerHTML = (index)
    }

    myGame.appendChild(box);
    box.addEventListener('click', function () {
      this.classList.toggle('azure');
    });
    
  }
  /* verifica quando l'utente clicka su una bomba */
  const theBombs = document.querySelectorAll('.bomb');
    theBombs.forEach(bomb => {
      bomb.addEventListener('click', event => {
        console.log('Element clicked:', bomb);
      });

    });
}




