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

    $.fn.pelican = function( el, options ) {
        //Global Private Variables
        var base = this; 
        base.$el = $(el);
        base.el = el; 
        base.$el.data('prm', base);

        //settings
        var settings = $.extend({}, {
            debug: false,
            logging: []
        }, options);

        var viewport = {
            layoutWidth  : 0,
            layoutHeight : 0,
            visualWidth  : 0,
            visualHeight : 0
        }

        //Public Functions
        base.pubicThing = function()
        {
            console.log('yep');
        }

        //Private Functions

        base.init = function(){
            //Local Variables

            //init debug 
            debug.init();

            //init logging
            logging.init();

            getViewportValues();

            //browser events
            $( window ).resize(function() {
                getViewportValues();
            });

            initElements();
        }       

        
        function getViewportValues()
        {
            viewport.layoutWidth =  document.documentElement.clientWidth;
            viewport.layoutHeight = document.documentElement.clientHeight;
            viewport.visualWidth =  window.innerWidth;
            viewport.visualHeight = window.innerHeight;

            if(logging.all || logging.viewport)
            {
                logging.logViewPortValues(viewport);
            }
        }

        function initElements()
        {
            base.$el.each(function(){
                switch($(this).tagName()){
                case 'video':
                    initVideo($(this));
                    break;
                }
            });
        }


        //video functions
        function initVideo($video){
            if($video.attr('id') === undefined){
                //assign ID
                $video.attr('id', 'video_' + utility.guidGenerator());
            }

            if(logging.all || logging.video)
            {
                logging.logVideoDetails($video);
            }
        };

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

        var logging = {
            all: false,
            viewport : false,
            video : false,
            init : function()
            {        
                if(settings.logging.length > 0)
                {
                    logging.all = utility.inArrayCaseInsensitive('all', settings.logging);
                    logging.viewport = utility.inArrayCaseInsensitive('viewport', settings.logging);
                    logging.video = utility.inArrayCaseInsensitive('video', settings.logging);
                }
                
            },
            //viewport
            logViewPortValues: function(viewport)
            {
                console.log('--VIEWPORT:')
                console.log('layout: ' + viewport.layoutWidth + ' x ' + viewport.layoutHeight);
                console.log('visual: ' + viewport.visualWidth + ' x ' + viewport.visualHeight);
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

        base.init();       

        return this;
    };


 
}( jQuery ));




