/*
 * This file defines a Troop UI Widget which is woven into DOM.
 *
 */
define([
	"troopjs-browser/component/widget",
	"template!./main.html"
], function (Widget, tHtml) {
	"use strict";

	return Widget.extend({
		// Handles the widget1 starting.
		'sig/start': function initialize() {
			return this.html(tHtml);
		},

		// Hub subscriber.
		"hub/foo/bar": function (data) {
		},

		// Dom event handler.
		"dom/.foo/click": function (evt) {
		}
	});
});
