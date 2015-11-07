
/* This file is part of Jeedom.
 *
 * Jeedom is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Jeedom is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Jeedom. If not, see <http://www.gnu.org/licenses/>.
 */

exports.action = function (data, callback, config, SARAH) {
    var debug = false;

    /************************************************************************************************
     ** require list
     ************************************************************************************************/
    var EventEmitter = require('events').EventEmitter; //


    /************************************************************************************************
     ** Path list
     ************************************************************************************************/
    var pathXml = 'plugins/jeedom/jeedom.xml';
    var pathJeedomApi = '/core/api/jeeApi.php';


    /************************************************************************************************
     ** log method
     ************************************************************************************************/
    var log = new EventEmitter();

    /***************************************************
     ** @description Main log
     ** @function log
     ** @param message string
     ***************************************************/
    log.on('log', function (message) {
        console.log(message);
    });

    /***************************************************
     ** @description Debug log
     ** @function debugLog
     ** @param message string
     ***************************************************/
    log.on('debugLog', function (message) {
        if (debug) {
            console.log(message);
        }
    });


    /************************************************************************************************
     ** callbackReturn method
     ************************************************************************************************/
    var callbackReturn = new EventEmitter();

    /***************************************************
     ** @description Set the tts message
     ** @function tts
     ** @param message string
     ***************************************************/
    callbackReturn.on('tts', function (message) {
        log.emit('debugLog', '>> callbackReturn method "tts"');
        log.emit('log', message);
        callback({tts: message});
        log.emit('debugLog', '<< callbackReturn method "tts"');
    });


    /************************************************************************************************
     ** interactionShortcut method
     ************************************************************************************************/
    var interactionShortcut = new EventEmitter();

    /***************************************************
     ** @description Chose the raspberry pi process to decode sentence
     ** @function raspberryModeStart
     ***************************************************/
    interactionShortcut.on('raspberryModeStart', function () {
        log.emit('debugLog', '>> interactionShortcut method "raspberryModeStart"');
        var fs = require('fs');
        fs.readFile(pathXml, 'utf8', function (err, xml) {
            if (err) {
                log.emit('log', 'Reading file "' + pathXml + '" failed');
                log.emit('debugLog', err);
                callbackReturn.emit('tts', "ERREUR Sarah: lecture du fichier jeedom.xml impossible");
                log.emit('debugLog', '<< interactionShortcut method "raspberryModeStart"');
            }
            else {
                log.emit('debugLog', 'Reading file "' + pathXml + '" succeed');
                log.emit('debugLog', xml);
                interactionShortcut.emit('convertXmlToJson', xml);
                log.emit('debugLog', '<< interactionShortcut method "raspberryModeStart"');
            }
        });
    });

    /***************************************************
     ** @description Chose the raspberry pi process to decode sentence to compare sentence to xml file
     ** @function convertXmlToJson
     ** @param file _xml
     ***************************************************/
    interactionShortcut.on('convertXmlToJson', function (_xml) {
        log.emit('debugLog', '>> interactionShortcut method "convertXmlToJson"');
        var xml2jsStringParsor = require('xml2js').parseString;
        xml2jsStringParsor(_xml, function (err, json) {
            if (err) {
                log.emit('log', 'Conversion xml to json failed');
                log.emit('debugLog', err);
                callbackReturn.emit('tts', "ERREUR Sarah: conversion du fichier jeedom.xml en json impossible");
                log.emit('debugLog', '<< interactionShortcut method "convertXmlToJson"');
            } else {
                log.emit('debugLog', 'Conversion xml to json for raspberry pi succeed');
                log.emit('debugLog', json);
                interactionShortcut.emit('extractionFromJson', json);
                log.emit('debugLog', '<< interactionShortcut method "convertXmlToJson"');
            }
        });
    });

    /***************************************************
     ** @description Extraction interaction of json
     ** @function extractionFromJson
     ** @param file _json
     ***************************************************/
    interactionShortcut.on('extractionFromJson', function (_json) {
        log.emit('debugLog', '>> interactionShortcut method "extractionFromJson"');
        var interactionList = new Array();
        //Check all Sarah user
        try {
            for (sarahUser in _json.grammar.rule) {
                var keyTab = ClearString(_json.grammar.rule[sarahUser].item[0]);
                interactionList[keyTab] = new Array();

                for (interactionInfo in _json.grammar.rule[sarahUser]['one-of'][0].item) {
                    var interactionTab = ClearString(_json.grammar.rule[sarahUser]['one-of'][0].item[interactionInfo]['_']);
                    interactionList[keyTab][interactionTab] = new Array();

                    var interactionTag = _json.grammar.rule[sarahUser]['one-of'][0].item[interactionInfo]['tag'][0];

                    var interactionId = interactionTag.slice(0, interactionTag.search(';'));
                    interactionId = interactionId.slice(interactionId.indexOf('"') + 1, interactionId.lastIndexOf('"'));
                    interactionList[keyTab][interactionTab]['id'] = interactionId;

                    var interactionMethod = interactionTag.slice(interactionTag.search(';') + 1);
                    interactionMethod = interactionMethod.slice(interactionMethod.indexOf('"') + 1, interactionMethod.lastIndexOf('"'));
                    interactionList[keyTab][interactionTab]['method'] = interactionMethod;
                }
            }
        } catch (e) {
            log.emit('log', 'Extraction json failed');
            log.emit('debugLog', e);
            callbackReturn.emit('tts', "ERREUR Sarah: l'extraction des interactions a échoué");
            log.emit('debugLog', '<< interactionShortcut method "extractionFromJson"');
        }
        interactionShortcut.emit('checkSentence', interactionList);
        log.emit('debugLog', '<< interactionShortcut method "extractionFromJson"');
    });

    /***************************************************
     ** @description Compare sentence with interaction list
     ** @function checkSentence
     ** @param array interactionList
     ***************************************************/
    interactionShortcut.on('checkSentence', function (interactionList) {
        log.emit('debugLog', '>> interactionShortcut method "checkSentence"');
        log.emit('debugLog', data.emulate);
        log.emit('debugLog', ClearString(data.emulate));

        //Check all user
        var n = 0;
        var length = 0;
        for (key in interactionList) {

            var string = ClearString(data.emulate);
            n = string.search(key);

            if (n != -1) {
                string = ClearString(string.replace(key, ""));
                log.emit('debugLog', 'Correspondance to ' + key);

                //Check all interaction sentence
                for (sentence in interactionList[key]) {
                    n = string.search(sentence);

                    if (n != -1) {
                        log.emit('debugLog', 'Correspondance to ' + key + ' ' + sentence);
                        if (sentence.length > length) {
                            length = sentence.length;
                            log.emit('debugLog', 'Select this correspondance --> ' + key + ' ' + sentence);
                            //Set information for next step
                            data.id = interactionList[key][sentence]['id'];
                            data.method = interactionList[key][sentence]['method'];
                        }
                    }
                }
            }
        }

        log.emit('debugLog', 'id --> ' + data.id);
        log.emit('debugLog', 'method --> ' + data.method);
        if (data.method == 'execute') {
            jeedomProcess.emit('execute');
        }
        else {
            jeedomProcess.emit('unknown');
        }
        log.emit('debugLog', '<< interactionShortcut method "checkSentence"');
    });


    /************************************************************************************************
     ** jeedomProcess method
     ************************************************************************************************/
    var jeedomProcess = new EventEmitter();

    /***************************************************
     ** @description Send interaction request to jeedom
     ** @function execute
     ***************************************************/
    jeedomProcess.on('execute', function () {
        log.emit('debugLog', '>> jeedomProcess method "execute"');
        log.emit('log', '--------Execute--------');
        var jsonrpc = GenerateJsonRpc();
        jsonrpc.method = 'execute';
        for (var i in data) {
            jsonrpc.params[i] = data[i];
        }
        sendJsonRequest.emit('start', jsonrpc, ReadReturn);
        log.emit('debugLog', '<< jeedomProcess method "execute"');
    });

    /***************************************************
     ** @description Update interaction xml file
     ** @function update
     ***************************************************/
    jeedomProcess.on('update', function () {
        log.emit('debugLog', '>> jeedomProcess method "update"');
        log.emit('log', '--------Update--------');
        var jsonrpc = GenerateJsonRpc();
        jsonrpc.method = 'updateXml';
        sendJsonRequest.emit('start', jsonrpc, UpdateXml);
        log.emit('debugLog', '<< jeedomProcess method "update"');
    });

    /***************************************************
     ** @description interaction unknown
     ** @function unknown
     ***************************************************/
    jeedomProcess.on('unknown', function () {
        log.emit('debugLog', '>> jeedomProcess method "unknown"');
        log.emit('log', '--------unknown-------');
        log.emit('log', 'Aucune interaction correspondante');
        callbackReturn.emit('tts', "Je n'est pas compris");
        log.emit('debugLog', '<< jeedomProcess method "unknown"');
    });


    /************************************************************************************************
     ** sendJsonRequest method
     ************************************************************************************************/
    var sendJsonRequest = new EventEmitter();

    /***************************************************
     ** @description Send json request to jeedom and execute callback
     ** @function sendJsonRequest
     ** @param string _jsonrpc
     ** @param function callback sendJsonRequest
     ***************************************************/
    sendJsonRequest.on('start', function (_jsonrpc, intCallback) {
        log.emit('debugLog', '>> sendJsonRequest method "start"');

        var adresse = config.addrJeedom;
        if (adresse.indexOf('http://') < 0) {
            adresse = 'http://' + adresse;
        }
        log.emit('log', 'Adresse : ' + adresse + pathJeedomApi);
        log.emit('debugLog', 'Request :');
        log.emit('debugLog', _jsonrpc);
        var request = require('request');
        request({
            url: adresse + pathJeedomApi,
            method: 'POST',
            form: {request: JSON.stringify(_jsonrpc)}
        },
        function (err, response, json) {
            if (err || response.statusCode != 200) {
                log.emit('log', 'Error: Callback request');
                log.emit('debugLog', err);
                log.emit('debugLog', response);
                ProcessReturn(false, intCallback);
                return 0;
            }
            log.emit('log', '-------REQUEST RESULT-------');
            log.emit('log', json);
            log.emit('debugLog', '----------------------------');
            ProcessReturn(JSON.parse(json), intCallback);
            return 0;
        });

        log.emit('debugLog', '<< sendJsonRequest method "start"');
    });


    /************************************************************************************************
     ** function
     ************************************************************************************************/

    /***************************************************
     ** @description Clearing string to delete and replace special character
     ** @function ClearString
     ** @param string _string
     ** @return string
     ***************************************************/
    function ClearString(_string) {
        _string = _string.toLowerCase();
        _string = _string.replace(/[èéêë]/g, "e");
        _string = _string.replace(/[ç]/g, "c");
        _string = _string.replace(/[à]/g, "a");
        _string = _string.replace(/[ï]/g, "i");
        _string = _string.trim();
        while (_string.search('  ') != -1) {
            _string = _string.replace("  ", " ");
        }
        return _string;
    }

    /***************************************************
     ** @description Generate json rpc for jeedom
     ** @function GenerateJsonRpc
     ** @return string json
     ***************************************************/
    function GenerateJsonRpc() {
        var jsonrpc = {};
        jsonrpc.id = data.id;
        jsonrpc.params = {};
        jsonrpc.params.apikey = config.apikeyJeedom;
        jsonrpc.params.plugin = 'sarah';
        jsonrpc.jsonrpc = '2.0';
        return jsonrpc;
    }

    /***************************************************
     ** @description Update xml file from jeedom
     ** @function UpdateXml
     ** @param file _xml
     ***************************************************/
    function UpdateXml(_xml) {
        log.emit('log', 'Ecriture du fichier xml');
        var fs = require('fs');
        fs.writeFile(pathXml, _xml, function (err) {
            if (err) {
                log.emit('log', 'ERREUR Sarah: Update du fichier jeedom.xml impossible')
                log.emit('debugLog', err)
                callbackReturn.emit('tts', 'ERREUR Sarah: Update du fichier jeedom.xml impossible');
            } else {
                log.emit('log', 'Mise à jour du xml réussi');

                //for Raspberry pi
                callbackReturn.emit('tts', 'Mise à jour du xml réussi');
            }
        });
    }

    /***************************************************
     ** @description Update xml file from jeedom
     ** @function ReadReturn
     ** @param string _return
     ***************************************************/
    function ReadReturn(_return) {
        callbackReturn.emit('tts', _return);
    }

    /***************************************************
     ** @description Update xml file from jeedom
     ** @function ProcessReturn
     ** @param string or object _return
     ** @param function intCallback
     ** @return ?
     ***************************************************/
    function ProcessReturn(_return, intCallback) {
        if (_return === false) {
            log.emit('log', 'Echec de la requete à jeedom (retour=faux)');
            callbackReturn.emit('tts', 'Echec de la requete à jeedom (retour=faux)');
            log.emit('debugLog', _return);
            return;
        }
        if (Isset(_return.error)) {
            if (Isset(_return.error.message)) {
                log.emit('log', _return.error.message);
                callbackReturn.emit('tts', _return.error.message);
            } else {
                callbackReturn.emit('tts', 'Echec de la requete à jeedom (no return message');
            }
        } else {
            log.emit('log', '-------REQUEST SUCCESS-------');
            intCallback(_return.result);
        }
    }

    /***************************************************
     ** @description ?
     ** @function Isset
     ** @return ?
     ***************************************************/
    function Isset() {
        var a = arguments,
                l = a.length,
                i = 0,
                undef;

        if (l === 0) {
            throw new Error('Empty isset');
        }

        while (i !== l) {
            if (a[i] === undef || a[i] === null) {
                return false;
            }
            i++;
        }
        return true;
    }


    /************************************************************************************************
     ** Main
     ************************************************************************************************/
    log.emit('log', 'Plugin "jeedom" for Sarah starting');
    log.emit('debugLog', data);
    config = config.modules.jeedom;

    //Raspberry pi mode
    if (data.emulate) {
        interactionShortcut.emit('raspberryModeStart');

        //PC mode
        //"execute" method detected
    } else if (data.method == 'execute') {
        jeedomProcess.emit('execute');

        //"update" method detected
    } else if (data.method == 'update') {
        jeedomProcess.emit('update');

        //Nope method detected
    } else {
        jeedomProcess.emit('unknown');
    }

};