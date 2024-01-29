# Toggler Network

## Idea di partenza

<div align="justify">
L'idea è quella di usare una serie di moduli ESP8266-01S per realizzare una rete di dispositivi "smart", quali sensori, interruttori, pulsanti, e così via.
</div>

## Struttura del progetto

<div align="justify">
   Innanzitutto è necessario programmare il modulo ESP in modo che sia in grado di svolgere azioni particolari stabilite a priori. Ad esempio, si può scrivere uno script dedicato ad estrarre i dati da un sensore ed inviarli all'utente, a comandare un relè, o a gestire un servo motore. Si veda la cartella "<a href="script arduino">script arduino</a>".
   
   <br>

   La rete di sensori è gestita da un "controllore" centrale: una semplice paginetta web che invia richieste ai moduli ESP. Si veda "<a href="webapp">webapp</a>".
</div>

## Il modulo ESP8266-01S

<img src="img/ESP8266-01S.jpg" align="right" alt="ESP8266" width="290">

<div align="justify">
   È un modulo WIFI programmabile mediante uno sketch Arduino (basato su C/C++) e capace di eseguirlo in autonomia.

   <br>

   Nel contesto di questo progetto, 
</div>