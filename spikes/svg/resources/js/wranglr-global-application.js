var Wranglr = Wranglr || {};
Wranglr.Application = function(controller){

	var self = {};
	var _svg = Wranglr.Svg();
	var _stage = document.getElementById('stage');

	function __new__(){
		self.svg = function(){return _svg;}
		self.stage = function(){return _stage;}
	}

	function __init__(){
		Wranglr.currentApplication = self;
		self.controller  = controller();
	}
	
	__new__();
	__init__();

	return self;
}