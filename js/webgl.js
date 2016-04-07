/* 
Engagement Lab API
Created by Engagement Lab, 2015
==============
 webgl.js
 WebGL support checker and frame utils.

 Created by Johnny Richardson on 11/12/15.
==============
*/
webGLSupport = function() {
	
	var canvas = document.createElement("canvas"),
	context = null,
	names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
	
  if (!!window.WebGLRenderingContext) {

		for (var i = 0; i < names.length; ++i) {
			try { context = canvas.getContext(names[i]); }
			catch(e) {}
			
			if (context) { break; }
		}
		
		return context != null;

	}

	return false;

};

embedWebGL = function() {
	var frame = document.getElementById("game_embed");
	
	frame.onload = function() {
    fullscreenWebGL();		
	}
	frame.src="https://commondatastorage.googleapis.com/itchio/html/182818/index.html";
};

clearWebGL = function() {
	document.getElementById("game_embed").src="about:blank";
};

fullscreenWebGL = function() {
	var content = document.getElementById('game_embed').contentWindow;
	var element = content.document.getElementById('canvas');

	if(content == null)
		return;

	content.document.getElementById('fullscreen_button').addEventListener('click', function() {
	    if (BigScreen.enabled)
	      BigScreen.request(element);
	}, false);
}

$(document).ready(function() {
	// Disable/remove webgl elements if not supported and show browser download dialog
	if(!webGLSupport()) {
		$('#playnow').remove();
		$('.nav #play').remove();
	}
	else
		$('#browsers').remove();
});
$(document).on('closing', '.remodal', function (e) {
    clearWebGL();
});