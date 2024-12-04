// Built by scheeseb


function createCard(value, suit) {
    // add one to 0 indexed input value
    const inputNumber = value + 1;
    // create a div for the card body
    const cardBody = document.createElement("div");

    cardBody.className = "playingCard"

    cardBody.dataset.value = value;
    cardBody.dataset.suit = suit;

    const symbolSource = suit === 0 ? "./assets/cardAssets/symbols/hearts.png" :
        suit === 1 ? "./assets/cardAssets/symbols/clubs.png" :
            suit === 2 ? "./assets/cardAssets/symbols/diamonds.png" :
                suit === 3 ? "./assets/cardAssets/symbols/spades.png" :
                    null

    // Creates two spans that are positioned absolutely
    function appendSpans() {
        function createSpan() {
            const span = document.createElement("span");

            span.className = "symbolSpan"

            span.style.color = color;
            span.textContent = inputNumber;

            return span
        }

        const color = ((suit === 0 || suit === 2) && "hsl(0, 100%, 40%)") || "black";
        const span0 = createSpan();
        const span1 = createSpan()

        // Position each span individually and rotate the second
        span0.style.left = "1%";
        span0.style.top = "1%";

        span1.style.right = "5%";
        span1.style.bottom = "5%"
        span1.style.transform = "rotate(180deg)";

        // The symbols used on the face cards
        const symbol0 = document.createElement("img")
        symbol0.src = symbolSource
        symbol0.style.position = "absolute"
        symbol0.style.width = "100%";
        symbol0.style.bottom = "-100%"
        symbol0.style.left = "50%"
        symbol0.style.transform = "translateX(-50%)"

        const symbol1 = document.createElement("img")
        symbol1.src = symbolSource
        symbol1.style.position = "absolute"
        symbol1.style.width = "100%";
        symbol1.style.bottom = "-100%"
        symbol1.style.left = "50%"
        symbol1.style.transform = "translateX(-50%)"

        // If the card is an ace or a face card change the spans text content to corre
        if (inputNumber === 1) {
            span0.textContent = "A";
            span1.textContent = "A";

            span0.appendChild(symbol0)
            span1.appendChild(symbol1)
        } else
            if (inputNumber === 11) {
                span0.textContent = "J";
                span1.textContent = "J";

                span0.appendChild(symbol0)
                span1.appendChild(symbol1)
            } else
                if (inputNumber === 12) {
                    const symbol0 = document.createElement("img")
                    symbol0.src = symbolSource
                    symbol0.style.position = "absolute"
                    symbol0.style.width = "100%";
                    symbol0.style.bottom = "-100%"
                    symbol0.style.left = "50%"
                    symbol0.style.transform = "translateX(-50%)"

                    const symbol1 = document.createElement("img")
                    symbol1.src = symbolSource
                    symbol1.style.position = "absolute"
                    symbol1.style.width = "100%";
                    symbol1.style.bottom = "-100%"
                    symbol1.style.left = "50%"
                    symbol1.style.transform = "translateX(-50%)"

                    span0.textContent = "Q";
                    span1.textContent = "Q";
                    span0.style.width = '20%'
                    span1.style.width = '20%'

                    span0.appendChild(symbol0)
                    span1.appendChild(symbol1)
                } else
                    if (inputNumber === 13) {
                        const symbol0 = document.createElement("img")
                        symbol0.src = symbolSource
                        symbol0.style.position = "absolute"
                        symbol0.style.width = "100%";
                        symbol0.style.bottom = "-100%"
                        symbol0.style.left = "50%"
                        symbol0.style.transform = "translateX(-50%)"

                        const symbol1 = document.createElement("img")
                        symbol1.src = symbolSource
                        symbol1.style.position = "absolute"
                        symbol1.style.width = "100%";
                        symbol1.style.bottom = "-100%"
                        symbol1.style.left = "50%"
                        symbol1.style.transform = "translateX(-50%)"

                        span0.textContent = "K";
                        span1.textContent = "K";
                        span0.style.width = '20%'
                        span1.style.width = '20%'

                        span0.appendChild(symbol0)
                        span1.appendChild(symbol1)
                    }

        cardBody.append(span0, span1);
    }
    appendSpans();

    // Creates 3 equal sized coloums and returns them in an array
    function columns() {
        const columns = []
        for (let i = 0; i < 3; i++) {
            const column = document.createElement("div");
            columns.push(column);
        }
        return columns;
    }

    // create an array and assign each column as the appropriate variable
    const columnArray = columns();
    const leftColumn = columnArray[0];
    const centerColumn = columnArray[1];
    const rightColumn = columnArray[2];
    const allSymbols = [];

    if (typeof inputNumber === "number") {
        // Determine which symbol to load depending on the suit


        // Create as many symbols as the input value and add them to the allSymbols array 
        for (let i = 0; i < inputNumber; i++) {
            const symbolElement = document.createElement("img");

            symbolElement.src = symbolSource;
            symbolElement.style.height = "auto";
            symbolElement.style.width = "100%";
            symbolElement.style.alignitems = "space-between"
            symbolElement.style.margin = "auto"

            allSymbols.push(symbolElement)
        }
    }
    cardBody.append(leftColumn, centerColumn, rightColumn)
    // Define the original length for use in the calculations
    let originalLength = allSymbols.length;;


    // Append the appropriate symbols into columns


    if (originalLength < 4) {     // If there is 1 - 3 symbols they are all appended to the center column 
        allSymbols.forEach(Element => {
            centerColumn.append(Element)
        });
    } else if (allSymbols.length >= 4 && originalLength < 10) { //If there is 4 - 10 symbols put the symbols in 
        // IF there are an odd numnber of symbols add one to the center column
        if (originalLength % 2 === 1) {
            centerColumn.append(allSymbols.pop());
        }
        const leftOver = allSymbols.length;

        // Add a symbol to each outside column alernating to maintain the balance of the colums
        for (let i = 0; i < leftOver / 2; i++) {
            leftColumn.append(allSymbols.pop())
            rightColumn.append(allSymbols.pop())
        }
    } else if (originalLength === 10) {
        centerColumn.append(allSymbols.pop());
        centerColumn.append(allSymbols.pop());

        const leftOver = allSymbols.length;

        // Add a symbol to each outside column alernating to maintain the balance of the colums
        for (let i = 0; i < leftOver / 2; i++) {
            leftColumn.append(allSymbols.pop())
            rightColumn.append(allSymbols.pop())
        }
    } else if (originalLength === 11) {
        cardBody.style.backgroundImage = ((suit === 0 || suit === 2) && 'url("./assets/cardAssets/svg/jackRed.svg")') || 'url("./assets/cardAssets/svg/jackBlack.svg")'
        cardBody.style.backgroundRepeat = "no-repeat";
        cardBody.style.backgroundPosition = "center";

    } else if (originalLength === 12) {
        // IF it is a queen, apply the queen background image and paste in a symbol
        cardBody.style.backgroundImage = ((suit === 0 || suit === 2) && 'url("./assets/cardAssets/svg/queenRed.svg")') || 'url("./assets/cardAssets/svg/queenBlack.svg")'
        cardBody.style.backgroundRepeat = "no-repeat";
        cardBody.style.backgroundPosition = "center";
        cardBody.style.backgroundSize = "contain"
    } else if (originalLength === 13) {
        // IF it is a king, apply the king background image and paste in a symbol
        cardBody.style.backgroundImage = ((suit === 0 || suit === 2) && 'url("./assets/cardAssets/svg/kingRed.svg")') || 'url("./assets/cardAssets/svg/kingBlack.svg")'
        cardBody.style.backgroundRepeat = "no-repeat";
        cardBody.style.backgroundPosition = "center";
        cardBody.style.backgroundSize = "contain";
    }
    return cardBody
}



