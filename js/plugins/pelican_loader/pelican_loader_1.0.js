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
    var currentWidth = '';

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
            onEnterViewport: false,
            viewPortTolerance: 25,
            debounceTolerance: 250,
            loadSmallerImages: true,
            debug: false,
        }, options);        

       
        //Private Functions

        base.init = function(){
            //init debug 
            debug.init();

            //set current breakpoint            
            setBreakpoint();

            $(window).on('resize orientationchange', setBreakpoint);
            $( window ).scroll(function() {
              setScroll();              
            });
        }    

        //debug
        var debug = {
            init : function(){
                if(settings.debug){
                    console.log(base);
                }
            }
        }       

        //scroll
        var setScroll = debounce(function(){
            if(settings.onEnterViewport)
            {
                updateElements();
            }
        });

        //breakpoints
        var setBreakpoint = debounce(function() {
            //save currently set width for comparison
            var origWidth = currentWidth;
            //save currently set breakpoint for comparison
            var origBreakpoint = currentBreakpoint;
            //update the current width with the new clientWidth
            currentWidth = document.documentElement.clientWidth;
            //check if the browser is getting smaller
            var isSmaller = (currentWidth < origWidth);
            //set the new breakpoint
            $.each(settings.breakpoints, function(i,val){
                if(val.minWidth === undefined){
                    if(currentWidth <= val.maxWidth)
                    {
                        currentBreakpoint = val;
                    }                    
                }
                else if(val.maxWidth === undefined){
                    if(currentWidth >= val.minWidth)
                    {
                        currentBreakpoint = val;
                    }
                }
                else{
                    if(currentWidth >= val.minWidth && currentWidth <= val.maxWidth)
                    {
                        currentBreakpoint = val;
                    }
                }
            });

            
            //check if breakpoint has changed
            //if so, update elmenents
            //if loadSmaller set to false, do not update
            //if new breakpoint is smaller
            var canUpdate = (settings.loadSmallerImages || (!settings.loadSmallerImages && !isSmaller));
            if(origBreakpoint.key !== currentBreakpoint.key && canUpdate)
            {             
                updateElements();
            }

        }, settings.debounceTolerance);

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

        //image functions
        function updateImage($image){
            var canUpdate = (!settings.onEnterViewport ||(settings.onEnterViewport && isElementInViewport($image)));
            var imageSources = $image.data('image-sources');
            $.each(imageSources,function(i, val){                
                if(val[currentBreakpoint.key] !== undefined && canUpdate)
                {
                    $image.attr('src',val[currentBreakpoint.key])
                    if($image.attr('id') == 'thisOne')
                        {
                            console.log('--------------loaded-----------------');
                        }
                }
            });   
        }

        //video functions
        function updateVideo($video){
             
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

        //viewport
        function isElementInViewport(el) {
            if (typeof jQuery === "function" && el instanceof jQuery) {
                el = el[0];
            }
            var rect = el.getBoundingClientRect();
            var rectTop = rect.top - settings.viewPortTolerance;
            var rectLeft = rect.left - settings.viewPortTolerance;
            
            var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
            var windowWidth = (window.innerWidth || document.documentElement.clientWidth);
            
            var vertInView = (rectTop <= windowHeight) && ((rect.top + rect.height) >= 0);
            var horInView = (rectLeft <= windowWidth) && ((rect.left + rect.width) >= 0);

            return(vertInView && horInView);
        }
        

        base.init();       

        return this;
    };


 
}( jQuery ));




