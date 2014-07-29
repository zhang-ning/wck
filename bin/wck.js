#!/usr/bin/env node

var log = require('../lib/log');
var run = require('../lib/shrink.js');
command = {};

command.help = function() {
    log.info([
        "How to use ?",
        "   wpt [target] -d [dest] --nomin",
        "",
        "Example:",
        "   wpt a.html b.html -d build",
        ""
    ].join('\n'));
};

command.clean = function() {
    clean(dist);
}

command.build = function(args) {
    var arg = Array.prototype.slice.call(args,2);
    var argstr = Array.prototype.join.call(arg, " ");
    var minify = 'y';
    var dist = 'build';
    argstr = argstr.replace(/-d\s*(\S*)/, function() {
        dist = arguments[1] || dist;
        return '';
    });
    argstr = argstr.replace(/-minify\s*(\S*)/, function() {
        minify = arguments[1] || minify;
        return '';
    });
    var files = argstr.trim().split(' ');
    run(files, {
        dist: dist,
        minify: minify === 'y' ? true : false
    });
}

if (process.argv.length < 3) {
    command.help();
} else {
    command.build(process.argv);
}