class ScoreKeeper {
    constructor() {
        this.playerStorageKey = "player"
        this.dealerStorageKey = "dealer"
        this.playerScore = this.loadPlayerScore()
        this.dealerScore = this.loadDealerScore()

    }
    saveScore() {
        localStorage.setItem(this.playerStorageKey, this.playerScore)
        localStorage.setItem(this.dealerStorageKey, this.dealerScore)
    }
    loadPlayerScore() {
        let score = 0;
        const saved = localStorage.getItem(this.playerStorageKey)
        if (saved) {
            score = parseInt(saved)
        }
        return score
    }
    loadDealerScore() {
        let score = 0;
        const saved = localStorage.getItem(this.dealerStorageKey)
        if (saved) {
            score = parseInt(saved)
        }
        return score
    }
    dealerWin() {
        this.dealerScore++
        this.saveScore()
    }
    playerWin() {
        this.playerScore++;
        this.saveScore()
    }
}

const score = new ScoreKeeper


class UI {
    constructor() {
        this.active = false;
        this.cardsDealt = 0
        // Bind the update function to the initial instance
        this.update = this.update.bind(this);
    }

    // This is a setup function that finds the addresses for the area to display each animation
    setup(playerTableDisplay, dealerTableDisplay, deckGraphic) {
        this.dealerBoardDisplay = dealerTableDisplay;
        this.playerBoardDisplay = playerTableDisplay;
        this.deckGraphic = deckGraphic;
    }
    // This is an init function that finds the addresses for the game objects from the games logic
    init(playerHand, dealerHand, deckEmpty) {
        this.dealerHand = dealerHand;
        this.playerHand = playerHand;
        this.deckEmpty = deckEmpty
    }

