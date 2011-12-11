var Wranglr = Wranglr || {};

Wranglr.Timeline = function(id){
	
	var self = {}
	var timeline = null

	function __new__(){
		self.addAction = addAction
	}

	function __init__(){
		dispatcher =  itsy.Dispatcher()
		timeline = requestAnimationFrame()
		timeline(tick)
	}

	function tick(){
		dispatcher.dispatch("tick")
		timeline(tick)
	}

	function addAction(func){
		dispatcher.on("tick", func)
	}

	function requestAnimationFrame(){
		// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
		return window.requestAnimationFrame       || 
			   window.webkitRequestAnimationFrame || 
			   window.mozRequestAnimationFrame    || 
			   window.oRequestAnimationFrame      || 
			   window.msRequestAnimationFrame;
	}
	
	__new__();
	__init__();

	return self;
}