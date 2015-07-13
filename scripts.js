
var deck = [];
var playerHand = [];

for (var i = 0; i< 52; i++){
  var j = (Math.floor(Math.random() * i));
  if (j != i){deck [i] = deck[j]}
  deck[j] = i;
}

var cardValue = function (card) {
  var index = Math.floor((card/4) + 1);
  if (index == 1){index = 11;}
  if (index > 10){index = 10;}
  return index;
}

var cardString = function(card){
  var index =  Math.floor((card/4) + 1);
  var suits = ['&spades;', '&clubs;', '&hearts;', '&diamonds;'];
  var string =''
  if (card % 4 === 0){string += suits[0]}
  $('.card').html(string);
}

console.log(deck)
    $('#hit').on('click', function (){
      console.log('test')
    })
