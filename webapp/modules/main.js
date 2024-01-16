import { cercaDispositivi, numIte } from "./dispositivi.js";
import { gInizioRicerca } from "./grafica.js"
import { togglePriv } from "./toggle.js";

avviaRicerca();

function avviaRicerca() {
    gInizioRicerca();
    cercaDispositivi(10);//cerco 10 dispositivi
}//avviaRicerca

function toggle(id) {
    togglePriv(id);
}//toggle

//imposto la funzione come globale in modo da poterla usare nell'html
window.avviaRicerca = avviaRicerca;
window.toggle = toggle;