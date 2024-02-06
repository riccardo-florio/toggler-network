// In questo modulo ci si occupa di tutte le sistemazioni grafiche da operare.

import { getHumiturePriv } from "./toggle.js";

const spanRicerca = document.querySelector(".ricerca>span");
const btnRicerca = document.querySelector(".ricerca>button");

function gInizioRicerca() {
    spanRicerca.innerHTML = "Ricerca in corso ...";
    btnRicerca.disabled = true;
}

function gFineRicerca() {
    if (togglersInDom.length == 0) {
        spanRicerca.innerHTML = "Nessun dispositivo trovato ❌";
    } else {
        spanRicerca.innerHTML = "Ricerca completata! ✔️";
    }
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

function aggiungiToggler(toggler, type) {
    if (!togglersInDom.includes(toggler)) {
        togglersInDom.push(toggler);
        switch(type) {
            case "toggler":
              insTogglerInDom(toggler);
              break;
            case "humiture-sensor":
                insHumitureSensorInDom(toggler)
              break;
            default:
              // code block
          }
    }
}

function impostaStatoToggler(id, stato) {
    const stp = document.querySelector("#"+id+"-cont>p");
    stp.innerHTML = stato;
}

function impostaStatoHumitureSensor(id, temp, hum) {
    const p1 = document.querySelector("#"+id+"-temp");
    const p2 = document.querySelector("#"+id+"-hum");
    p1.innerText = temp + "°C";
    p2.innerText = hum + "%";
}

function insTogglerInDom(toggler) {
    var name = "Toggler " + toggler.replace("toggler", "");
    document.getElementsByClassName("togglers")[0].innerHTML += `
            <div class="toggle-container" id="${toggler}-cont">
                <h3>${name}</h3>
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

function insHumitureSensorInDom(toggler) {
    var name = "Humiture " + toggler.replace("toggler", "");
    document.getElementsByClassName("togglers")[0].innerHTML += `
            <div class="toggle-container" id="${toggler}-cont">
                <h3>${name}</h3>
                |
                <h4>Temp: </h4>
                <p id="${toggler}-temp">(?)</p>
                <h4>Umid: </h4>
                <p id="${toggler}-hum">(?)</p>
                <button onclick="getHumiture('${toggler}')">Aggiorna</button>
            </div>
            `
    getHumiturePriv(toggler);
}

export {gInizioRicerca, gFineRicerca, inizializzaTogglers, aggiungiToggler, impostaStatoToggler, impostaStatoHumitureSensor}