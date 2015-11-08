
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

exports.action = function (data, callback) {
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
     ** callbackReturn method
     ************************************************************************************************/
    var callbackReturn = new EventEmitter();

    /***************************************************
     ** @description Set the tts message
     ** @function tts
     ** @param message string
     ***************************************************/
    callbackReturn.on('tts', function (message) {
        console.log(message);
        callback({tts: message});
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
        console.log('--------EXECUTE--------');
        var jsonrpc = getJsonRpc();
        jsonrpc.method = 'execute';
        for (var i in data) {
            jsonrpc.params[i] = data[i];
        }
        sendJsonRequest(jsonrpc, readReturn);
    });

    /***************************************************
     ** @description Update interaction xml file
     ** @function update
     ***************************************************/
    jeedomProcess.on('update', function () {
        console.log('--------UPDATE--------');
        var jsonrpc = getJsonRpc();
        jsonrpc.method = 'updateXml';
        sendJsonRequest(jsonrpc, updateXml);
    });
	
	/***************************************************
     ** @description Ask user
     ** @function ask
     ***************************************************/
    jeedomProcess.on('ask', function () {
        console.log('--------ASK--------');
		console.log(data);
		response_raw = JSON.parse(data.response);
		response = {};
		for(var i in response_raw){
			response[response_raw[i]] = response_raw[i];
		}
        SARAH.askme(data.ask, response, data.timeout * 1000, function(answer, end){
			console.log(answer);
			var jsonrpc = getJsonRpc();
			jsonrpc.method = 'askResult';
			jsonrpc.params['id'] = data.id;
			jsonrpc.params['response'] = answer;
			sendJsonRequest(jsonrpc, end);
		});
    });
	
	/***************************************************
     ** @description sendJsonRequest
     ** @function sendJsonRequest
     ***************************************************/

	function sendJsonRequest(_jsonrpc, callback){
        var adresse = config.addrJeedom;
        if (adresse.indexOf('http://') < 0) {
            adresse = 'http://' + adresse;
        }
        console.log('Adresse : ' + adresse + pathJeedomApi);
		console.log(_jsonrpc)
        var request = require('request');
        request({
            url: adresse + pathJeedomApi,
            method: 'POST',
            form: {request: JSON.stringify(_jsonrpc)}
        },
        function (err, response, json) {
            if (err || response.statusCode != 200) {
                console.log('Error: Callback request');
                callbackReturn.emit('tts', 'Echec de la requete à jeedom');
            }
			result = checkReturn(JSON.parse(json));
			if(result === false){
				return;
			}
            console.log('-------REQUEST SUCCESS-------');
			callback(JSON.parse(json)['result']);
        });
    }


    /************************************************************************************************
     ** function
     ************************************************************************************************/
	 
    /***************************************************
     ** @description Generate json rpc for jeedom
     ** @function getJsonRpc
     ** @return string json
     ***************************************************/
    function getJsonRpc() {
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
     ** @function updateXml
     ** @param file _xml
     ***************************************************/
    function updateXml(_xml) {
        console.log('Ecriture du fichier xml');
        var fs = require('fs');
        fs.writeFile(pathXml, _xml, function (err) {
            if (err) {
                console.log('ERREUR Sarah: Update du fichier jeedom.xml impossible');
            } else {
                console.log('Mise à jour du xml réussi');
            }
        });
    }

    /***************************************************
     ** @description Update xml file from jeedom
     ** @function readReturn
     ** @param string _return
     ***************************************************/
    function readReturn(_return) {
        callbackReturn.emit('tts', _return);
    }

    /***************************************************
     ** @description Update xml file from jeedom
     ** @function ProcessReturn
     ** @param string or object _return
     ** @param function intCallback
     ** @return ?
     ***************************************************/
    function checkReturn(_return, callback) {
        if (_return === false) {
            console.log('Echec de la requete à jeedom');
            return false;
        }
        if (isset(_return.error)) {
            if (isset(_return.error.message)) {
                console.log(_return.error.message);
				callbackReturn.emit('tts', _return.error.message);
            } else {
                console.log('Echec de la requete à jeedom (no return message');
				callbackReturn.emit('tts', 'Echec de la requete à jeedom (no return message');
            }
			return false;
        } 
		return _return['result'];
    }

    /***************************************************
     ** @description ?
     ** @function isset
     ** @return ?
     ***************************************************/
    function isset() {
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
    console.log('Plugin "jeedom" for Sarah starting');
    config = Config.modules.jeedom;
	if (!config.apikeyJeedom){
		console.log("Clef api manquante");
		callback({'tts' : 'Clef api manquante'});
		return;
	}
    jeedomProcess.emit(data.method);
};