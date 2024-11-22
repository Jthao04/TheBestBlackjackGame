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


var cardsArray = shuffle();
console.log(cardsArray);