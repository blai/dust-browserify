var dust = require('dustjs-linkedin');

exports = module.exports = function (opts) {
  return function (browserify) {
    browserify.register('.dust', function (body) {
      return dust.compile(body);
    });
  };
}