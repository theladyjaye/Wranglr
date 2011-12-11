var Wranglr = Wranglr || {};

Wranglr.Canvas = function(id){
	
	var self = {}
	var canvas = null

	function __new__(){
	
	}

	function __init__(){
		canvas = document.getElementById(id);
		self.context = canvas.getContext('2d');
	}
	
	__new__();
	__init__();

	return self;
}