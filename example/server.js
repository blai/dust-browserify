var express = require('express');
var app = express.createServer();
var util = require('util');

app.get('/', function (req, res) {
    res.render('views/index.dust');
});

var browserify = require('browserify');
var dustify = require('../index.js');

util.print('Generating bundle... ');
var bundle = browserify().use(dustify());
bundle.addEntry(__dirname + '/entry.js');
app.use(bundle);
console.log('done');

app.listen(3000);
console.log('Listening on 3000');