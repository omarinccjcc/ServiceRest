/**
 * urlToLink plugin
 *
 * Transforms URLs in text into HTML <a> elements.
 *
 * Example: Lorem ipsum dolor sit amet consecter adpsim elit http://loremipsum.com
 * Result:  Lorem ipsum dolor sit amet consecter adpsim elit <a href="http://loremipsum.com">http://loremipsum.com</a>
 *
 * HOW TO USE
 * 
 * Assuming that you have already inserted jquery.js and jquery.urlToLink.js in your code 
 * and that $ is your jQuery object reference.
 *
 * Simple usage:
 * $('p').urlToLink();
 *
 * Changing the parameters: 
 * $('p').urlToLink({target:'_blank'});
 * 
 * You can change the default parameters by calling 
 * $.fn.urlToLink.defaults anywhere in your script.
 *
 * LICENSE
 *
 * This plugin was inspired by Hugo Dias's snippet at
 * http://goo.gl/pptTi
 *
 * Copyright (c) 2011 Gabriel Izaias (gabrielizaias.com)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
(function($){
    $.fn.urlToLink = function(options) {
        var options = $.extend({}, $.fn.urlToLink.defaults, options); 
        return this.each(function(){
            $(this).html( $(this).html().replace(/\s(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, " <a href='$1' target='"+options.target+"'>$1</a>") );
        });
    }
    /**
     * Default configuration
     */
    $.fn.urlToLink.defaults = {
        target : '_self'        // Link target
    }
})(jQuery)