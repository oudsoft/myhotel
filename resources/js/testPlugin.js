(function($) {
    "use strict";

    $.fn.testPlugin = function(options) {

        // Settings
        var settings = $.extend({
            newText : "Yabadabado"
        }, options);

        return this.each(function(i, el) {            

            var init = function(callback) {
                if( $(el).attr("class") === "red" ) {
                    $(el).css("color","red");
                }

                $(el).text(settings.newText);

                if( callback && typeof(callback) === "function" ) {
                    callback();
                }
            };

            var underline = function() {
                $(el).addClass("underline");
            };

            init();
        });
 
		return {
				 underline: function() {
					$(this).addClass("underline");
				}
		}
 
    };

}(jQuery));