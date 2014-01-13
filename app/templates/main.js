/* This is the RequireJS config file bootstraps TroopJS app. */

"use strict";

require.config({
	baseUrl: ".",
	packages: [
		{
			name: "when",
			location: "bower_components/when",
			main: "when.js"
		},
		{
			name: "jquery",
			location: "bower_components/jquery",
			main: "jquery.js"
		},
		{
			name: "poly",
			location: "bower_components/poly",
			main: "poly.js"
		},
		{
			name: "troopjs",
			location: "bower_components/troopjs",
			main: "maxi.js"
		},
		{
			name: "troopjs-core",
			location: "bower_components/troopjs-core",
			main: "maxi.js"
		},
		{
			name: "troopjs-browser",
			location: "bower_components/troopjs-browser"
		},
		{
			name: "troopjs-data",
			location: "bower_components/troopjs-data"
		},
		{
			name: "troopjs-jquery",
			location: "bower_components/troopjs-jquery"
		},
		{
			name: "troopjs-utils",
			location: "bower_components/troopjs-utils"
		},
		{
			name: "troopjs-requirejs",
			location: "bower_components/troopjs-requirejs"
		},
		{
			name: "<%= APP_NAME_DASHED %>",
			location: "."
		}
	],
	map: {
		"*": {
			mv: "troopjs-requirejs/multiversion",
			template: "troopjs-requirejs/template",
			logger: "troopjs-core/logger/console"
		}
	},
	config: {
		"troopjs-data/query/service": {
			type: "post"
		},
		"troopjs-browser/loom/config": {
			weave: "data-weave-2",
			woven: "data-woven-2",
			unweave: "data-unweave-2"
		}
	},
	callback: function loadDeps() {
		require(
			[
				"jquery",
				"troopjs-browser/application/widget",
				"troopjs-data/ajax/service",
				"troopjs-data/query/service",
				"troopjs-data/cache/component",
				"troopjs-data/cache/service",
				"troopjs-browser/mvc/route/widget",
			], function Bootstrap(jQuery, Application, AjaxService, QueryService, Cache, GC, Route) {
				jQuery(function ready($) {
					var cache = Cache();
					GC(cache).start();
					var ajax = AjaxService();
					var query = QueryService(cache);

					var $WINDOW = $(window);
					var $HTML = $("html");

					Application($HTML, "bootstrap", ajax, query, Route($WINDOW, "route")).start();
				});
			});
	}
});
