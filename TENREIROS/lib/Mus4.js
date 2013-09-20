//GLOBAL VARIABLES######################################################################
var suit = ['o', 'c', 'e', 'b'];
var rank = ['1', '2', '3', '4', '5', '6', '7', 's', 'c', 'r'];
var deck = new Array(40);
var deckGet= new Array();
var ptr = 0;

var lance="Play";

var dealer_cards = new Array(4);
var player_cards = new Array(4);

var dealer_c = "";
var player_c = "";
		
var player_score = 0;
var dealer_score = 0;

var juego_player = 0;
var juego_dealer = 0; 

var pares_player = [];
var pares_dealer = [];

var p_player = "";
var p_dealer = "";

var name_player = "";
var name_dealer = "";

var sena_player="";

var grandePlay =0;
var chicaPlay =0;
var paresPlay =0;
var juegoPlay =0;
var puntoPlay =0;

// CREATE DECK #############################################################

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

// DICTIONARIES ######################################################

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
nameBet['1'] = 'No visto'; 
nameBet['2'] = 'En Paso';
nameBet['3'] = 'Envidada Mesa';
nameBet['4'] = 'Envidada Jugador';
nameBet['5'] = 'Envidada 5 por el Jugador';
nameBet['6'] = 'Liquidada';
nameBet['7'] = 'Ordago';

function nombreBaza(pla){
	var c = pla;
	if (c == "8,8,8,8"){name_p="Piara o el equipo A";}
    else if (c == "8,8,8,1"){ name_p="Solomillo o la bonita";}
	else if (c == "8,8,1,1"){ name_p="Duplex Gallegos";}
    else if (c == "8,8,6,6"){ name_p="Duplex Vascos o Duplex Andaluces o Cojonudos";}
	else if (c == "8,8,7,7"){ name_p="Duplex Castellanos";}
    else if (c == "8,5,5,5"){ name_p="La Real gana a mano";}
	else if (c == "5,4,3,2"){ name_p="Tio Perete";}
    else if (c == "8,1,1,1"){ name_p="Besugo";}
	else if (c == "8,8,7,6"){ name_p="Ley de Mus";}
    else if (c == "8,7,2,1"){ name_p="Equidistante o la del tonto, o del tio Paco";}
	else if (c == "2,2,2,2"){ name_p="Jugada del Sastre";}
    else if (c == "8,7,7,7"){ name_p="El Banco de Bilbao";}
	else if (c == "8,7,1,1"){ name_p="La de Benito o Ladrona";}
    else if (c == "7,7,7,6"){ name_p="El Vitor";}
	else if (c == "6,6,6,1"){ name_p="Cordobeses";}
    else if (c == "7,6,5,2"){ name_p="Juego Jesusiano";}
	else if (c == "8,7,7,6"){ name_p="No era esa la que queria";}
    else if (c == "8,6,6,6"){ name_p="Soterio";}
	else if (c == "8,8,6,1"){ name_p="La una con un par de guarros";}
    else if (c == "8,8,7,1"){ name_p="La una con un par de guarros";}
	else if (c == "8,7,6,1"){ name_p="Una sin pares, con gato incluido";}
    else if (c == "7,5,4,1"){ name_p="Mierdecilla";}
	else if (c == "7,5,3,1"){ name_p="Mierdecilla";}
    else if (c == "7,5,2,1"){ name_p="Mierdecilla";}
	else if (c == "7,4,3,1"){ name_p="Mierdecilla";}
	else if (c == "7,4,2,1"){ name_p="Mierdecilla";}
    else if (c == "7,5,2,1"){ name_p="Mierdecilla";} 
	else {name_p="sin nombre especial"}
	return name_p; 	
}

function senaBaza(){
	var c = pares_player;
	var c2= juego_player;
	var c3= name_p;
	sena_player="Sin seña";
	if (c[0] == "1" && c[1] == "8"){sena_player="morderse el labio inferior";}
    if (c[0] == "1" && c[1]== "1"){sena_player="sacar la lengua por el centro";}
	if (c[0] == "2" && c[1]== "8"){sena_player="morderse lateralmente el labio inferior";}
	if (c[0] == "2" && c[1]== "1"){sena_player="sacar la lengua por el lado";}
	if (c[0] == "3"){sena_player="levantar cejas";}
	if (c2==31){sena_player="guiñar el ojo";}
	if (c2==30){sena_player="levantar los hombros";}
	if (c2==29){sena_player="levantar hombro izquierdo";}
	if (c2<31 && c[0]=="0"){sena_player="Ciego: cerrar los ojos";}
	if (c3 == "Solomillo o la bonita"){sena_player="boca como para besar";}
	if (c3 == "La Real gana a mano"){sena_player="tocarse lobulo oreja";}	
	return sena_player; 	
}

