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

	 var SVG_XMLNS = 'http://www.w3.org/2000/svg';

	 var stage = document.getElementById('stage');
	 var grid;
	 var guides;


	 var dragData = {
	 	'startX':0,
	 	'startY':0
	 }
	 var draggable;
			
	 function __new__(){
	 	
	 }
	 
	 /* initialization */

	 function __init__(){
	     self.name = 'Wranglr.Guides';
	     grid      = createGrid();
	     guides    = createGuides();

	     // testAddGuide();
	     testDrag();

	     // for debug
	     Wranglr.stage = stage;
	     Wranglr.draggable = draggable;
	 }
	 function testAddGuide(){
	 	stage.addEventListener('click', addGuide);
	 }
	 function testDrag(){
	 	draggable = get_rect({
	 		'width': '250',
	 		'height': '250',
	 		'x':'0',
	 		'y':'0'
	 	});

	 	draggable.addEventListener('mousedown', onRectMouseDown);
	 	draggable.addEventListener('mouseup', onRectMouseUp);

	 	stage.appendChild(draggable);
	 }
	 function onRectMouseDown(e){
	 	console.log('down');

	 	dragData.startX = e.offsetX;
	 	dragData.startY = e.offsetY;
	 	draggable.addEventListener('mousemove', onRectDrag);
	 }

	 function onRectDrag(e){
	 	var x = e.offsetX - dragData.startX;
	 	var y = e.offsetY - dragData.startY;

	 	console.log(e.offsetX, e.offsetY);
	 	console.log(x, y);
	 	// return;
	 	draggable.setAttributeNS(null, 'x', x);
	 	draggable.setAttributeNS(null, 'y', y);
	 }
	 function onRectMouseUp(e){
	 	console.log('up');
	 	draggable.removeEventListener('mousemove', onRectDrag);
	 }

	 function addGuide(e){
	 	guides.appendChild(get_rect({
	 		'width':'100%',
	 		'height':'1',
	 		'y':e.y - stage.offsetTop
	 	}));
	 }

	 function createGuides(){
	 	var g = get_group();
	 	stage.appendChild(g);

	 	return g;
	 }

	 function createGrid(){
	 	console.log('create grid');
	 	var x = 640 / 10;
	 	var y = 480 / 10;

	 	var g = get_group();
	 	var d;
	 	var rect;

	 	stage.appendChild(g);

	 	for(var i=x; i>=0; i--){
	 		d = i * 10;
	 		rect = get_rect({
	 			'width': '1',
	 			'height': '100%',
	 			'x':d,
	 			'fill':'#333'
	 		});

	 		g.appendChild(rect);
	 	}

	 	for(i=y; i>=0; i--){
	 		d = i * 10;
	 		rect = get_rect({
	 			'width': '100%',
	 			'height': '1',
	 			'y':d,
	 			'fill':'#333'
	 		});

	 		g.appendChild(rect);
	 	}

	 	return g;
	 }

	 function get_group(options){
	 	options = options || {}; 
	 	options.transform = options.transform || '';
	 	
	 	var g = document.createElementNS(SVG_XMLNS, 'g');
	 	g.setAttributeNS(null, 'transform', options.transform);

	 	return g;
	 }

	 function get_rect(options){
	 	options = options || {}; 
	 	options.width  = options.width  || 0;
	 	options.height = options.height || 0;
	 	options.x      = options.x      || 0; 
	 	options.y      = options.y      || 0;
	 	options.fill   = options.fill   || '#66FFFF';
	 	
	 	var r = document.createElementNS(SVG_XMLNS, 'rect');

	 	for(var i in options){
	 		if(options.hasOwnProperty(i)){
				r.setAttributeNS(null, i, options[i]);	 			
	 		}
	 	}

	 	return r;
	 }

	 // do not delete //
	 __new__(); 
	 __init__();
	 return self;
	 // #eo do not delete //
 }
 /* #eo Wranglr.Guides */ 

 $(function(){
 	Wranglr.Application(Wranglr.Guides);
 });