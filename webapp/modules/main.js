import { cercaDispositivi } from "./dispositivi.js";
import { gInizioRicerca } from "./grafica.js"
import { togglePriv, getHumiturePriv } from "./toggle.js";

avviaRicerca();

function avviaRicerca() {
    gInizioRicerca();
    cercaDispositivi(10);//cerco 10 dispositivi
}//avviaRicerca

function toggle(id) {
    togglePriv(id);
}//toggle

function getHumiture(id) {
    getHumiturePriv(id)
}//getHumiture

//imposto le funzioni come globali in modo da poterle usare nell'html
window.avviaRicerca = avviaRicerca;
window.toggle = toggle;
window.getHumiture = getHumiture;