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
			name: "troopjs-composer",
			location: "bower_components/troopjs-composer"
		},
		{
			name: "troopjs-core",
			location: "bower_components/troopjs-core"
		},
		{
			name: "troopjs-browser",
			location: "bower_components/troopjs-browser"
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
	deps: [
		"when/monitor/console"
	],
	map: {
		"*": {
			logger: "troopjs-core/logger/console"
		}
	},
	config: {
		"troopjs-browser/loom/config": {
			weave: "data-weave-2",
			woven: "data-woven-2",
			unweave: "data-unweave-2"
		}
	},
	callback: function loadDeps() {
		require([
			"jquery",
			"troopjs-browser/application/widget",
			"<%= APP_NAME_DASHED %>/widget/controller"
		], function Bootstrap(jQuery, Application, AppController) {
			jQuery(function ready($) {
				Application($("html"), "bootstrap", AppController($(window))).start();
			});
		});
	}
});
