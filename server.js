var express = require("express");
var http = require("http");
var app = express();

// pinging
app.use(express.static("public"));
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendStatus(200);
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
