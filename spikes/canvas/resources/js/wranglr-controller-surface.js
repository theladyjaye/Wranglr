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
		canvas.context.fillStyle = "rgb(200,0,0)";
        canvas.context.fillRect (10, 10, 55, 50);
	}
	
	__new__();
	__init__();

	return self;
}

domReady(function () {
  Wranglr.Application(Wranglr.Surface)
})