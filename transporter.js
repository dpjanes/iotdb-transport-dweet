/*
 *  transporter.js
 *
 *  David Janes
 *  IOTDB.org
 *  2016-10-01
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

const iotdb = require('iotdb');
const _ = iotdb._;

const iotdb_transport = require('iotdb-transport');
const errors = require('iotdb-errors');

const unirest = require("unirest");

const logger = iotdb.logger({
    name: 'iotdb-transport-dweet',
    module: 'transporter',
});

const make = (initd) => {
    const self = iotdb_transport.make();
    self.name = "iotdb-transport-dweet";

    const _initd = _.d.compose.shallow(initd, {
        bands: [ "istate" ],
    });
    const _queue = _.queue("dweet.io");

    self.rx.list = (observer, d) => {
        observer.onCompleted();
    };

    self.rx.added = (observer, d) => {
        observer.onCompleted();
    };

    self.rx.put = (observer, d) => {
        if (_initd.bands && (_initd.bands.indexOf(d.band) === -1)) {
            return observer.onCompleted();
        }

        _queue.add({
            run: (queue, qitem) => {
                const dweet_key = `${ d.id }@${ d.band }`;
                const dweet_uri = "https://dweet.io/dweet/for/" + dweet_key;

                unirest
                    .post(dweet_uri)
                    .json()
                    .send(d.value)
                    .end(result => {
                        if (result.error) {
                            logger.info({
                                key: dweet_key,
                                error: _.error.message(result.error),
                                id: d.id,
                                band: d.band,
                                value: d.value,
                            }, "error sending dweet");

                            observer.onError(result.error);

                            setTimeout(() => queue.finished(qitem), 1100);
                            return;
                        }

                        console.log(result.body);

                        logger.info({
                            key: dweet_key,
                        }, "sent dweet");

                        observer.onNext(d);
                        observer.onCompleted();

                        setTimeout(() => queue.finished(qitem), 1100);
                    });
            }
        });
    };
    
    self.rx.get = (observer, d) => {
        observer.onError(new errors.NotFound());
    };

    self.rx.remove = (observer, d) => {
        observer.onError(new errors.NotImplemented());
    };
    
    self.rx.bands = (observer, d) => {
        observer.onError(new errors.NotFound());
    };

    self.rx.updated = (observer, d) => {
        observer.onCompleted();
    };

    return self;
};

/**
 *  API
 */
exports.make = make;
