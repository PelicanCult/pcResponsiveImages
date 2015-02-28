$( document ).ready(function() {

    var a = $('body').pelican('.prm', 
    	{
    		debug:true, 
	    	breakpoints: [
	    		{key: 'small', maxWidth: 768}, 
	    		{key: 'medium', minWidth: 769, maxWidth: 1024}, 
	    		{key: 'large', minWidth: 1025}
			]
    	});

});