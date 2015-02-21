/*!
 * Pelican Responsive Media
 * Load responsive images and videos
 */

 $.fn.tagName = function() {
  return this.prop('tagName').toLowerCase();
};

(function ( $ ) {
 
    $.fn.prm = function( options ) {
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
        
        //init logging
        logging.init(settings.logging);

        
        //init plugin 
        getViewportValues();

        //Find PRM Elements
        this.find('.prm').each(function(){
            switch($(this).tagName()){
                case 'video':
                    initVideo($(this));
                    break;
            }
        });

        //browser functions
        $( window ).resize(function() {
            getViewportValues();
        });

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

        return this;
    };
 
}( jQuery ));

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


var logging = {
    all: false,
    viewport : false,
    video : false,
    init : function(logSettingsArray)
    {        
        if(logSettingsArray.length > 0)
        {
            logging.all = utility.inArrayCaseInsensitive('all', logSettingsArray);
            logging.viewport = utility.inArrayCaseInsensitive('viewport', logSettingsArray);
            logging.video = utility.inArrayCaseInsensitive('video', logSettingsArray);
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