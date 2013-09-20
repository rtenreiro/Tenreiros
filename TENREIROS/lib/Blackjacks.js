/* globlal*/
var suit = ['c', 'd', 'h', 's'];
var rank = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'];
var deck = new Array(52);
for (var i = 0; i < rank.length; ++i){
    for (var j = 0; j < suit.length; ++j){
        deck[i*suit.length + j] = rank[i] + suit[j];
    }}

var audioSupported = !!document.createElement('audio').play;

function playSound(soundId){
    if (document.getElementById("play_sounds").checked)
        if (audioSupported) {
            var sound = document.getElementById(soundId);
            if (sound.currentTime != 0) {
                sound.pause();
                sound.currentTime = 0;
            }
            sound.play();
        }}    

function shuffle(){
    for (var i = 0; i < deck.length; ++i){
        var r = i + Math.floor(Math.random() * (52 - i));
        var temp = deck[i];
        deck[i] = deck[r];
        deck[r] = temp;
    }
    playSound("shuffle");
}

shuffle();

var ptr = 0;
var dealer_cards = new Array(6);
var player_cards = new Array(6);
var split_cards = new Array(6);
var bank = 100;
var hasSplit = false;
var splitHand = 0;

function deal(){
    var bet = parseInt(document.getElementById("bet_amount").value);
    if (bet < 1)
        alert("La apueta minima es 1!");
    else if (bank - bet < 0)
        alert("No tienes dinero para apostar!");
    else{
        document.getElementById("Deal").disabled = true;
        document.getElementById("bet_amount").disabled = true;
        
        // cleanup previous hand
        document.getElementById("split_hand").className = "";
        document.getElementById("player_over").style.visibility = "hidden";
        document.getElementById("dealer_over").style.visibility = "hidden";
        document.getElementById("split_over").style.visibility = "hidden";
        document.getElementById("player_over").innerHTML = "";
        document.getElementById("dealer_over").innerHTML = "";
        document.getElementById("split_over").innerHTML = "";
        document.getElementById("dealers_score").innerHTML = "";
        document.getElementById("players_score").innerHTML = "";
        document.getElementById("split_score").innerHTML = "";
        hasSplit = false;
        splitHand = 0;
        for (var i = 0; i < 6; ++i){
            dealer_cards[i] = "";
            var card_img = document.getElementById("dealer_card" + (i + 1));
            card_img.src = "images/card_back.png";
            card_img.style.visibility = "hidden";
            player_cards[i] = "";
            var card_img = document.getElementById("player_card" + (i + 1));
            card_img.src = "images/card_back.png";
            card_img.style.visibility = "hidden";
            split_cards[i] = "";
            var card_img = document.getElementById("split_card" + (i + 1));
            card_img.src = "images/card_back.png";
            card_img.style.visibility = "hidden";
        }
        
        // start new deck if necessary
        var time = 0;
        if (ptr > 37){
            shuffle();
            ptr = 0;
            if (document.getElementById("play_sounds").checked)
                time += 1000;
        }
        
        // deal cards
        player_cards[0] = deck[ptr++];
        document.getElementById("player_card1").src = "images/75/" + player_cards[0] + ".png";
        window.setTimeout("makeVisible('player_card1')", time += 100);
        dealer_cards[0] = deck[ptr++];
        document.getElementById("dealer_card1").src = "images/card_back.png";
        window.setTimeout("makeVisible('dealer_card1')", time += 250);
        player_cards[1] = deck[ptr++];
        document.getElementById("player_card2").src = "images/75/" + player_cards[1] + ".png";
        window.setTimeout("makeVisible('player_card2')", time += 250);
        dealer_cards[1] = deck[ptr++];
        document.getElementById("dealer_card2").src = "images/75/" + dealer_cards[1] + ".png";
        window.setTimeout("makeVisible('dealer_card2')", time += 250);
        
        var player_score = scoreCards(player_cards);
        window.setTimeout("updateScore('players_score', " + player_score + ")", time += 200);
        var dealer_score = scoreCards(dealer_cards);
        if (player_score == 21){
            window.setTimeout("displayOver('player_over', 'blackjack!')", time += 250);
            window.setTimeout("playSound('win')", time);
            bank += Math.floor(bet * 1.5);
            window.setTimeout("updateBank(" + bank + ")", time += 100);
            nextGame(time);
        }
        else if (dealer_score == 21){
            window.setTimeout(showDealerCard, time += 300);
            window.setTimeout("updateScore('dealers_score', " + dealer_score + ")", time += 100);
            window.setTimeout("displayOver('dealer_over', 'blackjack!')", time += 150);
            window.setTimeout("playSound('lose')", time);
            bank -= bet;
            window.setTimeout("updateBank(" + bank + ")", time += 100);
            nextGame(time);
        }
        else{
            // var enableDouble = (player_score == 10 || player_score == 11);
            var enableDouble = true;
            var enableSplit = (player_cards[0].charAt(0) == player_cards[1].charAt(0));
            window.setTimeout("enableButtons(" + enableDouble +", " + enableSplit + ")", time);
        }}}

