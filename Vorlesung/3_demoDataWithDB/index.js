var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json())
app.use(require("method-override")(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));


app.use(require('./routes/orderRoutes.js'));
app.use(express.static(__dirname + '/public'))


http.createServer(app).listen(3000);

