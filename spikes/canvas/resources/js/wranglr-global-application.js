var Wranglr = Wranglr || {};
Wranglr.Application = function(controller){

	var self = {};

	function __new__(){
	}

	function __init__(){
		self.controller  = controller();
	}
	
	__new__();
	__init__();

	return self;
}