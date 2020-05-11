Description 
===========

Plugin allowing Jeedom to communicate with the SARAH application
(speech Recognition). Make voice announcements and play
sounds from Jeedom.

Setup 
=============

SARAH plugin adds voice recognition to
talk to Jeedom, make an announcement or play a sound from Jeedom.

Plugin configuration 
-----------------------

Once the SARAH plugin installed on Jeedom from the Market,
Click on **Activate**.

Configure Sarah's name (default **Sarah**, but you can
put Jarvis or Jeedom for example).

![sarah1](../images/sarah1.PNG)

Then click on one of the buttons to download the plugin
**Jeedom** for the version of SARAH you are using, v3 or v4.

Once downloaded, stop the SARAH Server and Client..
Unzip the archive in the folder **Plugins** of SARAH on the
client workstation (Windows compatible only) :
<http://encausse.wordpress.com/s-a-r-a-h/>

When done, you can restart the client and the server
SARAH..

Equipment configuration 
-----------------------------

The configuration of SARAH equipment is accessible from the
Plugins menu :

![sarah2](../images/sarah2.PNG)

This is what the SARAH plugin page looks like (Here, with already 1
equipment) :

![sarah3](../images/sarah3.PNG)

> **Tip**
>
> As in many places on Jeedom, place the mouse on the far left
> brings up a quick access menu (you can, at
> from your profile, always leave it visible).

Once you click on one of them, you get :

![sarah4](../images/sarah4.PNG)

You will find here :

-   **Name of SARAH equipment** : name of your equipment
    SARAH.,

-   **Parent object** : indicates the parent object to which
    belongs equipment.

-   **Activate** : makes your equipment active,

-   **NodeJS address** : SARAH IP + JS node port (by
    default port is 8080)

-   **TTS address** : SARAH IP + TTS server port (by
    default port is 8888)

-   **Do not report an error if SARAH is not there** : To tick
    if SARAH is not started continuously

Each SARAH type equipment also creates an order :

-   **Said** : Which allows in the scenarios to make say a text
    at Jeedom. It is possible to announce a sentence randomly
    by separating your sentences with a pipe : | Example : The front door
    is open.|A person opened the front door.|Front door
    opened. So, during the announcement, one of its 3 sentences will be chosen
    randomly.

-   **To play** : Which allows to execute an audio file of type .mp3
    or .wav. These audio files should be placed for the **v3** :
    in the file **"medias"** at the root or **V4** : in the file
    **"customer / media"** of your SARAH application In your
    scenario, just indicate the name of your audio file
    To execute.

![sarah5](../images/sarah5.PNG)

-   **Update grammar** : Which allows through a
    scenario, to regenerate the XML grammar from
    Jeedom interactions.

The button "synchronize" allows to send to SARAH the list of
all interactions, it must be done with each update of
interactions.

If you want to use the function **Ask** from SARAH, it's
possible to do it from a Jeedom scenario using a
Action "**Do a request**".

Here is a simple example of use :

![sarah6](../images/sarah6.PNG)

When you have added the action command "**Do a request**", vous
will see 5 fields appear to be completed :

-   **Question** : The question you want Jeedom to ask you.

-   **Reply** : The answer choices you want to be able to
    interact following the question. Each answer must be separated by
    a semicolon.

-   **Variable** : This will be the name of the variable in which you
    would like your response to be recorded, so that you can do
    an assessment for the rest of the scenario.

-   **Delay (sec)** : It's time in seconds, before the script
    continue to complete the assessment, if no response is received
    given (Timeout).

-   **Commands** : Will be order "**Said**" of your
    SARAH equipment.

Configuration in SARAH. 
-----------------------------

On the SARAH interface, you should have a Portlet with the
Logo **Jeedom**.

**SARAH v3** :

Click on the double arrows at the top of the Portlet to rotate
the image for the rest, click on the key at the bottom left of the Portlet
to access the Plugin configuration window.

**SARAH v4** :

Click on the star wheel at the bottom of the Portlet and then on
**Configure the extension** to access the configuration window of the
plugin.

IN **addrJeedom**, replace **\ [IP\_JEEDOM \]** by your IP
Jeedom and replace **\ [PORT\_JEEDOM \]**, by wearing your Jeedom.
If your Jeedom uses the extension **/ jeedom**, do not forget to
indicate it after wearing.

IN **apikeyJeedom**, replace **\ [CLE\_API\_JEEDOM \]** by the key
API of your Jeedom which you can find in the page of
Configuration of your Jeedom.

And to finish, click on Save.

Use case 
-----------------

Examples :

-   This can allow you to know all the lifts
    d'informations des différents capteurs (type “Sarah combien fait-il
    dehors?” ou “Sarah qu'elle est la température de la chambre”).

-   Vous pouvez également piloter les lumières (“Sarah allume la lumière
    du salon”), pour cela il faut bien sur avoir configuré
    The interactions.

-   A person presses the button on the wireless doorbell (RF433,
    Z-wave, ets…), Jeedom emits a sound via SARAH,
    announces the presence of a visitor and asks you the question,
    "can i open the door ?".

-   Your washing machine is in the cellar, the program is finished,
    SARAH plays a "ding, dong" sound and announces that the program
    is finished. Then she asks you the question, "should I turn off
    washing machine ?".

-   Ets…​

The only limit will be your imagination.
