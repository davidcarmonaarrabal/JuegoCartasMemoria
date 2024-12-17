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

function startGame() {
    totalPairs = parseInt(pairsSelect.value);
    menu.style.display = "none";
    gameBoard.style.display = "grid";
    gameBoard.style.gridTemplateColumns = `repeat(${Math.ceil(Math.sqrt(totalPairs * 2))}, 80px)`;
    timer.style.display = "block";
    startTimer();
    createCards();
    shuffleCards();
    displayCardsTemporarily();
}

function createCards() {
    cards = [];
    for (let i = 1; i <= totalPairs; i++) {
        cards.push(i, i); 
    }
}

function shuffleCards() {
    cards.sort(() => Math.random() - 0.5);
    gameBoard.innerHTML = "";
    cards.forEach((value) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = value;
        card.dataset.image = `img/card${value}.png`; 
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function displayCardsTemporarily() {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach((card) => {
        card.classList.add("flipped");
        card.style.backgroundImage = `url('${card.dataset.image}')`; 
    });
    setTimeout(() => {
        allCards.forEach((card) => {
            card.classList.remove("flipped");
            card.style.backgroundImage = `url('img/Back.png')`;
        });
    }, 2000);
}

function flipCard() {
    if (this.classList.contains("flipped") || flippedCards.length === 2) return;

    this.classList.add("flipped");
    this.style.backgroundImage = `url('${this.dataset.image}')`;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;
        if (matchedPairs === totalPairs) endGame();
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.style.backgroundImage = `url('img/Back.png')`; 
        card2.style.backgroundImage = `url('img/Back.png')`; 
    }
    flippedCards = [];
}

function startTimer() {
    time = 0;
    timer.textContent = `Tiempo: ${time} segundos`;
    interval = setInterval(() => {
        time++;
        timer.textContent = `Tiempo: ${time} segundos`;
    }, 1000);
}

function endGame() {
    clearInterval(interval);
    alert(`¡Felicidades! Has terminado en ${time} segundos.`);
    resetGame();
}

function resetGame() {
    gameBoard.innerHTML = "";
    gameBoard.style.display = "none";
    timer.style.display = "none";
    menu.style.display = "block";
    matchedPairs = 0;
    flippedCards = [];
}
