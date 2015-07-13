var currentBet = 25;
var playerDiv = -1;
var dealerDiv = -1;
var deck = [];
var playerHand = [];
var dealerHand = [];
var money = 500;
var dealerValue = 0;
var playerValue = 0;

for (var i = 0; i< 52; i++){
  var j = (Math.floor(Math.random() * i));
  if (j != i){deck [i] = deck[j]}
  deck[j] = i;
}

var cardValue = function (card) {
  var index = Math.floor((card/4) + 1);
  if (index === 1){index = 11;}
  else if (index > 10){index = 10;}
  return index;
}

var cardString = function(card){
  var index =  Math.floor((card/4) + 1);
  var suit = card % 4;
  var suits = ['&spades;', '&clubs;', '&hearts;', '&diams;'];
  var string ='';
    //# assignment based on cards 0-14 A low, K high
    if (1 < index < 11){string += index}
    if (index === 13){string = 'K'}
    if (index === 12){string = 'Q'}
    if (index === 11){string = 'J'}
    if (index === 1){string = 'A'}
    //suit assignment based on remainder
    if (suit === 0){string += suits[0]}
    if (suit === 1){string += suits[1]}
    if (suit === 2){string += suits[2]}
    if (suit === 3){string += suits[3]}
    return string;
}

var toHand = function(card) {
  var playerCard = deck.pop();
  playerHand.push(playerCard);

  return playerCard;
}

var toDealerHand = function(card) {
  var dealerCard = deck.pop();
  dealerHand.push(dealerCard);
  return dealerCard;
}
var handTotal = function (array) {
    var player = 0;
    for( var i = 0; i < array.length; i++){
      player += cardValue(array[i]);
    }

    return player
}

var dealer = function(){

  var string = cardString(toDealerHand());
  $('<div><div>').addClass('dealerCard').appendTo('.dealerArea')
  $('<div><div>').addClass('hiddenCard').appendTo('.dealerArea')
    dealerDiv +=1;
  $('.dealerCard').eq(dealerDiv).html(string);
}


var hit = function() {
  var string = cardString(toHand());
    $('<div><div>').addClass('playerCard').appendTo('.playerArea');
        playerDiv +=1;
      $('.playerCard').eq(playerDiv).html(string);
      $('.playerTotal').html('Player Hand: ' + handTotal(playerHand))

      if(handTotal(playerHand) > 21) {alert('You busted!')}

}
$(document).ready (function (){

//Hit Button Click Event
  $('#hit').on('click', function (){
        hit();

      })

  $('#stand').on('click', function(){

    alert ('You chose to stand on ' + handTotal(playerHand));
    $('.hiddenCard').remove();

    var string = cardString(toDealerHand());
      $('<div><div>').addClass('dealerCard').appendTo('.dealerArea')
        dealerDiv +=1;
      $('.dealerCard').eq(dealerDiv).html(string);


    if (handTotal(dealerHand) < 17) {
        $('<div><div>').addClass('dealerCard').appendTo('.dealerArea')
        dealerDiv+=1;
        $('.dealerCard').eq(dealerDiv).html(string);
    }

    else if (handTotal(dealerHand)> 21){
      alert('Dealer Busted! You win!');
    }
    else if (17 <= handTotal(dealerHand) < 21 ){
      console.log('Dealer has ' + handTotal(dealerHand));
    }

  })

  $('#deal').on('click', function(){
    $('.dealerCard').remove();
    dealer();

  })

  $('#increaseBet').on('click', function(){
    currentBet += 25;
    if (currentBet <= money){$('.bet').html('Current Bet: $' + currentBet)}
    else {alert('Not Enough Money!')}
  })
})
