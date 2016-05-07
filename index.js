var express = require("express");
var config = require("./config.json");
var app = express();
var bodyParser = require('body-parser');

var VERSION = "0.1.0";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();
var indigo = require("./indigo/main.js");

indigo.initialize(require(config.corpus).data);

router.get('/', function(req, res) {
    res.json({version: VERSION});
});

router.get('/ask/:query', function(req, res) {
    var q = req.params.query;
    res.json({res: indigo.getResponse(q)});
});

app.use('/api', router);

app.listen(config.port);
console.log('Shit is about to go down on port ' + config.port);
