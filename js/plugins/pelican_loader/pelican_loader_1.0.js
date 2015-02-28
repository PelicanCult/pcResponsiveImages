/*!
 * Pelican Responsive Media v1.0
 * Load responsive images and videos
 */

 $.fn.tagName = function() {
  return this.prop('tagName').toLowerCase();
};



(function ( $ ) {
    "use strict";

    //Global Public Variables
    var currentBreakpoint = '';
    $.fn.pelican = function( el, options ) {
        //Global Private Variables
        var base = this; 
        base.$el = $(el);
        base.el = el; 
        base.$el.data('prm', base);
        
        //settings
        var settings = $.extend({}, {
            breakpoints: [
                {key: 'small', maxWidth: 768}, 
                {key: 'medium', minWidth: 769, maxWidth: 1024}, 
                {key: 'large', minWidth: 1025}
            ],
            debug: false,
            logging: []
        }, options);        

       
        //Private Functions

        base.init = function(){
            //init debug 
            debug.init();

            //init logging
            logging.init();

            //set current breakpoint            
            setBreakpoint();

            $(window).on('resize orientationchange', setBreakpoint);
        }       

        //elements
        function updateElements()
        {
            base.$el.each(function(){
                switch($(this).tagName()){
                    case 'img':
                        updateImage($(this));
                        break;
                    case 'video':
                        updateVideo($(this));
                        break;
                }
            });
        }

        //breakpoints
        var setBreakpoint = debounce(function() {
            var currentWidth = document.documentElement.clientWidth;

            $.each(settings.breakpoints, function(i,val){
                if(val.minWidth === undefined){
                    if(currentWidth <= val.maxWidth)
                    {
                        currentBreakpoint = val.key;
                    }
                }
                else if(val.maxWidth === undefined){
                    if(currentWidth >= val.minWidth)
                    {
                        currentBreakpoint = val.key;
                    }
                }
                else{
                    if(currentWidth >= val.minWidth && currentWidth <= val.maxWidth)
                    {
                        currentBreakpoint = val.key;
                    }
                }
            });
            
            updateElements();

            if(logging.all || logging.viewport)
            {
                logging.logViewPortValues();
            }
            if(logging.all || logging.breakpoints)
            {
                logging.logBreakPoints();
            }
        }, 250);

        //image functions
        function updateImage($image){
            if(logging.all || logging.video)
            {
                console.log('--IMG DETAILS');
                logging.logElementAttributes($image);
            }

            var imageSources = $image.data('image-sources');
            $.each(imageSources,function(i, o){
                $.each( o, function( key, value ) {
                  if(key.toLowerCase() === currentBreakpoint.toLowerCase())
                  {
                    $image.attr('src',value);
                  }
                });
            });           
            
 

        }

        //video functions
        function updateVideo($video){
            if(logging.all || logging.video)
            {                
                logging.logVideoDetails($video);
            }            
        }

        var debug = {
            init : function(){
                if(settings.debug){
                    settings.logging = ['all'];
                    console.log(base);
                }
            }
        }

        //debounce
        function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };

        var logging = {
            all: false,
            viewport : false,
            video : false,
            breakpoints: false,
            init : function()
            {        
                if(settings.logging.length > 0)
                {
                    logging.all = utility.inArrayCaseInsensitive('all', settings.logging);
                    logging.viewport = utility.inArrayCaseInsensitive('viewport', settings.logging);
                    logging.video = utility.inArrayCaseInsensitive('video', settings.logging);
                    logging.breakpoints = utility.inArrayCaseInsensitive('breakpoints', settings.logging);
                }            
                
            },
            //viewport
            logBreakPoints: function()
            {
                console.log('--BREAK POINTS'); 
                console.log('----current breakpoint: ' + currentBreakpoint);
                $.each(settings.breakpoints, function(i,val){
                    console.log('----key: ' + val.key + ', minWidth: ' + val.minWidth + ", maxWidth: " + val.maxWidth);
                });
              
            },
            //viewport
            logViewPortValues: function()
            {
                console.log('--VIEWPORT DETAILS');  
                console.log('----' + document.documentElement.clientWidth + 'x' + document.documentElement.clientHeight);
            },
            //video
            logVideoDetails: function($video)
            {    
                console.log('--VIDEO DETAILS'); 
                console.log('----attributes');
                logging.logElementAttributes($video);
                console.log('----sources');
                $video.find('source').each(function(){
                    console.log('------source');
                    console.log(logging.logElementAttributes($(this)));
                })
            },
            logElementAttributes: function($el)
            {
                $.each($el.get(0).attributes, function(i, attrib){
                    console.log(attrib.name + " : " + attrib.value);        
                });
            }
        }

        var utility = {
            guidGenerator: function()
            {
                var S4 = function() {
                    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
                };
                return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
            },
            inArrayCaseInsensitive: function(needle, haystackArray){
                //Iterates over an array of items to return the index of the first item that matches the provided val ('needle') in a case-insensitive way.  Returns -1 if no match found.
                var defaultResult = -1;
                var result = defaultResult;
                $.each(haystackArray, function(index, value) { 
                    if (result == defaultResult && value.toLowerCase() == needle.toLowerCase()) {
                        result = index;
                    }
                });
                return result > -1 ? true : false;
            },
            isElementInViewport : function(el) {
                var rect = el.getBoundingClientRect();
                return rect.bottom > 0 &&
                    rect.right > 0 &&
                    rect.left < (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */ &&
                    rect.top < (window.innerHeight || document.documentElement.clientHeight) /*or $(window).height() */;
            }
        }

        base.init();       

        return this;
    };


 
}( jQuery ));




