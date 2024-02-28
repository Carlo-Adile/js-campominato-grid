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
  campoMinato(difficulty)
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
    box.innerHTML = (index)
    myGame.appendChild(box);
    box.addEventListener('click', function () {
      this.classList.toggle('azure');
    });
  }
}





