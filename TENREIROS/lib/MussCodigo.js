/* globlal*/
var suit = ['o', 'c', 'e', 'b'];
var rank = ['1', '2', '3', '4', '5', '6', '7', 's', 'c', 'r'];
var deck = new Array(40);
var ptr = 0;
var dealer_cards = new Array(4);
var player_cards = new Array(4);

var grandePlay = "";
var chicaPlay = "";
var paresPlay = "";
var juegoPlay ="";
var puntoPlay ="";

for (var i = 0; i < rank.length; ++i){
    for (var j = 0; j < suit.length; ++j){
        deck[i*suit.length + j] =  rank[i] + suit[j];
}}

var scoreRanks = new Array();
scoreRanks['1'] = 1;
scoreRanks['2'] = 1;
scoreRanks['3'] = 10;
scoreRanks['4'] = 4;
scoreRanks['5'] = 5;
scoreRanks['6'] = 6;
scoreRanks['7'] = 7;
scoreRanks['s'] = 10;
scoreRanks['c'] = 10;
scoreRanks['r'] = 10;

var audioSupported = !!document.createElement('audio').play;

document.getElementById("Play").onclick = function(){ play(); };
document.getElementById("Cartas").onclick = function(){cartas(); };
document.getElementById("Cortar").onclick = function(){cortar(); };
document.getElementById("D1").onclick = function(){ descarte(Player1); };
document.getElementById("D2").onclick = function(){ descarte(Player2); };
document.getElementById("D3").onclick = function(){ descarte(Player3); };
document.getElementById("D4").onclick = function(){ descarte("Player4"); };

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
        var r = i + Math.floor(Math.random() * (40 - i));
        var temp = deck[i];
        deck[i] = deck[r];
        deck[r] = temp;
    }
    playSound("shuffle");
}

shuffle();

function play(){
        document.getElementById("Play").disabled = true;
        document.getElementById("Play").style.visibility = "hidden";
		document.getElementById("play_sounds").style.visibility = "hidden";
		// cleanup previous hand
		/*document.getElementById("game_output").innerHTML = "";
        document.getElementById("player_over").innerHTML = "";
        document.getElementById("dealer_over").innerHTML = "";
        document.getElementById("dealers_score").innerHTML = "";
        document.getElementById("players_score").innerHTML = "";*/  
		for (var i = 0; i < 4; ++i){
            dealer_cards[i] = "";
            var card_img = document.getElementById("dealer_card" + (i + 1));
            card_img.src = "images/40/card_back.png";
            card_img.style.visibility = "hidden";
            player_cards[i] = "";
            var card_img = document.getElementById("player_card" + (i + 1));
            card_img.src = "images/40/card_back.png";
            card_img.style.visibility = "hidden";
        }      
        // start new deck if necessary
        var time = 0;
        if (ptr > 27){
            shuffle();
            ptr = 0;
            if (document.getElementById("play_sounds").checked)
                time += 1000;
        }      
        // deal cards
        player_cards[0] = deck[ptr++];
        document.getElementById("player_card1").src = "images/40/" + player_cards[0] + ".png";
        window.setTimeout("makeVisible('player_card1')", time += 100);
        dealer_cards[0] = deck[ptr++];
        document.getElementById("dealer_card1").src = "images/card_back.png";
        window.setTimeout("makeVisible('dealer_card1')", time += 100);
        player_cards[1] = deck[ptr++];
        document.getElementById("player_card2").src = "images/40/" + player_cards[1] + ".png";
        window.setTimeout("makeVisible('player_card2')", time += 100);
        dealer_cards[1] = deck[ptr++];
        document.getElementById("dealer_card2").src = "images/card_back.png";
        window.setTimeout("makeVisible('dealer_card2')", time += 100);
        player_cards[2] = deck[ptr++];
        document.getElementById("player_card3").src = "images/40/" + player_cards[2] + ".png";
        window.setTimeout("makeVisible('player_card3')", time += 100);
        dealer_cards[2] = deck[ptr++];
        document.getElementById("dealer_card3").src = "images/card_back.png";
        window.setTimeout("makeVisible('dealer_card3')", time += 100);
        player_cards[3] = deck[ptr++];
        document.getElementById("player_card4").src = "images/40/" + player_cards[3] + ".png";
        window.setTimeout("makeVisible('player_card4')", time += 100);
        dealer_cards[3] = deck[ptr++];
        document.getElementById("dealer_card4").src = "images/card_back.png";
        window.setTimeout("makeVisible('dealer_card4')", time += 100);
		/*
		var player_score = 0;
        window.setTimeout("updateScore('player_score', " + player_score + ")", time += 50);
        var dealer_score = 0;
		window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 50);*/
		cartasOmus();
}

function cartasOmus(){			
		
		document.getElementById("Cartas").disabled = false;
		document.getElementById("Cartas").style.visibility = "visible";
		document.getElementById("Cortar").disabled = false;
		document.getElementById("Cortar").style.visibility = "visible";
		window.setTimeout("displayOver('game_over', 'MUS o Cortar')", time += 1000);
		window.setTimeout("displayOver('dealer_over', '¡PERDISTE!')", time += 250);
        window.setTimeout("playSound('lose')", time);			
	    
 }


function updateScore(scoreId, score){
    document.getElementById(scoreId).innerHTML = score;
}


function displayOver(overId, displayText){
    var over = document.getElementById(overId);
    over.innerHTML = displayText;
    over.style.visibility = "visible";
}

window.onload = function(){
    bank = 100;
    nextGame(0);
    window.setTimeout(preloadImages, 1000);
}


function nextGame(delay){
    document.getElementById("Play").disabled = false;
    document.getElementById("Play").style.visibility = "visible";
    window.setTimeout(startGame, delay);
}


function startGame(){
    document.getElementById("Play").focus();
    
}


function makeVisible(elemId){
    document.getElementById(elemId).style.visibility = "visible";
    playSound("card_drop");
}

function makeHidden(elemId){
    document.getElementById(elemId).style.visibility = "hidden";
    playSound("card_drop");
}




function showDealerCards(){
	for (var i= 1;i<5;i++){
    var card = document.getElementById("dealer_card"+i);
    card_img.src = "images/40/" + card + ".png";
    card_img.style.visibility = "visible";
    card_img.className = "";
    playSound("card_drop");		
	
}}

function showCard(elemId, card){
    var card_img = document.getElementById(elemId);
    card_img.src = "images/40/" + card + ".png";
    card_img.style.visibility = "visible";
    card_img.className = "";
    playSound("card_drop");
}



var imgs = new Array(40);
function preloadImages(){
    for (var i = 0; i < deck.length; ++i){
        imgs[i] = new Image();
        imgs[i].src ="images/40/" + deck[i] + ".png";
 }}
 
