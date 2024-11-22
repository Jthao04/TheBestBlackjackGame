
/* This function creates an array to index the cards for the game.  It first creates the 52 indexes sequentially, after doing so it shuffles them into a random order returning the randomized array.
*/
function shuffle() {
    for (var array=[],i=0;i<52;++i)
        array[i]=i+1;
   
    var tmp, current, top = array.length;

    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
return array;
}


function cardBody(number, face) {
    const cardBody = document.createElement("div");
    cardBody.className = "playingCard"
    cardBody.style.backgroundColor = "hsl(48, 39%, 83%)";
    cardBody.style.display = "flex";
    cardBody.style.width = "2.5in";
    cardBody.style.height = "3.5in";
    cardBody.style.borderRadius = "10px";
    cardBody.style.position = "relative";
    cardBody.style.padding = "15px"

    function appendSpans() {
        const color = ((suit === "heart" || suit === "diamond") && "red") || "black";
        const span0 = document.createElement("span");
        span0.style.position = "absolute";
        span0.style.fontSize = "32px";
        span0.style.fontWeight = "bolder";
        span0.style.fontFamily = "serif";
        span0.style.left = "10px";
        span0.style.top = "10px"
        span0.style.color = color;
        span0.textContent = inputNumber

        const span1 = document.createElement("span");
        span1.style.position = "absolute";
        span1.style.fontSize = "32px";
        span1.style.fontWeight = "bolder";
        span1.style.fontFamily = "serif";
        span1.style.right = "10px";
        span1.style.bottom = "10px"
        span1.style.transform = "rotate(180deg)";
        span1.style.color = color;
        span1.textContent = inputNumber
        if (number === 11) {
            span0.textContent = "J";
            span1.textContent = "J";
        }
        if (number === 12) {
            span0.textContent = "Q";
            span1.textContent = "Q";
        }
        if (number === 13) {
            span0.textContent = "K";
            span1.textContent = "K";
        }

        cardBody.append(span0, span1)
    }
    appendSpans();
    function columnns() {
        const columnns = []
        for (let i = 0; i < 3; i++) {
            const columnn = document.createElement("div");
            columnn.style.display = "flex";
            columnn.style.flexDirection = "column";
            columnn.style.flex = "1";
            columnn.style.height = "100%"
            columnns.push(columnn)

        }
        return columnns
    }

    const columnnArray = columnns();
    const leftColumnn = columnnArray[0]
    const centerColumnn = columnnArray[1]
    const rightColumnn = columnnArray[2]
    const allSymbols = [];

    if (typeof inputNumber === "number") {
        const symbolSource = (suit === "heart" && "./assets/cardAssets/symbols/hearts.png") ||
            (suit === "club" && "./assets/cardAssets/symbols/clubs.png") ||
            (suit === "diamond" && "./assets/cardAssets/symbols/diamonds.png") ||
            (suit === "spade" && "./assets/cardAssets/symbols/spades.png");
        for (let i = 0; i < inputNumber; i++) {
            const symbolElement = document.createElement("img");

            symbolElement.src = symbolSource;
            symbolElement.style.height = "auto";
            symbolElement.style.width = "50%";
            symbolElement.style.alignitems = "space-between"
            symbolElement.style.margin = "auto"

            allSymbols.push(symbolElement)
        }
    }
    cardBody.append(leftColumnn, centerColumnn, rightColumnn)

    if (allSymbols.length < 4) {
        allSymbols.forEach(Element => {
            centerColumnn.append(Element)
        });
    }
    let originalLength = allSymbols.length;;
    if (allSymbols.length >= 4 && allSymbols.length <= 10) {
        if (originalLength % 2 === 1) {
            centerColumnn.append(allSymbols.pop());
        }
        originalLength = allSymbols.length;
        for (let i = 0; i < originalLength / 2; i++) {
            leftColumnn.append(allSymbols.pop())
            rightColumnn.append(allSymbols.pop())
        }
    }
    if (allSymbols.length === 11) {
        cardBody.style.backgroundImage = ((suit === "heart" || suit === "diamond") && 'url("./assets/cardAssets/svg/jackRed.svg")') || 'url("./assets/cardAssets/svg/jackBlack.svg")'
        cardBody.style.backgroundRepeat = "no-repeat";
        cardBody.style.backgroundPosition = "center";
        centerColumnn.append(allSymbols.pop(), allSymbols.pop())

    } else if (allSymbols.length === 12) {
        cardBody.style.backgroundImage = ((suit === "heart" || suit === "diamond") && 'url("./assets/cardAssets/svg/queenRed.svg")') || 'url("./assets/cardAssets/svg/queenBlack.svg")'
        cardBody.style.backgroundRepeat = "no-repeat";
        cardBody.style.backgroundPosition = "center";
        cardBody.style.backgroundSize = "contain"
        centerColumnn.append(allSymbols.pop())
    } else if (allSymbols.length === 13) {
        cardBody.style.backgroundImage = ((suit === "heart" || suit === "diamond") && 'url("./assets/cardAssets/svg/kingRed.svg")') || 'url("./assets/cardAssets/svg/kingBlack.svg")'
        cardBody.style.backgroundRepeat = "no-repeat";
        cardBody.style.backgroundPosition = "center";
        cardBody.style.backgroundSize = "contain";
        centerColumnn.append(allSymbols.pop());
    }

    return cardBody
}
document.body.append(cardBody(10, "heart"))