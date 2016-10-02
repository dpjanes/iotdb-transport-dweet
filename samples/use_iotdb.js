/*
 *  transporter.js
 *
 *  David Janes
 *  IOTDB.org
 *  2016-08-05
 *
 *  Copyright [2013-2016] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

const testers = require("iotdb-transport").testers;

const iotdb = require("iotdb");
iotdb.use("homestar-feed");
iotdb.connect("USGSEarthquake");

// our source
const iotdb_transport = require("iotdb-transport-iotdb");
const iotdb_transporter = iotdb_transport.make({});
/*
iotdb_transporter
    .updated({})
    .subscribe(...testers.log_value("iotdb_transporter.updated"));
 */

// our destination
const dweet_transport = require("../transporter")
const dweet_1_transporter = dweet_transport.make();

dweet_1_transporter.monitor(iotdb_transporter);