    async slideFromTo(element, orginElement, destinationElement) {
        while (this.active) {
            await new Promise((resolve) => setTimeout(resolve, 10))
        }

        this.active = true;

        destinationElement.append(element)

        const finalPosition = element.getBoundingClientRect();
        const initialPosition = orginElement.getBoundingClientRect()

        const xAxisdistance = (finalPosition.x - initialPosition.x) * -1
        const yAxisDistance = (finalPosition.y - initialPosition.y) * -1

        const animation = element.animate(
            [
                { transform: `translate(${xAxisdistance}px, ${yAxisDistance}px)` },
                { transform: "translate(0 , 0) rotate(360deg)" }
            ],
            {
                duration: 500,
                iterations: 1
            }
        )
        await animation.finished

        this.active = false
    }

    slideToDealer(element) {
        this.dealerBoardDisplay.dataset.gameOver = "false"
        this.slideFromTo(element, this.deckGraphic, this.dealerBoardDisplay)
    }

    slideToPlayer(element) {
        this.slideFromTo(element, this.deckGraphic, this.playerBoardDisplay)
    }

    async animateShuffle() {
        this.active = true

        const slideIn = this.deckGraphic.animate(
            [
                { transform: `translateX(-20vw)` },
                { transform: "translateX(0)" }
            ],
            {
                duration: 2000,
                iterations: 1
            }
        )
        await slideIn.finished


        this.deckGraphic.setAttribute("data-shuffle", "true")

        await new Promise((resolve) => setTimeout(resolve, 1500))

        this.deckGraphic.setAttribute("data-shuffle", "false")

        this.active = false
    }

    async slideAway(element) {
        // Commented out to allow multiple cards to slide at a time
        // while (this.active) {
        //     await new Promise((resolve) => setTimeout(resolve, 10))
        // }

        this.active = true;


        const animation = element.animate(
            [
                { transform: `translateX(0)` },
                { transform: "translateX(100vw)" }
            ],
            {
                duration: 1000,
                iterations: 1
            }
        )
        await animation.finished

        element.parentNode.removeChild(element)

        this.active = false
    }

    revealCard() {
        function getTotal(hand) {
            const aces = []
            const values = []
            let total = 0;

            // Remove the aces as they must be added last
            hand.forEach(card => {
                if (card.value === 0) {
                    aces.push(card.value)
                } else { values.push(card.value) }
            })

            // If the card is a 1-10 append the value; otherwise add 10 for a face card
            values.forEach(value => {
                if (value < 10) {
                    total += value + 1
                } else {
                    total += 10
                }
            })

            aces.forEach(value => {
                total += 1
                if (total + 10 <= 21) {
                    total += 10
                }
            })

            return total
        }

        this.dealerBoardDisplay.dataset.gameOver = "true"
        this.dealerBoardDisplay.previousElementSibling.textContent = getTotal(this.dealerHand)
        return
    }

    hideCard() {
        this.dealerBoardDisplay.dataset.gameOver = "false"
        this.dealerBoardDisplay.previousElementSibling.textContent = ""
    }

