# iotdb-transport-dweet
[IOTDB](https://github.com/dpjanes/node-iotdb) 
[Transporter](https://github.com/dpjanes/node-iotdb/blob/master/docs/transporters.md)
for
[Dweet.io](https://dweet.io/)

<img src="https://raw.githubusercontent.com/dpjanes/iotdb-homestar/master/docs/HomeStar.png" align="right" />

# About

This a very simple Transporter that will send all your Thing data to Dweet.io.
It only sends data, it has no way if getting data from Dweet.

* [Read more about Transporters](https://github.com/dpjanes/node-iotdb/blob/master/docs/transporters.md)

# Use

This example is in the `samples` folder. 
This will upload earthquakes live to Dweet.io.
You can use [Freeboard](https://freeboard.io/) to visualize the data
live.

    const iotdb = require("iotdb");
    iotdb.use("homestar-feed");
    iotdb.connect("USGSEarthquake");

    // our source - this automatically picks up everything in IOTDB
    const iotdb_transport = require("iotdb-transport-iotdb");
    const iotdb_transporter = iotdb_transport.make({});

    // our destination
    const dweet_transport = require("../transporter")
    const dweet_transporter = dweet_transport.make();

    // connect
    dweet_transporter.monitor(iotdb_transporter);
