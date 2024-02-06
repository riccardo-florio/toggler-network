import { gFineRicerca, inizializzaTogglers, aggiungiToggler } from "./grafica.js"

// conto le iterazioni per vedere quando finisco di connettrmi ai dispositivi
var numIte;
var maxIte;

function cercaDispositivi(numDispositivi) {
    numIte = 0;
    maxIte = numDispositivi * 10;//cerco di collegarmi 10 volte a numDispositivi dispositivi
    
    inizializzaTogglers();

    for (var i = 0; i < numDispositivi; i++) {
        // cerco numDispositivi dispositivi
        for (var j = 0; j < 10; j++) { //per 10 volte
            inviaRichiesta(i);
        }
    }
}

function inviaRichiesta(i) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var risp = JSON.parse(xhttp.responseText);
            console.log(risp["hostname"], risp["type"]);
            aggiungiToggler(risp["hostname"], risp["type"]);
            incrementaIterazioni();
        }
    };

    xhttp.onerror = function () {
        incrementaIterazioni();
    }

    xhttp.open("GET", `http://toggler${i}/settings`, true);
    xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.send();
}

function incrementaIterazioni() {
    numIte++;
    if (numIte == maxIte) gFineRicerca();
}

export { cercaDispositivi }