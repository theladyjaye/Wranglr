var OK = OK || {};

$(function(){
	var context = $('#canvas')[0].getContext('2d');
	var src = 'img/fpo.jpg';

	function load(){
 		var img = new Image();
 		img.onload = function(){
 			context.drawImage(img, 0, 0, 640, 480);
 		}

 		img.src = src;
 		$('body').append(img);
    }

    load();
});