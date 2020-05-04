Beschreibung 
===========

Plugin, mit dem Jeedom mit der SARAH-Anwendung kommunizieren kann
(Spracherkennung). Machen Sie Sprachansagen und spielen Sie
klingt aus Jeedom.

Konfiguration 
=============

Das SARAH-Plugin erweitert die Spracherkennung
Sprich mit Jeedom, mache eine Ansage oder spiele einen Sound von Jeedom.

Plugin Konfiguration 
-----------------------

Sobald das SARAH-Plugin auf Jeedom vom Markt installiert wurde,
Klicken Sie auf **Activer**.

Konfigurieren Sie Sarahs Namen (Standard **Sarah**, aber du kannst
zum Beispiel Jarvis oder Jeedom).

![sarah1](../images/sarah1.PNG)

Klicken Sie dann auf eine der Schaltflächen, um das Plugin herunterzuladen
**Jeedom** Für die Version von SARAH, die Sie verwenden, v3 oder v4.

Stoppen Sie nach dem Herunterladen den SARAH-Server und -Client..
Entpacken Sie das Archiv im Ordner **plugins** von SARAH auf der
Client-Workstation (nur Windows-kompatibel) :
<http://encausse.wordpress.com/s-a-r-a-h/>

Wenn Sie fertig sind, können Sie den Client und den Server neu starten
SARAH..

Gerätekonfiguration 
-----------------------------

Die Konfiguration der SARAH-Geräte ist über die
Plugins-Menü :

![sarah2](../images/sarah2.PNG)

So sieht die SARAH-Plugin-Seite aus (hier mit bereits 1
Ausrüstung) :

![sarah3](../images/sarah3.PNG)

> **Tip**
>
> Platzieren Sie wie an vielen Stellen in Jeedom die Maus ganz links
> ruft ein Schnellzugriffsmenü auf (Sie können unter
> Lassen Sie es in Ihrem Profil immer sichtbar.).

Sobald Sie auf eine davon klicken, erhalten Sie :

![sarah4](../images/sarah4.PNG)

Sie finden hier :

-   **Name der SARAH-Ausrüstung** : Name Ihrer Ausrüstung
    SARAH.,

-   **Übergeordnetes Objekt** : gibt das übergeordnete Objekt an, zu dem
    gehört Ausrüstung.

-   **Activer** : macht Ihre Ausrüstung aktiv,

-   **NodeJS-Adresse** : SARAH IP + JS-Knotenport (von
    Standardport ist 8080)

-   **TTS-Adresse** : SARAH IP + TTS-Serverport (von
    Standardport ist 8888)

-   **Melden Sie keinen Fehler, wenn SARAH nicht vorhanden ist** : Ankreuzen
    wenn SARAH nicht kontinuierlich gestartet wird

Jedes Gerät vom Typ SARAH erstellt auch eine Bestellung :

-   **Dit** : Was es in den Szenarien erlaubt, einen Text zu sagen
    in Jeedom. Es ist möglich, einen Satz zufällig anzukündigen
    indem Sie Ihre Sätze mit einer Pfeife trennen : | Beispiel : Die Haustür
    ist offen.|Eine Person öffnete die Haustür.|Eingangstür
    offen. Während der Ankündigung wird also einer der drei Sätze ausgewählt
    zufällig.

-   **Jouer** : Damit kann eine Audiodatei vom Typ .mp3 ausgeführt werden
    oder .wav. Diese Audiodateien sollten für die platziert werden **v3** :
    im Ordner **"medias"** an der Wurzel oder **v4** : im Ordner
    **"Kunde / Medien"** Ihrer SARAH-Anwendung In Ihrem
    In diesem Szenario geben Sie einfach den Namen Ihrer Audiodatei an
    Ausführen.

![sarah5](../images/sarah5.PNG)

-   **Grammatik aktualisieren** : Was erlaubt durch a
    Szenario, um die XML-Grammatik aus neu zu generieren
    Jeedom Interaktionen.

