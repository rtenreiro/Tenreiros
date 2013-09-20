// LANCE GRANDE #################################################################################
function grandeO(){
		
		if (dealer_c[2]==8){
			displayOver('game_over', '¡MESA ACEPTA EL ORDAGO!');
			displayOver('game_over2', '¡ORDAGO A GRANDE!');
			if (player_c >dealer_c){
				player_score = 35;
				playSound("win");
				displayOver('game_over', '¡Gana Jugador!');
				updateScore('dealer_score2', ' RESULTADO ORDAGO:¡Gano Jugador!' );
			} else {
				dealer_score = 35;
				playSound("lose");
				displayOver('game_over', '¡Gana MESA!');
				updateScore('dealer_score2', ' RESULTADO ORDAGO:¡Gano MESA!' );}
			updateScore('player_score', + player_score + ' Tantos');
			updateScore('dealer_score', + dealer_score + ' Tantos');
			lance="Nuevo";
			buttonH5(B1,B2,B3,B4,B5); 
			buttonVisi("¡NUEVO JUEGO!",B1);}	
		else {
			displayOver('game_over', '¡MESA NO VA!');	
			player_score +=1;;
			grandePlay=1;
			playSound("card_drop");
			displayOver('game_over2', '¡JUGADOR GANA POR QUE NO!');
			playSound("win");
			updateScore('player_score', + player_score + ' Tantos');
			buttonH5(B1,B2,B3,B4,B5); 
			playSound("card_drop");
			grandes();
			}		
		
}

function grandeN(){	 
		dealer_score +=1;
		grandePlay=1;
		updateScore('dealer_score', + dealer_score + ' Tantos');
		playSound("card_drop");
		displayOver('game_over', '¡MESA GANA POR QUE NO!');
		updateScore('dealer_score3', ' GRANDE: ¡Gano Mesa Por que No!' );
		playSound("lose");
		grandes();
}

function grandeP(){		 
		grandePlay=2;
		displayOver('game_over', '¡GRANDE EN PASE!');
		playSound("card_drop");
		grandes();
}

function grandeE(){	 
		if (grandePlay==3) {grandePlay=3} else {grandePlay=4}
		displayOver('game_over', '¡ENVITE A GRANDE!');
		playSound("card_drop");
		grandes();
}
	
function grandeC(){	 
		if (dealer_c[2]==8){
			displayOver('game_over', '¡MESA ACEPTA EL ENVITE!');
			grandePlay=5;}
		else {
		displayOver('game_over', '¡MESA NO VA!');	
		player_score +=1;
		grandePlay=1;
		playSound("card_drop");
		displayOver('game_over2', '¡JUGADOR GANA POR QUE NO!');
		playSound("win");		
		updateScore('player_score', + player_score + ' Tantos');
		updateScore('dealer_score', + dealer_score + ' Tantos');
		}
		grandes();
}
function grandes(){
	buttonH5(B1,B2,B3,B4,B5);
	playSound("card_drop");					
	lance='Chica';
	if (dealer_c[2]==1){
		chicaPlay=3;
		displayOver('game_over', '¡MESA ENVIDA A LA CHICA!');
		buttonVisi("¡ORDAGO A LA CHICA!",B1);
		buttonVisi("No quiero",B2);  
		buttonVisi("Veo Envite a Chica",B4);
		buttonVisi("Subo a 5 La Chica",B5); 
   }
	else {	
		displayOver('game_over', 'JUGADOR HABLA DE CHICA');		
		buttonVisi("¡ORDAGO A CHICA!",B1);
		buttonVisi("Paso a Chica",B3);  
		buttonVisi("Envido a Chica",B4);
		buttonVisi("Envido 5 a Chica",B5);
	}
}
// LANCE CHICA ################################################################################3
function chicaO(){
		
		if (dealer_c[2]==1){
			displayOver('game_over', '¡MESA ACEPTA EL ORDAGO!');
			displayOver('game_over2', '¡ORDAGO A CHICA!');
			if (player_c < dealer_c){
				player_score = 35;
				playSound("win");
				displayOver('game_over', '¡Gana Jugador!');
				updateScore('dealer_score2', ' RESULTADO ORDAGO:¡Gano Jugador!' );
			} else {
				dealer_score = 35;
				playSound("lose");
				displayOver('game_over', '¡Gana MESA!');
				updateScore('dealer_score2', ' RESULTADO ORDAGO:¡Gano MESA!' );}
			updateScore('player_score', + player_score + ' Tantos');
			updateScore('dealer_score', + dealer_score + ' Tantos');
			lance="Nuevo";
			buttonH5(B1,B2,B3,B4,B5); 
			buttonVisi("¡NUEVO JUEGO!",B1);}	
		else {
			displayOver('game_over', '¡MESA NO VA!');	
			player_score +=1;;
			chicaPlay=1;
			playSound("card_drop");
			displayOver('game_over2', '¡JUGADOR GANA POR QUE NO!');
			updateScore('dealer_score4', ' CHICA: ¡Gano Mesa Por que No!' );
			playSound("win");
			updateScore('player_score', + player_score + ' Tantos');
			playSound("card_drop");
            chicas();
			}		
		
}

