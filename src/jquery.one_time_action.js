/*!
 * one_time_action JavaScript plugin for jQuery
 * http://github.com/headjump/one_time_action
 *
 * Makes submits and links work only once - and can reactivate them after a given time if you want.
 *
 * Copyright 2010, Dennis Treder (info@dennistreder.de | http://headjump.de)
 * This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details.
 */
/*global setTimeout, jQuery */

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
      e.attr("href", "#");
      e.click(kill_event);
    } else if(e.is("input[type=submit]")) {
      e.attr("disabled", true);
      e.click(kill_event);
    } else if(e.is("input[type=button]")) {
      e.click(kill_event);
    }
    e.attr({
      onmousedown: "",
      onmouseup: "",
      onclick: ""
    });
  };

  $.fn.one_time_action = function( options ) {  
    var o = {
      reactivate: -1,
      add_class: ""
    };
    if ( options ) {
      $.extend( o, options );
    }

    return this.each(function() {
      var e = $(this);
      
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
          setTimeout(function() {
            e.show();
            e.data("one_time_action_clone").hide();
          }, o.reactivate);
        }
      });
    });
  };
})(jQuery);