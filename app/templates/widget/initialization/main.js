/*
 * This file defines a Troop UI Widget which is woven into DOM.
 *
 */
define([
	"troopjs-browser/component/widget"
], function (Widget, tHtml) {
	"use strict";

	// Handles the widget instantiation.
	return Widget.extend({
		// Handles the widget starting.
		'sig/start': function initialize() {
			return this.html("Hello TroopJS!");
		}
	});
});
