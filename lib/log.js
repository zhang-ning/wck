// 字符颜色
var chalk = require('chalk');

exports.info = function () {
    log.apply(chalk.blue,arguments);
}

exports.warn = function () {
    log.apply(chalk.yellow,arguments);
}

exports.error = function () {
    log.apply(chalk.red,arguments);
}

function log() {
    var args = [].slice.call(arguments,0);
    for (var i = 0, len = args.length; i < len; i++) {
       args[i] = this(args[i]);
    }
    console.info.apply(this,args);
}