function nuevaPartida (){
	var ptr = 0;
   	var dealer_cards = new Array(4);
	var player_cards = new Array(4);
	var grandePlay = "";
	var chicaPlay = "";
	var paresPlay = "";
	var juegoPlay ="";
	var puntoPlay ="";
	score_player=0;
	score_dealer=0;
	nextGame(0);
}
 
 
  
 function cartas(){
	    document.getElementById("Cartas").disabled = true;
		document.getElementById("Cartas").style.visibility = "hidden";
		document.getElementById("Cortar").disabled = true;
		document.getElementById("Cortar").style.visibility = "hidden";
	    document.getElementById("D1").disabled = false;
		document.getElementById("D1").style.visibility = "visible";
		document.getElementById("D2").disabled = false;
		document.getElementById("D2").style.visibility = "visible";
        document.getElementById("D3").disabled = false;
		document.getElementById("D3").style.visibility = "visible";
		document.getElementById("D4").disabled = false;
		document.getElementById("D4").style.visibility = "visible";
		window.setTimeout("displayOver('game_over', 'DESCARTESE DE LAS CARTAS')", time += 1000);	
		for (var i = 0; i < 4; ++i){
        var card = dealer_cards[i];	
        if (card != ""){
			 if (card.charAt(0) != "r" && card.charAt(0) != "3" ){
			     descarte("Dealer"+i);}
		 }               		 		
 }
 
 function descarte(subject){
	    if (subject == Player1 || Player2 || Player3|| "Player4"){
		player_cards[0] = deck[ptr++];
        document.getElementById(subject).src = "images/40/" + player_cards[0] + ".png";
        window.setTimeout("makeVisible(subject)", time += 100);}
        else {
		dealer_cards[0] = deck[ptr++];
        document.getElementById(subject).src = "images/card_back.png";
        window.setTimeout("makeVisible(subject)", time += 250);}
		cartasOmus();
 }
 
 function cortar(){ 
	    document.getElementById("D1").disabled = true;
		document.getElementById("D1").style.visibility = "hidden";
		document.getElementById("D2").disabled = true;
		document.getElementById("D2").style.visibility = "hidden";
        document.getElementById("D3").disabled = true;
		document.getElementById("D3").style.visibility = "hidden";
		document.getElementById("D4").disabled = true;
		document.getElementById("D4").style.visibility = "hidden";
		document.getElementById("Cartas").disabled = true;
		document.getElementById("Cartas").style.visibility = "hidden";
		document.getElementById("Corto").disabled = true;
		document.getElementById("Corto").style.visibility = "hidden";
		document.getElementById("Paso").disabled = false;
		document.getElementById("Paso").style.visibility = "visible";
		document.getElementById("Envido").disabled = false;
		document.getElementById("Envido").style.visibility = "visible";
		document.getElementById("Envido5").disabled = false;
		document.getElementById("Envido5").style.visibility = "visible";	
		// JUGAMOS A LA GRANDE	
        window.setTimeout("displayOver('game_over', 'JUGAMOS A GRANDE')", time += 200);
        var player_grande = grandeCards(player_cards);
        window.setTimeout("displayOver('player_over', + player_grande + 'Reyes')", time += 200);
        var dealer_grande = grandeCards(dealer_cards);
		if (dealer_grande >1){
			window.setTimeout("displayOver('game_over', 'MESA ENVIDA A LA GRANDE')", time += 3000);
            window.setTimeout("playSound('lose')", time);
			document.getElementById("Veo").style.visibility = "visible";
		    document.getElementById("Veo").disabled = false;
			document.getElementById("Veo").onclick = function(){ veoGrande(); };}
		else {	
			window.setTimeout("displayOver('game_over', 'JUGADOR HABLA DE GRANDE')", time += 3000);
            window.setTimeout("playSound('win')", time);}			
		document.getElementById("Paso").onclick = function(){ pasoGrande(); };
		document.getElementById("Envido").onclick = function(){ envidoGrande(); };
		document.getElementById("Envido5").onclick = function(){ envido5Grande(); };

        // JUGAMOS A LA CHICA	
        window.setTimeout("displayOver('game_over', 'JUGAMOS A CHICA')", time += 200);
        var player_chica = chicaCards(player_cards);
		document.getElementById("Veo").style.visibility = "hidden";
		document.getElementById("Veo").disabled = true;
        window.setTimeout("displayOver('player_over', + player_chica + 'Pitos')", time += 200);
        var dealer_chica = chicaCards(dealer_cards);
		if (dealer_chica >1){
			window.setTimeout("displayOver('game_over', 'MESA ENVIDA A LA CHICA')", time += 3000);
            window.setTimeout("playSound('lose')", time);
			document.getElementById("Veo").style.visibility = "visible";
		    document.getElementById("Veo").disabled = false;
			document.getElementById("Veo").onclick = function(){ veoChica(); };
			}
		else {	
			window.setTimeout("displayOver('game_over', 'JUGADOR HABLA DE CHICA')", time += 3000);
            window.setTimeout("playSound('win')", time);}			
		document.getElementById("Paso").onclick = function(){ pasoChica(); };
		document.getElementById("Envido").onclick = function(){ envidoChica(); };
		document.getElementById("Envido5").onclick = function(){ envido5Chica(); };

        // HAY PARES?	
        window.setTimeout("displayOver('game_over', 'JUGAMOS A PARES')", time += 200);
        var player_pares = paresCards(player_cards);
		document.getElementById("Paso").disabled = true;
		document.getElementById("Paso").style.visibility = "hidden";
		document.getElementById("Envido").disabled = true;
		document.getElementById("Envido").style.visibility = "hidden";
		document.getElementById("Envido5").disabled = true;
		document.getElementById("Envido5").style.visibility = "hidden";
        window.setTimeout("displayOver('player_over', + player_pares + 'emparejadas')", time += 200);
        var dealer_pares = paresCards(dealer_cards);
		if (dealer_pares >0){
			window.setTimeout("displayOver('game_over', 'MESA TIENE PARES- ¿JUGADOR?')", time += 3000);
            window.setTimeout("playSound('lose')", time);
			document.getElementById("Pares").style.visibility = "visible";
		    document.getElementById("Pares").disabled = false;
			document.getElementById("NPares").style.visibility = "visible";
		    document.getElementById("NPares").disabled = false;
			document.getElementById("Pares").onclick = function(){ hayPares();};
			document.getElementById("NPares").onclick = function(){ noPares();};
			}
		 else if(player_pares >0){
			window.setTimeout("displayOver('game_over', 'JUGADOR TIENE PARES)", time += 3000);
            window.setTimeout("playSound('win')", time);
			paresJugador();
			}	
       // HAY JUEGO?		
		window.setTimeout("displayOver('game_over', 'JUGAMOS DE JUEGO')", time += 200);
        var player_juego = juegoCards(player_cards);
		document.getElementById("Paso").disabled = true;
		document.getElementById("Paso").style.visibility = "hidden";
		document.getElementById("Envido").disabled = true;
		document.getElementById("Envido").style.visibility = "hidden";
		document.getElementById("Envido5").disabled = true;
		document.getElementById("Envido5").style.visibility = "hidden";
        window.setTimeout("displayOver('player_over', + player_juego + 'a Juego')", time += 200);
        var dealer_juego = juegoCards(dealer_cards);
		if (dealer_juego >30){
			window.setTimeout("displayOver('game_over', 'MESA TIENE JUEGO- ¿JUGADOR?')", time += 3000);
            window.setTimeout("playSound('lose')", time);
			document.getElementById("Juego").style.visibility = "visible";
		    document.getElementById("Juego").disabled = false;
			document.getElementById("NJuego").style.visibility = "visible";
		    document.getElementById("NJuego").disabled = false;
			document.getElementById("Juego").onclick = function(){ hayJuego();};
			document.getElementById("NJuego").onclick = function(){ noJuego();};
			}
		 else if(player_juego >30){
			window.setTimeout("displayOver('game_over', 'JUGADOR TIENE JUEGO)", time += 3000);
            window.setTimeout("playSound('win')", time);
			juegoJugador();
			}	
		playDealer(0);
 }
         			
 function pasoGrande(){
	 if (dealer_grande >1){	 
	   grandePlay="Mesa en Pase";
	   dealer_score +=1;
	   window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	   window.setTimeout("playSound('lose')", time);}
	 else { grandePlay = "en paso"; }
	 window.setTimeout("displayOver('game_over', 'GRANDE'+ grandePlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 }
 function veoGrande(){
	 grandePlay="Se ve"; 
	 window.setTimeout("displayOver('game_over', 'GRANDE'+ grandePlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 } 
 function envidoGrande(){
	 grandePlay="envidada jugador"; 
	 window.setTimeout("displayOver('game_over', 'GRANDE'+ grandePlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 } 
 function envido5Grande(){
	 if (dealer_grande >2){	 
	   grandePlay="Se ven 5";}
	 else { 
	    grandePlay = "para el jugador";
	    player_score +=2;
	   window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	   window.setTimeout("playSound('win')", time);} 
	 window.setTimeout("displayOver('game_over', 'GRANDE'+ grandePlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 } 
	
 function pasoChica(){
	 if (dealer_chica >1){	 
	   chicaPlay="Mesa en Pase";
	   dealer_score +=1;
	   window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	   window.setTimeout("playSound('lose')", time);}
	 else { chicaPlay = "en paso"; }
	 window.setTimeout("displayOver('game_over', 'CHICA'+ chicaPlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 }
 
 function veoChica(){
	 chicaPlay="Se ve"; 
	 window.setTimeout("displayOver('game_over', 'CHICA'+ chicaPlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 }
  
 function envidoChica(){
	 chicaPlay="envidada jugador"; 
	 window.setTimeout("displayOver('game_over', 'CHICA'+ chicaPlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 }
  
 function envido5Chica(){
	 if (dealer_chica >2){	 
	   chicaPlay="Se ven 5";}
	 else { 
	    chicaPlay = "para el jugador";
	    player_score +=2;
	   window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	   window.setTimeout("playSound('win')", time);} 
	 window.setTimeout("displayOver('game_over', 'CHICA'+ chicaPlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 }
     					
 function hayPares(){			
	window.setTimeout("displayOver('game_over', 'HABLAMOS DE PARES')", time += 200);
	document.getElementById("Pares").style.visibility = "hidden";
	document.getElementById("Pares").disabled = true;
	document.getElementById("NPares").style.visibility = "hidden";
	document.getElementById("NPares").disabled = true;
	document.getElementById("Paso").disabled = false;
	document.getElementById("Paso").style.visibility = "visible";
	document.getElementById("Envido").disabled = false;
	document.getElementById("Envido").style.visibility = "visible";
	document.getElementById("Envido5").disabled = false;
	document.getElementById("Envido5").style.visibility = "visible";
	if (dealer_pares >1){
			window.setTimeout("displayOver('game_over', 'MESA ENVIDA A PARES')", time += 3000);
            window.setTimeout("playSound('lose')", time);
			document.getElementById("Veo").style.visibility = "visible";
		    document.getElementById("Veo").disabled = false;
			document.getElementById("Veo").onclick = function(){ veoPares(); };
			}
	else {	
			window.setTimeout("displayOver('game_over', 'JUGADOR HABLA DE PARES')", time += 3000);
            window.setTimeout("playSound('win')", time);}			
	document.getElementById("Paso").onclick = function(){ pasoPares(); };
	document.getElementById("Envido").onclick = function(){ envidoPares(); };
	document.getElementById("Envido5").onclick = function(){ envido5Pares(); };		
 }
 
 function noPares(){
	window.setTimeout("displayOver('game_over', 'NO HAY PARES')", time += 200);
	document.getElementById("Pares").style.visibility = "hidden";
	document.getElementById("Pares").disabled = true;
	document.getElementById("NPares").style.visibility = "hidden";
	document.getElementById("NPares").disabled = true;
	document.getElementById("Paso").disabled = false;
 }
 function paresJugador(){
	window.setTimeout("displayOver('game_over', 'PARES SOLO JUGADOR')", time += 200);
	document.getElementById("Pares").style.visibility = "hidden";
	document.getElementById("Pares").disabled = true;
	document.getElementById("NPares").style.visibility = "hidden";
	document.getElementById("NPares").disabled = true;
	paresPlay = "para el jugador";
	player_score +=1;
	window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	window.setTimeout("playSound('win')", time); 
 }
 
 function pasoPares(){
	 if (dealer_pares >1){	 
	   paresPlay="Mesa en Pase";
	   dealer_score +=1;
	   window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	   window.setTimeout("playSound('lose')", time);}
	 else { paresPlay = "en paso"; }
	 window.setTimeout("displayOver('game_over', 'PARES'+ paresPlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 }
 
 function veoPares(){
	 paresPlay="Se ve"; 
	 window.setTimeout("displayOver('game_over', 'PARES'+ paresPlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 }
  
 function envidoPares(){
	 paresPlay="envidada jugador"; 
	 window.setTimeout("displayOver('game_over', 'PARES'+ paresPlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 }
  
 function envido5Pares(){
	 if (dealer_pares >2){	 
	   paresPlay="Se ven 5";}
	 else { 
	    paresPlay = "para el jugador";
	    player_score +=2;
	   window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	   window.setTimeout("playSound('win')", time);} 
	 window.setTimeout("displayOver('game_over', 'PARES'+ paresPlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 }   
  					
 function hayJuego(){			
	window.setTimeout("displayOver('game_over', 'HABLAMOS DE JUEGO')", time += 200);
	document.getElementById("Juego").style.visibility = "hidden";
	document.getElementById("Juego").disabled = true;
	document.getElementById("NJuego").style.visibility = "hidden";
	document.getElementById("NJuego").disabled = true;
	document.getElementById("Paso").disabled = false;
	document.getElementById("Paso").style.visibility = "visible";
	document.getElementById("Envido").disabled = false;
	document.getElementById("Envido").style.visibility = "visible";
	document.getElementById("Envido5").disabled = false;
	document.getElementById("Envido5").style.visibility = "visible";
	if (dealer_juego == 31 || dealer_juego == 32){
			window.setTimeout("displayOver('game_over', 'MESA ENVIDA A JUEGO')", time += 3000);
            window.setTimeout("playSound('lose')", time);
			document.getElementById("Veo").style.visibility = "visible";
		    document.getElementById("Veo").disabled = false;
			document.getElementById("Veo").onclick = function(){ veoJuego(); };
			}
	else {	
			window.setTimeout("displayOver('game_over', 'JUGADOR HABLA DE JUEGO')", time += 3000);
            window.setTimeout("playSound('win')", time);}			
	document.getElementById("Paso").onclick = function(){ pasoJuego(); };
	document.getElementById("Envido").onclick = function(){ envidoJuego(); };
	document.getElementById("Envido5").onclick = function(){ envido5Juego(); };		
 }}
 
 function noJuego(){
	window.setTimeout("displayOver('game_over', 'NO HAY JUEGO')", time += 200);
	document.getElementById("Juego").style.visibility = "hidden";
	document.getElementById("Juego").disabled = true;
	document.getElementById("NJuego").style.visibility = "hidden";
	document.getElementById("NJuego").disabled = true;
	document.getElementById("Paso").disabled = false;
	document.getElementById("Paso").style.visibility = "visible";
	document.getElementById("Envido").disabled = false;
	document.getElementById("Envido").style.visibility = "visible";
	document.getElementById("Envido5").disabled = false;
	document.getElementById("Envido5").style.visibility = "visible";
	if (dealer_juego > 28){
			window.setTimeout("displayOver('game_over', 'MESA ENVIDA AL PUNTO')", time += 3000);
            window.setTimeout("playSound('lose')", time);
			document.getElementById("Veo").style.visibility = "visible";
		    document.getElementById("Veo").disabled = false;
			document.getElementById("Veo").onclick = function(){ veoPunto(); };
			}
	else {	
			window.setTimeout("displayOver('game_over', 'JUGADOR HABLA DE PUNTO')", time += 3000);
            window.setTimeout("playSound('win')", time);}			
	document.getElementById("Paso").onclick = function(){ pasoPunto(); };
	document.getElementById("Envido").onclick = function(){ envidoPunto(); };
	document.getElementById("Envido5").onclick = function(){ envido5Punto(); };		
 }
 
 function juegoJugador(){
	window.setTimeout("displayOver('game_over', 'JUEGO SOLO JUGADOR')", time += 200);
	document.getElementById("Juego").style.visibility = "hidden";
	document.getElementById("Juego").disabled = true;
	document.getElementById("NJuego").style.visibility = "hidden";
	document.getElementById("NJuego").disabled = true;
	juegoPlay = "para el jugador";
	player_score +=1;
	window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	window.setTimeout("playSound('win')", time); 
}
 
 function pasoJuego(){
	 if (dealer_juego == 31 || dealer_juego == 32){	 
	   juegoPlay="Mesa en Pase";
	   dealer_score +=1;
	   window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	   window.setTimeout("playSound('lose')", time);}
	 else { juegoPlay = "en paso"; }
	 window.setTimeout("displayOver('game_over', 'JUEGO'+ juegoPlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 }
 
 function veoJuego(){
	 juegoPlay="Se ve"; 
	 window.setTimeout("displayOver('game_over', 'JUEGO'+ juegoPlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 }
  
 function envidoJuego(){
	 juegoPlay="envidada jugador"; 
	 window.setTimeout("displayOver('game_over', 'JUEGO'+ juegoPlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 }
  
 function envido5Juego(){
	 if (dealer_pares == 31){	 
	   juegoPlay="Se ven 5";}
	 else { 
	   juegoPlay = "para el jugador";
	   player_score +=1;
	   window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	   window.setTimeout("playSound('win')", time);} 
	 window.setTimeout("displayOver('game_over', 'JUEGO'+ juegoPlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 }    					

 function pasoPunto(){
	 if (dealer_juego >28){	 
	   puntoPlay="Mesa en Pase";
	   dealer_score +=1;
	   window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	   window.setTimeout("playSound('lose')", time);}
	 else { puntoPlay = "en paso"; }
	 window.setTimeout("displayOver('game_over', 'PUNTO'+ puntoPlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 }
 
 function veoPunto(){
	 puntoPlay="Se ve"; 
	 window.setTimeout("displayOver('game_over', 'PUNTO'+ puntoPlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 }
  
 function envidoPunto(){
	 puntoPlay="envidada jugador"; 
	 window.setTimeout("displayOver('game_over', 'PUNTO'+ puntoPlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 }
  
 function envido5Punto(){
	 if (dealer_pares == 30){	 
	   puntoPlay="Se ven 5";}
	 else { 
	    puntoPlay = "para el jugador";
	    player_score +=1;
	   window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	   window.setTimeout("playSound('win')", time);} 
	 window.setTimeout("displayOver('game_over', 'PUNTO'+ puntoPlay )", time += 3000);
     window.setTimeout("playSound('win')", time);
 }    		

function grandeCards(cards){
    var grande = 0;
	var card = 0 ;
    for (var i = 0; i < 4; ++i){
        var card = cards[i];	
        if (card != ""){			 
			 if (card_val == 10 && (card.charAt(0) == "r" || card.charAt(0) == "3" )){
                grande++;}}}		 		             				   			   
    return grande;
}

function chicaCards(cards){
    var chica = 0;
	var card = 0 ;
    for (var i = 0; i < 4; ++i){
        var card = cards[i];	
        if (card != ""){
			 if (card_val == 1){
                chica++;}}}
    return chica;
 }

function paresCards(cards){
    var pares = 0;
	var chica = 0;
	var grande = 0;
	var card = 0 ;
    for (var i = 0; i < 4; ++i){
        var card = cards[i];	
        if (card != ""){
			 if (card_val == 1){
                chica++;}
			 if (card_val == 10 && (card.charAt(0) == "r" || card.charAt(0) == "3" )){
                grande++;}		 		
             
         }
		if (cards[0] == cards[1] || cards[0] == cards[2] || cards[0] == cards[3] ){
			  pares++;
			  if((cards[1] == cards[2] || cards[1] == cards[3] )){
		           pares++;
				    if(cards[2] == cards[3]){
		              pares++;
		 }}}
		 else if ( cards[1] == cards[2] || cards[1] == cards[3] ){
			  pares++;
			  if(cards[2] == cards[3]){
		           pares++;
				    
		 }}	   
		 else if (cards[2] == cards[3]){
			  pares++;				    
		 }
		 if (pares == 0 && (grande > 0 || chica> 0)){
				 pares = chica + grande
	     }	   		   
				   			   
    return pares;
 }}
 
 function juegoCards(cards){
    var score = 0;
	var card = 0 ;
    for (var i = 0; i < 4; ++i){
        var card = cards[i];	
        if (card != ""){		
           score += card_val;
           var card_val = scoreRanks[card.charAt(0)];
           score += card_val;
         }}	   
    return juego;
 }
	



/*
function playDealer(delay){
    var time = delay;
    window.setTimeout(showDealerCards, time += 200);
	document.getElementById("Paso").style.visibility = "hidden";
	document.getElementById("Paso").disabled = true;
	document.getElementById("Envido").style.visibility = "hidden";
	document.getElementById("Envido").disabled = true;
	document.getElementById("Envido5").style.visibility = "hidden";
	document.getElementById("Envido5").disabled = true;
	window.setTimeout("displayOver('game_over', 'GRANDE EN'+playGrande)", time += 3000);
	if (dealer_grande > player_grande){
		     switch(playGrande)
			 {
			    case "Mesa en Pase":
	                 dealer_score +=1;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;
				case "Se ve":
	                 dealer_score +=2;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;	
				 case "envidada jugador":
	                 dealer_score +=2;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;	
					 
				case "Se ven 5":
	                 dealer_score +=5;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;
		 }			 	 
	if (dealer_grande < player_grande){
		     switch(playGrande)
			 {
			    case "Mesa en Pase":
	                 player_score +=1;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;
				case "Se ve":
	                 player_score +=2;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;	
				 case "envidada jugador":
	                player_score +=2;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;	
					 
				case "Se ven 5":
	                player_score +=5;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;
			 }
	if (dealer_grande == player_grande){
		    var cardd = 0;
			var cardp = 0 ;
			var cd =0;
			var cp =0;
			var sd =0;
			var sp =0;
			var d7 =0;
			var p7 =0;
			var d6 =0;
			var p6 =0;
			var d5 =0;
			var p5 =0;
			var d4 =0;
			var p4 =0;
    		for (var i = 0; i < 4; ++i){
				cardd = dealer_cards[i]
        		cardp = player_cards[i];	
        	    if (cardd != ""){			 
			       if (cardd.charAt(0) == "c"){cd++;}
				   if (cardd.charAt(0) == "s"){sd++;}
				   if (cardd.charAt(0) == "7"){d7++;}
				   if (cardd.charAt(0) == "6"){d6++;}
				   if (cardd.charAt(0) == "5"){d5++;}
				   if (cardd.charAt(0) == "4"){d4++;}
				   if (cardd.charAt(0) == "3"){d3++;}}
				 if (cardp != ""){			 
			       if (cardp.charAt(0) == "c"){cp++;}
				   if (cardp.charAt(0) == "s"){sp++;}
				   if (cardp.charAt(0) == "7"){p7++;}
				   if (cardp.charAt(0) == "6"){p6++;}
				   if (cardp.charAt(0) == "5"){p5++;}
				   if (cardp.charAt(0) == "4"){p4++;}
				   if (cardp.charAt(0) == "3"){p3++;}}
			}
			if (cp >cd){
				switch(playGrande)
				{
			    case "Mesa en Pase":
	                 player_score +=1;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;
				case "Se ve":
	                 player_score +=2;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;	
				 case "envidada jugador":
	                player_score +=2;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;	
					 
				case "Se ven 5":
	                player_score +=5;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;
				}}
			else if (cd > cp) {
				switch(playGrande)
				{
			    case "Mesa en Pase":
	                 dealer_score +=1;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;
				case "Se ve":
	                 dealer_score +=2;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;	
				 case "envidada jugador":
	                 dealer_score +=2;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;						 
				case "Se ven 5":
	                 dealer_score +=5;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;
				}}
			else {
					if(sp >sd){
						switch(playGrande)
						{
			    			case "Mesa en Pase":
								 player_score +=1;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;
							case "Se ve":
								 player_score +=2;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;	
							 case "envidada jugador":
								player_score +=2;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;	
							case "Se ven 5":
								player_score +=5;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;
						}}
					else if (sd > sp){
						switch(playGrande)
						{
							case "Mesa en Pase":
								 dealer_score +=1;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
							case "Se ve":
								 dealer_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;	
							 case "envidada jugador":
								 dealer_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;	
							case "Se ven 5":
								 dealer_score +=5;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
						}}
						else {if(p7 >d7){
							switch(playGrande)
							{
							case "Mesa en Pase":
								 player_score +=1;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;
							case "Se ve":
								 player_score +=2;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;	
							 case "envidada jugador":
								player_score +=2;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;	
							case "Se ven 5":
								player_score +=5;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;
						}}
						else if (d7>p7){
							switch(playGrande)
							{
							case "Mesa en Pase":
								 dealer_score +=1;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
							case "Se ve":
								 dealer_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;	
							 case "envidada jugador":
								 dealer_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;	
							case "Se ven 5":
								 dealer_score +=5;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
						}}
						else {if(p6 >d6){
								switch(playGrande)
								{
								case "Mesa en Pase":
									 player_score +=1;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;
								case "Se ve":
									 player_score +=2;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;	
								 case "envidada jugador":
									player_score +=2;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;	
								case "Se ven 5":
									player_score +=5;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;
						}}
							else if (d6>p6){
								switch(playGrande)
								{
								case "Mesa en Pase":
									 dealer_score +=1;
									 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
									 window.setTimeout("playSound('lose')", time);
									 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
									 window.setTimeout("playSound('lose')", time);
									 break;
								case "Se ve":
									 dealer_score +=2;
									 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
									 window.setTimeout("playSound('lose')", time);
									 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('lose')", time);
									 break;	
								 case "envidada jugador":
									 dealer_score +=2;
									 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
									 window.setTimeout("playSound('lose')", time);
									 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('lose')", time);
									 break;	
								case "Se ven 5":
									 dealer_score +=5;
									 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
									 window.setTimeout("playSound('lose')", time);
									 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
									 window.setTimeout("playSound('lose')", time);
									 break;
								}}
							else {if(p5 >d5){
									switch(playGrande)
									{
									case "Mesa en Pase":
										 player_score +=1;
										 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
										 window.setTimeout("playSound('win')", time);
										 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
										 window.setTimeout("playSound('win')", time);
										 break;
									case "Se ve":
										 player_score +=2;
										 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
										 window.setTimeout("playSound('win')", time);
										 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
										 window.setTimeout("playSound('win')", time);
										 break;	
									 case "envidada jugador":
										player_score +=2;
										 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
										 window.setTimeout("playSound('win')", time);
										 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
										 window.setTimeout("playSound('win')", time);
										 break;	
									case "Se ven 5":
										player_score +=5;
										 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
										 window.setTimeout("playSound('win')", time);
										 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
										 window.setTimeout("playSound('win')", time);
										 break;
								}}
								else if (d5>p5){
									switch(playGrande)
									{
									case "Mesa en Pase":
										 dealer_score +=1;
										 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
										 window.setTimeout("playSound('lose')", time);
										 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
										 window.setTimeout("playSound('lose')", time);
										 break;
									case "Se ve":
										 dealer_score +=2;
										 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
										 window.setTimeout("playSound('lose')", time);
										 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
										 window.setTimeout("playSound('lose')", time);
										 break;	
									 case "envidada jugador":
										 dealer_score +=2;
										 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
										 window.setTimeout("playSound('lose')", time);
										 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
										 window.setTimeout("playSound('lose')", time);
										 break;	
									case "Se ven 5":
										 dealer_score +=5;
										 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
										 window.setTimeout("playSound('lose')", time);
										 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
										 window.setTimeout("playSound('lose')", time);
										 break;
								}}
								else {window.setTimeout("displayOver('game_over', 'ERROR GRANDE O AMBOS DUPLEX REYES-4')", time += 3000);}	
				}		 
				
						 
	window.setTimeout("displayOver('game_over', 'CHICA EN'+playChica)", time += 3000);
	if (dealer_chica > player_chica){
		     switch(playChica)
			 {
			    case "Mesa en Pase":
	                 dealer_score +=1;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;
				case "Se ve":
	                 dealer_score +=2;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;	
				 case "envidada jugador":
	                 dealer_score +=2;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;	
				case "Se ven 5":
	                 dealer_score +=5;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;
		 }			 	 
	if (dealer_chica < player_chica){
		     switch(playChica)
			 {
			    case "Mesa en Pase":
	                 player_score +=1;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;
				case "Se ve":
	                 player_score +=2;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;	
				 case "envidada jugador":
	                player_score +=2;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;		 
				case "Se ven 5":
	                player_score +=5;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;
			 }
	if (dealer_chica == player_chica){
		    var cardd = 0;
			var cardp = 0 ;
			var cd =0;
			var cp =0;
			var sd =0;
			var sp =0;
			var d7 =0;
			var p7 =0;
			var d6 =0;
			var p6 =0;
			var d5 =0;
			var p5 =0;
			var d4 =0;
			var p4 =0;	
    		for (var i = 0; i < 4; ++i){
				cardd = dealer_cards[i]
        		cardp = player_cards[i];	
        	    if (cardd != ""){			 
			       if (cardd.charAt(0) == "c"){cd++;}
				   if (cardd.charAt(0) == "s"){sd++;}
				   if (cardd.charAt(0) == "7"){d7++;}
				   if (cardd.charAt(0) == "6"){d6++;}
				   if (cardd.charAt(0) == "5"){d5++;}
				   if (cardd.charAt(0) == "4"){d4++;}
				   if (cardd.charAt(0) == "3"){d3++;}}
				 if (cardp != ""){			 
			       if (cardp.charAt(0) == "c"){cp++;}
				   if (cardp.charAt(0) == "s"){sp++;}
				   if (cardp.charAt(0) == "7"){p7++;}
				   if (cardp.charAt(0) == "6"){p6++;}
				   if (cardp.charAt(0) == "5"){p5++;}
				   if (cardp.charAt(0) == "4"){p4++;}
				   if (cardp.charAt(0) == "3"){p3++;}}
			}
			if (p4 >d4){
				switch(playChica)
				{
			    case "Mesa en Pase":
	                 player_score +=1;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;
				case "Se ve":
	                 player_score +=2;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;	
				 case "envidada jugador":
	                player_score +=2;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;	
				case "Se ven 5":
	                player_score +=5;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;
				}}
			else if (d4 > p4) {
				switch(playChica)
				{
			    case "Mesa en Pase":
	                 dealer_score +=1;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;
				case "Se ve":
	                 dealer_score +=2;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;	
				 case "envidada jugador":
	                 dealer_score +=2;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;						 
				case "Se ven 5":
	                 dealer_score +=5;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;
				}}
			else {
					if(p5 >d5){
						switch(playChica)
						{
			    			case "Mesa en Pase":
								 player_score +=1;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;
							case "Se ve":
								 player_score +=2;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;	
							 case "envidada jugador":
								player_score +=2;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;	
							case "Se ven 5":
								player_score +=5;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;
						}}
					else if (d5 > p5){
						switch(playChica)
						{
							case "Mesa en Pase":
								 dealer_score +=1;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
							case "Se ve":
								 dealer_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;	
							 case "envidada jugador":
								 dealer_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;	
							case "Se ven 5":
								 dealer_score +=5;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
						}}
						else {if(p6 >d6){
							switch(playChica)
							{
							case "Mesa en Pase":
								 player_score +=1;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;
							case "Se ve":
								 player_score +=2;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;	
							 case "envidada jugador":
								player_score +=2;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;	
							case "Se ven 5":
								player_score +=5;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;
						}}
						else if (d6>p6){
							switch(playChica)
							{
							case "Mesa en Pase":
								 dealer_score +=1;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
							case "Se ve":
								 dealer_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;	
							 case "envidada jugador":
								 dealer_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;	
							case "Se ven 5":
								 dealer_score +=5;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
						}}
						else {if(p7 >d7){
								switch(playChica)
								{
								case "Mesa en Pase":
									 player_score +=1;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;
								case "Se ve":
									 player_score +=2;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;	
								 case "envidada jugador":
									player_score +=2;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;	
								case "Se ven 5":
									player_score +=5;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;
						}}
							else if (d7>p7){
								switch(playChica)
								{
								case "Mesa en Pase":
									 dealer_score +=1;
									 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
									 window.setTimeout("playSound('lose')", time);
									 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
									 window.setTimeout("playSound('lose')", time);
									 break;
								case "Se ve":
									 dealer_score +=2;
									 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
									 window.setTimeout("playSound('lose')", time);
									 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('lose')", time);
									 break;	
								 case "envidada jugador":
									 dealer_score +=2;
									 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
									 window.setTimeout("playSound('lose')", time);
									 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('lose')", time);
									 break;	
								case "Se ven 5":
									 dealer_score +=5;
									 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
									 window.setTimeout("playSound('lose')", time);
									 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
									 window.setTimeout("playSound('lose')", time);
									 break;
								}}
							else {if(sp >sd){
									switch(playChica)
									{
									case "Mesa en Pase":
										 player_score +=1;
										 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
										 window.setTimeout("playSound('win')", time);
										 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
										 window.setTimeout("playSound('win')", time);
										 break;
									case "Se ve":
										 player_score +=2;
										 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
										 window.setTimeout("playSound('win')", time);
										 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
										 window.setTimeout("playSound('win')", time);
										 break;	
									 case "envidada jugador":
										player_score +=2;
										 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
										 window.setTimeout("playSound('win')", time);
										 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
										 window.setTimeout("playSound('win')", time);
										 break;	
									case "Se ven 5":
										player_score +=5;
										 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
										 window.setTimeout("playSound('win')", time);
										 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
										 window.setTimeout("playSound('win')", time);
										 break;
								}}
								else if (sd>sp){
									switch(playChica)
									{
									case "Mesa en Pase":
										 dealer_score +=1;
										 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
										 window.setTimeout("playSound('lose')", time);
										 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
										 window.setTimeout("playSound('lose')", time);
										 break;
									case "Se ve":
										 dealer_score +=2;
										 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
										 window.setTimeout("playSound('lose')", time);
										 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
										 window.setTimeout("playSound('lose')", time);
										 break;	
									 case "envidada jugador":
										 dealer_score +=2;
										 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
										 window.setTimeout("playSound('lose')", time);
										 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
										 window.setTimeout("playSound('lose')", time);
										 break;	
									case "Se ven 5":
										 dealer_score +=5;
										 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
										 window.setTimeout("playSound('lose')", time);
										 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
										 window.setTimeout("playSound('lose')", time);
										 break;
								}}
								else {window.setTimeout("displayOver('game_over', 'ERROR CHICA O AMBOS DUPLEX PITOS-CABALLOS')", time += 3000);}	
				}		 
				
						 
	window.setTimeout("displayOver('game_over', 'PARES EN'+playPares)", time += 3000);
	if (dealer_pares > player_pares){
		     switch(playPares)
			 {
			    case "Mesa en Pase":
	                 dealer_score +=1;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;
				case "Se ve":
	                 dealer_score +=2;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;	
				 case "envidada jugador":
	                 dealer_score +=2;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;	
				case "Se ven 5":
	                 dealer_score +=5;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;
		 }	
		 if (dealer_pares =3){
				dealer_score +=2;
				window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
				window.setTimeout("playSound('lose')", time);
				window.setTimeout("displayOver('game_over', 'MESA TIENE MEDIAS')", time += 3000);
				window.setTimeout("playSound('lose')", time);}
		 if (dealer_pares =4){
				dealer_score +=3;
				window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
				window.setTimeout("playSound('lose')", time);
				window.setTimeout("displayOver('game_over', 'MESA TIENE DUPLEX')", time += 3000);
				window.setTimeout("playSound('lose')", time);}			 	 
	if (dealer_pares < player_pares){
		     switch(playPares)
			 {
			    case "Mesa en Pase":
	                 player_score +=1;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;
				case "Se ve":
	                 player_score +=2;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;	
				 case "envidada jugador":
	                player_score +=2;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;		 
				case "Se ven 5":
	                player_score +=5;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;
			 }
		if (player_pares =3){
				player_score +=2;
				window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
				window.setTimeout("playSound('win')", time);
				window.setTimeout("displayOver('game_over', 'JUGADOR TIENE MEDIAS')", time += 3000);
				window.setTimeout("playSound('win')", time);}
		 if (player_pares =4){
				player_score +=3;
				window.setTimeout("updateScore('dealer_score', " + player_score + ")", time += 200);
				window.setTimeout("playSound('lose')", time);
				window.setTimeout("displayOver('game_over', 'JUGADOR TIENE DUPLEX')", time += 3000);
				window.setTimeout("playSound('lose')", time);}			 
	if (dealer_pares == player_pares){
		    var cardd = 0;
			var cardp = 0 ;
			var rd = 0;
			var rp = 0;
			var cd =0;
			var cp =0;
			var sd =0;
			var sp =0;
			var d7 =0;
			var p7 =0;
			var d6 =0;
			var p6 =0;
			var d5 =0;
			var p5 =0;
			var d4 =0;
			var p4 =0;
    		for (var i = 0; i < 4; ++i){
				cardd = dealer_cards[i]
        		cardp = player_cards[i];	
        	    if (cardd != ""){
				   if (cardd.charAt(0) == "r" || cardd.charAt(0) == "r" ){rd++;}			 
			       if (cardd.charAt(0) == "c"){cd++;}
				   if (cardd.charAt(0) == "s"){sd++;}
				   if (cardd.charAt(0) == "7"){d7++;}
				   if (cardd.charAt(0) == "6"){d6++;}
				   if (cardd.charAt(0) == "5"){d5++;}
				   if (cardd.charAt(0) == "4"){d4++;}
				   if (cardd.charAt(0) == "3"){d3++;}}
				 if (cardp != ""){	
				   if (cardp.charAt(0) == "r" || cardp.charAt(0) == "r" ){rp++;}	 
			       if (cardp.charAt(0) == "c"){cp++;}
				   if (cardp.charAt(0) == "s"){sp++;}
				   if (cardp.charAt(0) == "7"){p7++;}
				   if (cardp.charAt(0) == "6"){p6++;}
				   if (cardp.charAt(0) == "5"){p5++;}
				   if (cardp.charAt(0) == "4"){p4++;}
				   if (cardp.charAt(0) == "3"){p3++;}}
			}
			if (rp >rd){
				switch(playPares)
				{
			    case "Mesa en Pase":
	                 player_score +=1;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;
				case "Se ve":
	                 player_score +=2;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;	
				 case "envidada jugador":
	                player_score +=2;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;			 
				case "Se ven 5":
	                player_score +=5;
	                 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
	                 window.setTimeout("playSound('win')", time);
			         window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
                     window.setTimeout("playSound('win')", time);
		             break;
			if (player_pares =3){
				player_score +=2;
				window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
				window.setTimeout("playSound('win')", time);
				window.setTimeout("displayOver('game_over', 'JUGADOR TIENE MEDIAS')", time += 3000);
				window.setTimeout("playSound('win')", time);}
		 	if (player_pares =4){
				player_score +=3;
				window.setTimeout("updateScore('dealer_score', " + player_score + ")", time += 200);
				window.setTimeout("playSound('lose')", time);
				window.setTimeout("displayOver('game_over', 'JUGADOR TIENE DUPLEX')", time += 3000);
				window.setTimeout("playSound('lose')", time);}		
				}}
			else if (rd > rp) {
				switch(playPares)
				{
			    case "Mesa en Pase":
	                 dealer_score +=1;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;
				case "Se ve":
	                 dealer_score +=2;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;	
				 case "envidada jugador":
	                 dealer_score +=2;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;						 
				case "Se ven 5":
	                 dealer_score +=5;
	                 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                 window.setTimeout("playSound('lose')", time);
			         window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
                     window.setTimeout("playSound('lose')", time);
		             break;
		if (dealer_pares =3){
				dealer_score +=2;
				window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
				window.setTimeout("playSound('lose')", time);
				window.setTimeout("displayOver('game_over', 'MESA TIENE MEDIAS')", time += 3000);
				window.setTimeout("playSound('lose')", time);}
		 if (dealer_pares =4){
				dealer_score +=3;
				window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
				window.setTimeout("playSound('lose')", time);
				window.setTimeout("displayOver('game_over', 'MESA TIENE DUPLEX')", time += 3000);
				window.setTimeout("playSound('lose')", time);}			 	  
				}}
			else {
					if(cp >cd){
						switch(playPares)
						{
			    			case "Mesa en Pase":
								 player_score +=1;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;
							case "Se ve":
								 player_score +=2;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;	
							 case "envidada jugador":
								player_score +=2;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;	
							case "Se ven 5":
								player_score +=5;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;
			if (player_pares =3){
				player_score +=2;
				window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
				window.setTimeout("playSound('win')", time);
				window.setTimeout("displayOver('game_over', 'JUGADOR TIENE MEDIAS')", time += 3000);
				window.setTimeout("playSound('win')", time);}
		 	if (player_pares =4){
				player_score +=3;
				window.setTimeout("updateScore('dealer_score', " + player_score + ")", time += 200);
				window.setTimeout("playSound('lose')", time);
				window.setTimeout("displayOver('game_over', 'JUGADOR TIENE DUPLEX')", time += 3000);
				window.setTimeout("playSound('lose')", time);}				 
						}}
					else if (cd > cp){
						switch(playPares)
						{
							case "Mesa en Pase":
								 dealer_score +=1;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
							case "Se ve":
								 dealer_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;	
							 case "envidada jugador":
								 dealer_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;	
							case "Se ven 5":
								 dealer_score +=5;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
		if (dealer_pares =3){
				dealer_score +=2;
				window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
				window.setTimeout("playSound('lose')", time);
				window.setTimeout("displayOver('game_over', 'MESA TIENE MEDIAS')", time += 3000);
				window.setTimeout("playSound('lose')", time);}
		 if (dealer_pares =4){
				dealer_score +=3;
				window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
				window.setTimeout("playSound('lose')", time);
				window.setTimeout("displayOver('game_over', 'MESA TIENE DUPLEX')", time += 3000);
				window.setTimeout("playSound('lose')", time);}			 	 
						}}
						else {if(sp >sd){
							switch(playPares)
							{
							case "Mesa en Pase":
								 player_score +=1;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;
							case "Se ve":
								 player_score +=2;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;	
							 case "envidada jugador":
								player_score +=2;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;	
							case "Se ven 5":
								player_score +=5;
								 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
								 window.setTimeout("playSound('win')", time);
								 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
								 window.setTimeout("playSound('win')", time);
								 break;
			if (player_pares =3){
				player_score +=2;
				window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
				window.setTimeout("playSound('win')", time);
				window.setTimeout("displayOver('game_over', 'JUGADOR TIENE MEDIAS')", time += 3000);
				window.setTimeout("playSound('win')", time);}
		 	if (player_pares =4){
				player_score +=3;
				window.setTimeout("updateScore('dealer_score', " + player_score + ")", time += 200);
				window.setTimeout("playSound('lose')", time);
				window.setTimeout("displayOver('game_over', 'JUGADOR TIENE DUPLEX')", time += 3000);
				window.setTimeout("playSound('lose')", time);}				 
						}}
						else if (sd>sp){
							switch(playPares)
							{
							case "Mesa en Pase":
								 dealer_score +=1;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
							case "Se ve":
								 dealer_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;	
							 case "envidada jugador":
								 dealer_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;	
							case "Se ven 5":
								 dealer_score +=5;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
		if (dealer_pares =3){
				dealer_score +=2;
				window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
				window.setTimeout("playSound('lose')", time);
				window.setTimeout("displayOver('game_over', 'MESA TIENE MEDIAS')", time += 3000);
				window.setTimeout("playSound('lose')", time);}
		 if (dealer_pares =4){
				dealer_score +=3;
				window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
				window.setTimeout("playSound('lose')", time);
				window.setTimeout("displayOver('game_over', 'MESA TIENE DUPLEX')", time += 3000);
				window.setTimeout("playSound('lose')", time);}			 	 
						}}
						else {if(p7 >d7){
								switch(playPares)
								{
								case "Mesa en Pase":
									 player_score +=1;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;
								case "Se ve":
									 player_score +=2;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;	
								 case "envidada jugador":
									player_score +=2;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;	
								case "Se ven 5":
									player_score +=5;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
									 window.setTimeout("playSound('win')", time);
							if (player_pares =3){
			player_score +=2;
				window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
				window.setTimeout("playSound('win')", time);
				window.setTimeout("displayOver('game_over', 'JUGADOR TIENE MEDIAS')", time += 3000);
				window.setTimeout("playSound('win')", time);}
		 	if (player_pares =4){
				player_score +=3;
				window.setTimeout("updateScore('dealer_score', " + player_score + ")", time += 200);
				window.setTimeout("playSound('lose')", time);
				window.setTimeout("displayOver('game_over', 'JUGADOR TIENE DUPLEX')", time += 3000);
				window.setTimeout("playSound('lose')", time);}				 break;
									 
						}}
							else if (d7>p7){
								switch(playPares)
								{
								case "Mesa en Pase":
									 dealer_score +=1;
									 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
									 window.setTimeout("playSound('lose')", time);
									 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
									 window.setTimeout("playSound('lose')", time);
									 break;
								case "Se ve":
									 dealer_score +=2;
									 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
									 window.setTimeout("playSound('lose')", time);
									 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('lose')", time);
									 break;	
								 case "envidada jugador":
									 dealer_score +=2;
									 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
									 window.setTimeout("playSound('lose')", time);
									 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('lose')", time);
									 break;	
								case "Se ven 5":
									 dealer_score +=5;
									 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
									 window.setTimeout("playSound('lose')", time);
									 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
									 window.setTimeout("playSound('lose')", time);
									 break;
									 if (dealer_pares =3){
				dealer_score +=2;
				window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
				window.setTimeout("playSound('lose')", time);
				window.setTimeout("displayOver('game_over', 'MESA TIENE MEDIAS')", time += 3000);
				window.setTimeout("playSound('lose')", time);}
		 if (dealer_pares =4){
				dealer_score +=3;
				window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
				window.setTimeout("playSound('lose')", time);
				window.setTimeout("displayOver('game_over', 'MESA TIENE DUPLEX')", time += 3000);
				window.setTimeout("playSound('lose')", time);}			 	 
								}}
							else {if(p6 >d6){
									switch(playPares)
									{
									case "Mesa en Pase":
										 player_score +=1;
										 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
										 window.setTimeout("playSound('win')", time);
										 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
										 window.setTimeout("playSound('win')", time);
										 break;
									case "Se ve":
										 player_score +=2;
										 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
										 window.setTimeout("playSound('win')", time);
										 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
										 window.setTimeout("playSound('win')", time);
										 break;	
									 case "envidada jugador":
										player_score +=2;
										 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
										 window.setTimeout("playSound('win')", time);
										 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
										 window.setTimeout("playSound('win')", time);
										 break;	
									case "Se ven 5":
										player_score +=5;
										 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
										 window.setTimeout("playSound('win')", time);
										 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
										 window.setTimeout("playSound('win')", time);
										 break;
										 if (player_pares =3){
				player_score +=2;
				window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
				window.setTimeout("playSound('win')", time);
				window.setTimeout("displayOver('game_over', 'JUGADOR TIENE MEDIAS')", time += 3000);
				window.setTimeout("playSound('win')", time);}
		 	if (player_pares =4){
				player_score +=3;
				window.setTimeout("updateScore('dealer_score', " + player_score + ")", time += 200);
				window.setTimeout("playSound('lose')", time);
				window.setTimeout("displayOver('game_over', 'JUGADOR TIENE DUPLEX')", time += 3000);
				window.setTimeout("playSound('lose')", time);}		
								}}
								else if (d6>p6){
									switch(playPares)
									{
									case "Mesa en Pase":
										 dealer_score +=1;
										 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
										 window.setTimeout("playSound('lose')", time);
										 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
										 window.setTimeout("playSound('lose')", time);
										 break;
									case "Se ve":
										 dealer_score +=2;
										 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
										 window.setTimeout("playSound('lose')", time);
										 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
										 window.setTimeout("playSound('lose')", time);
										 break;	
									 case "envidada jugador":
										 dealer_score +=2;
										 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
										 window.setTimeout("playSound('lose')", time);
										 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
										 window.setTimeout("playSound('lose')", time);
										 break;	
									case "Se ven 5":
										 dealer_score +=5;
										 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
										 window.setTimeout("playSound('lose')", time);
										 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
										 window.setTimeout("playSound('lose')", time);
										 break;
		if (dealer_pares =3){
				dealer_score +=2;
				window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
				window.setTimeout("playSound('lose')", time);
				window.setTimeout("displayOver('game_over', 'MESA TIENE MEDIAS')", time += 3000);
				window.setTimeout("playSound('lose')", time);}
		 if (dealer_pares =4){
				dealer_score +=3;
				window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
				window.setTimeout("playSound('lose')", time);
				window.setTimeout("displayOver('game_over', 'MESA TIENE DUPLEX')", time += 3000);
				window.setTimeout("playSound('lose')", time);}			 	 
								}}
								else {window.setTimeout("displayOver('game_over', 'ERROR GRANDE O AMBOS DUPLEX PITOS')", time += 3000);}	
				}		 
				
				
		           
	window.setTimeout("displayOver('game_over', 'JUEGO EN'+playJuego)", time += 3000);
	if (dealer_juego > 30 || player_juego >30){
		     if (dealer_juego == 31){
			         if(player_juego == 31){
						 var mano = Math.round(Math.random());
						 if (mano == 1){
						 switch(playJuego)
						 {
							case "Mesa en Pase":
								 dealer_score +=1;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
							case "Se ve":
								 dealer_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;	
							 case "envidada jugador":
								player_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;		 
							case "Se ven 5":
								player_score +=5;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
						 }	  
							dealer_score +=3; 
						 	window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                        window.setTimeout("playSound('lose')", time);
			                window.setTimeout("displayOver('game_over', 'MESA 31 Y MANO')", time += 3000);
                            window.setTimeout("playSound('lose')", time);}
						else {
							 switch(playJuego)
							 {
								case "Mesa en Pase":
									 player_score +=1;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;
								case "Se ve":
									 player_score +=2;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;	
								 case "envidada jugador":
									player_score +=2;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;		 
								case "Se ven 5":
									player_score +=5;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;
							 }
							player_score +=3; 
							window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
							window.setTimeout("playSound('lose')", time);
							window.setTimeout("displayOver('game_over', 'JUGADOR 31 Y MANO')", time += 3000);
							window.setTimeout("playSound('lose')", time);}	
					 }
					 else { 
					 switch(playJuego)
						 {
		             		 case "Mesa en Pase":
								 dealer_score +=1;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
							case "Se ve":
								 dealer_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;	
							 case "envidada jugador":
								player_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;		 
							case "Se ven 5":
								player_score +=5;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
						 }
				  		window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
	                    window.setTimeout("playSound('lose')", time);
			            window.setTimeout("displayOver('game_over', 'MESA 31')", time += 3000);
                        window.setTimeout("playSound('lose')", time);}
			    }
			if (dealer_juego == 32){
					if(player_juego == 31){
						switch(playJuego)
							 {
								case "Mesa en Pase":
									 player_score +=1;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;
								case "Se ve":
									 player_score +=2;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;	
								 case "envidada jugador":
									player_score +=2;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;		 
								case "Se ven 5":
									player_score +=5;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;
							 }
							player_score +=3; 
							window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
							window.setTimeout("playSound('lose')", time);
							window.setTimeout("displayOver('game_over', 'JUGADOR 31')", time += 3000);
							window.setTimeout("playSound('lose')", time);	
					 }		
			         else if(player_juego == 32){
						 var mano = Math.round(Math.random());
						 if (mano == 1){
						 switch(playJuego)
						 {
							case "Mesa en Pase":
								 dealer_score +=1;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
							case "Se ve":
								 dealer_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;	
							 case "envidada jugador":
								player_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;		 
							case "Se ven 5":
								player_score +=5;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
						 }}	  
						else {
							 switch(playJuego)
							 {
								case "Mesa en Pase":
									 player_score +=1;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;
								case "Se ve":
									 player_score +=2;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;	
								 case "envidada jugador":
									player_score +=2;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;		 
								case "Se ven 5":
									player_score +=5;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;
							 }}
					if (player_juego > 32) {
					 switch(playJuego)
						 {
							case "Mesa en Pase":
								 dealer_score +=1;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
							case "Se ve":
								 dealer_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;	
							 case "envidada jugador":
								player_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;		 
							case "Se ven 5":
								player_score +=5;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
						 }}
						 	  
					 
				if (dealer_juego == 40){
					if(player_juego == 31){
						switch(playJuego)
							 {
								case "Mesa en Pase":
									 player_score +=1;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;
								case "Se ve":
									 player_score +=2;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;	
								 case "envidada jugador":
									player_score +=2;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;		 
								case "Se ven 5":
									player_score +=5;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;
							 }
							player_score +=3; 
							window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
							window.setTimeout("playSound('lose')", time);
							window.setTimeout("displayOver('game_over', 'JUGADOR 31')", time += 3000);
							window.setTimeout("playSound('lose')", time);	
					 }
					 else if(player_juego == 32){
					 	switch(playJuego)
							 {
								case "Mesa en Pase":
									 player_score +=1;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;
								case "Se ve":
									 player_score +=2;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;	
								 case "envidada jugador":
									player_score +=2;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;		 
								case "Se ven 5":
									player_score +=5;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;
							 }}
					 		
			         else if(player_juego == 40){
						 var mano = Math.round(Math.random());
						 if (mano == 1){
						 switch(playJuego)
						 {
							case "Mesa en Pase":
								 dealer_score +=1;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
							case "Se ve":
								 dealer_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;	
							 case "envidada jugador":
								player_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;		 
							case "Se ven 5":
								player_score +=5;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
						 }}	  
						else {
							 switch(playJuego)
							 {
								case "Mesa en Pase":
									 player_score +=1;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;
								case "Se ve":
									 player_score +=2;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;	
								 case "envidada jugador":
									player_score +=2;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;		 
								case "Se ven 5":
									player_score +=5;
									 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
									 window.setTimeout("playSound('win')", time);
									 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
									 window.setTimeout("playSound('win')", time);
									 break;
							 }}
					if (dealer_juego < player_juego ) {
					 switch(playJuego)
						 {
							case "Mesa en Pase":
								 dealer_score +=1;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
							case "Se ve":
								 dealer_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;	
							 case "envidada jugador":
								player_score +=2;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;		 
							case "Se ven 5":
								player_score +=5;
								 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
								 window.setTimeout("playSound('lose')", time);
								 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
								 window.setTimeout("playSound('lose')", time);
								 break;
						 }} 
					
	window.setTimeout("displayOver('game_over', 'PUNTO EN '+playPunto)", time += 3000);
	if (dealer_punto = player_punto){
				var mano = Math.round(Math.random());
				if (mano == 1){
				switch(playPunto)
				{
				case "Mesa en Pase":
					 dealer_score +=1;
					 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
					 window.setTimeout("playSound('lose')", time);
					 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
					 window.setTimeout("playSound('lose')", time);
					 break;
				case "Se ve":
					 dealer_score +=2;
					 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
					 window.setTimeout("playSound('lose')", time);
					 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
					 window.setTimeout("playSound('lose')", time);
					 break;	
				 case "envidada jugador":
					player_score +=2;
					 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
					 window.setTimeout("playSound('lose')", time);
					 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
					 window.setTimeout("playSound('lose')", time);
					 break;		 
				case "Se ven 5":
					player_score +=5;
					 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
					 window.setTimeout("playSound('lose')", time);
					 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
					 window.setTimeout("playSound('lose')", time);
					 break;
				 }}	  
				else {
					 switch(playPunto)
					 {
					case "Mesa en Pase":
						 player_score +=1;
						 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
						 window.setTimeout("playSound('win')", time);
						 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
						 window.setTimeout("playSound('win')", time);
						 break;
					case "Se ve":
						 player_score +=2;
						 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
						 window.setTimeout("playSound('win')", time);
						 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
						 window.setTimeout("playSound('win')", time);
						 break;	
					 case "envidada jugador":
						player_score +=2;
						 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
						 window.setTimeout("playSound('win')", time);
						 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
						 window.setTimeout("playSound('win')", time);
						 break;		 
					 case "Se ven 5":
						player_score +=5;
						 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
						 window.setTimeout("playSound('win')", time);
						 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
						 window.setTimeout("playSound('win')", time);
						 break;
     				 }}}
		else if (dealer_punto > player_punto){
				switch(playPunto)
				{
				case "Mesa en Pase":
					 dealer_score +=1;
					 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
					 window.setTimeout("playSound('lose')", time);
					 window.setTimeout("displayOver('game_over', 'MESA GANA EN PASE')", time += 3000);
					 window.setTimeout("playSound('lose')", time);
					 break;
				case "Se ve":
					 dealer_score +=2;
					 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
					 window.setTimeout("playSound('lose')", time);
					 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
					 window.setTimeout("playSound('lose')", time);
					 break;	
				 case "envidada jugador":
					player_score +=2;
					 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
					 window.setTimeout("playSound('lose')", time);
					 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE')", time += 3000);
					 window.setTimeout("playSound('lose')", time);
					 break;		 
				case "Se ven 5":
					player_score +=5;
					 window.setTimeout("updateScore('dealer_score', " + dealer_score + ")", time += 200);
					 window.setTimeout("playSound('lose')", time);
					 window.setTimeout("displayOver('game_over', 'MESA GANA ENVITE A 5')", time += 3000);
					 window.setTimeout("playSound('lose')", time);
					 break;
				 }}	  
		else {
				 switch(playPunto)
				 {
				case "Mesa en Pase":
					 player_score +=1;
					 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
					 window.setTimeout("playSound('win')", time);
					 window.setTimeout("displayOver('game_over', 'JUGADOR GANA EN PASE')", time += 3000);
					 window.setTimeout("playSound('win')", time);
					 break;
				case "Se ve":
					 player_score +=2;
					 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
					 window.setTimeout("playSound('win')", time);
					 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
					 window.setTimeout("playSound('win')", time);
					 break;	
				 case "envidada jugador":
					player_score +=2;
					 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
					 window.setTimeout("playSound('win')", time);
					 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE')", time += 3000);
					 window.setTimeout("playSound('win')", time);
					 break;		 
				 case "Se ven 5":
					player_score +=5;
					 window.setTimeout("updateScore('player_score', " + player_score + ")", time += 200);
					 window.setTimeout("playSound('win')", time);
					 window.setTimeout("displayOver('game_over', 'JUGADOR GANA ENVITE A 5')", time += 3000);
					 window.setTimeout("playSound('win')", time);
					 break;
     			 }}
				 
	if (score_player >35 || score_dealer >35){
		if (score_player > score_dealer){
			window.setTimeout("displayOver('player_over', '¡GANASTE!')", time += 3000);
            window.setTimeout("playSound('win')", time);}
		else{
			 window.setTimeout("displayOver('player_over', '¡PERDISTE!')", time += 250);
             window.setTimeout("playSound('lose')", time);}
		nuevaPartida()	 
	}     
    nextGame(time);
    return time;
}*/
