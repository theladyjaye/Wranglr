var Wranglr = Wranglr || {};

/**
  * @namespace Wranglr.Guides
  * @description controller for guides.html page
  * @param {object} spec Configuration object {}
  * @param {object} my   This is used to share secrets between objects; optional.
  * 
  * @returns {object} The public interface for the Wranglr.Guides object
  */
 Wranglr.Guides = function(spec, my){
	var my   = my || {};
	var self = {};

	var svg   = Wranglr.currentApplication.svg();
	var stage = Wranglr.currentApplication.stage();
	var grid;
	var guides;
		
	function __new__(){
		
	}

	/* initialization */

	function __init__(){
		self.name = 'Wranglr.Guides';
		grid      = createGrid();
		guides    = createGuides();
	}

	function createGuides(){
		var g = svg.group();
		
		var guide = Wranglr.Guide({
			'orientation':'x',
			'pos': 10
		});

		var guide2 = Wranglr.Guide({
			'orientation':'x',
			'pos': 100
		});

		var guide3 = Wranglr.Guide({
			'orientation':'y',
			'pos':10
		});

		var guide4 = Wranglr.Guide({
			'orientation':'y',
			'pos': 100
		});

		stage.appendChild(guide.view());
		stage.appendChild(guide2.view());
		stage.appendChild(guide3.view());
		stage.appendChild(guide4.view());
	}

	function createGrid(){
		var x = 640 / 10;
		var y = 480 / 10;

		var g = svg.group();
		var d;
		var rect;

		stage.appendChild(g);

		for(var i=x; i>=0; i--){
			d = i * 10;
			rect = svg.rect({
				'width': '1',
				'height': '100%',
				'x':d,
				'fill':'#333'
			});

			g.appendChild(rect);
		}

		for(i=y; i>=0; i--){
			d = i * 10;
			rect = svg.rect({
				'width': '100%',
				'height': '1',
				'y':d,
				'fill':'#333'
			});

			g.appendChild(rect);
		}

		return g;
	}

	// do not delete //
	__new__(); 
	__init__();
	return self;
	// #eo do not delete //
 }
 /* #eo Wranglr.Guides */ 

/**
 * @namespace Wranglr.Guide
 * @description controller 
 * @param {object} spec Configuration object {}
 * @param {object} my   This is used to share secrets between objects; optional.
 * 
 * @returns {object} The public interface for the Wranglr.Guide object
 * 
 * @todo will probably need to move drag and drop to the application level
 * 
 * @see http://www.codedread.com/blog/archives/2005/12/21/how-to-enable-dragging-in-svg/ (for drag and drop inspiration)
 */
Wranglr.Guide = function(spec, my){
    var my   = my || {};
    var self = {};

    var orientation = spec.orientation || 'x';
    var initPos    = spec.pos || 0;

    var svg = Wranglr.currentApplication.svg();
    var stage = Wranglr.currentApplication.stage();
    var _view;

    var is_dragging = false;
    var mouseOffsetX = 0;
    var mouseOffsetY = 0;
    var thickness = 1; // px
    var baseClass = 'guide ' + orientation;

    function __new__(){
    	self.view = view;
    	// self.x = x;
    	// self.y = y;
    	self.pos = pos;
    }
    
    /* initialization */

    function __init__(){
        self.name = 'Wranglr.Guide';
    	initialzeView();    
    }
    function initialzeView(){
    	var width  = (orientation === 'x') ? '100%'    : thickness;
    	var height = (orientation === 'x') ? thickness : '100%'

    	_view = svg.rect({
    		'width':width,
    		'height':height,
    		'fill':'#00FFFF'
    	});

    	_view.setAttribute('class', baseClass);

    	// _view.addEventListener('mousemove', onMouseMove);
    	_view.addEventListener('mouseup', onMouseUp);
    	_view.addEventListener('mousedown', onMouseDown);

    	var body = document.getElementsByTagName('body')[0];
    	body.addEventListener('mouseup', onMouseUp);
    	body.addEventListener('mousemove', onMouseMove);

    	pos(initPos);
    }

    /* getter || setter */

    function view(){
    	return _view;
    }
    function x(val){
    	if(val === undefined){
    		return _view.getAttribute('x');
    	}

    	_view.setAttribute('x', val);
    	_x = val;
    }
    function y(val){
    	if(val === undefined){
    		return _view.getAttribute('y');
    	}
    	_view.setAttribute('y', val);
    	_y = val;
    }
    // function pos(xval, yval){
    function pos(val){
    	// x(xval);
    	// y(yval);
    	
    	if(orientation === 'x'){
    		y(val);
    	}else{
    		x(val);
    	}
    }

    /* event delegates */

    function onMouseDown(e){
    	is_dragging = true;

    	if(_view && stage){
    		var point = svg.hit(stage, _view, e);
    		mouseOffsetX = point.x - parseInt(x(), 10);
    		mouseOffsetY = point.y - parseInt(y(), 10);

    		_view.setAttribute('class', baseClass + ' dragging');
    	}
    }
    function onMouseUp(e){
    	is_dragging = false;

    	if(_view){
    		_view.setAttribute('class', baseClass);
    	}
    }
    function onMouseMove(e){
    	if(is_dragging){
    		if(_view){
    			
    			var point = svg.hit(stage, _view, e);
    			// y(point.y - mouseOffsetY);
    			
    			if(orientation === 'x'){
    				y(point.y - mouseOffsetY);
    			}else{
    				x(point.x - mouseOffsetX);
    			}
    		}
    	}
    }

    // do not delete //
    __new__(); 
    __init__();
    return self;
    // #eo do not delete //
}
/* #eo Wranglr.Guide */

/**
 * @namespace Wranglr.Svg
 * @description api for drawing svg
 * @param {object} spec Configuration object {}
 * @param {object} my   This is used to share secrets between objects; optional.
 * 
 * @returns {object} The public interface for the Wranglr.Svg object
 * 
 * @todo  make syntax more convenient
 */
Wranglr.Svg = function(spec, my){
    var my   = my || {};
    var self = {};
	
	var SVG_XMLNS = 'http://www.w3.org/2000/svg';

    function __new__(){
    	self.rect = rect;
    	self.group = group;
    	self.hit = hit;
    }
    
    /* initialization */

    function __init__(){
        self.name = 'Wranglr.Svg';
    }

    /* public functions */

    function rect(options){
		options = options || {}; 
		options.width  = options.width  || 0;
		options.height = options.height || 0;
		options.x      = options.x      || 0; 
		options.y      = options.y      || 0;
		options.fill   = options.fill   || '#66FFFF';
		
		var r = document.createElementNS(SVG_XMLNS, 'rect');

		for(var i in options){
			if(options.hasOwnProperty(i)){
				r.setAttribute(i, options[i]);	 			
			}
		}

		return r;
	}
	function group(options){
		options = options || {}; 
		options.transform = options.transform || '';
		
		var g = document.createElementNS(SVG_XMLNS, 'g');
		g.setAttributeNS(null, 'transform', options.transform);

		return g;
	}
	function hit(context, element, mouseEvent){
		var point = context.createSVGPoint();
		var transform = element.getScreenCTM();

		point.x = mouseEvent.clientX;
		point.y = mouseEvent.clientY;
		point.matrixTransform(transform.inverse());

		return point;
	}

    // do not delete //
    __new__(); 
    __init__();
    return self;
    // #eo do not delete //
}
/* #eo Wranglr.Svg */


 $(function(){
 	Wranglr.Application(Wranglr.Guides);
 });