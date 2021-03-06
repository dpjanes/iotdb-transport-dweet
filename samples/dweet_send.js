const iotdb = require("iotdb");
const _ = iotdb._;

const dweetClient = require("node-dweetio");
const dweetio = new dweetClient();


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


dweetio.dweet_for(key, payload_earthquake, function(error, dweet){

    if (error) {
        console.log("#", _.error.message(error));
        return;
    }
 
    console.log("+ sent");
    console.log(dweet.thing); // "my-thing" 
    console.log(dweet.content); // The content of the dweet 
    console.log(dweet.created); // The create date of the dweet 
 
});

/*
dweetio.get_all_dweets_for(key, function(err, dweets){
    dweets.forEach(dweet => {
        console.log("+ got");
        console.log(dweet.thing); // "my-thing" 
        console.log(dweet.content); // The content of the dweet 
        console.log(dweet.created); // The create date of the dweet 
    });
});
*/