function hit(){
    document.getElementById("Split").disabled = true;
    document.getElementById("Double").disabled = true;
    var time = 0;
    var ret = 0;
    if (hasSplit && splitHand == 1){
        var c = 2;
        while (split_cards[c] != "")
            c++;
        split_cards[c] = deck[ptr++];
        showCard("split_card" + (c + 1), split_cards[c]);
        var split_score = scoreCards(split_cards);
        document.getElementById("split_score").innerHTML = split_score;
        if (split_score > 21){
            window.setTimeout("displayOver('split_over', 'Mas de 21!')", time += 250);
            window.setTimeout("playSound('lose')", time);
            var bet = parseInt(document.getElementById("bet_amount").value);
            bank -= bet;
            window.setTimeout("updateBank(" + bank + ")", time += 100);
            var player_score = scoreCards(player_cards);
            if (player_score > 21)
                nextGame(time);
            else
                ret = playDealer(time);
        }
        else if (split_score == 21)
            playDealer(250);
        else
            document.getElementById("Stand").focus();
    }
    else{
        var c = 2;
        while (player_cards[c] != "")
            c++;
        player_cards[c] = deck[ptr++];
        showCard("player_card" + (c + 1), player_cards[c]);
        var player_score = scoreCards(player_cards);
        document.getElementById("players_score").innerHTML = player_score;
        if (player_score > 21){
            window.setTimeout("displayOver('player_over', 'Te pasaste!')", time += 250);
            window.setTimeout("playSound('lose')", time);
            var bet = parseInt(document.getElementById("bet_amount").value);
            bank -= bet;
            window.setTimeout("updateBank(" + bank + ")", time += 100);
            if (hasSplit)
                playSplitHand(time += 150);
            else
                nextGame(time);
        }
        else if (player_score == 21){
            if (hasSplit)
                playSplitHand(250);
            else
                ret = playDealer(250);
        }
        else
            document.getElementById("Stand").focus();
    }
    return ret;
}

function stand(){
    if (hasSplit && splitHand == 0)
        playSplitHand();
    else
        playDealer(0);
}

function doubleDown(){
    var bet = parseInt(document.getElementById("bet_amount").value);
    document.getElementById("bet_amount").value = 2 * bet;
    var time = hit();
    // hit() plays dealer if player score is 21, don't repeat.
    var player_score = scoreCards(player_cards);
    if (player_score < 21)
        time = playDealer(0);
    window.setTimeout("updateBet(" + bet + ")", time);
}

function splitCards(){
    document.getElementById("Split").disabled = true;
    split_cards[0] = player_cards[1];
    player_cards[1] = deck[ptr++];
    showCard("player_card2", player_cards[1]);
    showCard("split_card1", split_cards[0]);
    document.getElementById("split_hand").className = "show";
    document.getElementById("split_score").innerHTML = "";
    var player_score = scoreCards(player_cards);
    document.getElementById("players_score").innerHTML = player_score;
    hasSplit = true;
    if (player_score == 21){
        displayOver("player_over", "BLACKJACK!");
        var bet = parseInt(document.getElementById("bet_amount").value);
        bank += Math.floor(bet * 1.5);
        document.getElementById("money_amount").innerHTML = bank;
        playSplitHand();
    }}