var nameCard = ['error',' Pitos',' Cuatros',' Cincos',' Seises',' Sietes',' Sotas',' Caballos',' Reyes']; 

displayOver('game_over', '¡Pulse JUGAR para comenzar!');


//SOUNDS AND IMAGES ######################################################################

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
 
//HANDLERS- BUTTONS ##################################################################

var B1  = document.getElementById("B1");
B1.innerHTML = "Jugar";
B1.disabled = false;
B1.style.visibility = "visible";
B1.onclick = function(){ button1();};
var B2  = document.getElementById("B2");
B2.onclick = function(){ button2();};
var B3  = document.getElementById("B3");
B3.onclick = function(){ button3();};
var B4  = document.getElementById("B4");
B4.onclick = function(){ button4();};
var B5  = document.getElementById("B5");
B5.onclick = function(){ button5();};
document.getElementById("B6").disabled =false;
document.getElementById("B6").style.visibility="visible";
document.getElementById("B7").disabled =false;
document.getElementById("B7").style.visibility="visible";


function button1(){
   if (lance=="Play"){play();}
   else if (lance=="Mus"){descarte();}
   else if(lance=="Grande"){grandeO();}	
   else if (lance=="Chica"){chicaO();}
   else if (lance=="Pares"){paresO();}
   else if (lance=="Juego"){juegoO();}
   else if (lance=="Punto"){puntoO();}	
   else if (lance=="Resu"){resultado();}
   else if (lance=="Nuevo"){nuevoGame();}	
}

function button2(){
   if (lance=="Cartas"){mus();}
   else if (lance=="Grande"){grandeN();}
   else if (lance=="Chica"){chicaN();}
   else if (lance=="Pares"){paresN();}	
   else if (lance=="Juego"){juegoN();}
   else if (lance=="Punto"){puntoN();}				
}

function button3(){
	if (lance=="Cartas"|| lance=="Mus"){cortar();}
	else if (lance=="Grande"){grandeP();}
	else if (lance=="Chica"){chicaP();}
	else if (lance=="Pares"){paresP();}	
	else if (lance=="Juego"){juegoP();}
	else if (lance=="Punto"){puntoP();}		
					
}
function button4(){
	if (lance=="Grande"){grandeE();}
	else if (lance=="Chica"){chicaE();}	
	else if (lance=="Pares"){paresE();}	
	else if (lance=="Juego"){juegoE();}
	 else if (lance=="Punto"){puntoE();}	
				
}
function button5(){
	if (lance=="Grande"){grandeC();}
	else if (lance=="Chica"){chicaC();}
	else if (lance=="Pares"){paresC();}	
	else if (lance=="Juego"){juegoC();}
	else if (lance=="Punto"){puntoC();}	
}
function buttonH1(B){
        B.disabled = true;
		B.style.visibility = "hidden";
}

function buttonH2(B,C){
        B.disabled = true;
		B.style.visibility = "hidden";
		C.disabled = true;
		C.style.visibility = "hidden";
}

function buttonH5(B,C,D,E,F){
        B.disabled = true;
		B.style.visibility = "hidden";
		C.disabled = true;
		C.style.visibility = "hidden";
		D.disabled = true;
		D.style.visibility = "hidden";
		E.disabled = true;
		E.style.visibility = "hidden";
		F.disabled = true;
		F.style.visibility = "hidden";
}

function buttonVisi(messa,B){
         B.innerHTML = messa;
		 B.disabled = false;
		 B.style.visibility = "visible";
}	

