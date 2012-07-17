var $ = require('jquery');
var template = require('./views/content.dust')

$(document).ready(function () {
	template({}, function (err, out) {
		$('body').html(out);
	});
});