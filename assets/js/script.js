const deckObject = {
    cards: [],
    numberOfDecks: 1,
    marker: false,

    /*
       Create 
       fills the cards array with 52 cards times the number of decks.  
       It then shuffles the cards by traversing thru the array starting at the end of the array and randomly swapping the values of the index
      */
    create: function () {
        for (let i = 0; i < this.numberOfDecks; i++)
            for (let j = 0; j < 52; j++) {
                this.cards.push(j);
            }

        let array = this.cards;
        let tmp,
            current,
            top = array.length;

        if (top)
            while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
        cards = array;
        marker = false;
    }, 
    emptyDeck : function(){
        if(this.cards.length==0){
            return true; 
        }
        else{
            return false;
        }
    }
};

const deck = deckObject;

let player = {
    cards : [],
    score : 0,
    ace : false
}

let dealer = {
    cards : [],
    score : 0,
    ace : false
}


/* Function: checkMarker
    The purpose for this function is to check to see how many cards are left in the deck.  When there are 10 cards left, it sets the marker to true. The marker causes the game
    to shuffle the deck after the current hand being played is completed.
*/
    function checkMarker(){if(deck.cards.length==10) deck.marker= true;}

    
/*  Function: drawcard
    The purpose for this function is to draw a card from the deck, before doing so it checks to see if there are any cards in the deck, refills and shuffles deck if empty.
    The method to pull out the value and suit of the card is done by running two math operations on the value of the card that was popped from the deck. 
*/
drawCard = function () {
    checkMarker() 
    let temp = deck.cards.pop();
    const cardInfo = { value: temp % 13, suit: Math.floor(temp / 13) };
 
    return cardInfo;
};


// This is the board object that we can copy from
const board = {
    dealerHand: [],
    playerHand: [],
    dealToDealer: function (cardObject) {
        this.dealerHand.push(cardObject)
    },
    dealToPlayer: function (cardObject) {
        this.playerHand.push(cardObject)
    }
}


const game = {};

