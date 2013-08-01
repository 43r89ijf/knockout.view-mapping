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

    var bindTextRe = new RegExp(/\s+data-bind\s*=\s*\"([^\"]+)\s*\"/g);
    var bindPropRe = new RegExp(/(text|value|checked|options|selectedOptions)\s*\:\s*([\w\$]+)/);
    var tpltRe = new RegExp(/\s+data-bind\s*=\s*\".*template\s*\:\s*\{\s*name\s*\:\s*\'([^\']+)\'/g);
    var fmtRe = new RegExp(/([\r\n]|<!--[\s\S]*?-->)/g);

    function viewToViewModel(obj, vm) {
        if (!obj) return vm;
        var strHtml = obj.innerHTML.replace(fmtRe, ' ');
        var mchText, bindText, mchProp, bintProps, bindType, bindName;
        while ((mchText = bindTextRe.exec(strHtml)) != null) {
            bindText = mchText[1];
            bintProps = bindText.split(",");
            ko.utils.arrayForEach(bintProps, function(prop) {
                mchProp = bindPropRe.exec(prop);
                if (mchProp) {
                    bindType = mchProp[1];
                    bindName = mchProp[2];
                    if ("undefined" == typeof vm[bindName]) {
                        if (bindType == "text" || bindType == "value") {
                            vm[bindName] = ko.observable("");
                        } else if (bindType == "checked") {
                            vm[bindName] = ko.observable(false);
                        } else if (bindType == "options") {
                            vm[bindName] = [];
                        } else if (bindType == "selectedOptions") {
                            vm[bindName] = ko.observable([]);
                        }
                    }
                }
            });
        }
        return vm;
    }

    exports.execute = function (id, vm, data) {
        if (!vm) vm = {};
        // Add property from DOM.
        var obj;
        if (id) {
            obj = document.getElementById(id);
            if (!obj) throw new Error("DOM element (id='" + id + "') is undefined.");
        } else {
           throw new Error("DOM element id is empty.");
        }
        vm = viewToViewModel(obj, vm);
        // Add property from template.
        var strHtml = obj.innerHTML.replace(fmtRe, ' ');
        var mchArray, tpltObj;
        while ((mchArray = tpltRe.exec(strHtml)) != null) {
            tpltObj = document.getElementById(mchArray[1]);
            if (!tpltObj) throw new Error("Template (id='" + mchArray[1] + "') is undefined.");
            vm = viewToViewModel(tpltObj, vm);
        }
        // Set data from JS object.
        vm = ko.mapping.fromJS(data, {}, vm);
        return vm;
    };

}));
