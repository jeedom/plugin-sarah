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

/* * ***************************Includes********************************* */
require_once dirname(__FILE__) . '/../../../../core/php/core.inc.php';

class sarah extends eqLogic {
	/*     * *************************Attributs****************************** */

	/*     * ***********************Methode static*************************** */

	public static function generateXmlGrammar() {
		$xmlWildcard = '';
		$xml = "<grammar version=\"1.0\" xml:lang=\"fr-FR\" mode=\"voice\" root=\"ruleJeedom\" xmlns=\"http://www.w3.org/2001/06/grammar\" tag-format=\"semantics/1.0\">\r\n";
		$xml .= "<rule id=\"ruleJeedom\" scope=\"public\">\r\n";
		$xml .= "<tag>out.action=new Object(); </tag>\r\n";
		$xml .= "<item>" . config::byKey('sarahName', 'sarah', 'Sarah') . "</item>\r\n";
		$xml .= "<one-of>\r\n";
		foreach (interactQuery::all() as $interactQuery) {
			$query = $interactQuery->getQuery();
			preg_match_all("/#(.*?)#/", $query, $matches);
			if (count($matches[1]) == 0 && !preg_match("/[[:digit:]]/", $query) && !preg_match("/\+|\(|\)/", $query)) {
				$xml .= "<item>" . $interactQuery->getQuery() . "<tag>out.action.id=\"" . $interactQuery->getId() . "\"; out.action.method=\"execute\"</tag></item>\r\n";
			}
		}
		$xml .= "</one-of>\r\n";
		$xml .= "<tag>out.action._attributes.uri=\"http://127.0.0.1:8080/sarah/jeedom\";</tag>\r\n";
		$xml .= "</rule>\r\n";
		$xml .= "</grammar>\r\n";
		return $xml;
	}

	/*     * *********************Methode d'instance************************* */

	public function updateSrvSarah() {
		$http = new com_http($this->getConfiguration('addrSrv') . '/sarah/jeedom?method=update');
		$return = $http->exec(30);
		return true;
	}

	public function postSave() {
		$sarahCmd = $this->getCmd(null, 'speak');
		if (!is_object($sarahCmd)) {
			$sarahCmd = new sarahCmd();
		}
		$sarahCmd->setName('Dit');
		$sarahCmd->setLogicalId('speak');
		$sarahCmd->setDisplay('title_disable', 1);
		$sarahCmd->setEqLogic_id($this->getId());
		$sarahCmd->setType('action');
		$sarahCmd->setSubType('message');
		$sarahCmd->save();

		$sarahCmd = $this->getCmd(null, 'updateXml');
		if (!is_object($sarahCmd)) {
			$sarahCmd = new sarahCmd();
		}
		$sarahCmd->setName('Mettre à jour la grammaire');
		$sarahCmd->setLogicalId('updateXml');
		$sarahCmd->setEqLogic_id($this->getId());
		$sarahCmd->setType('action');
		$sarahCmd->setSubType('other');
		$sarahCmd->save();
	}

}

class sarahCmd extends cmd {
	/*     * *************************Attributs****************************** */

	/*     * ***********************Methode static*************************** */

	/*     * *********************Methode d'instance************************* */

	public function dontRemoveCmd() {
		return true;
	}

	public function execute($_options = array()) {
		$eqLogic = $this->getEqLogic();
		if ($this->getLogicalId() == 'speak') {
			$http = new com_http($eqLogic->getConfiguration('addrSrvTts') . '/?tts=' . urlencode($_options['message']));
			if ($eqLogic->getConfiguration('doNotThrowError', 0) == 1) {
				$http->setNoReportError(true);
			}
			try {
				return $http->exec();
			} catch (Exception $e) {
				if ($eqLogic->getConfiguration('doNotThrowError', 0) == 0) {
					throw $e;
				}
			}
		}
		if ($this->getLogicalId() == 'updateXml') {
			$eqLogic->updateSrvSarah();
		}
	}
}