    // Provide this function with the current hand and the where to display and it will make sure the appropiate cards are added
    updateTable(hand, handDisplay) {
        // // If something is still animating wait and check again in 10ms
        // while (this.active) {
        //     await new Promise((resolve) => setTimeout(resolve, 10))
        // }

        // Get all of the current card in the display
        // Create an empty array to push card objects to
        const displayedCard = Array.from(handDisplay.children)
        const existingDisplay = []

        // Creates an object that has the value and suit
        // Pushes that object for each card in the display to the existing display array
        displayedCard.forEach(card => {
            const cardObject = {
                value: parseInt(card.dataset.value),
                suit: parseInt(card.dataset.suit)
            }
            existingDisplay.push(cardObject)
        })

        // Find the extra cards by checking if the cards from the display exist in the hand

        // If they dont exist in the hand they are added to the extraCards array
        const extraCards = existingDisplay.filter(cardObject => {
            const exists = hand.some(existingCard => {

                const suit = cardObject.suit

                return cardObject.value === existingCard.value && suit === existingCard.suit
            })
            return !exists
        })

        const displayed = Array.from(handDisplay.children)

        displayed.forEach(element => {
            extraCards.forEach(cardObject => {
                if (cardObject.value === parseInt(element.dataset.value) && cardObject.suit === parseInt(element.dataset.suit)) {
                    this.slideAway(element)
                }
            })
        })


        // This will create an array that contains cardObjects with the existing display information
        const graphicsUpdate = hand.filter(card => {
            const exists = existingDisplay.some(existingCard => {
                const suit =
                    existingCard.suit

                // Card object was created with the value
                return card.value === existingCard.value && card.suit === suit
            });
            return !exists
        });


        // // Add one new cards into the deck
        if (graphicsUpdate.length > 0) {
            const suit = graphicsUpdate[0].suit;
            const value = graphicsUpdate[0].value;
            const cardElement = createCard(value, suit);

            this.slideFromTo(cardElement, this.deckGraphic, handDisplay)
            this.cardsDealt++
        }


    }

    updateScore() {
        // TODO: Get the sums from each hand and append it to the dom in the appropriate place
        function getTotal(hand) {
            const aces = []
            const values = []
            let total = 0;

            // Remove the aces as they must be added last
            hand.forEach(card => {
                if (card.value === 0) {
                    aces.push(card.value)
                } else { values.push(card.value) }
            })

            // If the card is a 1-10 append the value; otherwise add 10 for a face card
            values.forEach(value => {
                if (value < 10) {
                    total += value + 1
                } else {
                    total += 10
                }
            })

            aces.forEach(value => {
                total += 1
                if (total + 10 <= 21) {
                    total += 10
                }
            })

            return total
        }

        this.playerBoardDisplay.previousElementSibling.textContent = getTotal(this.playerHand)
    }
    updateRunningScore() {
        const dealerDisplay = document.querySelector("#dealerScoreBoard");
        const playerDisplay = document.querySelector("#playerScoreBoard");

        dealerDisplay.textContent = score.dealerScore
        playerDisplay.textContent = score.playerScore
    }

    async update(timestamp) {
        // If something is still animating wait and check again in 10ms
        while (this.active) {
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
        class ScoreKeeper {
            constructor() {
                this.playerStorageKey = "player"
                this.dealerStorageKey = "dealer"
                this.playerScore = this.loadPlayerScore()
                this.dealerScore = this.loadDealerScore()

            }
            saveScore() {
                localStorage.setItem(this.playerStorageKey, this.playerScore)
                localStorage.setItem(this.dealerStorageKey, this.dealerScore)
            }
            loadPlayerScore() {
                let score = 0;
                const saved = localStorage.getItem(this.playerStorageKey)
                if (saved) {
                    score = parseInt(saved)
                }
                return score
            }
            loadDealerScore() {
                let score = 0;
                const saved = localStorage.getItem(this.dealerStorageKey)
                if (saved) {
                    score = parseInt(saved)
                }
                return score
            }
            dealerWin() {
                this.dealerScore++
                this.saveScore()
            }
            playerWin() {
                this.playerScore++;
                this.saveScore()
            }
        }

        // Update both Tables
        this.updateTable(this.playerHand, this.playerBoardDisplay)
        this.updateTable(this.dealerHand, this.dealerBoardDisplay)

        this.updateScore()
        this.updateRunningScore()
        requestAnimationFrame(this.update)
    }

    start() {
        requestAnimationFrame(this.update)
    }
}

const ui = new UI;
ui.setup(document.querySelector("#player"), document.querySelector("#dealer"), document.querySelector("#deck"))


