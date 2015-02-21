/*!
 * Pelican Responsive Media
 * Load responsive images and videos
 */

$.fn.tagName = function() {
  return this.prop('tagName').toLowerCase();
};

function logElementAttributes($el)
{
    $.each($el.get(0).attributes, function(i, attrib){
        console.log(attrib.name + " : " + attrib.value);        
    });
}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

(function ( $ ) {
 
    $.fn.prm = function( options ) {
        //settings
        var settings = $.extend({}, defaults, options);

        //Plugin Defaults
        var defaults = {
            debug: false
        }   

        var viewport = {
            layoutWidth  : 0,
            layoutHeight : 0,
            visualWidth  : 0,
            visualHeight : 0
        }

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

            if(settings.debug)
            {
                logViewPortValues();
            }
        }


        //video functions
        function initVideo($video){
            if($video.attr('id') === undefined){
                //assign ID
                $video.attr('id', 'video_' + guidGenerator());
            }

            if(settings.debug)
            {
                logVideoDetails($video);
            }
        };

        //logging functions
        function logViewPortValues()
        {
            console.log('--VIEWPORT:')
            console.log('layout: ' + viewport.layoutWidth + ' x ' + viewport.layoutHeight);
            console.log('visual: ' + viewport.visualWidth + ' x ' + viewport.visualHeight);
        }
        
        function logVideoDetails($video)
        {
            console.log('--VIDEO DETAILS');
            console.log('----attributes');
            logElementAttributes($video);
            console.log('----sources');
            $video.find('source').each(function(){
                console.log('------source');
                console.log(logElementAttributes($(this)));
            })
        }



        return this;
    };
 
}( jQuery ));



