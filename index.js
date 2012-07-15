var dust = require('dustjs-linkedin');
var _ = require('underscore');

module.exports = function (opts) {
  _.defaults(opts, {
    'dust': 'none' // options to require 'dust' engine in the result bundle, could be 'none', 'core' or 'full'
  });
  
  return function (browserify) {
    browserify.register('.dust', function (body) {
      return dust.compile(body);
    });
    
    var dustPath = __dirname + '/node_modules/dustjs-linkedin/';
    var dustPackageJSON = require(dustPath + 'package.json'); 
    if (opts.dust !== 'none') {
      browserify.require(__dirname + '/node_modules/dustjs-linkedin/dist/dust-' + opts.dust + '-' + dustPackageJSON.version + '.js');
    }
  };
};