# SHELL BASICS

## Grundlagen / Voraussetzungen

Wissenswertes und Grundlagen, damit alle über dasselbe sprechen und ggf. googeln können, was sie daran mehr interessiert

###	Unix - was ist das?

Multiuser - Singleuser

Multitasking Zeitscheibenbasiert

Kernel

Prozesse verschiedener User mit deren Berechtigungen

Vergleich Unix/Win

Beispiele: Solaris/HP-UX/Sinix/Linux

#### Unix Prinzipien:

1. (Fast) **Alles** ist eine Datei (Verzeichnisse, Hardware[-zugriffe], ...)
2. Ein Tool erledigt genau eine(!) Aufgabe
3. Tools können verkettet werden

	=> ca. 2min

###	Linux ein Unix-"Zweig" - in versch. Distributionen

Was ist Linux? <br/>
Open Source Kernel, Open Source GNU Tools, Grafische Oberfläche als "AddOn"

Was bedeutet "Open Source"?

Was ist eine Distribution?

	=> ca. 5min

###	Shell - das User Interface

Was tut die Shell? <br/>
Die Shell ist **"das"** User Interface, damit werden Kommandos an das OS gegeben (Prozesse gestartet, beendet, ...)<br/>
Die Shell arbeitet Textbasiert und damit kann jeder Befehl, der interaktiv eingegeben wurde auch ver-**skriptet** werden.

Es gibt verschiedene Shells (bash, korn, csh, sh, ...).

Die Aufgaben einer Shell:
- Befehle entgegennehmen und diese Befehle interpretieren
- die in einer Befehlszeile aufgerufenen Programme starten
- Meldungen der aufgerufnen Programme an den Benutzer weitergeben

Wir lernen die Verwendung der bash, **die** Standard Shell in der Linux Welt!

	=> ca. 5min

##	Praxis: Verbindung zum Server herstellen: putty, ssh ...

Jeder der Teilnehmer öffnet seien Verbindung zum Server und **startet damit automatisch eine bash (=>Shell)**

	echo
	cat /etc/passwd

ein sehr einfaches und vielseitiges Kommando!

## Tools 1 - Files und Directories

### Die wichtigsten Datei- und Verzeichniskommandos

Die ersten Kommandos und ihre wichtigsten Parameter:

	pwd
	cd		cd .. 		cd /tmp
	ls		ls -l 		ls -l -a 		ls -la

##  ----- Intermisson 1: Wie sehen Unix Kommandos eigentlich aus?

Unix Kommandos funcktionieren immer nach demselben Prinzip

	<command>				# Example: pwd			cd
	<command> argument		# Example: cd /tmp		ls /tmp

oft auch

	<command> --parameter
	<command> --parameter argument

	ls -l

noch öfter (und kürzer)

	<command> -p

oder auch
	
	<command> --param=paramArgument
	# with argument
	<command> --param=paramArgument	argument
	# or short parameter form
	<command> -p paramArgument	argument

**Parameter clustern**<br/>
Die meisten Kommandos lassen es zu, dass mehrere (kurze) Parameter mit einem gemeinsamen Bindestrich zusammengefasst werden dürfen

##  ----- Intermisson 2: Wie soll sich einer diese ganze Sch\*\*\*\* merken?

**Gar nicht** ... dazu gibt es einen Befehl

	man <command>
	man -k Suchwort
	apropos Suchwort

Das steht für Manual und zeigt die Hilfeseite des Kommandos an.

Beenden des Manuals mit **q**

Die Hilfeseiten sind in Sektionen aufgeteilt (s. `man man`)

## Also nochmal: Tools 1 - Files und Directories

### Die wichtigsten Datei- und Verzeichniskommandos

	pwd		# print working dir => wo bin ich gerade?
	cd		# change dir		=> gehe dort hin
	ls		# list				=> zeige mir alle Dateien und Verzeichnisse
	cp		# copy				=> kopiere Dateien/Verzeichnise
	mv		# move				=> verschiebe Dateien/Verzeichnise
	rm		# remove			=> löschen von Dateien und Verzeichnissen
	rmdir	# remove dir		=> löschen von leeren Verzeichnissen
	touch	# 					=> aktualisiert die Zugriffszeit einer Datei oder legt die Dateien an 

`cd ; ls ; cp ; mv ; rm` müssen erklärt und die wichtigsten Argumente/Parameter kurz gezeigt werden

#### Aufgaben:

1. Legt ein Verzeichnis `eins` an und erstellt darin eine Datei `datei1.txt`

2. Wechselt in das Verzeichnis `eins` und erstellt dort eine Datei `.vorsicht`

2. Wie lautet der Name des Besitzers und die Zeitangabe der angelegten Dateien?

3. Legt (ohne aus dem Verzeichnis herauszuwechseln) ein Verzeichnis `zwei` eine Ebene höher (also *neben* `eins`) an

3. Kopiert die Datei `datei1.txt` dorthin

4. Kopiert die Datei `datei1.txt` unter dem Namen `copied.csv` dorthin

5. Welche Möglichkeiten gibt es, um sich die Datei `.vorsicht` anzeigen zu lassen?

## Wie? Soll ich das die ganze Zeit abtippen?<br/><br/>ODER: Wiederaufnahme und Vertiefung: Wie arbeitet die Shell

### Wie hilft mir die bash?

- Die Shell speichert Umgebungsvariablen

<pre><code>echo $HOME
echo $PATH
# alle Umgebungsvariablen anzeigen lassen
env</code></pre>

- Kommandos, Datei-/Verzeichnisnamen und Variablen werden während der Eingabe durch [Tab] vervollständigt und mögliche Vervollständigungen
	werden mit [Tab][Tab] angezeigt<br/>
	Merke: Keiner tippt alles - nur soviel, wie für die Vervollstädigung nötig!!!

- Bereits einmal ausgeführte Kommandos werden abgespeichert (history mit Suche ...)

- Abkürzungen und `aliases` können definiert werden

<pre><code>alias							# zeigt alle definierten aliases an
alias myls="cd /tmp; ls -la"	# legt einen alias an
unalias myls					# löscht den alias "myls"</code></pre>

- Kommandos können ineinander geschachtelt werden

<pre><code>echo "das ist mein Pfad $(pwd)"
# oder auch
echo "das ist mein Pfad pwd`"</code></pre>

- Verzeichnis-/Dateinamen werden mit `*` und `?` erweitert und durch `{a,b,c}` erzeugt

- Ein- und Ausgaben können umgeleitet werden

<pre><code>echo "Das ist der Dateiinhalt" > dateimitinhalt.txt
cat eins/dateimitinhalt.txt</code></pre>

## Kanäle? In den Kommandos?<br/><br/>Ein- Aus- und Umleitung?

Ein- Ausgabeumleitung

## Ein eigenartiger Editor? vi

## Ein leichterer Editor: nano / pico