function buttonV4(){
		 var B=document.getElementById("D1");
		 B.disabled = false;
		 B.style.visibility = "visible";
		 var C=document.getElementById("D2");
		 C.disabled = false;
		 C.style.visibility = "visible";
		 var D=document.getElementById("D3");
		 D.disabled = false;
		 D.style.visibility = "visible";
		 var E=document.getElementById("D4");
		 E.disabled = false;
		 E.style.visibility = "visible";
}	

// PARSES SCORES #####################################################################

function scoreWinP(objeto){
	if (objeto == 6){ playSound("shuffle");} 
	else if (objeto == 2){player_score +=1; playSound("shuffle");} 
	else if (objeto == 5){player_score +=5; playSound("shuffle");}
	else {player_score +=2; playSound("shuffle");}
	updateScore('player_score', + player_score + ' Tantos');
	updateScore('dealer_score', + dealer_score + ' Tantos');
}

function scoreWinD(objeto){	
	if (objeto == 6){ playSound("shuffle");}
	else if (objeto==2){dealer_score +=1; playSound("shuffle");} 
	else if (objeto==5){dealer_score +=5; playSound("shuffle");}
	else {dealer_score +=2;playSound("shuffle");}
	updateScore('player_score', + player_score + ' Tantos');
	updateScore('dealer_score', + dealer_score + ' Tantos');
}	

