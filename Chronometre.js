// Définissons nos variables
let chrono = document.getElementById("chrono");
let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("reset");

let centisecondes = 0
let secondes = 0
let minutes = 0 
let heures = 0

let timeout;
let estArrete = true;

// On passe aux fonctions
const demarrer = () => {
    if (estArrete) {
    estArrete = false;
    defilerTemps();
    }
}

const arreter = () => {
    if (!estArrete) {
    estArrete = true;
    clearTimeout(timeout);
    }
}

const defilerTemps = () => {
    if (estArrete) return;

    // conversion en chiffres
    centisecondes = parseInt(centisecondes);
    secondes = parseInt(secondes);
    minutes = parseInt(minutes);
    heures = parseInt(heures);

    // incrémentations

    centisecondes++

    if(centisecondes==100) {
        secondes++;
        centisecondes=0;
    }

    if (secondes==60) {
        minutes++;
        secondes=0;
    }

    if (minutes==60) {
        heures++;
        minutes=0
    }
 
    //affichage

    if (centisecondes< 10) {
        centisecondes = "0" + centisecondes;
    }

    if (secondes< 10) {
        secondes = "0" + secondes;
    }

    if (minutes < 10) {
        minutes = "0" + minutes ;
    }

    if (heures < 10) {
        heures = "0" + heures ;
    }

    chrono.textContent = `${heures}:${minutes}:${secondes}:${centisecondes}`;

    timeout = setTimeout(defilerTemps, 10);
}

const reset = () => {
    chrono.textContent = "00:00:00:00";

    estArrete = true; 

    centisecondes = 0;
    secondes = 0;
    minutes = 0;
    heures = 0;

    clearTimeout(timeout);
}

