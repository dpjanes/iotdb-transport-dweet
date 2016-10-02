const iotdb = require("iotdb");
const _ = iotdb._;

const unirest = require("unirest");

var _encode = function (s) {
    return s.replace(/[\/$%#.\]\[]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
};

// const key = _encode("urn:iotdb:t:sArvozfc:VROb30df/istate");
const key = "urn:iotdb:t:sArvozfc:bZyup_2c@istate";
const payload_deep = {
    "@timestamp": _.timestamp.make(),
    "iot:attribute": [
        {
            "@id": "X",
        },
        {
            "@id": "Y",
        },
    ],
    value: null,

}
const payload_earthquake = {
    "fresh": false,
    "timestamp": "2016-10-02T10:14:32.905Z",
    "name": "M 0.6 - 6km WSW of Idyllwild, CA",
    "magnitude": 0.6,
    "address": "Idyllwild, CA",
    "latitude": 33.7105,
    "longitude": -116.773,
    "elevation": -13990,
    "@timestamp": _.timestamp.make(),
}

const uri = "https://dweet.io/dweet/for/" + key;

unirest
    .post(uri)
    .json()
    .send(payload_earthquake)
    .end(result => {
        if (result.error) {
            console.log("ERROR");
            console.log(result.error);
            return;
        }

        console.log(result.body);
    });