function chicaN(){	 
		dealer_score +=1;
		chicaPlay=1;
		updateScore('dealer_score', + dealer_score + ' Tantos');
		playSound("card_drop");
		displayOver('game_over', '¡MESA GANA POR QUE NO!');
		playSound("lose");
		chicas();
}

function chicaP(){		 
		chicaPlay=2;
		displayOver('game_over', '¡CHICA EN PASE!');
		playSound("card_drop");
		chicas();
}

function chicaE(){	 
		if (chicaPlay==3) {chicaPlay=3} else {chicaPlay=4}
		displayOver('game_over', '¡SE VE ENVITE A CHICA!');
		playSound("card_drop");
		chicas();
}
	
function chicaC(){	 
		if (dealer_c[2]==8){
			displayOver('game_over', '¡MESA ACEPTA EL ENVITE!');
			chicaPlay=5;}
		else {
		displayOver('game_over', '¡MESA NO VA!');	
		player_score +=1;
		chicaPlay=1;
		playSound("card_drop");
		displayOver('game_over2', '¡JUGADOR GANA POR QUE NO!');
		playSound("win");		
		updateScore('player_score', + player_score + ' Tantos');
		updateScore('dealer_score', + dealer_score + ' Tantos');
		}
		chicas();
}

function chicas(){
	buttonH5(B1,B2,B3,B4,B5);
	playSound("card_drop"); 					
	lance="Pares";
	if (pares_player[0]>0 && pares_dealer[0]>0){
		if (pares_dealer[0]>1){
			paresPlay=3;
			displayOver('game_over', '¡MESA ENVIDA A LOS PARES!');
			buttonVisi('¡ORDAGO A PARES!',B1);
			buttonVisi('No quiero',B2);  
			buttonVisi('Veo Envite a Pares',B4);
			buttonVisi('Subo a 5 Los Pares',B5); 
	   }
		else {	
			displayOver('game_over', 'JUGADOR HABLA DE PARES');		
			buttonVisi('¡ORDAGO A PARES!',B1);
			buttonVisi('Paso a Pares',B3);  
			buttonVisi('Envido a Pares',B4);
			buttonVisi('Envido 5 a Pares',B5);
		}}
   else if (pares_player[0]>0){	
		displayOver('game_over', '¡Jugador tiene PARES!');	
		paresPlay=6;
		paress();	
		}
   else if (pares_dealer[0]>0){
	    displayOver('game_over', '¡Mesa tiene PARES!');	
		paresPlay=6;
		paress();	
		}
   else {
	    paresPlay=0; 
   	    paress();}
}

//LANCE PARES  ###############################################################################

