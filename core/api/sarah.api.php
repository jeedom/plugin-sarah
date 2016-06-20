<?php

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

require_once dirname(__FILE__) . "/../../../../core/php/core.inc.php";

global $jsonrpc;
if (!is_object($jsonrpc)) {
	throw new Exception(__('JSONRPC object not defined', __FILE__), -32699);
}

$params = $jsonrpc->getParams();

if ($jsonrpc->getMethod() == 'updateXml') {
	log::add('sarah', 'info', 'Appels api pour generation de grammaire');
	$jsonrpc->makeSuccess(sarah::generateXmlGrammar());
}

if ($jsonrpc->getMethod() == 'execute') {
	$interactQuery = interactQuery::byId($params['id']);
	if (is_object($interactQuery)) {
		$jsonrpc->makeSuccess($interactQuery->executeAndReply($params));
	}
	$jsonrpc->makeSuccess(interactQuery::tryToReply($params['text'], $params));
}

if ($jsonrpc->getMethod() == 'askResult') {
	$sarah = sarah::byId($params['id']);
	if (!is_object($sarah)) {
		throw new Exception(__('Aucune correspondance pour l\'id sarah : ', __FILE__) . $params['id'], -32605);
	}

	$cmd = $sarah->getCmd('action', 'speak');
	if (!is_object($cmd)) {
		throw new Exception(__('Commande speak de sarah non trouvée', __FILE__), -32605);
	}

	if ($cmd->getConfiguration('storeVariable', 'none') != 'none') {
		$dataStore = new dataStore();
		$dataStore->setType('scenario');
		$dataStore->setKey($cmd->getConfiguration('storeVariable', 'none'));
		$dataStore->setValue($params['response']);
		$dataStore->setLink_id(-1);
		$dataStore->save();
		$cmd->setConfiguration('storeVariable', 'none');
		$cmd->save();
	}
	$jsonrpc->makeSuccess();
}

throw new Exception(__('Aucune methode correspondante pour le plugin S.A.R.A.H : ' . $jsonrpc->getMethod(), __FILE__));
?>