function playDealer(delay){
    var time = delay;
    window.setTimeout(showDealerCard, time += 100);
    var dealer_score = scoreCards(dealer_cards);
    window.setTimeout("updateScore('dealers_score', " + dealer_score + ")", time += 75);
    var c = 2;
    while (dealer_score < 17){
        dealer_cards[c] = deck[ptr++];
        window.setTimeout("showCard('dealer_card" + (c + 1) + "', '" + dealer_cards[c] + "')", time += 250);
        dealer_score = scoreCards(dealer_cards);
        window.setTimeout("updateScore('dealers_score', " + dealer_score + ")", time += 75);
        c++;
    }
    var bet = parseInt(document.getElementById("bet_amount").value);
    var player_score = scoreCards(player_cards);
    var split_score;
    if (hasSplit)
        split_score = scoreCards(split_cards);
    if (dealer_score > 21){
        window.setTimeout("displayOver('dealer_over', 'Se paso la Mesa!')", time += 100);
        if (player_score <= 21){
            window.setTimeout("displayOver('player_over', '¡GANASTE!')", time += 250);
            window.setTimeout("playSound('win')", time);
            bank += bet;
        }
        if (hasSplit && split_score <= 21){
            window.setTimeout("displayOver('split_over', '¡GANASTE!')", time += 250);
            window.setTimeout("playSound('win')", time);
            bank += bet;
        }}
    else{
        if (hasSplit){
            if (player_score > dealer_score && player_score <= 21){
                var over = document.getElementById("player_over");
                if (over.innerHTML == ""){
                    window.setTimeout("displayOver('player_over', '¡GANASTE!')", time += 250);
                    window.setTimeout("playSound('win')", time);
                    bank += bet;
                }}
            else if (dealer_score > player_score){
                window.setTimeout("displayOver('player_over', '¡PERDISTE!')", time += 250);
                window.setTimeout("playSound('lose')", time);
                bank -= bet;
            }
            else if (player_score == dealer_score){
                var over = document.getElementById("player_over");
                if (over.innerHTML == ""){
                    window.setTimeout("displayOver('player_over', 'Empuje!')", time += 250);
                }}
            if (split_score > dealer_score && split_score <= 21){
                var over = document.getElementById("split_over");
                if (over.innerHTML == ""){
                    window.setTimeout("displayOver('split_over', '¡GANASTE!')", time += 250);
                    window.setTimeout("playSound('win')", time);
                    bank += bet;
                }}
            else if (dealer_score > split_score){
                window.setTimeout("displayOver('split_over', '¡PERDISTE!')", time += 250);
                window.setTimeout("playSound('lose')", time);
                bank -= bet;
            }
            else if (split_score == dealer_score){
                var over = document.getElementById("split_over");
                if (over.innerHTML == ""){
                    window.setTimeout("displayOver('split_over', 'push!')", time += 250);
                }}}
        else if (player_score > dealer_score){
            window.setTimeout("displayOver('player_over', '¡GANASTE!')", time += 250);
            window.setTimeout("playSound('win')", time);
            bank += bet;
        }
        else if (dealer_score > player_score){
            window.setTimeout("displayOver('dealer_over', '¡PERDISTE!')", time += 250);
            window.setTimeout("playSound('lose')", time);
            bank -= bet;}
        else if (player_score == dealer_score){
            window.setTimeout("displayOver('player_over', 'push!')", time += 250);
        }}
    window.setTimeout("updateBank(" + bank + ")", time += 100);
    nextGame(time);
    return time;
}

function playSplitHand(delay){
    var time = delay;
    splitHand = 1;
    split_cards[1] = deck[ptr++];
    window.setTimeout("showCard('split_card2', '" + split_cards[1] + "')", time)
    var splitScore = scoreCards(split_cards);
    window.setTimeout("updateScore('split_score', " + splitScore + ")", time += 100);
    if (splitScore == 21){
        window.setTimeout("displayOver('split_over', 'BLACKJACK!')", time += 150);
        window.setTimeout("playSound('win')", time);
        var bet = document.getElementById("bet_amount").value;
        bank += Math.floor(bet * 1.5);
        window.setTimeout("updateBank(" + bank + ")", time += 100);
        playDealer(time += 150);
    }}

var scoreRanks = new Array();
scoreRanks['2'] = 2;
scoreRanks['3'] = 3;
scoreRanks['4'] = 4;
scoreRanks['5'] = 5;
scoreRanks['6'] = 6;
scoreRanks['7'] = 7;
scoreRanks['8'] = 8;
scoreRanks['9'] = 9;
scoreRanks['t'] = 10;
scoreRanks['j'] = 10;
scoreRanks['q'] = 10;
scoreRanks['k'] = 10;
scoreRanks['a'] = 11;

