const hand = {
    hand: [],
    
    total: function () {
        let total = 0;
        let aceCount = 0; // Counts aces as 1 or 11

        this.hand.forEach(card => {
            if (card.rank === 'Ace') {
                aceCount += 1;
                total += 11; // Temporarily treat Ace as 11
            } else if (['King', 'Queen', 'Jack'].includes(card.rank) || card.rank === '10') {
                total += 10; // Face cards and 10 are worth 10
            } else {
                total += card.rank; // Other cards are their numeric value
            }
        });

        // Adjustment for the Aces (if total is over 21, convert the Aces from 11 to 1)
        while (total > 21 && aceCount > 0) {
            total -= 10;
            aceCount -= 1;
        }
        return total;
    },
    get total() {
        return this._total;
    },
    set total(value) {
        this._total = value;
    },

    status: function () {
        const totalValue = this.total();
        
        if (totalValue < 21) {
            return "under"; 
        } else if (totalValue > 21) {
            return "bust"; 
        } else {
            return "The total is 21. A win unless the dealer also has 21";
        }
    },

    // Function adds a card to the hand
    hit: function(card) {
        this.hand.push(card);
    }
};

// Deals the initial hands
function dealInitialHands(player, dealer) {
    player.hand = [deck.pop(), deck.pop()];  // Deal 2 cards to the player
    dealer.hand = [deck.pop(), deck.pop()];  // Deal 2 cards to the dealer
}

// Function plays the game
function playGame() {
    shuffleDeck(deck);  // Shuffle the deck
    const player = Object.create(hand);  // Create a new player hand
    const dealer = Object.create(hand);  // Create a new dealer hand
    
    dealInitialHands(player, dealer);  // Deal the initial cards

    // Player's turn: Allow the player to hit until they stand or bust
    while (player.total() < 21) {
        console.log(`Player's hand:`, player.hand, `Total:`, player.total());
        
        // In a real game, the dealer would ask the player if they would like to hit or stay. 
        // As of right now, the player is simulating to hit.
        if (player.total() < 21) {
            player.hit(deck.pop());  // The player hits (draws a card)
        }
    }
    console.log(`Player's final hand:`, player.hand, `Total:`, player.total());

    // Dealer's turn: Dealer hits until they reach at least 17
    while (dealer.total() < 17) {
        console.log(`Dealer's hand:`, dealer.hand, `Total:`, dealer.total());
        dealer.hit(deck.pop());  // The dealer hits (draws a card)
    }
    console.log(`Dealer's final hand:`, dealer.hand, `Total:`, dealer.total());

    // Helps to determine the winner
    const playerTotal = player.total();
    const dealerTotal = dealer.total();

    if (playerTotal > 21) {
        console.log("Player busts! Dealer wins!");
    } else if (dealerTotal > 21) {
        console.log("Dealer busts! Congratulations player wins!");
    } else if (playerTotal > dealerTotal) {
        console.log("Congratulations Player wins!");
    } else if (dealerTotal > playerTotal) {
        console.log("Dealer wins!");
    } else {
        console.log("Push!");
    }
}

// Run the game
playGame();