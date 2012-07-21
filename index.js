var dust = require('dustjs-linkedin'),
    _ = require('underscore'),
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

    		// hack to by-pass dust's dependency hack
            browserify.require('/dust-helpers', {file: __dirname + '/helpers/dust-helpers.js', target: '/dust-helpers'});
            browserify.alias('./dust-helpers', '/dust-helpers');
            browserify.require('/server', {file: __dirname + '/helpers/server.js', target: '/server'});
            browserify.alias('./server', '/server');
            
            browserify.require('dust', {file: dustPath + 'dist/dust-' + opts.dust + '-' + dustVersion + '.js', target: 'dust'});
        }
	};
};