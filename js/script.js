var tab = ["img/ane.jpg", "img/chat.jpg", "img/chien.jpg", "img/lama.jpg", "img/lapins.jpg","img/lionne.jpg", "img/ours.jpg"];
tab  = tab.concat(tab);
var dos = 'img/dos.png'; // On définie l'image de dos
var clique=0;//Nombres de cliques
var paires = 0;//Nombres de paires
var choixun;//
var choixdeux;//
var norepeat = true;//empeche le chrono de se repeter
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //                                                                         AFFICHER LES IMAGES                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function afficherimage() {
	for(i=0; i<=tab.length-1; i++) {
		document.getElementById("photo").innerHTML += '<img src="img/dos.png" class="photo" onclick="choisir('+i+')" draggable="false">'
	}
}
afficherimage();//charge la fonction au chargement de la page
tab = tab.sort(function(){ return 0.5 - Math.random(); }); // randomise le tableau
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //                                                                           CHOIX DES CARTES                                                         //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function choisir(carte) { // Choix des cartes quand l'utilisateur clique
	if (norepeat){//empeche le chronometre de se repeter
		timerID = setInterval("chrono()", 1000);//on appelle la fonction chronometre
		norepeat = false;
	}if (clique == 2) { // Au delà du deuxième clique
		return; // On affiche rien
	}if (clique == 0) { // Au premier clique
		choixun = carte; // On attribue le numéro de la carte choisie au premier choix
		document.images[carte].src =  tab[carte]; // Affiche l'image de la carte correspondant au choix
		document.images[choixun].style.pointerEvents = 'none';//Desactive l'evenement du clique(pas de double clique)
		clique = 1; // On passe le clique à 1
	}else { // Au deuxième clique
		clique = 2; // On passe le clique à 2
		choixdeux = carte; // On attribue le numéro de la carte choisie au deuxième choix
		document.images[carte].src =  tab[carte]; // Affiche l'image de la carte correspondant au choix
		timer = setTimeout("verif()", 500); // Ajoute un temps de pause puis passe à la fonction de vérification
	}	
}
   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                         VERIFIE LES PAIRES                                                       //
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function verif() { // Vérifie si une paire a été faite
	clique = 0;
	if (tab[choixdeux] ==  tab[choixun]) {//si les deux cartes sont pareilles la paire reste fixe
		paires++; 
		document.getElementById("paires").innerHTML = paires;
		document.images[choixun].className="newOpacity";//Desactive l'evenement du clique(pas de double clique)
		document.images[choixdeux].className='newOpacity';// l'opacité s'applique sur la carte retournée
	}else {
		document.images[choixun].src = dos;
		document.images[choixun].style.pointerEvents = 'auto';//Desactive l'evenement du clique(pas de double clique)
		document.images[choixdeux].src = dos;
		return;
	}if (paires==7) {
		clearInterval(timerID);//arette le chrono quand toutes les paires trouvées
		document.getElementById("photo").className = 'blockColumn';
		document.getElementById("photo").innerHTML = '<h1 class="h1"> Vous avez gagné !</h1><br /><div class="boutton"><input type="button" class="restart" value="Recommencer" onClick="window.location.reload()"></div>';
	}
}
   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                         CHRONOMETRE                                                              //
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var timerID = 0;
var sec = 0;
var min = 0; 
function chrono(){ //Function chronometre
	if(sec<59){//quand seconde superieur a 59 milliemme
		sec++;//ajoute une seconde au chronometre
		if(sec<10){
			sec = "0" +sec;//affiche 00 avant le chiffre 1
		}
	}else if(sec=59){//quand seconde superieur a 59 milliemme
		min++;//ajoute une minute au chronometre
		sec = "0" + 0;
	}
	document.getElementById("chronotime").innerHTML = min + ":" + sec +"";//afiche le chronometre dans le html a l'endroit ciblé par l'id
} 
 
 