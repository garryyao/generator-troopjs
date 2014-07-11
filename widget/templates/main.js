/*
 * This file defines a Troop UI Widget
 */
define(['troopjs-dom/component/widget'], function(Widget) {
  'use strict';
  return Widget.extend({
    'sig/start': function initialize() {
      return this.html('<h1>widget by TroopJS generator</h1>');
    },
    'hub/foo/bar': function(data) {},
    'dom/click': function(evt) {}
  });
});