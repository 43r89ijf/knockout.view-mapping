/// Knockout View Mapping plugin v0.1
/// (c) 2013 43r89ijf - https://github.com/43r89ijf
/// License: MIT (http://www.opensource.org/licenses/mit-license.php)
(function(d){"function"===typeof require&&"object"===typeof exports&&"object"===typeof module?d(require("knockout"),exports):"function"===typeof define&&define.amd?define(["knockout","exports"],d):d(ko,ko.viewMapping={})})(function(d,g){function e(b,a){if(!b)return a;for(var f=b.innerHTML,c,e;null!=(c=h.exec(f));)e=c[1],c=c[2],"undefined"==typeof a[c]&&(a[c]="checked"==e?d.observable(!1):d.observable());return a}var h=RegExp(/ data-bind\s*=\s*\".*(text|value|checked)\s*\:\s*([^\"\,\s]+)\s*[\"\,]/g),
k=RegExp(/ data-bind\s*=\s*\".*template\s*\:\s*\{\s*name\s*\:\s*\'([^\']+)\'/g);g.execute=function(b,a,f){a||(a={});b=b?document.getElementById(b):document.body;a=e(b,a);b=b.innerHTML;for(var c;null!=(c=k.exec(b));)a=e(document.getElementById(c[1]),a);return a=d.mapping.fromJS(f,{},a)}});
