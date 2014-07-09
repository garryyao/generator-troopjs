/*
 * This file defines a Troop UI Widget
 */
define([
  "troopjs-dom/component/widget"
], function (Widget) {
  "use strict";

  return Widget.extend({
    // Handles widget starting
    'sig/start': function initialize() {
      return this.html('<h1>widget by TroopJS generator</h1>');
    },
    // Hub subscriber.
    "hub/foo/bar": function (data) {
    },
    // Dom event handler.
    "dom/click": function (evt) {
    }
  });
});
