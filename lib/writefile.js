var fs = require('fs');
var nfs = require('node-fs');
var path = require('path');
var log = require('./log');

//代码压缩
var html = require('html-minifier');
var css = new require('clean-css')({keepSpecialComments:0});
var js = require("uglify-js");

var htmlconfig = {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    minifyJS: true,
    minifyCSS: true
};

exports = module.exports = function(dist, buffer, type) {
    nfs.mkdir(path.dirname(dist), 0777, true, function(err) {
        if (err) log.error(err);
        else {

            switch (type) {
                case 'js':
                    buffer = js.minify(buffer, {
                        fromString: true
                    }).code;
                    break;
                case 'css':
                    buffer = css.minify(buffer);
                    break;
                case 'html':
                    buffer = html.minify(buffer, htmlconfig);
                    break;
                default:
                    break;
            }
            log.info("minify %s",dist);
            fs.writeFile(dist, buffer, 'utf8');
        }
    });
}
