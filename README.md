Knockout View Mapping plugin
=============

View mapping plugin for [Knockout](http://knockoutjs.com/).   
This plugin add property to view model from view (HTML DOM Elements).   
It is not supported when nested by the "foreach".   

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
	</div>

JavaScript

	var ViewModel = function() {
	    this.Address1 = ko.observable("Earth");
	    /* No longer needed
	    this.Address2 = ko.observable();
	    this.Address3 = ko.observable();
	    this.Address4 = ko.observable();
	    this.Address5 = ko.observable();
	    */
	};

	var initData = { "Address2":"Moon", "Address3":"Mars" };

	$(function () { // if not jQuery "window.onload = function() { ... }"
        var vm = new ViewModel();
        vm = ko.viewMapping.execute("contents", vm, initData);
        // vm = ko.viewMapping.execute("contents", vm); // This is OK.
        // vm = ko.viewMapping.execute("contents"); // This is OK.
        // vm = ko.viewMapping.execute(); // This is OK.
        ko.applyBindings(vm);
	});

[JSFiddle Example](http://jsfiddle.net/Huhvk/2/)

## License

MIT license - [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)