Mit der Schaltfläche "Synchronisieren" können Sie die Liste von an SARAH senden
Bei allen Interaktionen muss dies bei jedem Update von erfolgen
interactions.

Wenn Sie die Funktion verwenden möchten **Ask** von SARAH ist es
möglich, es aus einem Jeedom-Szenario mit einem zu tun
Aktion "**Stellen Sie eine Anfrage**".

Hier ist ein einfaches Anwendungsbeispiel :

![sarah6](../images/sarah6.PNG)

Wenn Sie den Aktionsbefehl hinzugefügt haben "**Stellen Sie eine Anfrage**", vous
Es werden 5 Felder angezeigt, die ausgefüllt zu sein scheinen :

-   **Question** : Die Frage, die Jeedom Ihnen stellen soll.

-   **Antwort** : Die Antwortmöglichkeiten, die Sie haben möchten
    Interagiere nach der Frage. Jede Antwort muss durch getrennt werden
    ein Semikolon.

-   **Variable** : Dies ist der Name der Variablen, in der Sie sich befinden
    Ich möchte, dass Ihre Antwort aufgezeichnet wird, damit Sie dies tun können
    eine Bewertung für den Rest des Szenarios.

-   **Verzögerung (Sek.)** : Es ist Zeit in Sekunden vor dem Skript
    Schließen Sie die Bewertung weiter ab, wenn keine Antwort eingeht
    gegeben (Timeout).

-   **Commandes** : Wird bestellt "**Dit**" von dir
    SARAH-Ausrüstung.

Konfiguration in SARAH. 
-----------------------------

Auf der SARAH-Schnittstelle sollten Sie ein Portlet mit dem haben
Logo **Jeedom**.

**SARAH v3** :

Klicken Sie auf die Doppelpfeile oben im Portlet, um sie zu drehen
Klicken Sie für den Rest auf den Schlüssel unten links im Portlet
um auf das Plugin-Konfigurationsfenster zuzugreifen.

**SARAH v4** :

Klicken Sie auf das Sternrad unten im Portlet und dann auf
**Konfigurieren Sie die Erweiterung** um auf das Konfigurationsfenster des zuzugreifen
plugin.

IN **addrJeedom**, ersetzen **\ [IP\_JEEDOM \]** von Ihrer IP
Jeedom und ersetzen **\ [PORT\_JEEDOM \]**, indem du dein Jeedom trägst.
Wenn Ihr Jeedom die Erweiterung verwendet **/jeedom**, vergiss es nicht
Zeigen Sie es nach dem Tragen an.

IN **apikeyJeedom**, ersetzen **\ [CLE\_API\_JEEDOM \]** durch den Schlüssel
API Ihres Jeedom finden Sie auf der Seite von
Konfiguration Ihres Jeedom.

Klicken Sie zum Abschluss auf Speichern.

Anwendungsfall 
-----------------

Beispiele :

-   Auf diese Weise können Sie alle Aufzüge kennen
    d'informations des différents capteurs (type “Sarah combien fait-il
    dehors?” ou “Sarah qu'elle est la température de la chambre”).

-   Vous pouvez également piloter les lumières (“Sarah allume la lumière
    du salon”), pour cela il faut bien sur avoir configuré
    Interaktionen.

-   Eine Person drückt den Knopf an der drahtlosen Türklingel (RF433),
    Z-Welle, ets…), Jeedom gibt einen Ton über SARAH ab,
    kündigt die Anwesenheit eines Besuchers an und stellt Ihnen die Frage,
    "Kann ich die Tür öffnen? ?".

-   Ihre Waschmaschine ist im Keller, das Programm ist beendet,
    SARAH spielt einen "Ding, Dong" -Sound und kündigt das Programm an
    ist fertig. Dann stellt sie dir die Frage: "Soll ich ausschalten?
    die Waschmaschine ?".

-   Ets…​

Die einzige Grenze wird Ihre Vorstellungskraft sein.
