Descripción 
===========

Complemento que permite a Jeedom comunicarse con la aplicación SARAH
(reconocimiento de voz). Haz anuncios de voz y juega
sonidos de Jeedom.

Configuración 
=============

El complemento SARAH agrega reconocimiento de voz a
hable con Jeedom, haga un anuncio o reproduzca un sonido de Jeedom.

Configuración del plugin 
-----------------------

Una vez que el complemento SARAH se instaló en Jeedom del mercado,
Haga clic en **Activar**.

Configurar el nombre de Sarah (predeterminado **Sarah**, pero tu puedes
poner Jarvis o Jeedom por ejemplo).

![sarah1](../images/sarah1.PNG)

Luego haga clic en uno de los botones para descargar el complemento
**Jeedom** para la versión de SARAH que está utilizando, v3 o v4.

Una vez descargado, detenga el Servidor SARAH y el Cliente..
Descomprima el archivo en la carpeta **plugins** de SARAH en el
estación de trabajo del cliente (solo compatible con Windows) :
<http://encausse.wordpress.com/s-a-r-a-h/>

Cuando termine, puede reiniciar el cliente y el servidor
SARAH..

Configuración del equipo 
-----------------------------

Se puede acceder a la configuración del equipo SARAH desde
Menú de complementos :

![sarah2](../images/sarah2.PNG)

Así es como se ve la página del complemento SARAH (Aquí, con 1
equipos) :

![sarah3](../images/sarah3.PNG)

> **Punta**
>
> Como en muchos lugares de Jeedom, coloca el mouse en el extremo izquierdo
> muestra un menú de acceso rápido (puede, en
> desde tu perfil, siempre déjalo visible).

Una vez que haces clic en uno de ellos, obtienes :

![sarah4](../images/sarah4.PNG)

Lo encuentras aqui :

-   **Nombre del equipo SARAH** : nombre de su equipo
    SARAH.,

-   **Objeto padre** : indica el objeto padre al que
    pertenece equipo.

-   **Activar** : activa su equipo,

-   **Dirección NodeJS** : Puerto de nodo SARAH IP + JS (por
    el puerto predeterminado es 8080)

-   **Dirección TTS** : Puerto del servidor SARAH IP + TTS (por
    el puerto predeterminado es 8888)

-   **No informe un error si SARAH no está allí** : Para marcar
    si SARAH no se inicia continuamente

Cada equipo tipo SARAH también crea un pedido :

-   **Dijo** : Lo que permite en los escenarios hacer decir un texto
    en Jeedom. Es posible anunciar una oración al azar
    separando tus oraciones con una tubería : | Ejemplo : La puerta de entrada
    está abierto.|Una persona abrió la puerta de entrada.|Puerta principal
    abierto Entonces, durante el anuncio, se elegirá una de sus 3 oraciones
    al azar.

-   **Jugar** : Lo que permite ejecutar un archivo de audio de tipo .mp3
    o .wav. Estos archivos de audio deben colocarse para **v3** :
    en la carpeta **"medias"** en la raíz o **V4** : en la carpeta
    **"cliente / medios"** de su aplicación SARAH en su
    escenario, solo indique el nombre de su archivo de audio
    A Ejecutar.

![sarah5](../images/sarah5.PNG)

-   **Actualizar gramática** : Lo que permite a través de un
    escenario, para regenerar la gramática XML de
    Interacciones Jeedom.

El botón "sincronizar" permite enviar a SARAH la lista de
todas las interacciones, debe hacerse con cada actualización de
interactions.

Si quieres usar la función **Preguntar** de Sarah, es
posible hacerlo desde un escenario Jeedom usando un
Acción "**Hacer un pedido**".

Aquí hay un ejemplo simple de uso :

![sarah6](../images/sarah6.PNG)

Cuando haya agregado el comando de acción "**Hacer un pedido**", vous
verá 5 campos que parecen estar completos :

-   **Pregunta** : La pregunta que quieres que te haga Jeedom.

-   **Respuesta** : Las opciones de respuesta que desea poder
    interactuar siguiendo la pregunta. Cada respuesta debe estar separada por
    un punto y coma.

-   **Variable** : Este será el nombre de la variable en la que
    desea que se registre su respuesta, para que pueda hacer
    una evaluación para el resto del escenario.

-   **Retraso (seg.)** : Es tiempo en segundos, antes del guión
    continuar completando la evaluación, si no se recibe respuesta
    dado (Tiempo de espera).

-   **Comandos** : Será orden "**Dijo**" de su
    Equipo SARAH.

Configuración en SARAH. 
-----------------------------

En la interfaz SARAH, debe tener un portlet con
Logotipo **Jeedom**.

**SARAH v3** :

Haga clic en las flechas dobles en la parte superior del portlet para rotar
la imagen para el resto, haga clic en la tecla en la parte inferior izquierda del portlet
para acceder a la ventana de configuración del complemento.

**SARAH v4** :

Haga clic en la rueda de estrella en la parte inferior del portlet y luego en
**Configurar la extensión** para acceder a la ventana de configuración de la
plugin.

DENTRO **addrJeedom**, reemplazar **\ [IP\_JEEDOM \]** por su IP
Jeedom y reemplazar **\ [PORT\_JEEDOM \]**, vistiendo tu Jeedom.
Si su Jeedom usa la extensión **/ jeedom**, no te olvides de
indicarlo después de usar.

DENTRO **apikeyJeedom**, reemplazar **\ [CLE\_API\_JEEDOM \]** por la llave
API de su Jeedom que puede encontrar en la página de
Configuración de su Jeedom.

Y para terminar, haga clic en Guardar.

Caso de uso 
-----------------

Ejemplos :

-   Esto puede permitirte conocer todos los ascensores
    d'informations des différents capteurs (type “Sarah combien fait-il
    dehors?” ou “Sarah qu'elle est la température de la chambre”).

-   Vous pouvez également piloter les lumières (“Sarah allume la lumière
    du salon”), pour cela il faut bien sur avoir configuré
    Interacciones.

-   Una persona presiona el botón del timbre inalámbrico (RF433,
    Onda Z, ets ...), Jeedom emite un sonido a través de SARAH,
    anuncia la presencia de un visitante y te hace la pregunta,
    "puedo abrir la puerta ?".

-   Su lavadora está en el sótano, el programa ha finalizado,
    SARAH reproduce un sonido "ding, dong" y anuncia que el programa
    está terminado. Entonces ella te hace la pregunta, "debería apagar
    la lavadora ?".

-   Ets…​

El único límite será tu imaginación.
