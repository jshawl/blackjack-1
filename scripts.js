
var deck = [];
var playerHand = [];

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
$(document).ready (function (){
    var div = -1;

    $('#hit').on('click', function (){
      var string = cardString(toHand());
      $('<div><div>').addClass('card').appendTo('.playerArea');
        div ++
        $('.card').eq(div).html(string);
        playerTotal();
  })
})

var playerTotal = function (card) {
    var player = 0;
    for( var i = 0; i < playerHand.length; i++){

      player += cardValue(playerHand[i]);

      console.log(player);
    }

    $('.playerTotal').html('Player Hand: ' + player)
}
