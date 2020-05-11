Descrição 
===========

Plugin que permite ao Jeedom se comunicar com o aplicativo SARAH
(reconhecimento de voz). Faça anúncios de voz e jogue
sons de Jeedom.

Configuração 
=============

O plugin SARAH adiciona reconhecimento de voz ao
fale com Jeedom, faça um anúncio ou reproduza um som de Jeedom.

Configuração do plugin 
-----------------------

Depois que o plug-in SARAH foi instalado no Jeedom a partir do Market,
clique em **Ativar**.

Configure o nome de Sarah (padrão **Sarah**, mas você pode
coloque Jarvis ou Jeedom, por exemplo).

![sarah1](../images/sarah1.PNG)

Em seguida, clique em um dos botões para baixar o plugin
**Jeedom** para a versão do SARAH que você está usando, v3 ou v4.

Após o download, pare o servidor e o cliente SARAH..
Descompacte o arquivo na pasta **Plugins** de Sarah no
estação de trabalho cliente (somente compatível com Windows) :
<http://encausse.wordpress.com/s-a-r-a-h/>

Quando terminar, você pode reiniciar o cliente e o servidor
SARAH..

Configuração do equipamento 
-----------------------------

A configuração do equipamento SARAH é acessível a partir do
Menu de plugins :

![sarah2](../images/sarah2.PNG)

É assim que a página do plugin SARAH se parece (aqui, com 1
equipamento) :

![sarah3](../images/sarah3.PNG)

> **Dica**
>
> Como em muitos lugares em Jeedom, coloque o mouse na extremidade esquerda
> abre um menu de acesso rápido (você pode, em
> do seu perfil, deixe-o sempre visível).

Depois de clicar em um deles, você obtém :

![sarah4](../images/sarah4.PNG)

Você encontra aqui :

-   **Nome do equipamento SARAH** : nome do seu equipamento
    SARAH.,

-   **Objeto pai** : indica o objeto pai ao qual
    pertence a equipamento.

-   **Ativar** : torna seu equipamento ativo,

-   **Endereço NodeJS** : Porta do nó SARAH IP + JS (por
    a porta padrão é 8080)

-   **Endereço TTS** : Porta do servidor SARAH IP + TTS (por
    a porta padrão é 8888)

-   **Não relate um erro se SARAH não estiver lá** : Para marcar
    se SARAH não for iniciado continuamente

Cada equipamento do tipo SARAH também cria um pedido :

-   **Disse** : O que permite que, nos cenários, digamos um texto
    na Jeedom. É possível anunciar uma frase aleatoriamente
    separando suas frases com um cano : | Exemplo : A porta da frente
    está aberto.|Uma pessoa abriu a porta da frente.|Porta de entrada
    aberto. Então, durante o anúncio, uma de suas três frases será escolhida
    aleatoriamente.

-   **Reproduzir** : O que permite executar um arquivo de áudio do tipo .mp3
    ou .wav. Esses arquivos de áudio devem ser colocados para o **v3** :
    na pasta **"medias"** na raiz ou **v4** : na pasta
    **"cliente / mídia"** do seu aplicativo SARAH No seu
    cenário, basta indicar o nome do seu arquivo de áudio
    Uma corrida.

![sarah5](../images/sarah5.PNG)

-   **Atualizar gramática** : O que permite através de um
    cenário, para regenerar a gramática XML de
    Interações Jeedom.

O botão "sincronizar" permite enviar para SARAH a lista de
todas as interações, isso deve ser feito a cada atualização do
interactions.

Se você deseja usar a função **Ask** de Sarah, é
possível fazê-lo a partir de um cenário Jeedom usando um
Ação "**Aplicar**".

Aqui está um exemplo simples de uso :

![sarah6](../images/sarah6.PNG)

Quando você adiciona o comando action "**Aplicar**", vous
verá 5 campos parecem estar preenchidos :

-   **Pergunta** : A pergunta que você deseja que o Jeedom faça.

-   **Réponse** : As opções de resposta que você deseja poder
    interagir seguindo a pergunta. Cada resposta deve ser separada por
    um ponto e vírgula.

-   **Variável** : Este será o nome da variável na qual você
    gostaria que sua resposta fosse gravada, para que você possa
    uma avaliação para o restante do cenário.

-   **Atraso (s)** : É tempo em segundos, antes do script
    continue a concluir a avaliação, se nenhuma resposta for recebida
    determinado (Tempo limite).

-   **Comandos** : Será ordem "**Disse**" do seu
    Equipamento SARAH.

Configuração no SARAH. 
-----------------------------

Na interface SARAH, você deve ter um Portlet com o
Logomarca **Jeedom**.

**SARAH v3** :

Clique nas setas duplas na parte superior do Portlet para girar
a imagem restante, clique na chave na parte inferior esquerda do Portlet
para acessar a janela de configuração do plug-in.

**SARAH v4** :

Clique na roda estrela na parte inferior do Portlet e, em seguida, em
**Configure a extensão** para acessar a janela de configuração do
plugin.

Dans **addrJeedom**, substituir **\ [IP\_JEEDOM \]** pelo seu IP
Jeedom e substituir **\ [PORT\_JEEDOM \]**, vestindo seu Jeedom.
Se o seu Jeedom usa a extensão **/ jeedom**, não esqueça de
indique depois de usar.

Dans **apikeyJeedom**, substituir **\ [CLE\_API\_JEEDOM \]** pela chave
API do seu Jeedom, que você pode encontrar na página de
Configuração do seu Jeedom.

E para finalizar, clique em Salvar.

Casos de uso 
-----------------

Exemplos :

-   Isso permite que você conheça todos os elevadores
    d'informations des différents capteurs (type “Sarah combien fait-il
    dehors?” ou “Sarah qu'elle est la température de la chambre”).

-   Vous pouvez également piloter les lumières (“Sarah allume la lumière
    du salon”), pour cela il faut bien sur avoir configuré
    interações.

-   Uma pessoa pressiona o botão na campainha sem fio (RF433,
    Onda Z, etc.), Jeedom emite um som via SARAH,
    anuncia a presença de um visitante e faz a pergunta,
    "posso abrir a porta ?".

-   Sua máquina de lavar está na adega, o programa está concluído,
    SARAH toca um som de "ding, dong" e anuncia que o programa
    está terminado. Então ela faz a pergunta: "devo desligar
    a máquina de lavar ?".

-   Ets…​

O único limite será a sua imaginação.
