var checkBox;
var checkBoxStatus = false;
//var xhttp = new XMLHttpRequest();

function toggle(id) {
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var status = JSON.parse(xhttp.responseText)["ledStatus"];
            console.log(status);
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
    };

    //memorizzo lo stato della checkbox prima della chiamata
    checkBox = document.getElementById(id);
    checkBoxStatus = !checkBox.checked;
    // chiamo l'endpoint dell'api
    xhttp.open("GET", "http://toggler1/toggleLed", true);
    xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.send();
    // a questo punto vengono eseguite le operazioni nel metodo xhttp.onreadystatechange
}