const iotdb = require("iotdb");
const _ = iotdb._;

const dweetClient = require("node-dweetio");
const dweetio = new dweetClient();


var _encode = function (s) {
    return s.replace(/[\/$%#.\]\[]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
};

const key = _encode("urn:iotdb:t:sArvozfc:VROb30df/istate");

dweetio.dweet_for(key, {
    "@timestamp": _.timestamp.make(),
    "iot:attribute": [
        {
            "@id": "X",
        },
        {
            "@id": "Y",
        },
    ]

}, function(error, dweet){

    if (error) {
        console.log("#", _.error.message(error));
        return;
    }
 
    console.log("+ sent");
    console.log(dweet.thing); // "my-thing" 
    console.log(dweet.content); // The content of the dweet 
    console.log(dweet.created); // The create date of the dweet 
 
});

dweetio.get_all_dweets_for(key, function(err, dweets){
    dweets.forEach(dweet => {
        console.log("+ got");
        console.log(dweet.thing); // "my-thing" 
        console.log(dweet.content); // The content of the dweet 
        console.log(dweet.created); // The create date of the dweet 
    });
});
