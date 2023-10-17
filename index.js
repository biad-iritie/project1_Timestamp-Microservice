// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", (req, res) => {
  input = req.params.date;

  let isValidateDate = Date.parse(input);
  let isValidUnix = /^[0-9]+$/.test(input);
  let empty = input == undefined || input == null || input == "";

  let unix_output = 0;
  let utc_output = "";
  if (isValidateDate) {
    unix_output = new Date(input);
    utc_output = unix_output.toUTCString();
    res.json({ unix: unix_output.valueOf(), utc: utc_output });
  } else if (isNaN(isValidateDate) && isValidUnix) {
    unix_output = new Date(parseInt(input));
    utc_output = unix_output.toUTCString();
    res.json({ unix: unix_output.valueOf(), utc: utc_output });
  } else if (empty) {
    unix_output = new Date();
    utc_output = unix_output.toUTCString();
    res.json({ unix: unix_output.valueOf(), utc: utc_output });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(8080, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
