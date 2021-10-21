const express = require("express");
const app = express();
const bodyParser = require("body-parser")

app.use(bodyParser.text({ type: "*/*" }));

app.use("/ui", express.static(__dirname + "/ui"));
app.use("/images", express.static(__dirname + "/ui/images"));
app.use("/javascript", express.static(__dirname + "/javascript"));

console.log("Current directory is " + __dirname);
var server = app.listen(5555);
console.log("Web server has started succesfully")
