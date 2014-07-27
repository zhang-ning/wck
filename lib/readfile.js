var fs = require('fs');
var log = require('./log');

exports = module.exports = readFileSync;

function readFileSync(target, charset) {
    var str = '';
    try {
        str = fs.readFileSync(target, charset);
    } catch (e) {
        /* handle error */
        log.error(e);
    }
    return str;
}
