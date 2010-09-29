/*!
 * one_time_action JavaScript plugin for jQuery
 * http://github.com/headjump/one_time_action
 *
 * Makes submits, buttons and links work only once - and can reactivate them after a given time or by calling a function.
 *
 * Copyright 2010, Dennis Treder (info@dennistreder.de | http://headjump.de)
 * This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details.
 */
/*global setTimeout, clearTimeout, jQuery */

(function($) {
  /**
   * Prevents default
   * @param evt
   */
  var kill_event = function(evt) {
    evt.preventDefault();
  };

  /**
   * Disables element, checks if submit || link
   * @param e element to disable. Shall be clone of one_time_action element
   */
  var kill_action = function(e) {
    if(e.is("a")) {
      e.attr("href", "javascript:void(0);");
      e.click(kill_event);
    } else if(e.is("input[type=submit],input[type=button]")) {
      e.attr("disabled", true);
      e.click(kill_event);
    }
    e.attr({
      onmousedown: "",
      onmouseup: "",
      onclick: ""
    });
  };

  var reactivate = function(e) {
    var timeout_id = $(e).data("one_time_action_timeout");
    if(timeout_id) {
      clearTimeout(timeout_id);
      $(e).data("one_time_action_timeout", null);
    }
    var clone = e.data("one_time_action_clone");
    if(clone) {
      e.show();
      clone.hide();
    }
  };

  $.fn.one_time_action = function( options ) {  
    var o = {
      reactivate: -1,
      add_class: ""
    };
    if ( options && options !== "reactivate") {
      $.extend( o, options );
    }

    return this.each(function() {
      var e = $(this);

      if(options === "reactivate") {
        reactivate(e);
        return;
      }

      e.click(function(evt) {
        var c = e.data("one_time_action_clone");
        if(!c) {
          c = e.clone(false);
          if(o.add_class !== "") {
            c.addClass(o.add_class);
          }
          kill_action(c);
          e.data("one_time_action_clone", c);
          e.after(c);
        }

        e.hide();
        c.show();

        if(o.reactivate !== -1) {
          e.data("one_time_action_timeout", setTimeout(function() {
            reactivate(e);
          }, o.reactivate));
        }
      });
    });
  };
})(jQuery);