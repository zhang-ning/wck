#!/usr/bin/env node

var path = require('path');
var readfile = require('../lib/readfile');
var writefile = require('../lib/writefile.js');
var log = require('../lib/log');

var command = {};
var comindex = {};

//链接抽取
var regHTML = /<link\s+rel="import"\s+href="(.*)".*[\n\r]/ig;
var regCSS = /<link\s+rel="stylesheet"\s+href="(.*)".*[\n\r]/ig;
var regJS = /<script.*src="(.*)".*[\n\r]/ig;

command.help = function() {
    log.info([
        "How to use ?",
        "   wpt [target] -d [dest]",
        "",
        "Example:",
        "   wpt a.html b.html -d dist",
        ""
    ].join('\n'));
};

command.clean = function() {
    clean(dist);
}

command.build = function(args) {
    var files = Array.prototype.slice.call(args, 2);
    begin(files);
}

if (process.argv.length < 3) {
    command.help();
} else {
    command.build(process.argv);
}

/*
 * 工作过程：
 * 1 分析目标页面获取 组件地址
 * 2 遍历结果，将内部依赖扁平化
 * 3 将html合并成一个文件，将css合并成一个文件
 * 4 将目标页转换成最终结果页
 */

function begin(files) {
    for (var i = 0, len = files.length; i < len; i++) {
        var c = path.basename(files[i], '.html') + '/components.html';
        var s = path.basename(files[i], '.html') + '/components.css';
        var j = path.basename(files[i], '.html') + '/components.js';

        var component = 'build/' + c;
        var css = 'build/' + s;
        var js = 'build/' + j;
        var page = 'build/' + path.basename(files[i]);


        link = '<link rel="import" href="' + component + '"/>';


        var result = shinkWP(files[i],
            false,
            '<link rel="import" href="' + c + '"/>',
            '<link rel="stylesheet" href="' + s + '"/>',
            '<script src="' + j + '"></script>'
        ); //抽取页面中含有 web component;

        writefile(component, result.html, 'html');
        log.info("generated %s ", component);
        writefile(css, result.css, 'css');
        log.info("generated %s ", css);
        writefile(js, result.js, 'js');
        log.info("generated %s ", js);
        writefile(page, result.page, 'html');
        log.info("generated %s ", page);
    }
}

function shinkCSS(folder, buf) {
    var dist = [];
    var css = [];
    buf = buf.replace(regCSS, function() {
        css.push(arguments[1]);
        return '';
    });
    for (var i = 0, len = css.length; i < len; i++) {
        var str = readfile(path.join(folder, css[i]), 'utf8');
        dist.push(str);
    }
    return {
        css: dist.join(''),
        html: buf
    }
}

function shinkJS(folder, buf) {
    var dist = [];
    var js = [];
    buf = buf.replace(regJS, function() {
        js.push(arguments[1]);
        return '';
    });
    for (var i = 0, len = js.length; i < len; i++) {
        var str = readfile(path.join(folder, js[i]), 'utf8');
        dist.push(str);
    }
    return {
        js: dist.join(''),
        html: buf
    }
}

/*
 * shinkWP
 * @aim 目标文件 [String]
 * @description:
 *  获得目标文件中蕴含的web component 组件
 *  有两个应用场景：
 *      1 分析目标页面
 *      2 扁平化组件依赖
 */
function shinkWP(aim, ischild, link, csslink, jslink) {
    var dist = {
        js: [],
        css: [],
        html: []
    };

    link = link || '';
    csslink = csslink || '';
    jslink = jslink || '';

    var components = [];
    var buf = readfile(aim, 'utf8');
    var newlinkadded = false;

    var pc = shinkCSS(path.dirname(aim),buf);
    dist.css.push(pc.css);
    buf = pc.html;

    var pj = shinkJS(path.dirname(aim),buf);
    dist.js.push(pj.js);
    buf = pj.html;

    dist.page = buf.replace(regHTML, function() {
        //抽取component
        components.push(arguments[1]);
        if (ischild) {
            return '';
        }
        if (newlinkadded) {
            return '';
        } else {
            newlinkadded = true;
            return csslink + '\n' + jslink + '\n' + link;
        }
    });


    for (var i = 0, len = components.length; i < len; i++) {
        var f = path.join(path.dirname(aim), components[i]);
        if (comindex[f]) {
            continue;
        }
        comindex[f] = 1;
        var html = readfile(f, 'utf8');
        var tmp = shinkCSS(path.dirname(components[i]), html);
        var css = tmp.css;
        html = tmp.html;
        tmp = shinkJS(path.dirname(components[i]), html);
        var js = tmp.js
        html = tmp.html

        var hasSubComponent = regHTML.test(html);
        //递归解决web coponent中的依赖
        if (hasSubComponent) {
            var res = shinkWP(components[i], true);
            dist.html.push(res.html);
            dist.css.push(res.css);
            dist.js.push(res.js);
        } else {
            dist.html.push(html);
        }
        dist.css.push(css);
        dist.js.push(js);
    }
    dist.css = dist.css.join('\n');
    dist.js = dist.js.join('\n');
    dist.html = dist.html.join('\n');
    return dist;
}