function paresO(){	
		if (pares_dealer[0]==3){
			displayOver('game_over', '¡MESA ACEPTA EL ORDAGO!');
			displayOver('game_over2', '¡ORDAGO A PARES!');
			playSound("card_drop");
			if (pares_player > pares_dealer){
				player_score = 35;
				playSound("win");
				displayOver('game_over', '¡Gana Jugador!');
				updateScore('dealer_score2', ' RESULTADO ORDAGO:¡Gano Jugador!' );
			} else {
				dealer_score = 35;
				playSound("lose");
				displayOver('game_over', '¡Gana MESA!');
				updateScore('dealer_score2', ' RESULTADO ORDAGO:¡Gano MESA!' );}
			updateScore('player_score', + player_score + ' Tantos');
			updateScore('dealer_score', + dealer_score + ' Tantos');
			lance="Nuevo";
			buttonH5(B1,B2,B3,B4,B5); 	
			buttonVisi("¡NUEVO JUEGO!",B1);}	
		else {
			displayOver('game_over', '¡MESA NO VA!');	
			player_score +=1;;
			paresPlay=1;
			playSound("card_drop");
			displayOver('game_over2', '¡JUGADOR GANA POR QUE NO!');
			playSound("win");
			updateScore('player_score', + player_score + ' Tantos');
            paress();
			}		
		
}

function paresN(){	 
		dealer_score +=1;
		paresPlay=1;
		if (pares_dealer[0]==3){
			displayOver('game_over2', ' ¡Gana Mesa con DUPLEX');
			playSound("lose");
			dealer_score +=3;}
		else if (pares_dealer[0]==2){
			displayOver('game_over2', ' ¡Gana Mesa con MEDIAS');
			playSound("lose");
			dealer_score +=2;}
		else if (pares_dealer[0]==1){
			displayOver('game_over2', ' ¡Gana Mesa con PARES');
			playSound("lose");
			dealer_score +=1;}		
		updateScore('dealer_score5', ' PARES: ¡Gano Mesa Por que no, con ' + p_dealer);
		updateScore('dealer_score', + dealer_score + ' Tantos');
		playSound("card_drop");
		playSound("lose");
		paress();
}

function paresP(){		 
		paresPlay=2;
		displayOver('game_over', '¡PARES EN PASE!');
		paress();
}

function paresE(){	 
		if (paresPlay==3) {paresPlay=3} else {paresPlay=4}
		playSound("card_drop");
		displayOver('game_over', '¡SE VE ENVITE A PARES!');
		paress();
}
	
function paresC(){
	    playSound("card_drop");	 
		if (pares_dealer[0]==3){
			displayOver('game_over', '¡MESA ACEPTA EL ENVITE!');
			paresPlay=5;}
		else {
		paresPlay=1;
		if (pares_player[0]==3){
			displayOver('game_over2', ' ¡Gana Jugador con DUPLEX');
			playSound("win");
			player_score +=3;}
		else if (pares_player[0]==2){
			displayOver('game_over2', ' ¡Gana Jugador con MEDIAS');
			playSound("win");
			player_score +=2;}
		else if (pares_player[0]==1){
			displayOver('game_over2', ' ¡Gana Jugador con PARES');
			playSound("win");
			player_score +=1;}		
		updateScore('dealer_score5', ' PARES: ¡Gano Jugador Por que no, con ' + p_player);
		playSound("card_drop");
		playSound("win");		
		updateScore('player_score', + player_score + ' Tantos');
		}
		paress();
}
function paress(){
	buttonH5(B1,B2,B3,B4,B5);
	 playSound("card_drop");					
	lance="Juego";
	if (juego_player>30 && juego_dealer>30){
		if (juego_dealer==31 || juego_dealer==32){
			juegoPlay=3;
			displayOver('game_over', '¡MESA ENVIDA A JUEGO!');
			buttonVisi("¡ORDAGO A JUEGO!",B1);
			buttonVisi("No quiero",B2);  
			buttonVisi("Veo Envite a Juego",B4);
			buttonVisi("Subo a 5 el Juego",B5); 
		   }
		else {	
			displayOver('game_over', 'JUGADOR HABLA DE JUEGO');		
			buttonVisi("¡ORDAGO A JUEGO!",B1);
			buttonVisi("Paso a Juego",B3);  
			buttonVisi("Envido a Juego",B4);
			buttonVisi("Envido 5 a Juego",B5)					
	}}
    else if (juego_player<31 && juego_dealer<31){
		lance="Punto";
		juegoPlay=0;
		if (juego_dealer>29){
			displayOver('game_over', '¡MESA ENVIDA AL PUNTO!');
			buttonVisi("¡ORDAGO AL PUNTO!",B1);
			buttonVisi("No quiero",B2);  
			buttonVisi("Veo Envite al Punto",B4);
			buttonVisi("Subo a 5 al Punto",B5); 
		   }
		else {	
			displayOver('game_over', 'JUGADOR HABLA DEL PUNTO');		
			buttonVisi("¡ORDAGO AL PUNTO!",B1);
			buttonVisi("Paso al Punto",B3);  
			buttonVisi("Envido el Punto",B4);
			buttonVisi("Envido 5 al Punto",B5);
		}}
	else if (juego_player>30){	
		displayOver('game_over', '¡JUGADOR TIENE JUEGO!');	
		juegoPlay=6;
		puntos();	
		}
	else if (juego_dealer>30){
	    displayOver('game_over', '¡MESA TIENE JUEGO!');	
		juegoPlay=6;
		puntos();
		}
}

