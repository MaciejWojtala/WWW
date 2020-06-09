"use strict";
exports.__esModule = true;
var http_1 = require("http");
function server() {
    var server = http_1.createServer(function (req, res) {
        res.write('Ale super!');
        res.end();
    });
    server.listen(8080);
}
server();
