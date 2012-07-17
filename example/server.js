var express = require('express'),
	cons = require('consolidate'),
	app = express();

app.engine('dust', cons.dust);

app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
    res.render('index');
});

var browserify = require('browserify');
var dustify = require('../index.js');

console.info('Generating bundle... ');
var bundle = browserify({
		mount: '/javascripts/main.js',
		require: {
			'jquery': 'jquery-browserify'
		}
	})
	.use(dustify())
	.addEntry(__dirname + '/entry.js');
app.use(bundle);
console.info('done');

app.listen(3000);
console.info('Listening on 3000');