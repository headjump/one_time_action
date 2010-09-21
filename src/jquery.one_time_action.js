/*!
 * one_time_action JavaScript plugin for jQuery
 * http://github.com/headjump/one-time-action
 *
 * Copyright 2010, Dennis Treder
 * This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details.
 */

(function() {
  $.fn.one_time_action = function( options ) {  
    var o = {
      reactivate : -1,
      add_class: ""
    };
    if ( options ) {
      $.extend( o, options );
    }

    return this.each(function() {
      var e = $(this);
      e.html("X" + e.html() + "X");
    });
  };
})(jQuery);