//LANCE JUEGO  ##############################################################################################
function juegoO(){	
	    playSound("card_drop");
		if (juego_dealer==31 && mano=="Mesa"){
			displayOver('game_over', '¡MESA ACEPTA EL ORDAGO!');
			displayOver('game_over2', '¡ORDAGO A JUEGO!');
			if (name_player="La Real gana a mano"){
				player_score = 35;
				playSound("win");
				displayOver('game_over', '¡Gana Jugador!');
				updateScore('dealer_score2', ' RESULTADO ORDAGO:¡Gano Jugador!' );
			} else {
				dealer_score = 35;
				playSound("lose");
				displayOver('game_over', '¡Gana MESA!');
				updateScore('dealer_score2', ' RESULTADO ORDAGO:¡Gano MESA!' );}
			updateScore('player_score', + player_score + ' Tantos');
			updateScore('dealer_score', + dealer_score + ' Tantos');
			lance="Nuevo";
			buttonH5(B1,B2,B3,B4,B5); 
			buttonVisi("¡NUEVO JUEGO!",B1);}	
		else {
			displayOver('game_over', '¡MESA NO VA!');	
			player_score +=1;;
			juegoPlay=1;
			playSound("card_drop");
			displayOver('game_over2', '¡JUGADOR GANA POR QUE NO!');
			playSound("win");
			updateScore('player_score', + player_score + ' Tantos');
            juegos();
			}				
}

function juegoN(){	 
		
		if (juego_dealer ==31) {dealer_score +=5;} else {dealer_score +=2;}
		juegoPlay=1;
		updateScore('dealer_score', + dealer_score + ' Tantos');
		playSound("card_drop");
		displayOver('game_over', '¡MESA GANA POR QUE NO!');
		playSound("lose");
		 juegos();
}

function juegoP(){		 
		juegoPlay=2;
		playSound("card_drop");
		displayOver('game_over', '¡JUEGO EN PASE!');
		 juegos();
}

function juegoE(){	 
		if (juegoPlay==3) {juegoPlay=3} else {juegoPlay=4}
		playSound("card_drop");
		displayOver('game_over', '¡SE VE ENVITE A JUEGO!');
		juegos();
}
	