function scoreCards(cards){
    var score = 0;
    var aces = 0;
    for (var i = 0; i < 6; ++i){
        var card = cards[i];
        if (card != ""){
            var card_val = scoreRanks[card.charAt(0)];
            if (card_val == 11)
                aces++;
            score += card_val;
        }}
    while (score > 21 && aces-- > 0)
        score -= 10;
    return score;
}

function displayOver(overId, displayText){
    var over = document.getElementById(overId);
    over.innerHTML = displayText;
    var cards;
    switch(overId)
    {
        case "dealer_over":
            cards = dealer_cards;
            break;
        case "player_over":
            cards = player_cards;
            break;
        case "split_over":
            cards = split_cards;
            break;
    }
    var numcards = 0;
    while (cards[numcards] != "" && numcards < 6)
        numcards++;
    var leftpx = 370 + (numcards - 2) * 84;
    over.style.left = leftpx + "px";
    over.style.visibility = "visible";
}

document.getElementById("Deal").onclick = function(){ deal(); };
document.getElementById("Hit").onclick = function(){ hit(); };
document.getElementById("Stand").onclick = function(){ stand(); };
document.getElementById("Split").onclick = function(){ splitCards(); };
document.getElementById("Double").onclick = function(){ doubleDown(); };

window.onload = function(){
    bank = 100;
    nextGame(0);
    window.setTimeout(preloadImages, 1000);
}

function nextGame(delay){
    document.getElementById("Deal").disabled = true;
    document.getElementById("Hit").disabled = true;
    document.getElementById("Stand").disabled = true;
    document.getElementById("Split").disabled = true;
    document.getElementById("Double").disabled = true;
    document.getElementById("bet_amount").disabled = true;
    window.setTimeout(startGame, delay);
}

function startGame(){
    document.getElementById("Deal").disabled = false;
    document.getElementById("bet_amount").disabled = false;
    document.getElementById("Deal").focus();
    
}

function enableButtons(enableDouble, enableSplit){
    document.getElementById("Deal").disabled = true;
    document.getElementById("Hit").disabled = false;
    document.getElementById("Stand").disabled = false;
    document.getElementById("Stand").focus();
    document.getElementById("Double").disabled = !enableDouble;
    document.getElementById("Split").disabled = !enableSplit;
}

function makeVisible(elemId){
    document.getElementById(elemId).style.visibility = "visible";
    playSound("card_drop");
}

function updateScore(scoreId, score){
    document.getElementById(scoreId).innerHTML = score;
}

function updateBank(moneyAmount){
    document.getElementById("money_amount").innerHTML = moneyAmount;
}

function updateBet(bet){
    document.getElementById("bet_amount").value = bet;
}

function showDealerCard(){
    var card_img = document.getElementById("dealer_card1");
    card_img.className = "flat";
    window.setTimeout("showCard('dealer_card1', '" + dealer_cards[0] + "')", 100);
}

function showCard(elemId, card){
    var card_img = document.getElementById(elemId);
    card_img.src = "images/75/" + card + ".png";
    card_img.style.visibility = "visible";
    card_img.className = "";
    playSound("card_drop");
}


var imgs = new Array(52);

function preloadImages(){
    for (var i = 0; i < deck.length; ++i){
        imgs[i] = new Image();
        imgs[i].src = "images/75/" + deck[i] + ".png";
    }}

function dumpProps(obj, parent) {
   // Go through all the properties of the passed-in object
   for (var i in obj) {
      // if a parent (2nd parameter) was passed in, then use that to
      // build the message. Message includes i (the object's property name)
      // then the object's property value on a new line
      if (parent) { var msg = parent + "." + i + "\n" + obj[i]; } else { var msg = i + "\n" + obj[i]; }
      // Display the message. If the user clicks "OK", then continue. If they
      // click "CANCEL" then quit this level of recursion
      if (!confirm(msg)) { return; }
      // If this property (i) is an object, then recursively process the object
      if (typeof obj[i] == "object") {
         if (parent) { dumpProps(obj[i], parent + "." + i); } else { dumpProps(obj[i], i); }
      }}}
