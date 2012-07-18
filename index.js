var dust = require('dustjs-linkedin'),
    _ = require('underscore'),
    fs = require('fs'),
    path = require('path');

module.exports = function (opts) {
    opts || (opts = {});
    _.defaults(opts, {
        'dust': 'core' // whether (and which version) to include the dust engine
    });

	return function (browserify) {
		browserify.register('.dust', function (body, file) {
            var name =  Math.floor(Math.random() * Math.pow(2,32)).toString(16);
			return 'var dust = require("dust"); ' + dust.compile(body, name) + ';module.exports = function(c, cb){dust.render("' + name + '", c, cb)}';
		});

        if (opts.dust != 'none') {
            var dustPath = __dirname + '/node_modules/dustjs-linkedin/';
            var dustVersion = require(dustPath + 'package.json').version;
            // we want to use the right dist file
            var dustEngine = fs.readFileSync(dustPath + 'dist/dust-' + opts.dust + '-' + dustVersion + '.js', 'utf-8');
    		// hack to by-pass dust's dependency hack
            browserify.require('./dust-helpers', {body: 'module.exports = function(){};', target: 'dust-helpers'});
            browserify.require('./server', {body: 'module.exports = function(){};', target: 'server'});
            
            browserify.require('dust', {body: dustEngine, target: 'dust'});
        }
	};
};