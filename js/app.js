/*
 * wrap everything inside an Immediately-Invoked-Function-Expression (IIFE)
 */
 (function () {

    "use strict";
/*
 *list that holds all of cards
 *
*/
const allCards =document.querySelectorAll(".card");
let cards_open = [];
let MovesNumber= 0;
let starsNumber= 3;
let secondsCounter =0;
let minutesCounter=0;
let timerHandler;
let symbol = [];



//done once when initilize the game.
function firstGame(){
    
//for each add event listener
    allCards.forEach(card => {
        card.addEventListener("click", cardClicked);
        let child = card.children[0];
        symbol.push(child.className);


    })
    document.querySelector("#playAgain").addEventListener("click", startGame);
    document.querySelector("#cancelGame").addEventListener("click", closeDialog);
    document.querySelector(".reset").addEventListener("click", startGame);
   

}

function flipAllCardsDown(){
    allCards.forEach(card => {
    //face down all cards
    card.className= "card";
    
    
})

}

function shuffleCards() {
    //shuffle symbols
    symbol= shuffle(symbol);
    //assign symbols to cards
    let x =0;
    allCards.forEach(card=> {
        let child = card.children[0];

        child.className =symbol[x];
        x++
    });
}

function cardClicked(){
    //start the timer if this is the first card
    //and this will have no effect if it is not
    //the first card
     startTimer();
    //need to make sure clicked card is not already opend
    if (this.classList.contains("show")){
        return;
    }
    //have to make sure we opend maximum only 2 cards at a time
    if (cards_open.length<2){ 

        this.classList.toggle("show"); 
        this.classList.toggle("open"); 

        cards_open.push(this);
    
        if (cards_open.length == 2){
            setTimeout(matchCards, 1000);
          
        }
    }

}

function matchCards(){
    //need to make sure there are 2 cards opened
    if(cards_open.length==2) {
        let firstCard = cards_open[0];
        let secondCard =cards_open [1];
        //comparing the className of the child element of each card

        let firstChildClass = firstCard.children[0]. className;
        let secondChildClass= secondCard.children[0].className;

        if(firstChildClass==secondChildClass) {
            firstCard.classList.add("match");
            secondCard.classList.add("match");

        }
        else{
            //face cards down by removing show and open
            firstCard.className= "card";
            secondCard.className="card";
        }
        cards_open = [];

        incrementMoves();

    }
    const remainingUnOpenedCards= document.querySelectorAll(".card:not(.match)");
    if (remainingUnOpenedCards.length== 0) {
        showDialogBox();    }
}

// setting number of stars

    //  if the player solve the game in 9 moves will gets 3 stars
    // if the player can solve the game in less than
    // 19 moves will gets 2 stars
    // if the player solve it in 20 or more movea gets 1 star
function incrementMoves(){
    MovesNumber += 1;
    if(MovesNumber< 10) {
        starsNumber =3 ;
    } else if(MovesNumber< 20){
        starsNumber=2;
    } else {
        starsNumber =1;
    }
    updateScore();
    
}

//if the player choose playAgain from dialogbox and cancel
function startGame(){
    closeDialog();
    secondsCounter=0;
    minutesCounter=0;
    MovesNumber=0;
    starsNumber=3;
    cards_open=[];
    updateScore();
    shuffleCards();
    flipAllCardsDown();
    
    // stop the timer if it is already started
    stopTimer();
    // clear the previous time reading
    document.querySelector(".timer").innerText = "00:00";

}


function startTimer() {
   
    

     if(!timerHandler) {
        timerHandler = setInterval(function(){
            secondsCounter += 1;
            if(secondsCounter>59) {
                secondsCounter = 0;
                minutesCounter += 1;
            }
            let secondsString = "";
            let minutesString = "";
            if (secondsCounter<10) {
                secondsString = "0" + secondsCounter;
            } else {
                secondsString = secondsCounter;
            }

            if (minutesCounter < 10) {
                minutesString = "0" + minutesCounter;
            } else {
                minutesString = minutes;
            }
            document.querySelector(".timer").innerText = 
            `${minutesString}:${secondsString}`;
        },1000);
    }
  
}

function stopTimer(){
    clearInterval(timerHandler);
    timerHandler = null;


}


function updateScore (){
    //add number of moves
    const movesElement = document.querySelector(".moves"); 
    movesElement.innerText= MovesNumber;
    //change stars number
    const starsElement = document.querySelector(".stars");
    starsElement.innerHTML = "";
    for (let i=0; i< starsNumber; i++){
        let star ="<li> <i class= 'fa fa-star'></i> </li>";
        starsElement.innerHTML += star;
    }
}

    

function showDialogBox() {
    let dialog = document.querySelector("#dialog-box");

    document.querySelector("#span-moves").innerText = MovesNumber;
    document.querySelector("#span-stars").innerText = starsNumber;
    document.querySelector("#spent-time").innerText =   minutesCounter + ":" + secondsCounter;


    dialog.showModal();
    stopTimer();
}
function closeDialog(){
    document.querySelector("#dialog-box").close();
}
firstGame();
startGame();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

}) ();

