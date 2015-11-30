"use strict";
var pointsX = [];
var pointsY = [];
var pointsColor = [];
var pointsTool = [];
var pointsSize = [];
var pointsDrag = [];
var cnv;
var ctx;
var cnvW = 800;
var cnvH = 600;
var crayonTI= new Image();
		
	
function canvasClr() {
	ctx.clearRect(0, 0, cnvW,cnvH);
	pointsX = []; 
	pointsY = [];
	pointsColor = [];
	pointsTool = [];
	pointsSize = [];
	pointsDrag = [];	
};


function guessWord (){
	var guessing=document.getElementById("guessword").value;
        sendMessage(guessing);
};
	
function initialize(){
	cnv = document.createElement('canvas');
	cnv.setAttribute('width', cnvW);
	cnv.setAttribute('height', cnvH);
	cnv.setAttribute('id', 'canvas');
	document.getElementById('canvasDiv').appendChild(cnv);
	if (typeof G_vmlCanvasManager !== "undefined") {
		canvas = G_vmlCanvasManager.initElement(cnv);
	}
	ctx = cnv.getContext("2d"); 
	crayonTI.src = "images/crayon-texture.png";
	document.getElementById("envio").addEventListener("click",guessWord);
};
	
 function addPoint(x, y, color, tool, size, drag) {

	pointsX.push(x);
	pointsY.push(y);
	pointsTool.push(tool);
	pointsSize.push(size);
	pointsColor.push(color);
	pointsDrag.push(drag);
        redraw(pointsX, pointsY, ctx, pointsColor, pointsDrag, pointsTool, pointsSize, cnvW, cnvH, crayonTI);
};