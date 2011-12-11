var Wranglr = Wranglr || {};

Wranglr.Surface = function(){
	
	var self = {}
	var canvas = null

	function __new__(){
	
	}

	function __init__(){
		canvas = Wranglr.Canvas("stage")
		timeline = Wranglr.Timeline()
		timeline.addAction(draw)
	}

	function draw(){
	}
	
	__new__();
	__init__();

	return self;
}

domReady(function () {
  Wranglr.Application(Wranglr.Surface)
})