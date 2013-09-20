/* globlal*/
var suit = ['o', 'c', 'e', 'b'];
var rank = ['1', '2', '3', '4', '5', '6', '7', 's', 'c', 'r'];
var deck = new Array(40);
var ptr = 0;

var dealer_cards = new Array(4);
var player_cards = new Array(4);

var dealer_c = new Array(4);
var player_c = new Array(4);

var cartas_player = Array(8);
var cartas_dealer = Array(8);
		
var player_score = 0;
var dealer_score = 0;

var juego_player = 0;
var juego_dealer = 0; 

var pares_player = "";
var pares_dealer = "";

var name_player = "Sin nombre";
var name_dealer = "";

var grandePlay =0;
var chicaPlay =0;
var paresPlay =0;
var juegoPlay =0;
var puntoPlay =0;

var Ptemp="Nada";
var Pr=9;
var Pr9=0;
var Dtemp="";
var Dr=9;
var Dr2=9;

for (var i = 0; i < rank.length; ++i){
    for (var j = 0; j < suit.length; ++j){
        deck[i*suit.length + j] =  rank[i] + suit[j];
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

var nameBet = new Array(7);
nameBet['0'] = 'Nulo';
nameBet['1'] = 'Cobrada'; 
nameBet['2'] = 'En Paso';
nameBet['3'] = 'Envidada por el Jugador';
nameBet['4'] = 'Se ha visto';
nameBet['5'] = 'Envidada 5 por el Jugador';
nameBet['6'] = 'Juego Cobrado Mesa';

var nameCard = new Array(8);
nameCard['0'] = ' Reyes';
nameCard['1'] = ' Caballos'; 
nameCard['2'] = ' Sotas';
nameCard['3'] = ' Sietes';
nameCard['4'] = ' Seis';
nameCard['5'] = ' Cincos';
nameCard['6'] = ' Cuatros'; 
nameCard['7'] = ' Pitos'; 

document.getElementById("Play").disabled = false;
document.getElementById("Play").style.visibility = "visible";
displayOver('game_over', '¡Pulse JUGAR para comenzar!');


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
var imgs = new Array(40);
function preloadImages(){
    for (var i = 0; i < deck.length; ++i){
        imgs[i] = new Image();
        imgs[i].src ="images/40/" + deck[i] + ".png";
 }}

document.getElementById("Play").onclick = function(){ play(); };
document.getElementById("Mus").onclick = function(){mus(); };
document.getElementById("Cortar").onclick = function(){cortar(); };
document.getElementById("Descarte").onclick = function(){ descarte(); };
document.getElementById("Resultado").onclick = function(){ resultado(); };
document.getElementById("PasoG").onclick = function(){ grandeP(); };
document.getElementById("EnvidoG").onclick = function(){grandeE(); };
document.getElementById("Envido5G").onclick = function(){grande5(); };
document.getElementById("VeoG").onclick = function(){ grandeV(); };
document.getElementById("PasoC").onclick = function(){chicaP(); };
document.getElementById("EnvidoC").onclick = function(){chicaE(); };
document.getElementById("Envido5C").onclick = function(){chica5(); };
document.getElementById("VeoC").onclick = function(){ chicaV(); };
document.getElementById("Pares").onclick = function(){pares(); };
document.getElementById("NPares").onclick = function(){paresN(); };
document.getElementById("PasoP").onclick = function(){ paresP(); };
document.getElementById("EnvidoP").onclick = function(){paresE(); };
document.getElementById("Envido5P").onclick = function(){ pares5(); };
document.getElementById("VeoP").onclick = function(){ paresV(); };
document.getElementById("Juego").onclick = function(){juego(); };
document.getElementById("NJuego").onclick = function(){juegoN(); };
document.getElementById("PasoJ").onclick = function(){ juegoP(); };
document.getElementById("EnvidoJ").onclick = function(){ juegoE(); };
document.getElementById("Envido5J").onclick = function(){juego5(); };
document.getElementById("VeoJ").onclick = function(){juegoV(); };
document.getElementById("VeoU").onclick = function(){puntoV(); };
document.getElementById("PasoU").onclick = function(){ puntoP(); };
document.getElementById("EnvidoU").onclick = function(){ puntoE(); };

function scoreWinP(objeto){
	if (objeto == 2){player_score +=1; playSound("shuffle");} 
	else if (objeto == 5){player_score +=5; playSound("shuffle");}
	else {player_score +=2; playSound("shuffle");}
	updateScore('player_score', + player_score + ' Tantos');
	updateScore('dealer_score', + dealer_score + ' Tantos');
}

function scoreWinD(objeto){	
	if (objeto==2){dealer_score +=1; playSound("shuffle");} 
	else if (objeto==5){dealer_score +=5; playSound("shuffle");}
	else {dealer_score +=2;playSound("shuffle");}
	updateScore('player_score', + player_score + ' Tantos');
	updateScore('dealer_score', + dealer_score + ' Tantos');
}	

function scoreCards(cards){
    var score = 0;
    for (var i = 0; i < 4; ++i){
        var card = cards[i];
        if (card != ""){
            var card_val = scoreRanks[card.charAt(0)];
            score += card_val;
        }}
    return score;
}

	

function resultado(){
	document.getElementById("Resultado").disabled = true;
	document.getElementById("Resultado").style.visibility = "hidden";
	updateScore('dealer_score2', ' Grande en: '+ nameBet[grandePlay]);
	updateScore('dealer_score3', ' Chica en: ' + nameBet[chicaPlay]);
	updateScore('dealer_score4', ' Pares en: '+ nameBet[paresPlay]);
	updateScore('dealer_score5', ' Juego en: '+ nameBet[juegoPlay] );
	updateScore('dealer_score6', ' Punto en: '+ nameBet[puntoPlay]);

    //GRANDE 
	if (grandePlay >1){
	displayOver('game_over2', '¡RESULTADO GRANDE!');
	if ((cartas_player[0]>cartas_dealer[0]) || (cartas_player[0] == cartas_dealer[0] && cartas_player[1] > cartas_dealer[1]) ||
	(cartas_player[0] == cartas_dealer[0] && cartas_player[1] == cartas_dealer[1] && cartas_player[2] > cartas_dealer[2]) || 
	(cartas_player[0] == cartas_dealer[0] && cartas_player[1] == cartas_dealer[1] && cartas_dealer[2] == cartas_player[2] && cartas_player[3] >= cartas_dealer[3])){
		displayOver('game_over', '¡Gana Jugador!');
		updateScore('dealer_score2', ' RESULTADO GRANDE: '+ nameBet[grandePlay]+' ¡Gano Jugador!' );
		playSound("win");
		scoreWinP(grandePlay);}
	else {
		displayOver('game_over', '¡Gana Mesa!');
		updateScore('dealer_score2', ' RESULTADO GRANDE: '+ nameBet[grandePlay]+' ¡Gano Mesa!' );
		playSound("lose");
		scoreWinD(grandePlay);}}
		
	//CHICA			
	if (chicaPlay >1){
	displayOver('game_over2', '¡RESULTADO CHICA!');
		if ((cartas_player[7]>cartas_dealer[7]) || (cartas_player[7] == cartas_dealer[7] && cartas_player[6] > cartas_dealer[6]) ||
		(cartas_player[7] == cartas_dealer[7] && cartas_player[6] == cartas_dealer[6] && cartas_player[5] > cartas_dealer[5]) || 
		(cartas_player[7] == cartas_dealer[7] && cartas_player[6] == cartas_dealer[6] && cartas_dealer[5] == cartas_player[5] && cartas_player[4] >= cartas_dealer[4])){
			displayOver('game_over', '¡Gana Jugador!');
			updateScore('dealer_score3', ' RESULTADO CHICA: '+ nameBet[chicaPlay]+' ¡Gano Jugador!' );
			playSound("win");
			scoreWinP(chicaPlay);}
		else {
			displayOver('game_over', '¡Gana Mesa!');
			updateScore('dealer_score3', ' RESULTADO CHICA: '+ nameBet[chicaPlay]+' ¡Gano Mesa!' );
			playSound("lose");
			scoreWinD(chicaPlay);}}

	    //PARES	
		
		if (paresPlay >1){	
			 updateScore('dealer_score4', ' RESULTADO PARES1');
			var par="";
			var td=0;
			for (var i=0; i<8;++i){	
			    par= cartas_player[i];
				if (par == 4){Ptemp= "Duplex";Pr=td;}
				else if (par == 3) {Ptemp= "Medias";Pr=td;}
				else if (par == 2){{if (Ptemp=="Pares"){Ptemp ="Duplex";Pr2=td;}else {Ptemp="Pares";Pr=td;}}}
				++td}
			    updateScore('dealer_score7', Ptemp);
			    updateScore('dealer_score7', Ptemp + Pr);
            var dar="";
			var td=0;
			for (var i=0; i<8;++i){	
			    dar= cartas_dealer[i];
				if (dar == 4){Dtemp= "Duplex";Dr=td;}
				else if (dar == 3) {Dtemp= "Medias";Dr=td;}
				else if (par == 2){{if (Dtemp=="Pares"){Dtemp ="Duplex";Dr2=td;}else {Dtemp="Pares";Dr=td;}}}
				++td}
				
			if (Ptemp == "Duplex" || Dtemp == "Duplex"){if (Dtemp !="Duplex" || Ptemp == Dtemp && Pr<Dr){
				displayOver('game_over', '¡Gana Jugador!');
				displayOver('game_over', '¡DUPLEX');
				playSound("win");
				player_score +=3;
				updateScore('dealer_score4', ' RESULTADO PARES: '+ nameBet[paresPlay]+' ¡Gano Jugador con DUPLEX!');
				scoreWinP(paresPlay);}
				else{displayOver('game_over', '¡Gana MESA!');
					displayOver('game_over', '¡DUPLEX');
					playSound("lose");
					updateScore('dealer_score4', ' RESULTADO PARES: '+ nameBet[paresPlay]+' ¡Gano Mesa con DUPLEX!');
					dealer_score +=3;
					scoreWinD(paresPlay);}}			
			else if (Ptemp =="Medias" || Dtemp == "Medias"){if (Dtemp !="Medias" || Ptemp == Dtemp && Pr<Dr){
				displayOver('game_over', '¡Gana Jugador!');
				displayOver('game_over', '¡MEDIAS');
				playSound("win");
				player_score +=2;
				updateScore('dealer_score4', ' RESULTADO PARES: '+ nameBet[paresPlay]+' ¡Gano Jugador con MEDIAS!');
		        scoreWinP(paresPlay);}	
				else {displayOver('game_over', '¡Gana MESA!');
					playSound("lose");
					updateScore('dealer_score4', ' RESULTADO PARES: '+ nameBet[paresPlay]+' ¡Gano Mesa con MEDIAS!');
					dealer_score +=2;
					scoreWinD(paresPlay);}}
			else {if (Pr<Dr){displayOver('game_over', '¡Gana Jugador!');
				playSound("win");
				updateScore('dealer_score4', ' RESULTADO PARES: '+ nameBet[paresPlay]+' ¡Gano el Jugador!');
				player_score +=1;
				scoreWinP(paresPlay);}
				else {displayOver('game_over', '¡Gana MESA!');
				playSound("lose");
				updateScore('dealer_score4', ' RESULTADO PARES: '+ nameBet[paresPlay]+' ¡Gano Mesa!');
				dealer_score +=1;
				scoreWinD(paresPlay);}}
			updateScore('player_score', + player_score + ' Tantos');
			updateScore('dealer_score', + dealer_score + ' Tantos');
			//JUEGO	
			if (juegoPlay >1){
			displayOver('game_over2', '¡RESULTADO JUEGO!');
			if (juego_player == 31){ 
				displayOver('game_over', '¡Gana Jugador!');
				displayOver('game_over2', '¡31');
				updateScore('dealer_score5', ' RESULTADO JUEGO: '+ nameBet[juegoPlay]+'¡Gano el Jugador con 31!');
				playSound("win");
				player_score +=3;
				scoreWinP(juegoPlay);}
			else if (juego_player == 32 && juego_dealer != 31 || juego_player>juego_dealer && juego_dealer != 32 && juego_dealer != 40){
				displayOver('game_over', '¡Gana Jugador!');
				updateScore('dealer_score5', ' RESULTADO JUEGO: '+ nameBet[juegoPlay]+'¡Gano el Jugador');
				playSound("win");
				player_score +=1;
				scoreWinP(juegoPlay);}
			else if (juego_dealer != 31&& juego_player<juego_dealer && juego_player != 32 && juego_player != 31  ){
				displayOver('game_over', '¡Gana MESA!');
				updateScore('dealer_score5', ' RESULTADO JUEGO: '+ nameBet[juegoPlay]+'¡Gano la Mesa');
				playSound("lose");
				dealer_score +=1;
				scoreWinD(juegoPlay);}
			else if (juego_dealer == 31){
				displayOver('game_over', '¡Gana MESA!');
				displayOver('game_over2', '¡31');
				updateScore('dealer_score5', ' RESULTADO JUEGO: '+ nameBet[juegoPlay]+'¡Gano la Mesa con 31!');
				playSound("lose");
				dealer_score +=3;
				scoreWinD(juegoPlay);}
			updateScore('player_score', + player_score + ' Tantos');
			updateScore('dealer_score', + dealer_score + ' Tantos');}
			nuevaMano();
			//PUNTO
			if (puntoPlay >1){
			displayOver('game_over2', '¡RESULTADO PUNTO!');
			if (juego_player > juego_dealer){ 
				displayOver('game_over', '¡Gana Jugador!');
				displayOver('game_over2', ' ');
				updateScore('dealer_score5', ' RESULTADO JUEGO: '+ nameBet[juegoPlay]+'¡Gano el Jugador!');
				playSound("win");
				player_score +=2;
				scoreWinP(juegoPlay);}
	        else{
				displayOver('game_over', '¡Gana MESA!');
				displayOver('game_over2', ' ');
				updateScore('dealer_score5', ' RESULTADO PUNTO: '+ nameBet[juegoPlay]+'¡Gano la Mesa!');
				playSound("lose");
				dealer_score +=2;
				scoreWinD(juegoPlay);}
			updateScore('player_score', + player_score + ' Tantos');
			updateScore('dealer_score', + dealer_score + ' Tantos');}
			nuevaMano();			 			 

}}

function nuevaMano (){
	document.getElementById("Play").disabled = false;
	document.getElementById("Play").style.visibility = "visible";
    if (player_score<35 && dealer_score<35){ 
	displayOver('game_over2', '¡OTRA MANO PULSE JUGAR!');
	displayOver('game_over', ' ');
	updateScore('dealer_score1', ' NUEVA PARTIDA');
	updateScore('dealer_score2', 'nd ');
	updateScore('dealer_score3', 'nd ');
	updateScore('dealer_score4', 'nd ');
	updateScore('dealer_score5', 'nd ');
	updateScore('dealer_score6', 'nd ');
	updateScore('dealer_score7', 'nd ');
	;}
	else {
		displayOver('game_over2', '¡OTRO JUEGO PULSE JUGAR!');
		displayOver('game_over', '¡FINAL PARTIDA!');
		nuevoGame();}
}

function nuevoGame(){
	document.getElementById("Play").disabled = false;
	document.getElementById("Resultado").style.visibility = "hidden"
	player_score=0;
	dealer_score=0;	
	}


function play(){
        document.getElementById("Play").disabled = true;
        document.getElementById("Play").style.visibility = "hidden";
		document.getElementById("play_sounds").style.visibility = "hidden";
		/* cleanup previous hand
        document.getElementById("dealer_score").innerHTML = "";
        document.getElementById("dealer_score1").innerHTML = "";
		document.getElementById("dealer_score2").innerHTML = "";
        document.getElementById("dealer_score3").innerHTML = ""; 
        document.getElementById("dealer_score4").innerHTML = "";
        document.getElementById("dealer_score5").innerHTML = "";*/ 
		for (var i = 0; i < 4; ++i){
            dealer_cards[i] = "";
            var card_img = document.getElementById("dealer_card" + (i + 1));
            card_img.src = "images/40/card_back.png";
            card_img.style.visibility = "hidden";
            player_cards[i] = "";
            var card_img = document.getElementById("player_card" + (i + 1));
            card_img.src = "images/40/card_back.png" ;
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
		dealer_cards[0] = deck[ptr++];
		player_cards[1] = deck[ptr++];
		dealer_cards[1] = deck[ptr++];
		player_cards[2] = deck[ptr++];
		dealer_cards[2] = deck[ptr++];
		player_cards[3] = deck[ptr++];
		dealer_cards[3] = deck[ptr++];
        document.getElementById("player_card1").src = "images/40/" + player_cards[0] + ".png";
        window.setTimeout("makeVisible('player_card1')", time += 200);
       	document.getElementById("dealer_card1").src = "images/40/" + dealer_cards[0] + ".png";
        window.setTimeout("makeVisible('dealer_card1')", time += 200);
        document.getElementById("player_card2").src = "images/40/" + player_cards[1] + ".png";
        window.setTimeout("makeVisible('player_card2')", time += 200);
	   	document.getElementById("dealer_card2").src = "images/40/" + dealer_cards[1] + ".png";
        window.setTimeout("makeVisible('dealer_card2')", time += 200);
        document.getElementById("player_card3").src = "images/40/" + player_cards[2] + ".png";
        window.setTimeout("makeVisible('player_card3')", time += 200);
        document.getElementById("dealer_card3").src = "images/40/" + dealer_cards[2] + ".png";
        window.setTimeout("makeVisible('dealer_card3')", time += 200);
        document.getElementById("player_card4").src = "images/40/" + player_cards[3] + ".png";
        window.setTimeout("makeVisible('player_card4')", time += 200);
        document.getElementById("dealer_card4").src = "images/40/" + dealer_cards[3] + ".png";
        window.setTimeout("makeVisible('dealer_card4')", time += 200);
        displayOver('game_over', '¡MUS o CORTAR MUS!');
		juego_dealer = scoreCards(dealer_cards);
		displayOver('dealer_over', juego_dealer + ' A juego');	
		if (juego_dealer==31){ 
		displayOver('game_over', '¡LA MESA CORTA MUS!');
		cortar();}
		else {	
		document.getElementById("Mus").disabled = false;
		document.getElementById("Mus").style.visibility = "visible";
		document.getElementById("Cortar").disabled = false;
		document.getElementById("Cortar").style.visibility = "visible";}
 }

function mus(){
	    displayOver('game_over', '¡Marque Descartes!');
	    document.getElementById("Mus").disabled = true;
		document.getElementById("Mus").style.visibility = "hidden";
		document.getElementById("Cortar").disabled = true;
		document.getElementById("Cortar").style.visibility = "hidden";
		document.getElementById("Descarte").disabled = false;
		document.getElementById("Descarte").style.visibility = "visible";
	    document.getElementById("D1").disabled = false;
		document.getElementById("D1").style.visibility = "visible";
		document.getElementById("D2").disabled = false;
		document.getElementById("D2").style.visibility = "visible";
        document.getElementById("D3").disabled = false;
		document.getElementById("D3").style.visibility = "visible";
		document.getElementById("D4").disabled = false;
		document.getElementById("D4").style.visibility = "visible";	
 }			
	    
function descarte(subject){
	    displayOver('game_over', '¡MUS o CORTAR MUS!');
		var time = 0;
        if (ptr > 27){
            shuffle();
            ptr = 0; }  
		juego_dealer = scoreCards(dealer_cards);    
	    document.getElementById("Mus").disabled = false;
		document.getElementById("Mus").style.visibility = "visible";
		document.getElementById("Cortar").disabled = false;
		document.getElementById("Cortar").style.visibility = "visible";
		document.getElementById("Descarte").disabled = true;
		document.getElementById("Descarte").style.visibility = "hidden";
	    document.getElementById("D1").disabled = true;
		document.getElementById("D1").style.visibility = "hidden";
		document.getElementById("D2").disabled = true;
		document.getElementById("D2").style.visibility = "hidden";
        document.getElementById("D3").disabled = true;
		document.getElementById("D3").style.visibility = "hidden";
		document.getElementById("D4").disabled = true;
		document.getElementById("D4").style.visibility = "hidden";	
		if (document.getElementById("D1").checked){
			player_cards[0] = deck[ptr++];
			document.getElementById("player_card1").src = "images/40/" + player_cards[0] + ".png";
			playSound("card_drop");}
		if (document.getElementById("D2").checked){
			player_cards[1] = deck[ptr++];
			document.getElementById("player_card2").src = "images/40/" + player_cards[1] + ".png";
			playSound("card_drop");}
		if (document.getElementById("D3").checked){
			player_cards[2] = deck[ptr++];
			document.getElementById("player_card3").src = "images/40/" + player_cards[2] + ".png";
			playSound("card_drop");}	
		if (document.getElementById("D4").checked){
			player_cards[3] = deck[ptr++];
			document.getElementById("player_card4").src = "images/40/" + player_cards[3] + ".png";
			playSound("card_drop");}
		if (dealer_cards[0].charAt(0) != "r" && dealer_cards[0].charAt(0) != "3" && juego_dealer!=31 ){           	
			dealer_cards[0] = deck[ptr++];
			document.getElementById("dealer_card1").src = "images/40/" + dealer_cards[0] + ".png";
			playSound("card_drop");}
		if (dealer_cards[1].charAt(0) != "r" && dealer_cards[1].charAt(0) != "3"&& juego_dealer!=31 ){           	
			dealer_cards[1] = deck[ptr++];
			document.getElementById("dealer_card2").src = "images/40/" + dealer_cards[1] + ".png";
			playSound("card_drop");}
		if (dealer_cards[2].charAt(0) != "r" && dealer_cards[2].charAt(0) != "3"&& juego_dealer!=31 ){           	
			dealer_cards[2] = deck[ptr++];
			document.getElementById("dealer_card3").src = "images/40/" + dealer_cards[2] + ".png";
			playSound("card_drop");}
		if (dealer_cards[3].charAt(0) != "r" && dealer_cards[3].charAt(0) != "3"&& juego_dealer!=31 ){           	
			dealer_cards[3] = deck[ptr++];
			document.getElementById("dealer_card4").src = "images/40/" + dealer_cards[3] + ".png";
			playSound("card_drop");}
 }

function nombreBazaP(){
	if (cartas_player =="4,0,0,0,0,0,0,0"){name_player="Piara o el equipo A";}
    else if (cartas_player == "3,0,0,0,0,0,0,1"){ name_player="Solomillo o la bonita";}
	else if (cartas_player == "2,0,0,0,0,0,0,2"){ name_player="Duplex Gallegos";}
    else if (cartas_player == "2,0,2,0,0,0,0,0"){ name_player="Duplex Vascos o Duplex Andaluces o Cojonudos";}
	else if (cartas_player == "2,2,0,0,0,0,0,0"){ name_player="Duplex Castellanos";}
    else if (cartas_player == "1,0,0,3,0,0,0,0"){ name_player="La Real gana a mano";}
	else if (cartas_player == "0,0,0,1,1,1,1,0"){ name_player="Tio Perete";}
    else if (cartas_player == "1,0,0,0,0,0,0,3"){ name_player="Besugo";}
	else if (cartas_player == "2,1,1,0,0,0,0,0"){ name_player="Ley de Mus";}
    else if (cartas_player == "1,1,0,0,0,0,1,1"){ name_player="Equidistante o la del tonto, o del tio Paco";}
	else if (cartas_player == "0,0,0,0,0,0,4,0"){ name_player="Jugada del Sastre";}
    else if (cartas_player == "1,3,0,0,0,0,0,0"){ name_player="El Banco de Bilbao";}
	else if (cartas_player == "1,1,0,0,0,0,0,2"){ name_player="La de Benito o Ladrona";}
    else if (cartas_player == "0,3,1,0,0,0,0,0"){ name_player="El Vitor";}
	else if (cartas_player == "0,0,3,0,0,0,0,1"){ name_player="Cordobeses";}
    else if (cartas_player == "0,1,1,1,0,0,1,0"){ name_player="Juego Jesusiano";}
	else if (cartas_player == "1,2,1,0,0,0,0,0"){ name_player="No era esa la que queria";}
    else if (cartas_player == "1,0,3,0,0,0,0,0"){ name_player="Soterio";}
	else if (cartas_player == "2,0,1,0,0,0,0,1"){ name_player="La una con un par de guarros";}
    else if (cartas_player == "2,1,0,0,0,0,0,1"){ name_player="La una con un par de guarros";}
	else if (cartas_player == "1,1,1,0,0,0,0,1"){ name_player="Una sin pares, con gato incluido";}
    else if (cartas_player == "0,1,0,1,1,0,0,1"){ name_player="Mierdecilla";}
	else if (cartas_player == "0,1,0,1,0,1,0,1"){ name_player="Mierdecilla";}
    else if (cartas_player == "0,1,0,1,0,0,1,1"){ name_player="Mierdecilla";}
	else if (cartas_player == "0,1,0,0,1,1,0,1"){ name_player="Mierdecilla";}
	else if (cartas_player == "0,1,0,0,1,0,1,1"){ name_player="Mierdecilla";}
    else if (cartas_player == "0,1,0,1,0,1,1,1"){ name_player="Mierdecilla";} 
	return name_player; 	
}
function cortar(){ 
        playSound("card_drop");
        displayOver('game_over', '¡Hablamos de GRANDE!');
		verCartas();
	    document.getElementById("D1").disabled = true;
		document.getElementById("D1").style.visibility = "hidden";
		document.getElementById("D2").disabled = true;
		document.getElementById("D2").style.visibility = "hidden";
        document.getElementById("D3").disabled = true;
		document.getElementById("D3").style.visibility = "hidden";
		document.getElementById("D4").disabled = true;
		document.getElementById("D4").style.visibility = "hidden";
		document.getElementById("Mus").disabled = true;
		document.getElementById("Mus").style.visibility = "hidden";
		document.getElementById("Cortar").disabled = true;
		document.getElementById("Cortar").style.visibility = "hidden";
		juego_dealer = scoreCards(dealer_cards);
		playSound("lose");
		playSound("win");
		playSound("shuffle");
		name_player=nombreBazaP();
		juego_player = scoreCards(player_cards);
        updateScore('player_score', + player_score + ' Tantos');
		updateScore('dealer_score', + dealer_score + ' Tantos');
		displayOver('player_over3', juego_player + ' de juego');
		displayOver('player_over5', 'Nombre jugada: '+ name_player);		
		displayOver('dealer_over', cartas_dealer);
		displayOver('player_over2', cartas_player);
		
		
		//playSound("musica");
		//displayOver('dealer_over', +cartas_dealer.charAt(0)+' Reyes'+ cartas_dealer.charAt(7)+' Pitos');
		displayOver('player_over', cartas_player[0]+ " Reyes y "+ cartas_player[7]+ " Pitos");
		if (cartas_dealer[0]>1){
			//window.setTimeout("displayOver('dealer_over', 'MESA ENVIDA A LA GRANDE')", time += 50);
            displayOver('game_over', '¡MESA ENVIDA A LA GRANDE!');
			document.getElementById("VeoG").style.visibility = "visible";
		    document.getElementById("VeoG").disabled = false;
			document.getElementById("PasoG").style.visibility = "visible";
		    document.getElementById("PasoG").disabled = false;
			document.getElementById("Envido5G").style.visibility = "visible";
		    document.getElementById("Envido5G").disabled = false;}
		else {	
			//window.setTimeout("displayOver('dealer_over', 'JUGADOR HABLA DE GRANDE')", time += 3000);
            displayOver('game_over', 'JUGADOR HABLA DE GRANDE');		
		    document.getElementById("EnvidoG").style.visibility = "visible";
		    document.getElementById("EnvidoG").disabled = false;
			document.getElementById("PasoG").style.visibility = "visible";
		    document.getElementById("PasoG").disabled = false;
			document.getElementById("Envido5G").style.visibility = "visible";
		    document.getElementById("Envido5G").disabled = false;
}}

function paresP(){	
    document.getElementById("EnvidoP").style.visibility = "hidden";
	document.getElementById("EnvidoP").disabled = true;
	document.getElementById("PasoP").style.visibility = "hidden";
	document.getElementById("PasoP").disabled = true;
	document.getElementById("Envido5P").style.visibility = "hidden";
	document.getElementById("Envido5P").disabled = true;
	document.getElementById("VeoP").style.visibility = "hidden";
	document.getElementById("VeoP").disabled = true;
	if (cartas_dealer[0]>2 || cartas_dealer[1]>2 ||cartas_dealer[2]>2 ||cartas_dealer[3]>2 ||cartas_dealer[4]>2 ||cartas_dealer[5]>2 ||cartas_dealer[6]>2 ||cartas_dealer[7]>2){
		 dealer_score +=1;
		 updateScore('dealer_score', + dealer_score + ' Tantos');
		 playSound("card_drop");
		 displayOver('game_over', 'MESA GANA EN PASE!');
		 playSound("lose");
		 paresPlay=1;
		}
	 displayOver('game_over', 'PARES EN PASE!');	 
	 paresPlay=2;
	 displayOver('game_over', '¿TIENES JUEGO?');
	document.getElementById("Juego").style.visibility = "visible";
	document.getElementById("Juego").disabled = false;
	document.getElementById("NJuego").style.visibility = "visible";
	document.getElementById("NJuego").disabled = false;
	return paresPlay; 
}

function paresE(){	
    document.getElementById("EnvidoP").style.visibility = "hidden";
	document.getElementById("EnvidoP").disabled = true;
	document.getElementById("PasoP").style.visibility = "hidden";
	document.getElementById("PasoP").disabled = true;
	document.getElementById("Envido5P").style.visibility = "hidden";
	document.getElementById("Envido5P").disabled = true;
	document.getElementById("VeoP").style.visibility = "hidden";
	document.getElementById("VeoP").disabled = true;
	displayOver('game_over', 'PARES ENVIDADOS!');	 
	paresPlay=3;
	displayOver('game_over', '¿TIENES JUEGO?');
	document.getElementById("Juego").style.visibility = "visible";
	document.getElementById("Juego").disabled = false;
	document.getElementById("NJuego").style.visibility = "visible";
	document.getElementById("NJuego").disabled = false;
	return paresPlay; 
}

function pares5(){	
    document.getElementById("EnvidoP").style.visibility = "hidden";
	document.getElementById("EnvidoP").disabled = true;
	document.getElementById("PasoP").style.visibility = "hidden";
	document.getElementById("PasoP").disabled = true;
	document.getElementById("Envido5P").style.visibility = "hidden";
	document.getElementById("Envido5P").disabled = true;
	document.getElementById("VeoP").style.visibility = "hidden";
	document.getElementById("VeoP").disabled = true;
	 displayOver('game_over', 'PARES ENVIDADOS CINCO!');	 
	 paresPlay=5;
	 displayOver('game_over', '¿TIENES JUEGO?');
	document.getElementById("Juego").style.visibility = "visible";
	document.getElementById("Juego").disabled = false;
	document.getElementById("NJuego").style.visibility = "visible";
	document.getElementById("NJuego").disabled = false;
	return paresPlay; 
}

function paresV(){	
    document.getElementById("EnvidoP").style.visibility = "hidden";
	document.getElementById("EnvidoP").disabled = true;
	document.getElementById("PasoP").style.visibility = "hidden";
	document.getElementById("PasoP").disabled = true;
	document.getElementById("Envido5P").style.visibility = "hidden";
	document.getElementById("Envido5P").disabled = true;
	document.getElementById("VeoP").style.visibility = "hidden";
	document.getElementById("VeoP").disabled = true;
	 displayOver('game_over', 'LOS PARES SE VEN!');	 
	 paresPlay=4;
	displayOver('game_over', '¿TIENES JUEGO?');
	document.getElementById("Juego").style.visibility = "visible";
	document.getElementById("Juego").disabled = false;
	document.getElementById("NJuego").style.visibility = "visible";
	document.getElementById("NJuego").disabled = false;
	return paresPlay; 
}


function juego () {
	
	if (juego_player<31){displayOver('game_over', 'EL JUGADOR NO TIENE JUEGO!'); punto();}
	displayOver('game_over', "HAY JUEGO");
    document.getElementById("Juego").style.visibility = "hidden";
	document.getElementById("Juego").disabled = true;
	document.getElementById("NJuego").style.visibility = "hidden";
	document.getElementById("NJuego").disabled = true;	
	displayOver('game_over', 'HABLAMOS DE JUEGO!');	 
	displayOver('dealer_over', juego_dealer);
	if (juego_dealer == 31 || juego_dealer ==32){
            displayOver('game_over', '¡MESA ENVIDA A JUEGO!');
			document.getElementById("VeoJ").style.visibility = "visible";
		    document.getElementById("VeoJ").disabled = false;
			document.getElementById("PasoJ").style.visibility = "visible";
		    document.getElementById("PasoJ").disabled = false;
			document.getElementById("Envido5J").style.visibility = "visible";
		    document.getElementById("Envido5J").disabled = false;}
		else {	
			//window.setTimeout("displayOver('dealer_over', 'JUGADOR HABLA DE GRANDE')", time += 3000);
            displayOver('game_over', 'JUGADOR HABLA DE JUEGO');		
		    document.getElementById("EnvidoJ").style.visibility = "visible";
		    document.getElementById("EnvidoJ").disabled = false;
			document.getElementById("PasoJ").style.visibility = "visible";
		    document.getElementById("PasoJ").disabled = false;
			document.getElementById("Envido5J").style.visibility = "visible";
		    document.getElementById("Envido5J").disabled = false;}
}
	
function juegoN () {
    document.getElementById("Juego").style.visibility = "hidden";
	document.getElementById("Juego").disabled = true;
	document.getElementById("NJuego").style.visibility = "hidden";
	document.getElementById("NJuego").disabled = true;	
	if (juego_dealer > 30){
            displayOver('game_over', '¡ LA MESA TIENE JUEGO!');
			document.getElementById("Resultado").style.visibility = "visible";
		    document.getElementById("Resultado").disabled = false;
			displayOver('game_over', '¿PULSE VER MANO PARA RESULTADOS?');
			juegoPlay=6;}
		else {	
			//window.setTimeout("displayOver('dealer_over', 'JUGADOR HABLA DE GRANDE')", time += 3000);
            displayOver('game_over', 'HABLAMOS DEL PUNTO');
			if (juego_dealer > 28){
				displayOver('game_over', '¡ LA MESA ENVIDA AL PUNTO!');
				document.getElementById("PasoU").style.visibility = "visible";
				document.getElementById("PasoU").disabled = false;
				document.getElementById("VeoU").style.visibility = "visible";
				document.getElementById("VeoU").disabled = false;}
		     else {	
			//window.setTimeout("displayOver('dealer_over', 'JUGADOR HABLA DE GRANDE')", time += 3000);
				displayOver('game_over', 'JUGADOR HABLA DEL PUNTO');
				document.getElementById("PasoU").style.visibility = "visible";
				document.getElementById("PasoU").disabled = false;
				document.getElementById("EnvidoU").style.visibility = "visible";
				document.getElementById("EnvidoU").disabled = false;}}
			return juegoPlay;		 
}	

function juegoP(){	
    document.getElementById("EnvidoJ").style.visibility = "hidden";
	document.getElementById("EnvidoJ").disabled = true;
	document.getElementById("PasoJ").style.visibility = "hidden";
	document.getElementById("PasoJ").disabled = true;
	document.getElementById("Envido5J").style.visibility = "hidden";
	document.getElementById("Envido5J").disabled = true;
	document.getElementById("VeoJ").style.visibility = "hidden";
	document.getElementById("VeoJ").disabled = true;
	if (juego_dealer > 30){
		 dealer_score +=2;
		 updateScore('dealer_score', + dealer_score + ' Tantos');
		 playSound("card_drop");
		 displayOver('game_over', 'MESA GANA EN PASE!');
		 playSound("lose");
		 juegoPlay=1;
		}
	 displayOver('game_over', 'JUEGO EN PASE!');	 
	 juegoPlay=2;
	 displayOver('game_over', '¿PULSE VER MANO PARA RESULTADOS?');
	document.getElementById("Resultado").style.visibility = "visible";
	document.getElementById("Resultado").disabled = false;
	return juegoPlay;	 
}

function juegoE(){	
    document.getElementById("EnvidoJ").style.visibility = "hidden";
	document.getElementById("EnvidoJ").disabled = true;
	document.getElementById("PasoJ").style.visibility = "hidden";
	document.getElementById("PasoJ").disabled = true;
	document.getElementById("Envido5J").style.visibility = "hidden";
	document.getElementById("Envido5J").disabled = true;
	document.getElementById("VeoJ").style.visibility = "hidden";
	document.getElementById("VeoJ").disabled = true;
	displayOver('game_over', 'JUEGO ENVIDADO!');	 
	juegoPlay=3;
	 displayOver('game_over', '¿PULSE VER MANO PARA RESULTADOS?');
	document.getElementById("Resultado").style.visibility = "visible";
	document.getElementById("Resultado").disabled = false;	 
	return juegoPlay;
}

function juego5(){	
    document.getElementById("EnvidoJ").style.visibility = "hidden";
	document.getElementById("EnvidoJ").disabled = true;
	document.getElementById("PasoJ").style.visibility = "hidden";
	document.getElementById("PasoJ").disabled = true;
	document.getElementById("Envido5J").style.visibility = "hidden";
	document.getElementById("Envido5J").disabled = true;
	document.getElementById("VeoJ").style.visibility = "hidden";
	document.getElementById("VeoJ").disabled = true;
	 displayOver('game_over', 'JUEGO ENVIDADO A CINCO!');	 
	 juegoPlay=5;
	 displayOver('game_over', '¿PULSE VER MANO PARA RESULTADOS?');
	document.getElementById("Resultado").style.visibility = "visible";
	document.getElementById("Resultado").disabled = false;
	return juegoPlay;	 
}

function juegoV(){	
    document.getElementById("EnvidoJ").style.visibility = "hidden";
	document.getElementById("EnvidoJ").disabled = true;
	document.getElementById("PasoJ").style.visibility = "hidden";
	document.getElementById("PasoJ").disabled = true;
	document.getElementById("Envido5J").style.visibility = "hidden";
	document.getElementById("Envido5J").disabled = true;
	document.getElementById("VeoJ").style.visibility = "hidden";
	document.getElementById("VeoJ").disabled = true;
	 displayOver('game_over', 'EL JUEGO SE VE!');	 
	 juegoPlay=4;
	displayOver('game_over', '¿PULSE VER MANO PARA RESULTADOS?');
	document.getElementById("Resultado").style.visibility = "visible";
	document.getElementById("Resultado").disabled = false;
	return juegoPlay;	 
}

function puntoP(){	
    document.getElementById("VeoU").style.visibility = "hidden";
	document.getElementById("VeoU").disabled = true;
	document.getElementById("PasoU").style.visibility = "hidden";
	document.getElementById("PasoU").disabled = true;
	document.getElementById("EnvidoU").style.visibility = "hidden";
	document.getElementById("EnvidoU").disabled = true;	 
	if (juego_dealer > 30){
		 dealer_score +=2;
		 updateScore('dealer_score', + dealer_score + ' Tantos');
		 playSound("card_drop");
		 displayOver('game_over', 'MESA GANA EN PASE!');
		 playSound("lose");
		 puntoPlay=1;
		}
	puntoPlay=2;
	displayOver('game_over', '¿PULSE VER MANO PARA RESULTADOS?');
	document.getElementById("Resultado").style.visibility = "visible";
	document.getElementById("Resultado").disabled = false;
	return puntoPlay;	 
}

function puntoV(){	
    document.getElementById("VeoU").style.visibility = "hidden";
	document.getElementById("VeoU").disabled = true;
	document.getElementById("PasoU").style.visibility = "hidden";
	document.getElementById("PasoU").disabled = true;
	document.getElementById("EnvidoU").style.visibility = "hidden";
	document.getElementById("EnvidoU").disabled = true;	 
	displayOver('game_over', 'EL PUNTO SE VE!');	 
	puntoPlay=4;
	displayOver('game_over', '¿PULSE VER MANO PARA RESULTADOS?');
	document.getElementById("Resultado").style.visibility = "visible";
	document.getElementById("Resultado").disabled = false;	
	return puntoPlay; 
}

function puntoE(){	
    document.getElementById("VeoU").style.visibility = "hidden";
	document.getElementById("VeoU").disabled = true;
	document.getElementById("PasoU").style.visibility = "hidden";
	document.getElementById("PasoU").disabled = true;
	document.getElementById("EnvidoU").style.visibility = "hidden";
	document.getElementById("EnvidoU").disabled = true;	 
	displayOver('game_over', 'EL PUNTO ENVIDADO!');	 
	puntoPlay=3;
	displayOver('game_over', '¿PULSE VER MANO PARA RESULTADOS?');
	document.getElementById("Resultado").style.visibility = "visible";
	document.getElementById("Resultado").disabled = false;	
	return puntoPlay; 
}

function pares () {
	if (cartas_dealer[0]>1 || cartas_dealer[1]>1 ||cartas_dealer[2]>1 ||cartas_dealer[3]>1 ||cartas_dealer[4]>1 ||cartas_dealer[5]>1 ||cartas_dealer[6]>1 ||cartas_dealer[7]>1){
		displayOver('game_over', "HAY PARES");
		document.getElementById("Pares").style.visibility = "hidden";
		document.getElementById("Pares").disabled = true;
		document.getElementById("NPares").style.visibility = "hidden";
		document.getElementById("NPares").disabled = true;	
		displayOver('game_over', 'HABLAMOS DE PARES!');	 
		if (cartas_dealer[0]>2 || cartas_dealer[1]>2 ||cartas_dealer[2]>2 ||cartas_dealer[3]>2 ||cartas_dealer[4]>2 ||cartas_dealer[5]>2 ||cartas_dealer[6]>2 ||cartas_dealer[7]>2){
				//window.setTimeout("displayOver('dealer_over', 'MESA ENVIDA A LA GRANDE')", time += 50);
				displayOver('game_over', '¡MESA ENVIDA A PARES!');
				document.getElementById("VeoP").style.visibility = "visible";
				document.getElementById("VeoP").disabled = false;
				document.getElementById("PasoP").style.visibility = "visible";
				document.getElementById("PasoP").disabled = false;
				document.getElementById("Envido5P").style.visibility = "visible";
				document.getElementById("Envido5P").disabled = false;}
			else {	
				//window.setTimeout("displayOver('dealer_over', 'JUGADOR HABLA DE GRANDE')", time += 3000);
				displayOver('game_over', 'JUGADOR HABLA DE PARES');		
				document.getElementById("EnvidoP").style.visibility = "visible";
				document.getElementById("EnvidoP").disabled = false;
				document.getElementById("PasoP").style.visibility = "visible";
				document.getElementById("PasoP").disabled = false;
				document.getElementById("Envido5P").style.visibility = "visible";
				document.getElementById("Envido5P").disabled = false;}}
	else {
		displayOver('game_over', "LA MESA NO TIENE PARES");	
		document.getElementById("Pares").style.visibility = "hidden";
		document.getElementById("Pares").disabled = true;
		document.getElementById("NPares").style.visibility = "hidden";
		document.getElementById("NPares").disabled = true;			
		document.getElementById("Juego").style.visibility = "visible";
		document.getElementById("Juego").disabled = false;
		document.getElementById("NJuego").style.visibility = "visible";
		document.getElementById("NJuego").disabled = false; 
		displayOver('game_over', '¿TIENES JUEGO?');}
	}	
	
function paresN () {
	displayOver('game_over', "No HAY PARES");
    document.getElementById("Pares").style.visibility = "hidden";
	document.getElementById("Pares").disabled = true;
	document.getElementById("NPares").style.visibility = "hidden";
	document.getElementById("NPares").disabled = true;	

	displayOver('game_over', '¿TIENES JUEGO?');
	document.getElementById("Juego").style.visibility = "visible";
	document.getElementById("Juego").disabled = false;
	document.getElementById("NJuego").style.visibility = "visible";
	document.getElementById("NJuego").disabled = false; 
}		

 	
function jugamosChica() {		
	// JUGAMOS A LA CHICA
	var player_chica = chicaCards(player_cards);
	displayOver('player_over', + player_chica + ' Pitos');
	var dealer_chica = chicaCards(dealer_cards);
	displayOver('dealer_over', + dealer_chica + ' Pitos');
	if (dealer_chica >1){
		//window.setTimeout("displayOver('dealer_over', 'MESA ENVIDA A LA GRANDE')", time += 50);
		displayOver('game_over', '¡MESA ENVIDA A LA CHICA!');
		document.getElementById("VeoC").style.visibility = "visible";
		document.getElementById("VeoC").disabled = false;
		document.getElementById("PasoC").style.visibility = "visible";
		document.getElementById("PasoC").disabled = false;
		document.getElementById("Envido5C").style.visibility = "visible";
		document.getElementById("Envido5C").disabled = false;}
	else {	
		//window.setTimeout("displayOver('dealer_over', 'JUGADOR HABLA DE GRANDE')", time += 3000);
		displayOver('game_over', 'JUGADOR HABLA DE CHICA');		
		document.getElementById("EnvidoC").style.visibility = "visible";
		document.getElementById("EnvidoC").disabled = false;
		document.getElementById("PasoC").style.visibility = "visible";
		document.getElementById("PasoC").disabled = false;
		document.getElementById("Envido5C").style.visibility = "visible";
		document.getElementById("Envido5C").disabled = false;}
}

function chicaP(){	
    document.getElementById("EnvidoC").style.visibility = "hidden";
	document.getElementById("EnvidoC").disabled = true;
	document.getElementById("PasoC").style.visibility = "hidden";
	document.getElementById("PasoC").disabled = true;
	document.getElementById("Envido5C").style.visibility = "hidden";
	document.getElementById("Envido5C").disabled = true;
	document.getElementById("VeoC").style.visibility = "hidden";
	document.getElementById("VeoC").disabled = true;
	if (cartas_dealer[7]>1){
		 dealer_score +=1;
		 updateScore('dealer_score', + dealer_score + ' Tantos');
		 playSound("card_drop");
		 displayOver('game_over', 'MESA GANA EN PASE!');
		 playSound("lose");
		 chicaPlay=1;
		}
	 displayOver('game_over', 'CHICA EN PASE!');	 
	 chicaPlay=2;
	 displayOver('game_over', '¿TIENES PARES?');
	document.getElementById("Pares").style.visibility = "visible";
	document.getElementById("Pares").disabled = false;
	document.getElementById("NPares").style.visibility = "visible";
	document.getElementById("NPares").disabled = false;
	return chicaPlay; 
}

function chicaE(){	
    document.getElementById("EnvidoC").style.visibility = "hidden";
	document.getElementById("EnvidoC").disabled = true;
	document.getElementById("PasoC").style.visibility = "hidden";
	document.getElementById("PasoC").disabled = true;
	document.getElementById("Envido5C").style.visibility = "hidden";
	document.getElementById("Envido5C").disabled = true;
	document.getElementById("VeoC").style.visibility = "hidden";
	document.getElementById("VeoC").disabled = true;
	displayOver('game_over', 'CHICA ENVIDADA!');	 
	chicaPlay=3;
	displayOver('game_over', '¿TIENES PARES?');
	document.getElementById("Pares").style.visibility = "visible";
	document.getElementById("Pares").disabled = false;
	document.getElementById("NPares").style.visibility = "visible";
	document.getElementById("NPares").disabled = false;
	return chicaPlay; 
}

function chica5(){	
    document.getElementById("EnvidoC").style.visibility = "hidden";
	document.getElementById("EnvidoC").disabled = true;
	document.getElementById("PasoC").style.visibility = "hidden";
	document.getElementById("PasoC").disabled = true;
	document.getElementById("Envido5C").style.visibility = "hidden";
	document.getElementById("Envido5C").disabled = true;
	document.getElementById("VeoC").style.visibility = "hidden";
	document.getElementById("VeoC").disabled = true;
	 displayOver('game_over', 'CHICA ENVIDADA CINCO!');	 
	 chicaPlay=5;
	 displayOver('game_over', '¿TIENES PARES?');
	document.getElementById("Pares").style.visibility = "visible";
	document.getElementById("Pares").disabled = false;
	document.getElementById("NPares").style.visibility = "visible";
	document.getElementById("NPares").disabled = false;
	return chicaPlay; 
}

function chicaV(){	
    document.getElementById("EnvidoC").style.visibility = "hidden";
	document.getElementById("EnvidoC").disabled = true;
	document.getElementById("PasoC").style.visibility = "hidden";
	document.getElementById("PasoC").disabled = true;
	document.getElementById("Envido5C").style.visibility = "hidden";
	document.getElementById("Envido5C").disabled = true;
	document.getElementById("VeoC").style.visibility = "hidden";
	document.getElementById("VeoC").disabled = true;	
	 displayOver('game_over', 'LA CHICA SE VE!');	 
	 chicaPlay=4;
	displayOver('game_over', '¿TIENES PARES?');
	document.getElementById("Pares").style.visibility = "visible";
	document.getElementById("Pares").disabled = false;
	document.getElementById("NPares").style.visibility = "visible";
	document.getElementById("NPares").disabled = false;
	return chicaPlay;	 
}

function grandeP(){	
    document.getElementById("EnvidoG").style.visibility = "hidden";
	document.getElementById("EnvidoG").disabled = true;
	document.getElementById("PasoG").style.visibility = "hidden";
	document.getElementById("PasoG").disabled = true;
	document.getElementById("Envido5G").style.visibility = "hidden";
	document.getElementById("Envido5G").disabled = true;
	document.getElementById("VeoG").style.visibility = "hidden";
	document.getElementById("VeoG").disabled = true;	
	if (cartas_dealer[0]>1){
		 dealer_score +=1;
		 updateScore('dealer_score', + dealer_score + ' Tantos');
		 playSound("card_drop");
		 displayOver('game_over', 'MESA GANA EN PASE!');
		 playSound("lose");
		 grandePlay=1;
		}
	 displayOver('game_over', 'GRANDE EN PASE!');	 
	 grandePlay=2;
	 if (cartas_dealer[7]>1){
			//window.setTimeout("displayOver('dealer_over', 'MESA ENVIDA A LA GRANDE')", time += 50);
            displayOver('game_over', '¡MESA ENVIDA A LA CHICA!');
			document.getElementById("VeoC").style.visibility = "visible";
		    document.getElementById("VeoC").disabled = false;
			document.getElementById("PasoC").style.visibility = "visible";
		    document.getElementById("PasoC").disabled = false;
			document.getElementById("Envido5C").style.visibility = "visible";
		    document.getElementById("Envido5C").disabled = false;}
		else {	
			//window.setTimeout("displayOver('dealer_over', 'JUGADOR HABLA DE GRANDE')", time += 3000);
            displayOver('game_over', 'JUGADOR HABLA DE CHICA');		
		    document.getElementById("EnvidoC").style.visibility = "visible";
		    document.getElementById("EnvidoC").disabled = false;
			document.getElementById("PasoC").style.visibility = "visible";
		    document.getElementById("PasoC").disabled = false;
			document.getElementById("Envido5C").style.visibility = "visible";
		    document.getElementById("Envido5C").disabled = false;}
	    return grandePlay;
}

function grandeE(){	
    document.getElementById("EnvidoG").style.visibility = "hidden";
	document.getElementById("EnvidoG").disabled = true;
	document.getElementById("PasoG").style.visibility = "hidden";
	document.getElementById("PasoG").disabled = true;
	document.getElementById("Envido5G").style.visibility = "hidden";
	document.getElementById("Envido5G").disabled = true;
	document.getElementById("VeoG").style.visibility = "hidden";
	document.getElementById("VeoG").disabled = true;	
	displayOver('game_over', 'GRANDE ENVIDADA!');	 
	grandePlay=3;
	 if (cartas_dealer[7]>1){
			//window.setTimeout("displayOver('dealer_over', 'MESA ENVIDA A LA GRANDE')", time += 50);
            displayOver('game_over', '¡MESA ENVIDA A LA CHICA!');
			document.getElementById("VeoC").style.visibility = "visible";
		    document.getElementById("VeoC").disabled = false;
			document.getElementById("PasoC").style.visibility = "visible";
		    document.getElementById("PasoC").disabled = false;
			document.getElementById("Envido5C").style.visibility = "visible";
		    document.getElementById("Envido5C").disabled = false;}
		else {	
			//window.setTimeout("displayOver('dealer_over', 'JUGADOR HABLA DE GRANDE')", time += 3000);
            displayOver('game_over', 'JUGADOR HABLA DE CHICA');		
		    document.getElementById("EnvidoC").style.visibility = "visible";
		    document.getElementById("EnvidoC").disabled = false;
			document.getElementById("PasoC").style.visibility = "visible";
		    document.getElementById("PasoC").disabled = false;
			document.getElementById("Envido5C").style.visibility = "visible";
		    document.getElementById("Envido5C").disabled = false;}
	 return grandePlay;
}

function grande5(){	
    document.getElementById("EnvidoG").style.visibility = "hidden";
	document.getElementById("EnvidoG").disabled = true;
	document.getElementById("PasoG").style.visibility = "hidden";
	document.getElementById("PasoG").disabled = true;
	document.getElementById("Envido5G").style.visibility = "hidden";
	document.getElementById("Envido5G").disabled = true;
	document.getElementById("VeoG").style.visibility = "hidden";
	document.getElementById("VeoG").disabled = true;	
	 displayOver('game_over', 'GRANDE ENVIDADA CINCO!');	 
	 grandePlay=5;
	 if (cartas_dealer[7]>1){
			//window.setTimeout("displayOver('dealer_over', 'MESA ENVIDA A LA GRANDE')", time += 50);
            displayOver('game_over', '¡MESA ENVIDA A LA CHICA!');
			document.getElementById("VeoC").style.visibility = "visible";
		    document.getElementById("VeoC").disabled = false;
			document.getElementById("PasoC").style.visibility = "visible";
		    document.getElementById("PasoC").disabled = false;
			document.getElementById("Envido5C").style.visibility = "visible";
		    document.getElementById("Envido5C").disabled = false;}
		else {	
			//window.setTimeout("displayOver('dealer_over', 'JUGADOR HABLA DE GRANDE')", time += 3000);
            displayOver('game_over', 'JUGADOR HABLA DE CHICA');		
		    document.getElementById("EnvidoC").style.visibility = "visible";
		    document.getElementById("EnvidoC").disabled = false;
			document.getElementById("PasoC").style.visibility = "visible";
		    document.getElementById("PasoC").disabled = false;
			document.getElementById("Envido5C").style.visibility = "visible";
		    document.getElementById("Envido5C").disabled = false;}
	 return grandePlay;
}

function grandeV(){	
    document.getElementById("EnvidoG").style.visibility = "hidden";
	document.getElementById("EnvidoG").disabled = true;
	document.getElementById("PasoG").style.visibility = "hidden";
	document.getElementById("PasoG").disabled = true;
	document.getElementById("Envido5G").style.visibility = "hidden";
	document.getElementById("Envido5G").disabled = true;
	document.getElementById("VeoG").style.visibility = "hidden";
	document.getElementById("VeoG").disabled = true;	
	 displayOver('game_over', 'LA GRANDE SE VE!');	 
	 grandePlay=4;
	 if (cartas_dealer[7]>1){
			//window.setTimeout("displayOver('dealer_over', 'MESA ENVIDA A LA GRANDE')", time += 50);
            displayOver('game_over', '¡MESA ENVIDA A LA CHICA!');
			document.getElementById("VeoC").style.visibility = "visible";
		    document.getElementById("VeoC").disabled = false;
			document.getElementById("PasoC").style.visibility = "visible";
		    document.getElementById("PasoC").disabled = false;
			document.getElementById("Envido5C").style.visibility = "visible";
		    document.getElementById("Envido5C").disabled = false;}
		else {	
			//window.setTimeout("displayOver('dealer_over', 'JUGADOR HABLA DE GRANDE')", time += 3000);
            displayOver('game_over', 'JUGADOR HABLA DE CHICA');		
		    document.getElementById("EnvidoC").style.visibility = "visible";
		    document.getElementById("EnvidoC").disabled = false;
			document.getElementById("PasoC").style.visibility = "visible";
		    document.getElementById("PasoC").disabled = false;
			document.getElementById("Envido5C").style.visibility = "visible";
		    document.getElementById("Envido5C").disabled = false;}
	 return grandePlay;
}


function verCartas() {
			var dr =0;
			var pr =0;
			var dc =0;
			var pc =0;
			var ds =0;
			var ps =0;
			var d7 =0;
			var p7 =0;
			var d6 =0;
			var p6 =0;
			var d5 =0;
			var p5 =0;
			var d4 =0;
			var p4 =0;
			var d1 =0;
			var p1 =0;
    		for (var i = 0; i < 4; ++i){
				cardd = dealer_cards[i]
        		cardp = player_cards[i];	
        	    if (cardd != ""){
				   if (dealer_cards[i].charAt(0) == "r" || dealer_cards[i].charAt(0) == "3" ){dr++;}			 
			       if (dealer_cards[i].charAt(0) == "c"){dc++;}
				   if (dealer_cards[i].charAt(0) == "s"){ds++;}
				   if (dealer_cards[i].charAt(0) == "7"){d7++;}
				   if (dealer_cards[i].charAt(0) == "6"){d6++;}
				   if (dealer_cards[i].charAt(0) == "5"){d5++;}
				   if (dealer_cards[i].charAt(0) == "4"){d4++;}
				   if (dealer_cards[i].charAt(0) == "1" || dealer_cards[i].charAt(0) == "2" ){d1++;}}
				 if (cardp != ""){	
				   if (player_cards[i].charAt(0) == "r" || player_cards[i].charAt(0) == "3" ){pr++;}		 
			       if (player_cards[i].charAt(0) == "c"){pc++;}
				   if (player_cards[i].charAt(0) == "s"){ps++;}
				   if (player_cards[i].charAt(0) == "7"){p7++;}
				   if (player_cards[i].charAt(0) == "6"){p6++;}
				   if (player_cards[i].charAt(0) == "5"){p5++;}
				   if (player_cards[i].charAt(0) == "4"){p4++;}
				   if (player_cards[i].charAt(0) == "1" || player_cards[i].charAt(0) == "2" ){p1++;}}
				   
			}
           cartas_player=[pr,pc,ps,p7,p6,p5,p4,p1];
		   cartas_dealer=[dr,dc,ds,d7,d6,d5,d4,d1];
		   return cartas_player;
		   return cartas_dealer;
}

 
function updateScore(scoreId, score){
    document.getElementById(scoreId).innerHTML = score;
	return;
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

function makeVisible(elemId){
    document.getElementById(elemId).style.visibility = "visible";
    playSound("card_drop");
}

/*function nextGame(delay){
    document.getElementById("Play").disabled = false;
    document.getElementById("Play").style.visibility = "visible";
    window.setTimeout(startGame, delay);
}

function startGame(){
    document.getElementById("Play").focus();
    
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
 */
