define([
	"troopjs-browser/mvc/controller/widget",
	"troopjs-core/net/uri",
], function LoadModule(Controller, URI) {

	return Controller.extend({
		"displayName": "application/controller",

		"uri2data": function (uri) {
			// convert the uri to a route hash.
			return {};
		},

		"on/request": function (requests) {
			return {};
		},

		// Handle data loading on URI updates.
		"on/updates": function onUpdates(updates) {
		},
		// Handle data loading on URI updates.
		"on/results": function onResults(results) {
		},

		"data2uri": function (results) {
			var uri = URI();
			// Convert data back to URI.
			uri.path = URI.Path([]);
			return uri;
		},

		"hash": function (obj) {
			return JSON.stringify(obj);
		}
	});
});
