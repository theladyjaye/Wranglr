var Wranglr = Wranglr || {};

/**
  * @namespace Wranglr.FileDragAndDrop
  * @description controller for guides.html page
  * @param {object} spec Configuration object {}
  * @param {object} my   This is used to share secrets between objects; optional.
  * 
  * @returns {object} The public interface for the Wranglr.FileDragAndDrop object
  */
 Wranglr.FileDragAndDrop = function(spec, my){
	var my   = my || {};
	var self = {};

	var dropTarget = document.getElementById('main');

	function __new__(){
	}

	/* initialization */

	function __init__(){
		console.log('FileDragAndDrop', dropTarget);
		self.name = 'Wranglr.FileDragAndDrop';

		dropTarget.addEventListener('dragenter', onDragEnter);
		dropTarget.addEventListener('dragleave', onDragExit );
		dropTarget.addEventListener('dragover' , onDragOver );
		dropTarget.addEventListener('drop'     , onDrop     );
	}

	/* drag event delegates */
	
	function onDragEnter(e){
		console.log('onDragEnter', e);		
		block(e);
		dropTarget.setAttribute('class', 'drag-over');
	}
	function onDragExit(e){
		console.log('onDragExit',e);		
		block(e);
		dropTarget.setAttribute('class', '');
	}
	function onDragOver(e){
		// console.log('onDragOver', e);		
		block(e);
	}
	function onDrop(e){
		console.log('onDrop', e);		
		block(e);
		dropTarget.setAttribute('class', '');

		var files = e.dataTransfer.files;
		var count = files.length;
		var reader;
		var file;

		if(count > 0){
			reader = new FileReader();
			file = files[0];
			reader.onload = onFileLoad;
			
			reader.readAsDataURL(file);
		}
	}

	/* file reader event handlers */
	function onFileLoad(e){
		console.log('onFileLoad', e);

		var result = e.target.result;
		// var view = document.getElementById('text-result');
		// view.innerHTML = result;
		
		var img = document.getElementById('img-result');
		img.src = result;
	}

	/* helpers */

	function block(e){
		e.stopImmediatePropagation();
		e.preventDefault();
	}

	// do not delete //
	__new__(); 
	__init__();
	return self;
	// #eo do not delete //
 }
 /* #eo Wranglr.FileDragAndDrop */ 

 $(function(){
 	Wranglr.Application(Wranglr.FileDragAndDrop);
 });