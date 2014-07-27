var fs = require('fs');
var nfs = require('node-fs');
var path = require('path');
var log = require('./log');
var minify = require('html-minifier').minify;

exports = module.exports = function(dist, buffer, type) {
    nfs.mkdir(path.dirname(dist), 0777, true, function(err) {
        if (err) log.error(err);
        else {
            var config = {
                removeComments: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                removeOptionalTags: true,
                minifyJS: true,
                minifyCSS: true
            };

            switch (type) {
                case 'js':
                    break;
                default:
                    buffer = minify(buffer, config);
            }
            fs.writeFile(dist, buffer, 'utf8');
        }
    });
}
