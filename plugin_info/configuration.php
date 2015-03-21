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

require_once dirname(__FILE__) . '/../../../core/php/core.inc.php';
include_file('core', 'authentification', 'php');
if (!isConnect()) {
	include_file('desktop', '404', 'php');
	die();
}
?>


<form class="form-horizontal">
    <fieldset>
        <div class="form-group">
            <label class="col-lg-4 control-label">{{Nom S.A.R.A.H}}</label>
            <div class="col-lg-4">
                <input class="configKey form-control" data-l1key="sarahName" placeholder="Sarah"/>
            </div>
        </div>
        <div class="form-group">
            <label class="col-lg-4 control-label">{{Télécharger le plugin}}</label>
            <div class="col-lg-4">
                <a class="btn btn-default" href="plugins/sarah/resources/sarah.zip"><i class="fa fa-cloud-download"></i> {{Télécharger pour installer dans S.A.R.A.H}}</a>
            </div>
        </div>
    </fieldset>
</form>

