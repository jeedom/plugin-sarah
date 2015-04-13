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
			if ($interactQuery->getEnable() == 1) {
				$query = $interactQuery->getQuery();
				preg_match_all("/#(.*?)#/", $query, $matches);
				$matches = $matches[1];
				if (count($matches) > 0) {
					$xmlWildcard .= "<rule id=\"ruleJeedom_" . $interactQuery->getId() . "\" scope=\"public\">\r\n";
					$xmlWildcard .= "<tag>out.action=new Object();</tag>\r\n";
					foreach ($matches as $match) {
						$beforeMatch = substr($query, 0, strpos($query, "#" . $match . "#"));
						$query = substr($query, strpos($query, "#" . $match . "#") + strlen("#" . $match . "#"));
						$xmlWildcard .= "<item>" . $beforeMatch . "</item>\r\n";
						$xmlWildcard .= "<ruleref special=\"GARBAGE\" />\r\n";
					}
					if (strlen($query) > 0) {
						$xmlWildcard .= "<item>" . $query . "</item>\r\n";
					}
					$xmlWildcard .= "</rule>\r\n";
					$xml .= "<item><ruleref uri=\"#ruleJeedom_" . $interactQuery->getId() . "\"/><tag>out._attributes.dictation=\"true\";out.action.id=\"" . $interactQuery->getId() . "\"; out.action.method=\"execute\"</tag></item>\r\n";
				} else {
					$xml .= "<item>" . $interactQuery->getQuery() . "<tag>out.action.id=\"" . $interactQuery->getId() . "\"; out.action.method=\"execute\"</tag></item>\r\n";
				}
			}
		}
		$xml .= "</one-of>\r\n";
		$xml .= "<tag>out.action._attributes.uri=\"http://127.0.0.1:8080/sarah/jeedom\";</tag>\r\n";
		$xml .= "</rule>\r\n";
		$xml .= $xmlWildcard;
		$xml .= "</grammar>\r\n";
		return $xml;
	}

	/*     * *********************Methode d'instance************************* */

	public function ping() {
		$http = new com_http($this->getConfiguration('addrSrv') . '/sarah/jeedom?method=ping');
		try {
			$http->exec(1, 1, false);
			return true;
		} catch (Exception $e) {
			return false;
		}
	}

	public function updateSrvSarah() {
		$http = new com_http($this->getConfiguration('addrSrv') . '/sarah/jeedom?method=update');
		$return = $http->exec(30);
		if ($return != 'Mise à jour du xml réussi') {
			throw new Exception($return);
		}
		return true;
	}

	public function postSave() {
		$sarahCmd = $this->getCmd(null, 'speak');
		if (!is_object($sarahCmd)) {
			$sarahCmd = new sarahCmd();
		}
		$sarahCmd->setName('Dit');
		$sarahCmd->setLogicalId('speak');
		$sarahCmd->setEqLogic_id($this->getId());
		$sarahCmd->setType('action');
		$sarahCmd->setSubType('message');
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
		if (!isset($_options['title']) && !isset($_options['message'])) {
			throw new Exception(__("Le titre ou le message ne peuvent être tous les deux vide", __FILE__));
		}
		$eqLogic = $this->getEqLogic();
		$message = '';
		if (isset($_options['title']) && trim($_options['title']) != '') {
			$message = $_options['title'] . '. ';
		}
		$message .= $_options['message'];
		$http = new com_http($eqLogic->getConfiguration('addrSrvTts') . '/?tts=' . urlencode($message));
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

}
