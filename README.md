# Toggler Network

## 💡 Idea di partenza

<div align="justify">

Ho avuto a disposizione alcuni moduli ESP8266-01S e una scheda Arduino UNO, così ho deciso di intraprendere alcuni esperimenti. L'intento è quello di creare una rete di dispositivi "smart", come sensori, interruttori, pulsanti e altro ancora, sfruttando tali moduli.

</div>

## 🧬 Struttura del progetto

<div align="justify">

Innanzi tutto è necessario programmare il modulo ESP in modo che sia in grado di svolgere azioni particolari stabilite a priori. Ad esempio, si può scrivere uno script dedicato ad estrarre i dati da un sensore ed inviarli all'utente, a comandare un relè, o a gestire un servo motore. Si veda la cartella "[script arduino](script%20arduino)".

La rete di sensori è gestita da un "controllore" centrale: una semplice paginetta web che invia richieste ai moduli ESP. Si veda "[webapp](webapp)".

</div>

## ⚡ Il modulo ESP8266-01S

<img src="img/ESP8266-01S.jpg" align="right" alt="ESP8266" width="350">

<div align="justify">

È un modulo WIFI programmabile mediante uno sketch Arduino (basato su C/C++) e capace di eseguirlo in autonomia.

Nel contesto di questo progetto, lo sketch eseguito non è che un server web di tipo REST che andrà a eseguire azioni specifiche in base all'endpoint contattato. Questa parte di codice, infatti, è uguale per tutte le tipologie di dispositivi "smart" che stiamo realizzando. Quello che cambia è l'azione specifica eseguita internamente in base, appunto, al compito che tale dispositivo deve svolgere. Una parte ostica nella fase di realizzazione del server REST è stata quella relativa alla gestione delle chiamate CORS. Una documentazione dettaglata riguardo la gestione e l'implementazione di un server di questo tipo è contenuta nella cartella "[documentazione](documentazione)".

Dopo aver scritto correttamente lo sketch, è necessario caricarlo sulla scheda. Ci sono varie opzioni, tra cui l'utilizzo dell'[adattatore USB con ESP8266-01S](https://www.az-delivery.de/products/esp8266-01s-mit-usb-adapter?ls=en). Avendo a disposizione una scheda Arduino UNO, è necessario costruire un piccolo circuito:

<div align="center">
<img width="700" src="img/arduino_seriale_esp8266_bb.jpg">
<br><br>
<img width="700" src="img/arduino_seriale_esp8266_schem.jpg">
</div>

Come è possibile notare dallo schema elettrico sono presenti due pulsanti collegati nel seguente modo:

- **SW Reset**: sul pin RST di ESP8266
- **SW Flash**: sul pin GPIO0 di ESP8266

Questo è necessario in quanto per poter programmare correttamente lo ESP8266-01 è necessario portarlo nello stato UART Bootloader. Questo si ottiene con la seguente procedura:

1. Si mantiene premuto il pulsante SW Flash
2. Si preme e si rilascia il pulsante SW Reset
3. Si rilascia il pulsante SW Flash

Si suggerisce di effettuare tale procedura solo alcuni secondi prima dell'inizio del caricamento dello sketch dal PC allo ESP8266-01.

Una volta programmato corretamente il modulo, esso può essere usato come un dispositivo autonomo. Sarà sufficiente collegare GND e 3.3V ai rispettivi PIN di Arduino, come illustrato di seguito:

![ESP8266-01S come dispositivo autonomo](documentazione/Mio%20Schema/ESP8266-01S%20come%20dispositivo%20autonomo.png)

</div>

## 🌐 Web App

<div align="justify">

Per gestire i dispositivi ESP8266 connessi alla rete sfruttiamo la pagina web implementata nella relativa "[cartella](webapp)". È una semplice pagina HTML che richiama una serie di moduli Javascript.

Quello principale è "[main.js](webapp/modules/main.js)" che opera come una sorta di interfaccia per i metodi implementati negli altri moduli. Un primo metodo, `avviaRicerca()`, si occupa di avviare la ricerca dei dispositivi collegati nella stessa rete del dispositivo su cui viene eseguita la webapp. Si noti che viene eseguito una volta sola al caricamento della pagina, ma può essere anche eseguito alla pressione del tasto di ricerca apposito. Un secondo metodo, `toggle(id)`, permette di accendere o spegnere il led con id = *id*. Similmente, il metodo `getHumiture(id)` preleva i temperatura e percentuale di umidità dal sensore con id = *id*.

È importante sapere che la web app deve necessariamente essere eseguita su un web server, altrimenti si incorre nell'errore `index.html:1 Access to script at '.../main.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, isolated-app, chrome-extension, chrome, https, chrome-untrusted.
main.js:1` e `Failed to load resource: net::ERR_FAILED`. Ad esempio, in fase di testing ho usato l'estensione *Live Server* di Visual Studio Code.

</div>

## 📝 Note conclusive

<div align="justify">

Essendo solo una prima versione del progetto, al momento le funzionalità messe a disposizione da questo sistema sono limitate, ma in futuro la gamma di operazioni che ogni scheda può svolgere sarà più vasta.

Tra le limitazioni attuali, alcune da menzionare sono:

1. Le credenziali del wi-fi devono essere scritte direttamente nel codice di ogni modulo ESP8266, nonostante esso disponga della tecnologia **Smart Link** sia per dispositivi Android che iOS.
2. Tutto il sistema funziona mediante lo scambio di messaggi TCP e ciò comporta una mancanza di efficienza e una difficile gestione. In futuro, implementare un ecosistema che sfrutti lo scambio di messaggi UDP.

Attualmente mi sto adoperando per migliorare la versione corrente ed implementare nuove funzionalità per le versioni successive.

</div>