function juegoC(){	
 		playSound("card_drop");
		if (juego_dealer==31 ||juego_dealer==32 ){
			displayOver('game_over', '¡MESA ACEPTA EL ENVITE!');
			juegoPlay=5;}
		else {
		displayOver('game_over', '¡MESA NO VA!');	
		player_score +=2;
		juegoPlay=1;
		if (juego_player==31){player_score +=3;}
		playSound("card_drop");
		displayOver('game_over2', '¡JUGADOR GANA POR QUE NO!');
		playSound("win");		
		updateScore('player_score', + player_score + ' Tantos');
		updateScore('dealer_score', + dealer_score + ' Tantos');
		}
		juegos();
}
function juegos(){
	buttonH5(B1,B2,B3,B4,B5); 
	playSound("card_drop");
	buttonH1(B1);
	updateScore('dealer_score3', ' Grande en: '+ nameBet[grandePlay]);
	updateScore('dealer_score4', ' Chica en: ' + nameBet[chicaPlay]);
	updateScore('dealer_score5', ' Pares en: '+ nameBet[paresPlay]);
	if (juegoPlay >1) {updateScore('dealer_score6', ' Juego en: '+ nameBet[juegoPlay] );}
	else {updateScore('dealer_score6', ' Punto en: '+ nameBet[puntoPlay]);} 					
	lance="Resu";	
	playSound("musica");				
	buttonVisi("¡VER RESULTADO!",B1);
	displayOver('game_over', 'VER RESULTADO');
	displayOver('game_over2', '¡Mostrar Tablero para ver Resultado!');	
		
}
// LANCE PUNTO #################################################################
function puntoO(){	
		playSound("card_drop");	
		if (juego_dealer==30 && mano=="Mesa"){
			displayOver('game_over', '¡MESA ACEPTA EL ORDAGO!');
			displayOver('game_over2', '¡ORDAGO AL PUNTO!');
			player_score = 35;
			playSound("win");
			displayOver('game_over', '¡Gana Jugador!');
			updateScore('dealer_score2', ' RESULTADO ORDAGO:¡Gano Jugador!' );
			updateScore('player_score', + player_score + ' Tantos');
			updateScore('dealer_score', + dealer_score + ' Tantos');
			lance="Nuevo";
			buttonH5(B1,B2,B3,B4,B5); 
			buttonVisi("¡NUEVO JUEGO!",B1);}	
		else {
			displayOver('game_over', '¡MESA NO VA!');	
			player_score +=1;;
			puntoPlay=1;
			playSound("card_drop");
			displayOver('game_over2', '¡JUGADOR GANA POR QUE NO!');
			playSound("win");
			updateScore('player_score', + player_score + ' Tantos');
            puntos();
			}			
}

function puntoN(){	
		playSound("card_drop"); 
		dealer_score +=1;
		puntoPlay=1;
		updateScore('dealer_score', + dealer_score + ' Tantos');
		playSound("card_drop");
		displayOver('game_over', '¡MESA GANA POR QUE NO!');
		playSound("lose");
		puntoss();
}

function puntoP(){	
		playSound("card_drop");	 
		puntoPlay=2;
		displayOver('game_over', '¡JUEGO EN PASE!');
		puntos();
}

function puntoE(){	
		 playSound("card_drop");
		puntoPlay=3;
		displayOver('game_over', '¡SE VE ENVITE AL PUNTO!');
		puntos();
}
	
function puntoC(){	
 		playSound("card_drop");
		if (juego_dealer>29){
			displayOver('game_over', '¡MESA ACEPTA EL ENVITE!');
			puntoPlay=5;}
		else {
		displayOver('game_over', '¡MESA NO VA!');	
		player_score +=2;
		puntoPlay=1;
		playSound("card_drop");
		displayOver('game_over2', '¡JUGADOR GANA POR QUE NO!');
		playSound("win");		
		updateScore('player_score', + player_score + ' Tantos');
		updateScore('dealer_score', + dealer_score + ' Tantos');
		}
		puntos();
}
function puntos(){
	buttonH5(B1,B2,B3,B4,B5); 
	playSound("card_drop");
	buttonH1(B1);
	updateScore('dealer_score3', ' Grande en: '+ nameBet[grandePlay]);
	updateScore('dealer_score4', ' Chica en: ' + nameBet[chicaPlay]);
	updateScore('dealer_score5', ' Pares en: '+ nameBet[paresPlay]);
	if (juegoPlay >1) {updateScore('dealer_score6', ' Juego en: '+ nameBet[juegoPlay] );}
	else {updateScore('dealer_score6', ' Punto en: '+ nameBet[puntoPlay]);} 					
	lance="Resu";	
	playSound("musica");				
	buttonVisi("¡VER RESULTADO!",B1);
	displayOver('game_over', 'VER RESULTADO');
	displayOver('game_over2', '¡Mostrar Tablero para ver Resultado!');	
	
		
}