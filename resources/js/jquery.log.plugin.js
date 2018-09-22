(function($) {
    $.log =
    {
        log: function(message) {
            //if('console' in window && 'log' in window.console)
            if (typeof window.console != 'undefined' && typeof window.console.log != 'undefined') {
                console.log(message);
            }
            else {
                // do nothing
                alert('console is not supported: ' + message);
            }
        },
        info : function(message) {
            // todo
        }
    }
})(jQuery);