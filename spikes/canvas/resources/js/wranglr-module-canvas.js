var Wranglr = Wranglr || {};

Wranglr.Canvas = function(id){
	
	var self = {}
	var canvas = null
	var context = null

	function __new__(){
	
	}

	function __init__(){
		canvas = document.getElementById(id);
		context = canvas.getContext('2d');
		console.log(context)
	}
	
	__new__();
	__init__();

	return self;
}