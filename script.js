const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");
const pairsSelect = document.getElementById("pairsNumber");
const gameBoard = document.getElementById("gameBoard");
const timer = document.getElementById("timer");

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let totalPairs;
let time = 0;
let interval;
timer.style.display = "none";

startBtn.addEventListener("click", startGame);

/*Start game function.*/ 
function startGame() {
    startGameStyles();
    startTimer();
    createCards();
    shuffleCards();
    displayCardsTemporarily();
}

/*This function initializes all the game elements, hidding the menu ones.*/
function startGameStyles() {
    totalPairs = parseInt(pairsSelect.value);
    menu.style.display = "none";
    gameBoard.style.display = "grid";
    /*Only 2 cards of every number. */
    gameBoard.style.gridTemplateColumns = `repeat(${Math.ceil(Math.sqrt(totalPairs * 2))}, 80px)`;
    timer.style.display = "block";
}

/*This function creates all the cards based in the amount of pairs we
gave to it.*/
function createCards() {
    cards = [];
    /*Loop of card creation */
    for (let i = 1; i <= totalPairs; i++) {
        cards.push(i, i); 
    }
}

/*This function shuffles the cards into the game board.*/
function shuffleCards() {
    /*The "-0.5 makes the shuffle be ordenated in a range of -0.5 and 0.5.".*/
    cards.sort(() => Math.random() - 0.5);
    gameBoard.innerHTML = "";
    /*Now we create the card in the HTML, giving it an image based in the 
    number of the card, inside a div and giving it a class named "card" to
    recieve CSS properties.
    We also add an EventListener to every card to make them interactive.*/
    cards.forEach((value) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = value;
        card.dataset.image = `img/card${value}.png`; 
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function calculateDisplayCardsTemporarily() {
    console.log('Número de parejas:' +pairsSelect.value);
    var miliseconds = 0;
    switch(pairsSelect.value){
        case '2':
        case '3':
        case '4':
        case '5':
            miliseconds = 2000;
            break;
        case '6':
        case '7':
        case '8':
            miliseconds = 3000;
            break;
        case '9':
        case '10':
        case '11':
        case '12':
        case '13':
            miliseconds = 4000;
            break;
        case '14':
        case '15':
        case '16':
        case '17':
            miliseconds = 5000;
            break;
        case '18':
        case '19':
        case '20':
            miliseconds = 6000;
            break;
        default:
            miliseconds = 2000;
    }
    return miliseconds;
}

/*This function has the job of showing the cards at the start of the game
during 2 seconds.*/
function displayCardsTemporarily() {
    var miliseconds = calculateDisplayCardsTemporarily();
    const allCards = document.querySelectorAll(".card");
    /*We flip every card. */
    allCards.forEach((card) => {
        card.classList.add("flipped");
        card.style.backgroundImage = `url('${card.dataset.image}')`; 
    });
    /*After 2 seconds we unflip every card and put on it the image of the
    back side.*/
    setTimeout(() => {
        allCards.forEach((card) => {
            card.classList.remove("flipped");
            card.style.backgroundImage = `url('img/Back.png')`;
        });
    }, miliseconds);
}

/*This function makes the card flip when clicked.*/
function flipCard() {
    /*This if checks if the card clicked is already flipped to do nothing if
    clicked again. 
    Also, it sees if there are already 2 cards flipped on the board, to not
    let the user flip more cards before the cards unflip or change to found
    pairs.*/
    if (this.classList.contains("flipped") || flippedCards.length === 2) return;

    /*This flips a card, changes it image.*/
    this.classList.add("flipped");
    this.style.backgroundImage = `url('${this.dataset.image}')`;
    flippedCards.push(this);

    /*If there are 2 flipped cards on the board, it takes 0.5 seconds
    to unflip them if they are not a pair.*/
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

/*This function checks if the card are a pair.*/
function checkMatch() {
    const [card1, card2] = flippedCards;

    /*If there is a pair, the cards now have the class "matched".*/
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;
        if (matchedPairs === totalPairs) endGame();
    /*Else, the cards are no unflipped. */
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.style.backgroundImage = `url('img/Back.png')`; 
        card2.style.backgroundImage = `url('img/Back.png')`; 
    }
    flippedCards = [];
}

/*Time of game.*/
function startTimer() {
    time = 0;
    timer.textContent = `Tiempo: ${time} segundos`;
    interval = setInterval(() => {
        time++;
        timer.textContent = `Tiempo: ${time} segundos`;
    }, 1000);
}

/*This function runs when the game finish, it stop the timer and
gives user an alert advising that they finished the game and on
how much time they did.*/
function endGame() {
    clearInterval(interval); 
    setTimeout(() => {
        alert(`¡Felicidades! Has terminado en ${time} segundos.`);
        resetGame();
    }, 1000);
}

function resetGame() {
    homeMenuStyles();
}

function homeMenuStyles(){
    gameBoard.innerHTML = "";
    gameBoard.style.display = "none";
    timer.style.display = "none";
    menu.style.display = "block";
    matchedPairs = 0;
    flippedCards = [];
}
