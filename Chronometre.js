// Définition de nos principales variables
let chrono = document.getElementById("chrono"); //Récupère par son id chrono le chrono défini dans le html
let resetBtn = document.getElementById("reset"); //Récupère le bouton reset du html dans la variable
let stopBtn = document.getElementById("stop");
let startBtn = document.getElementById("start");

// Nos variables de temps démarrent à zéro
let heures = 0;
let minutes = 0;
let secondes = 0;
let centisecondes = 0;

let i = 0;

let timeout; // On crée cette variable mais pour l'instant on ne lui attribue pas de valeur

let estArrete = true; // Booléen pour définir si le chronomètre est arrêté ou non, par défaut il est arrêté. Passer en false quand on voudra qu'il défile

const demarrer = () => { //Dans cette fonction on va vérifier si on est à l'arrêt
  if (estArrete) { // Si c'est le chrono est arrêté, on veut qu'il démarre
    estArrete = false; // on le passe en faux pour dire qu'il va défiler
    defilerTemps(); // on déclenche cette fonction qui va lancer le chronomètre
  }
};

const arreter = () => { //Pour arrêter le chronomètre
  if (!estArrete) { // Si le chrono n'est pas arrêté, 
    estArrete = true; // Alors il le devient
    clearTimeout(timeout); // On veut pouvoir annuler le timeout qui est en cours (cf ligne 81), pour que dès qu'on réappuie sur démarrer le timeout reprenne de 0 (et donc sur une durée de temps complète, pas en continuation d'une précédente déjà entamée)
  }
};

const defilerTemps = () => { // On crée la fonction qu'on appelle plus haut
  if (estArrete) return; // vérifie d'abord que le chrono est bien lancé, parce que cette fonction ne doit s'activer que si c'est le cas (on ne fait pas défiler les chifrfes d'un chrono à l'arrêt !)

  // Ensuite on veut que l'affichage du chrono 00:00:00:00 soit toujours par deux chiffres. Or, les variables définies en lignes 8 à 11 ne possèdent qu'un seul chiffre !
  // Du coup pour obtenir deux chiffres on va devoir convertir ces chiffres en chaines de caractères. Le pb c'est que pour les incrémenter on a besoin qu'ils soient en chiffres. Donc on va d'abord les mettre en chiffres :
  centisecondes = parseInt(centisecondes) //parseInt ça permet de convertir une chaine de caractères en int, en integer = chiffres
  secondes = parseInt(secondes);
  minutes = parseInt(minutes);
  heures = parseInt(heures);

  centisecondes++; // à chaque fois que la fonction defilerTemps va se déclencher, on veut augmenter les 'centisecondes' de 1 (autrement dit, les millisecondes de 10)
  // Les centisecondes augmentent de 1 en 1 toutes les 10 millisecondes (cf ligne 81)
  //N.B j'ai choisi de compter en centisecondes plutôt que milli pour que l'affichage du chrono puisse être en format :00 et non :000 lors du défilement)

  if (centisecondes ==100) { // quand on arrive à 100 centisecondes (=1000 millisecondes) on veut ajouter une seconde et reset les centisecondes pour recommencer de compter à 0
    secondes++;
    centisecondes = 0;
  }

  if (secondes == 60) { // toutes les 60 secondes on augmente d'une minute et reset les secondes
    minutes++;
    secondes = 0;
  }

  if (minutes == 60) { // toutes les 60 minutes on augmente d'une heure et reset les minutes
    heures++;
    minutes = 0;
  }

  // Maintenant on veut régler le pb d'affichage : on veut tout le tempos afficher deux chiffres, donc quand nos compteurs de centisec, sec, min, et heures sont inférieurs à 10 (et donc que ça affiche 4 au lieu de 04), on veut manuellement ajouter le 0 devant.

  if (centisecondes < 10) {//quand les centisecondes sont entre 0 et 9 
    centisecondes = "0" + centisecondes //On veut que ça s'affiche comme ça sur le chrono : 00, 01...09
  }

  if (secondes < 10) { //pareil que centisecondes
    secondes = "0" + secondes;
  }

  if (minutes < 10) { //etc
    minutes = "0" + minutes;
  }

  if (heures < 10) { //etc
    heures = "0" + heures;
  }

  chrono.textContent = `${heures}:${minutes}:${secondes}:${centisecondes}`; //on reprend le contenu à l'intérieur de la variable chrono pour le modifier en ajoutant les heures min etc qu'on incrémente. Ça devient une chaine de caractères dynamique ! On injecte les valeurs de nos variables de façon dynamique.

  // Dernier élément : on veut que cette fonction defilerTemps se redéclenche toutes les 10 millisecondes, pour que ça puisse incrémenter ensuite tout le reste. ça aurait pour être toutes les secondes selon 1000 millisecondes, mais ça n'aurait pas permis de chronométrer aussi les millisecondes.
  timeout = setTimeout(defilerTemps, 10); //setTimeout est une fonction préexistante, elle prend comme parametre la fonction à rappeller, et selon quelle fréquence en millisecondes
  // j'avais buggé sur ce timeout, en fait le définir ça fait qu'il est également appliqué. pas besoin de faire juste timout à la ligne ensuite, ça ça serait pour l'humain en mode console.log !
};

const reset = () => { // mAintenant la fonction qui renter enjeu quand on veut reseter le chrono
  chrono.textContent = "00:00:00:00"; // On veut que l'affichage redevienne celui de base, on le redéfini donc ici
  estArrete = true; //on arrête le chrono
  heures = 0; //on reset les heures, min etc
  minutes = 0;
  secondes = 0;
  centisecondes = 0;
  clearTimeout(timeout); // Et on reset aussi le timer
};

//On ajoute enfin les event listener qui permettent de déclencher les différentes fonctions définies au dessus quand une action aprticulière se passe, ici sur un click de l'utilisateur :
startBtn.addEventListener("click", demarrer); //Littéralement ajouter l'évenement 'quand ça clique sur le bouton startbtn, lancer la fonction demarrer'
stopBtn.addEventListener("click", arreter);
resetBtn.addEventListener("click", reset);