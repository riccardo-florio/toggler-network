// In questo modulo ci si occupa di tutte le sistemazioni grafiche da operare.

const spanRicerca = document.querySelector(".ricerca>span");
const btnRicerca = document.querySelector(".ricerca>button");

function gInizioRicerca() {
    spanRicerca.innerHTML = "Ricerca in corso ...";
    btnRicerca.disabled = true;
}

function gFineRicerca() {
    spanRicerca.innerHTML = "Ricerca completata! Premi il pulsante a destra per eseguire una nuova ricerca.";
    btnRicerca.disabled = false;
}

const togglers = document.querySelector(".togglers");
const togglersInDom = [];

function inizializzaTogglers() {
    while(togglersInDom.length > 0) {//svuoto l'array
        togglersInDom.pop();
    }
    togglers.innerHTML = "";
}

function aggiungiToggler(toggler) {
    if (!togglersInDom.includes(toggler)) {
        togglersInDom.push(toggler);
        document.getElementsByClassName("togglers")[0].innerHTML += `
            <div class="toggle-container" id="${toggler}-cont">
                <h3>${toggler}</h3>
                |
                <h4>Stato: </h4>
                <p>Sconosciuto</p>
                <label class="switch">
                    <input type="checkbox" id="${toggler}" onclick="toggle(this.id)">
                    <span class="slider round"></span>
                </label>
            </div>
            `
    }
}

function impostaStatoToggler(id, stato) {
    const stp = document.querySelector("#"+id+"-cont>p");
    stp.innerHTML = stato;
}

export {gInizioRicerca, gFineRicerca, inizializzaTogglers, aggiungiToggler, impostaStatoToggler}