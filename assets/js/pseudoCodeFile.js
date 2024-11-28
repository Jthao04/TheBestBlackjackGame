let ace = false;
switch(card+1) {  
  case 1:
   //The card is an ace which can be equal to 1 or 11
    if(score<12){      
      score +=11;
      let aces=true;
    }
    else {
      score +=1;
    }
      break;
  //Cards 2 thru 9
  case 2:              
  case  9:
    score +=card;
    break;
  //Cards 10, Jack, Queen, King
  case 10:            
  case 13:
    score +=10;
    break;
}

//This condition is to check in the event the player busted with their last card drawn to see if they previously had an ace that was worth 11 points in the event there was an ace in the hand it subtracs 10 from the score so the current card no longer caused the player to bust.
if(score>21 && ace){  
  score -= 10;        
  ace = false;
}
