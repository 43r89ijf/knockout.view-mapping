Knockout View Mapping plugin
=============

View mapping plugin for [Knockout](http://knockoutjs.com/).   
This plugin add property to view model from view (HTML DOM Elements).   
It is not supported when nested by "foreach" or "with".   

## Dependencies

 * [Knockout](http://knockoutjs.com/)   
 * [knockout.mapping](http://knockoutjs.com/documentation/plugins-mapping.html)   
 * (if IE7 or earlier)  [json2](https://github.com/douglascrockford/JSON-js/)    

## Example

html

	<div id="contents">
	    <p>Address1: <span data-bind="text: Address1"></span></p>
	    <p>Address2: <span data-bind="text: Address2"></span></p>
	    <p>Address3: <span data-bind="text: Address3"></span></p>
	    <p>Address4: <span data-bind="text: Address4"></span></p>
	    <p>Address5: <span data-bind="text: Address5"></span></p>
	    <p>stringValue: <input data-bind="value: stringValue" /></p>
	    <p>booleanValue: <input type="checkbox" data-bind="checked: booleanValue" /></p>
	    <div data-bind="template: { name: 'template1'}"></div>
	</div>

	<script type="text/html" id="template1">
	    <p>selectedOptionValue: 
	        <select data-bind="options: optionValues, value: selectedOptionValue"></select>
	    </p>
	    <p>multipleSelectedOptionValues: 
	       <select multiple="multiple" data-bind="options: optionValues, 
	        selectedOptions: multipleSelectedOptionValues"></select>
	    </p>
	</script>

JavaScript

	// View Model
	var ViewModel = function() {
	    this.Address1 = ko.observable("Earth");
	    /* No longer needed
	    this.Address2 = ko.observable();
	    this.Address3 = ko.observable("Mars");
	    this.Address4 = ko.observable();
	    this.Address5 = ko.observable();
	    this.stringValue = ko.observable("Hello!");
	    this.booleanValue = ko.observable(true);
	    this.optionValues = ["Alpha", "Beta", "Gamma"];
	    this.selectedOptionValue = ko.observable("Beta");
	    this.multipleSelectedOptionValues = ko.observable(["Beta", "Gamma"]);
	    */
	};

	// Default values (It is not necessary to configure all settings.)
	var initData = { "Address3":"Mars", 
	                "stringValue":"Hello!", "booleanValue":true,
	                "optionValues":["Alpha", "Beta", "Gamma"], "selectedOptionValue":"Beta",
	                "multipleSelectedOptionValues":["Beta", "Gamma"] };

	$(function () { // if not jQuery "window.onload = function() { ... }"
	    var vm = new ViewModel();
	    vm = ko.viewMapping.execute("contents", vm, initData);
	    // vm = ko.viewMapping.execute("contents", vm); // This is OK.
	    // vm = ko.viewMapping.execute("contents"); // This is OK.
	    // vm = ko.viewMapping.execute(); // This is NG.
	    ko.applyBindings(vm);
	});

[JSFiddle Example](http://jsfiddle.net/Huhvk/5/)

## License

MIT license - [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)