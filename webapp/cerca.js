var xhttp = new XMLHttpRequest();
var i = 0;

xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.responseText);
        aggiungiToggler();
    }
};
xhttp.onerror = function () {
    console.log("Status=" + this.status);
    if (i < 10) {
        cercaDispositivi();
        i++;
    }
};

function cercaDispositivi() {
    if (i >= 10) i = 0;
    console.log(i);
    xhttp.open("GET", "http://toggler1/settings", true);
    xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.send();
}

function aggiungiToggler() {
    document.getElementsByClassName("togglers")[0].innerHTML = `
    <div class="led-container">
        <label class="switch">
            <input type="checkbox" id="cb1" onclick="toggle(this.id)">
            <span class="slider round"></span>
        </label>
        <h3>Led 1</h3>
        |
        <h4>Stato: </h4>
        <p>Off</p>
    </div>
    `
}