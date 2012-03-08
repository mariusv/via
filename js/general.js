$(document).ready(function() {
	/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
	 * Licensed under the MIT License (LICENSE.txt).
	 *
	 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
	 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
	 * Thanks to: Seamus Leahy for adding deltaX and deltaY
	 *
	 */
	
	(function($){var types=['DOMMouseScroll','mousewheel'];$.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var i=types.length;i;){this.addEventListener(types[--i],handler,false)}}else{this.onmousewheel=handler}},teardown:function(){if(this.removeEventListener){for(var i=types.length;i;){this.removeEventListener(types[--i],handler,false)}}else{this.onmousewheel=null}}};$.fn.extend({mousewheel:function(fn){return fn?this.bind("mousewheel",fn):this.trigger("mousewheel")},unmousewheel:function(fn){return this.unbind("mousewheel",fn)}});function handler(event){var orgEvent=event||window.event,args=[].slice.call(arguments,1),delta=0,returnValue=true,deltaX=0,deltaY=0;event=$.event.fix(orgEvent);event.type="mousewheel";if(event.wheelDelta){delta=event.wheelDelta/120}if(event.detail){delta=-event.detail/3}deltaY=delta;if(orgEvent.axis!==undefined&&orgEvent.axis===orgEvent.HORIZONTAL_AXIS){deltaY=0;deltaX=-1*delta}if(orgEvent.wheelDeltaY!==undefined){deltaY=orgEvent.wheelDeltaY/120}if(orgEvent.wheelDeltaX!==undefined){deltaX=-1*orgEvent.wheelDeltaX/120}args.unshift(event,delta,deltaX,deltaY);return $.event.handle.apply(this,args)}})(jQuery);
	
	//	SEPARATE JS

	$('.entry').jScrollPane();
	
	$('.jspVerticalBar').each(function(index, element) {
		var picwidth = $(this).prev(".jspPane").width();
		$(this).prev(".jspPane").css({ width:picwidth-20 });
	});
	
	$('.work_content .slides').cycle({ 
		fx:             'fade', 
		speed:          200, 
		cleartype:      true,
		cleartypeNoBg:  true,
		pager:           '.work_content .innernav',
		prev:           '.work_content .prev',
		next:           '.work_content .next',
		timeout:        0
	});


	//	Blog image slideshow
	$('.blog_content .post .image_content').cycle({ 
		fx:             'fade', 
		speed:          500, 
		cleartype:      true,
		cleartypeNoBg:  true,
		timeout:        5000, 
		next:           ".blog_content .post .image_content img"
	});
	
	//	Blog pagination
	$('.blog_content .posts').cycle({ 
		fx:             'fade', 
		speed:          200, 
		cleartype:      true,
		cleartypeNoBg:  true,
		pager:           '.blog_content .innernav',
		prev:           '.blog_content .prev',
		next:           '.blog_content .next',
		timeout:        0
	});

	$(".work_content li a").fancybox({
		padding: 0,
		openEffect : 'elastic',
		openSpeed  : 150,
		closeEffect : 'elastic',
		closeSpeed  : 100,
		closeClick : false,
		helpers : {
			title : {
				type : 'over'
			},
			overlay : {
				opacity : 0.40,
				css : {
					'background-color' : '#000'	
				}
			}
		}
	});
});
$(document).ready(function() {
	
	// Google maps
	$("#map").bMap({
		mapZoom: 11,
		mapCenter:[51.501690392607,-0.1263427734375],
		markers:{"data":[ //How to immediately add markers to the map
			{
				"lat":51.49757618329838,
				"lng":-0.1746654510498047, 
				"title":"Science Museum", 
				"body":"Exhibition Road, London SW7"
			},{
				"lat":51.47769451182406,
				"lng":-0.0009441375732421875, 
				"title":"Royal Observatory Greenwich", 
				"body":"Blackheath Ave, Greenwich, London"
			}	//keep adding as many markers as you need....
		]}
	});
	
	// Contact form
	$("#ajax-contact-form").submit(function(){
		var str = $(this).serialize();
		$.ajax({
		type: "POST",
		url: "contact/contact.php",
		data: str,
		success: function(msg){
			$("#note").ajaxComplete(function(event, request, settings){
				if(msg == 'OK'){
					result = '<div class="notification_ok">Your message has been sent. Thank you!</div>';
					$("#ajax-contact-form input, #ajax-contact-form textarea").hide();
				}else{
					result = msg;
				}
				$(this).html(result);
			});
		}
		});
		return false;
	});
});
