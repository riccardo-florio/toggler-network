# Toggler Network

## Idea di partenza
L'idea è quella di usare una serie di moduli ESP8266-01S per realizzare una rete di dispositivi "smart", quali sensori, interruttori, pulsanti, e così via.

## Struttura del progetto

<div>
    <p>
        Innanzitutto è necessario programmare il modulo ESP in modo che sia in grado di svolgere azioni particolari stabilite a priori. Ad esempio, si può scrivere uno script dedicato ad estrarre i dati da un sensore ed inviarli all'utente, a comandare un relè, o a gestire un servo motore. Si veda la cartella "<a href="script arduino">script arduino</a>".
    </p>

    <p>
        La rete di sensori è gestita da un "controllore" centrale: una semplice paginetta web che invia richieste ai moduli ESP. Si veda "[webapp](webapp)".
    </p>
</div>

## Il modulo ESP8266-01S

<img src="img/ESP8266-01S.jpg" align="right" alt="ESP8266" width="250">

È un modulo WIFI programmabile mediante uno sketch Arduino (basato su C/C++) in grado di eseguire tale sketch in autonomia.