/////Results //////////////////////////////////////////////////////////////////
function resultado(){
    updateScore('dealer_score2', '<u> RESULTADOS:</u> ' );
	document.getElementById("musica").sound=stop();	
	
    //GRANDE --------------------------------------------------------------
	if (grandePlay >1){
	if (player_c > dealer_c || player_c == dealer_c && mano=="Jugador"){
		updateScore('dealer_score3', ' GRANDE: '+ nameBet[grandePlay]+' ¡Gano Jugador!' );
		playSound("win");
		scoreWinP(grandePlay);}
	else {
		updateScore('dealer_score3', ' GRANDE: '+ nameBet[grandePlay]+' ¡Gano Mesa!' );
		playSound("lose");
		scoreWinD(grandePlay);}}
	else {updateScore('dealer_score3', ' GRANDE: '+ nameBet[grandePlay])}
		
			
	//CHICA	-----------------------------------------------------------		
	if (chicaPlay >1){
	if (player_c < dealer_c || player_c == dealer_c && mano=="Jugador"){
		updateScore('dealer_score4', ' CHICA: '+ nameBet[chicaPlay]+' ¡Gano Jugador!' );
		playSound("win");
		scoreWinP(chicaPlay);}
	else {
		updateScore('dealer_score4', ' CHICA: '+ nameBet[chicaPlay]+' ¡Gano Mesa!' );
		playSound("lose");
		scoreWinD(chicaPlay);}}
	else {updateScore('dealer_score4', ' CHICA: '+ nameBet[chicaPlay]) }

	//PARES	--------------------------------------------------------	
	if (paresPlay >1){	
		if (pares_player[0] > pares_dealer[0] || pares_player[0] == pares_dealer[0] && pares_player[1] > pares_dealer[1] || 
		pares_player[0] == pares_dealer[0] && pares_player[1] == pares_dealer[1] && pares_player[2] > pares_dealer[2] ||
		pares_player[0] == pares_dealer[0] && pares_player[1] == pares_dealer[1] && pares_player[2] == pares_dealer[2] && mano=="Jugador"){
			if (pares_player[0]==3){
				playSound("win");
				player_score +=3;}
			else if (pares_player[0]==2){
				playSound("win");
				player_score +=2;}
			else if (pares_player[0]==1){
				playSound("win");
				player_score +=1;}		
			updateScore('dealer_score5', ' PARES: '+ nameBet[paresPlay]+' ¡Gano Jugador con ' + p_player);
			scoreWinP(paresPlay);}
		else{
			if (pares_dealer[0]==3){
						playSound("lose");
				dealer_score +=3;}
			else if (pares_dealer[0]==2){
				playSound("lose");
				dealer_score +=2;}
			else if (pares_dealer[0]==1){
				playSound("lose");
				dealer_score +=1;}		
			updateScore('dealer_score5', ' PARES: '+ nameBet[paresPlay]+' ¡Gano Mesa con ' + p_dealer);
			scoreWinD(paresPlay);
			}}
		else if (paresPlay==0) {
			updateScore('dealer_score5', ' PARES: NO HAY PARES!');}
		else { 
			updateScore('dealer_score5', ' PARES: NO VISTOS Y COBRADOS!');}
		updateScore('player_score', + player_score + ' Tantos');
		updateScore('dealer_score', + dealer_score + ' Tantos');
		
		//JUEGO	-------------------------------------------------------------
		if (juegoPlay >1){
		if (juego_player == 31 && mano=="Jugador" || juego_player == 31 && juego_dealer!=31){ 
			updateScore('dealer_score6', ' JUEGO: '+ nameBet[juegoPlay]+' ¡Gano el Jugador con 31!');
			playSound("win");
			player_score +=3;
			scoreWinP(juegoPlay);}
		else if (juego_player == 32 && juego_dealer ==32 && mano=="Jugador" || juego_player == 32 && juego_dealer != 31 || juego_player>juego_dealer && juego_dealer != 31 && juego_dealer != 32 && juego_dealer != 40){
			updateScore('dealer_score6', ' JUEGO: '+ nameBet[juegoPlay]+' ¡Gano el Jugador');
			playSound("win");
			player_score +=2;
			scoreWinP(juegoPlay);}
		else if (juego_dealer == 31 && mano=="Mesa" || juego_dealer ==31 && juego_player!= 31){
			updateScore('dealer_score6', ' JUEGO: '+ nameBet[juegoPlay]+' ¡Gano la Mesa con 31!');
			playSound("lose");
			dealer_score +=3;
			scoreWinD(juegoPlay);}
		else {
			updateScore('dealer_score6', ' JUEGO: '+ nameBet[juegoPlay]+' ¡Gano la Mesa!');
			playSound("lose");
			dealer_score +=2;
			scoreWinD(juegoPlay);}}
		if (juegoPlay == 1) {
			updateScore('dealer_score6', ' JUEGO: '+ nameBet[juegoPlay]);
		    updateScore('player_score', + player_score + ' Tantos');
		     updateScore('dealer_score', + dealer_score + ' Tantos');}
		
		if (player_score<35 && dealer_score<35){
			lance="Play";
			buttonVisi("Continuar Partida!",B1);}
		else{
			if (player_score < dealer_score) {
				displayOver('game_over', 'GANO MESA');
				displayOver('game_over2', '¿La revancha?');} 
			else {displayOver('game_over', 'GANO JUGADOR');
				displayOver('game_over2', '¡Enhorabuena Campeón!');}
			lance="Nuevo";
			buttonVisi("¡NUEVO JUEGO!",B1);}	
        
		//PUNTO ------------------------------------------------------------------------
		if (juegoPlay == 0) {
		if (juego_player > juego_dealer || juego_player==juego_dealer && mano=="Jugador"){ 
			updateScore('dealer_score6', ' PUNTO: '+ nameBet[puntoPlay]+' ¡Gano el Jugador!');
			playSound("win");
			player_score +=1;
			scoreWinP(puntoPlay);}
		else{
			updateScore('dealer_score6', ' PUNTO: '+ nameBet[puntoPlay]+' ¡Gano la Mesa!');
			playSound("lose");
			dealer_score +=1;
			scoreWinD(puntoPlay);}}
			
		updateScore('player_score', + player_score + ' Tantos');
		updateScore('dealer_score', + dealer_score + ' Tantos');
		
		if (player_score<35 && dealer_score<35){
			lance="Play";
			buttonVisi("Continuar Partida!",B1);}
		else{
			lance="Nuevo";
			if (player_score < dealer_score) {
				displayOver('game_over', 'GANO MESA');
				displayOver('game_over2', '¿La revancha?');} 
			else {displayOver('game_over', 'GANO JUGADOR');
				displayOver('game_over2', '¡Enhorabuena Campeón!');}
			playSound("musica");
			buttonVisi("¡NUEVO JUEGO!",B1);}	
}


// PARSES CARDS ####################################################################################

