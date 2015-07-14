var currentBet = 25;
var playerDiv = -1;
var dealerDiv = -1;
var dealerFace = -1;
var playerFace = -1;
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
    $('<div></div>').addClass('dealerCard').appendTo('.dealerArea')
    $('<div></div>').addClass('hiddenCard').appendTo('.dealerArea')
      dealerDiv +=1;
    $('<div></div>').addClass('face').appendTo('.dealerCard').eq(dealerDiv)
    $('.dealerArea .face').eq(dealerFace).html(string);
    dealerFace +=1;
    for(var i =0; i < 2; i++){
      hit();
    }
    $('.playerTotal').text('Player Total: ' + handTotal(playerHand));

    if (handTotal(playerHand) === 21 && playerHand.length === 2) {
      alert('Blackjack! You win!')
      money += currentBet
      $('.money').text('Money: ' + money);
    }

}


var hit = function() {
  var string = cardString(toHand());
    $('<div><div>').addClass('playerCard').appendTo('.playerArea');
        playerDiv +=1;
    $('<div></div>').addClass('face').appendTo($('.playerCard').eq(playerDiv))
      playerFace += 1;
    $('.playerArea .face').eq(playerFace).html(string);
    $('.playerTotal').text('Player Total: ' + handTotal(playerHand))
      if(handTotal(playerHand) > 21) {alert('You busted!')}

}

var cashier = function() {
    var money = 500
    $('.money').text('Money: $' + money)

}

var resetGame = function() {
  $('.dealerCard').remove();
  $('.playerCard').remove();
  playerDiv =-1;
  dealerDiv =-1;
  playerFace = -1;
  dealerFace = -1;
  dealerHand = [];
  playerHand = [];
}

var checkWin = function (){
  var playerTotal = handTotal(playerHand)
  var dealerTotal = handTotal(dealerHand)
    if(dealerTotal > 21){money += currentBet}
    if (playerTotal < 21 && playerTotal > dealerTotal){
      alert('You Win!');
      money+=currentBet;
      $('.money').text('Money: $' + money)
  }
  if (dealerTotal <= 21 && dealerTotal > playerTotal){
    alert('Dealer Wins!')
    money = (money - currentBet)
    $('.money').text('Money: $' + money)
  }
  if (playerTotal === dealerTotal){alert('Push')}
}

$(document).ready (function (){
$('.money').text('Money: $' + money)

//Hit Button Click Event
  $('#hit').on('click', function (){
        hit();
        var playerTotal = handTotal(playerHand);
      })

  $('#stand').on('click', function(){

    alert ('You chose to stand on ' + handTotal(playerHand));
    $('.hiddenCard').remove();
    var dealerHit = true
    while (dealerHit === true){
    var string = cardString(toDealerHand());
      $('<div></div>').addClass('dealerCard').appendTo('.dealerArea');
      dealerDiv += 1;
      $('<div></div>').addClass('face').appendTo($('.dealerCard').eq(dealerDiv))
      dealerFace += 1;
      $('.dealerArea .face').eq(dealerFace).html(string);


      if (handTotal(dealerHand) > 21){
        alert('Dealer Has Busted!');
        dealerHit = false;
        money += currentBet;
        $('.money').text('Money: $' + money)
      }
      else if (17 <= handTotal(dealerHand) && handTotal(dealerHand) <= 21){
        dealerHit = false;
      }
    }
    checkWin();
  })
  $('#deal').on('click', function(){
    resetGame();
    dealer();
  })
  $('#increaseBet').on('click', function(){
    currentBet += 25;
    if (currentBet <= money){$('.bet').html('Current Bet: $' + currentBet)}
    else {alert('Not Enough Money!')}
    })

  $('#cashier').on('click', cashier)

})
