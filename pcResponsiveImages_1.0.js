/*!
 * Pelican Responsive Media v1.0
 * Load responsive images
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
        base.$el = $(this).find(el);
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
                    console.log('-----------Base Object:');
                    console.log(base);
                    console.log('-----------Settings:');
                    console.log(settings);
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
            //save currently set breakpoint for comparison
            var origBreakpoint = currentBreakpoint;
            //save currently set width for comparison
            var origWidth = currentWidth;
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
                        return;
                    }                    
                }
                else if(val.maxWidth === undefined){
                    if(currentWidth >= val.minWidth)
                    {
                        currentBreakpoint = val;
                        return;
                    }
                }
                else{
                    if(currentWidth >= val.minWidth && currentWidth <= val.maxWidth)
                    {
                        currentBreakpoint = val;
                        return;
                    }
                }
            });
            
            var validLoadSmaller = (settings.loadSmallerImages || (!settings.loadSmallerImages && !isSmaller));
            //check if breakpoint has changed           
            if(origBreakpoint.key !== currentBreakpoint.key && validLoadSmaller)
            {        
                if(settings.debug)  
                {
                    console.log('-----------Breakpoint Change:');
                    console.log(currentBreakpoint.key);
                }   
                updateElements();
            }

        }, settings.debounceTolerance);

         //elements
        function updateElements()
        {
            base.$el.each(function(){
                var $currentElement = $(this);
                var validViewPort = (!settings.onEnterViewport || (settings.onEnterViewport && isElementInViewport($currentElement)));
                if(validViewPort){
                    updateElement($currentElement);
                }
                            
            });           
            
        }

        function updateElement($el){
            var imageSources = $el.data('image-sources');
            var imgAttr = '';
            var updated = false;
            if(imageSources !== undefined && imageSources.length > 0)
            {
                $.each(imageSources,function(i, val){ 
                    if(val[currentBreakpoint.key] !== undefined)
                    {
                        switch($el.tagName()){
                            case 'img':
                            //only update if source if different
                                if($el.attr('src') === undefined || ($el.attr('src').toLowerCase() !== val[currentBreakpoint.key].toLowerCase()))
                                {
                                    $el.attr('src',val[currentBreakpoint.key]);
                                    updated = true;
                                }                                
                                break;
                            case 'video':
                            //only update if source if different
                                if($el.attr('poster') === undefined || ($el.attr('poster').toLowerCase() !== val[currentBreakpoint.key].toLowerCase()))
                                {
                                    $el.attr('poster',val[currentBreakpoint.key]);
                                    updated = true;
                                }                                
                                break;
                            default:
                            //only update if source if different

                                if($el.attr('style') === undefined || $el.attr('style').toLowerCase().indexOf(val[currentBreakpoint.key].toLowerCase()) === -1 )
                                {
                                    $el.attr('style', "background-image: url('" + val[currentBreakpoint.key] + "');");
                                    updated = true;
                                } 
                                break; 
                        }                    
                    }
                });
                if(settings.debug && updated)  
                {
                    console.log('-----------Updated Image on Element:');
                    console.log($el);
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