function pesarCartas(){
	    // JUEGO
		juego_player = scoreCards(player_cards);
		juego_dealer = scoreCards(dealer_cards);
		displayOver('player_over', juego_player + ' a juego');
		updateScore('dealer_score7', ' Mesa a Juego: '+ juego_dealer);
        // CARTAS	
		player_c=verCartas(player_cards);
		dealer_c=verCartas(dealer_cards);
		//BAZAS
		name_player=nombreBaza(player_c);
		name_dealer=nombreBaza(dealer_c);		
		displayOver('player_over2','('+ player_c +')  jugada: '+ name_player);
		updateScore('dealer_score7', ' Cartas: ('+ dealer_c + ') '+ name_dealer);
		//PARES
		pares_player =hayPares(player_c);
		pares_dealer =hayPares(dealer_c);	
		//NOMBRE A PARES
		p_player=nomPares(pares_player);
		p_dealer=nomPares(pares_dealer);	
		displayOver('player_over3','('+ pares_player+') '+p_player);
		// SEÑAS
		sena_player=senaBaza();
		displayOver('player_over5','Seña: '+ sena_player);
}

function valorCartas(){
	    var a1="";
		if (juego_player==31){if (mano="Jugador"){ a1="Treinta y Mano ¡CORTAR! ";}else{a3="31 sin Mano ";}}
		if (juego_player==32){ if (mano="Jugador"){ a1="32 a Juego y Mano ";}else{a3="32 sin Mano ";}}
		if (juego_player>32){ if (mano="Jugador"){ a1="Juego y Mano ";}else{a3="Juego sin Mano ";}}
		if (juego_player==30){ if (mano="Jugador"){ a1="30 a Punto y Mano ";}else{a3="30 Punto sin Mano ";}}
		if (juego_player>30 && pares_player[0]=="1") {a3="Juego con Pares. ¡Podemos Cortar!";}
		if (juego_player>30 && pares_player[0]=="2") {a3="Juego con Medias. ¡Cortar!";}
		if (juego_player<30 && pares_player[0]=="2") {a3="Medias. ¡Cortar!";}
		if (juego_player>30 && pares_player[0]=="3") {a3="Juego con Duplex. ¡Cortar!";}
		if (juego_player<30 && pares_player[0]=="2") {a3="Duplex. ¡Cortar!";}
		if (juego_player<30 && pares_player[0]!="0") {a3="Sin juego con Pares";}
		if (juego_player<30 && pares_player[0]=="0"){a3="Sin juego y sin Pares. ¡ROGAR MUS!";}
		displayOver('player_over4', a1);
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

function hayPares(car){
	var r=0;
	var p=0;
	para=[];	
	for (var i = 0; i < 4; ++i){
		var d = car[i];	
		if (d === r ){ para.push(d); p++;}else {r=d;}}
	para.reverse();
	if (para[0] != para[1] && para[1]>"0"){p++;}				 
	para.push(p);
	para.reverse()
	return para;
}

function nomPares(para){
   var r="No hay Pares";
   var r1= ".";
   var p=para[0];
   if (p===1) {
	   r="Hay Pares de ";} 
   else if (p===2){r="Medias de ";}
   else if (p==0) {r="No hay Pares"} 
   else {r="Duplex de "}
   
   if (para[2]>0){ if (para[1]!== para[2]){r="Duplex de "; r1=nameCard[para[1]] + nameCard[para[2]];}else {r1=nameCard[para[1]]}}
   else if (para[1]>0){r1 = nameCard[para[1]];}
   var nom= r+r1;	   
	return nom;      				 
	
}
	
function compareNumbers(a,b){
	return a-b;	
}

function verCartas(arra) {
			var d =0;
			result=[]
			RES="";
    		for (var i = 0; i < 4; ++i){
				d = arra[i].charAt(0);
        	    if (d !== ""){
				   if (d === "r" || d === "3" ){result.push(8);}			 
			       if (d === "c"){result.push(7)}
				   if (d === "s"){result.push(6)}
				   if (d === "7"){result.push(5)}
				   if (d === "6"){result.push(4)}
				   if (d === "5"){result.push(3)}
				   if (d === "4"){result.push(2)}
				   if (d === "1" || d == "2" ){result.push(1)}}				   
			}
			result.sort(compareNumbers);
			result.reverse();
			return result;
}	

// HELPER FUNCTIONS #############################################################
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
    window.setTimeout(preloadImages, 1000);
}

function makeVisible(elemId){
    document.getElementById(elemId).style.visibility = "visible";
    playSound("card_drop");
}


