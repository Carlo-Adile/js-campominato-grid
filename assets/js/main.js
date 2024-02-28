let gridBox = 0;

const difficultyValue = document.getElementById("difficulty_value")

const myGame = document.getElementById("my_game")

document.getElementById("difficulty_select").addEventListener('submit', function(e){
  e.preventDefault();

  const difficulty = difficultyValue.value;

  switch(difficulty) {
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
  
  console.log(gridBox)

  for(index = 0; index < gridBox; index++){
    let box = document.createElement("div")

    switch(difficulty) {
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

    myGame.appendChild(box);
    
    /* box.classList.add('box')
    box.innerHTML(index) */
    /* box.addEventListener() */
  }

})





/* function createBox(){
  for (let index = 0; index < gridRow; index++) {
    for (let index2 = 0; index2 < gridCol; index2++) {
      let box = document.createElement("div");
      box.classList.add('box');
      

      box.addEventListener('click', function () {
        this.classList.toggle('green');
      });
  
      myContainer.appendChild(box);
    }
  
  }
} */

/* const nameElement = document.getElementById("ticket_name");
const kmElement = document.getElementById("ticket_km");
const ageElement = document.getElementById("ticket-age"); */




/* document.getElementById("generate_ticket").addEventListener('submit',
  function(e){
    e.preventDefault(); */