import { impostaStatoToggler, impostaStatoHumitureSensor } from "./grafica.js";

var xhttp;
var checkBox;
var checkBoxStatus = false;

function togglePriv(id) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var status = JSON.parse(xhttp.responseText)["ledStatus"];
            console.log(status);
            impostaStatoToggler(id, status);
            if (status == "on") {
                checkBox.checked = true;
            } else {
                checkBox.checked = false;
            }
        }
    };
    xhttp.onerror = function () {
        console.log("Status=" + this.status);
        checkBox.checked = checkBoxStatus;
        impostaStatoToggler(id, "Sconosciuto");
    };

    //memorizzo lo stato della checkbox prima della chiamata
    checkBox = document.getElementById(id);
    checkBoxStatus = !checkBox.checked;
    // chiamo l'endpoint dell'api
    xhttp.open("GET", `http://${id}/toggleLed`, true);
    xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.send();
    // a questo punto vengono eseguite le operazioni nel metodo xhttp.onreadystatechange
}//togglePriv


function getHumiturePriv(id) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var temp = JSON.parse(xhttp.responseText)["temp"];
            var hum = JSON.parse(xhttp.responseText)["umid"];
            console.log("T: " + temp, "H: " + hum);
            impostaStatoHumitureSensor(id, temp, hum);
        }
    };
    xhttp.onerror = function () {
        console.log("Status=" + this.status);
        impostaStatoHumitureSensor(id, "(?)", "(?)");
    };

    // chiamo l'endpoint dell'api
    xhttp.open("GET", `http://${id}/readData`, true);
    xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.send();
    // a questo punto vengono eseguite le operazioni nel metodo xhttp.onreadystatechange
}//getHumiturePriv

export { togglePriv, getHumiturePriv }