function nuevoGame(){
	player_score=0;
	dealer_score=0;
	displayOver('game_over2', '¡Nueva Partida!');
	updateScore('dealer_score2', ' Nueva Mano!' );
	shuffle();
	play();
	}

//PLAY GAME ROOT #######################################################################################

function play(){
		buttonH1(B1);
		//CLEAN UP
		document.getElementById("musica").sound=stop();	
		lance="Cartas";
		document.getElementById("play_sounds").style.visibility = "hidden";
		grandePlay =0;
		chicaPlay =0;
		paresPlay =0;
		juegoPlay =0;
		puntoPlay =0;
		updateScore('dealer_score2', ' NUEVO JUEGO');
		updateScore('dealer_score3', ' Pendiente Lance GRANDE');
		updateScore('dealer_score4', ' Pendiente Lance CHICA');
		updateScore('dealer_score5', ' Pendiente Lance PARES');
		updateScore('dealer_score6', ' Pendiente Lance JUEGO');
		displayOver('game_over2', '¡Nueva Partida!');
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
            shuffle();
            ptr = 0;
            if (document.getElementById("play_sounds").checked)
                time += 1000;
            
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
		updateScore('player_score', + player_score + ' Tantos');
		updateScore('dealer_score', + dealer_score + ' Tantos');
		if (Math.random()*10<=5){var mano="Jugador";} else {var mano="Mesa";}
		updateScore('game_score',' Mano: ' + mano);
        displayOver('game_over', '¡MUS o CORTAR MUS!');
		pesarCartas();
		valorCartas();	
		buttonVisi("Mus!",B2);
		buttonVisi("Cortar",B3);      
 }
 
// LANCE MUS ///////////////////////////////////////////////////////////////////////////////////

function mus(){
	
	if ( player_score<30 && juego_dealer == 31 || player_score<30 && pares_dealer[0]>1 ||  player_score >29 && juego_dealer > 29 && pares_dealer[0]>0){
	   displayOver('game_over', '¡MESA CORTA MUS!');
	    cortar()
	}else {
		displayOver('game_over', '¡Marque Descartes!');
		lance="Mus"
		buttonVisi("DESCARTAR",B1);
        buttonH2(B2,B3);
		buttonV4();
	}
 }			
	    
function descarte(){
	    displayOver('game_over', '¡MUS o CORTAR MUS!');
		lance="Cartas"
		var time = 0;
        if (ptr > 27){
            shuffle();
            ptr = 0; }  
		/*juego_dealer = scoreCards(dealer_cards);*/ 
		buttonVisi("Mus!",B2);
		buttonVisi("Cortar",B3);  
        buttonH1(B1); 
		buttonV4()		 
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
		pesarCartas();
		valorCartas();		
 }

function cortar(){ 
        playSound("card_drop");
        pesarCartas();
		valorCartas();
		lance="Grande"; 
		displayOver('game_over', '¡Hablamos de GRANDE!'); 
        buttonH2(B2,B3); 
		buttonH2(D1,D2); 
		buttonH2(D3,D4);  		
	    /*document.getElementById("D1").disabled = true;
		document.getElementById("D1").style.visibility = "hidden";
		document.getElementById("D2").disabled = true;
		document.getElementById("D2").style.visibility = "hidden";
        document.getElementById("D3").disabled = true;
		document.getElementById("D3").style.visibility = "hidden";
		document.getElementById("D4").disabled = true;
		document.getElementById("D4").style.visibility = "hidden";*/
		if (player_score > 30 || dealer_c[1]=="8"){
            displayOver('game_over', '¡MESA ENVIDA A LA GRANDE!');
			grandePlay=3;
			buttonVisi("¡ORDAGO A LA GRANDE!",B1);
	    	buttonVisi("No quiero",B2);  
     		buttonVisi("Veo Envite a Grande",B4);
	    	buttonVisi("Subo a 5 La Grande",B5);  
			}
		else {	
            displayOver('game_over', 'JUGADOR HABLA DE GRANDE');
			buttonVisi("¡ORDAGO A LA GRANDE!",B1);
	    	buttonVisi("Paso a La Grande",B3);  
     		buttonVisi("Envido La Grande",B4);
	    	buttonVisi("Envido 5 La Grande",B5);  
}}

 playSound("musica");






