/// Knockout View Mapping plugin v0.1
/// (c) 2013 43r89ijf - https://github.com/43r89ijf
/// License: MIT (http://www.opensource.org/licenses/mit-license.php)
(function (factory) {
    // Module systems magic dance.
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node: hard-coded dependency on "knockout"
        factory(require("knockout"), exports);
    } else if (typeof define === "function" && define["amd"]) {
        // AMD anonymous module with hard-coded dependency on "knockout"
        define(["knockout", "exports"], factory);
    } else {
        // <script> tag: use the global `ko` object, attaching a `mapping` property
        factory(ko, ko.viewMapping = {});
    }
}(function (ko, exports) {

    var bindRe = new RegExp(/ data-bind\s*=\s*\".*(text|value|checked)\s*\:\s*([^\"\,\s]+)\s*[\"\,]/g);
    var tpltRe = new RegExp(/ data-bind\s*=\s*\".*template\s*\:\s*\{\s*name\s*\:\s*\'([^\']+)\'/g);

    function viewToViewModel(obj, vm) {
        if (!obj) return vm;
        var strHtml = obj.innerHTML;
        var mchArray, bindType, bindName;
        while ((mchArray = bindRe.exec(strHtml)) != null) {
            bindType = mchArray[1];
            bindName = mchArray[2];
            if ("undefined" == typeof vm[bindName]) {
                if (bindType == "checked") {
                    vm[bindName] = ko.observable(false);
                } else {
                    vm[bindName] = ko.observable();
                }
            }
        }
        return vm;
    }

    exports.execute = function (id, vm, data) {
        if (!vm) vm = {};
        // Add property from DOM.
        var obj = (id) ? document.getElementById(id) : document.body;
        vm = viewToViewModel(obj, vm);
        // Add property from template.
        var strHtml = obj.innerHTML;
        var mchArray;
        while ((mchArray = tpltRe.exec(strHtml)) != null) {
            vm = viewToViewModel(document.getElementById(mchArray[1]), vm);
        }
        // Set data from JS object.
        vm = ko.mapping.fromJS(data, {}, vm);
        return vm;
    };

}));