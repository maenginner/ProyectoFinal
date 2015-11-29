var guesserApp = (function () {
	"use strict";
	var cnv,
	ctx,
	cnvW = 800,
	cnvH = 600,
	crayonTI= new Image(),
	pointsX = [], 
	pointsY = [],
	pointsColor = [],
	pointsTool = [],
	pointsSize = [],
	pointsDrag = [],	
	
	canvasClr = function () {
		ctx.clearRect(0, 0, cnvW,cnvH);
		pointsX = []; 
		pointsY = [];
		pointsColor = [];
		pointsTool = [];
		pointsSize = [];
		pointsDrag = [];	
	},

	draw = function () {
		for (var i = 0; i < pointsX.length; i ++) {
			ctx.beginPath();
			if (pointsDrag[i] && i) {
				ctx.moveTo(pointsX[i - 1], pointsY[i - 1]);
			} else {
				ctx.moveTo(pointsX[i] - 1, pointsY[i]);
			}
			ctx.lineTo(pointsX[i], pointsY[i]);
			
			if (pointsTool[i] === "borrador") {
				ctx.strokeStyle = 'white';
			} else {
				ctx.strokeStyle = pointsColor[i];
			}
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			ctx.lineWidth = pointsSize[i];
			ctx.stroke();
		}
		ctx.closePath();
		ctx.restore();
		
		if (pointsTool[pointsTool.length-1] === "crayon") {
			ctx.globalAlpha = 0.4;
			ctx.drawImage(crayonTI, 0, 0, cnvW, cnvH);
		}
		ctx.globalAlpha = 1; 			
	},
	
	addPoint = function (x, y, color, tool, size, drag) {

		pointsX.push(x);
		pointsY.push(y);
		pointsTool.push(tool);
		pointsSize.push(size);
		pointsColor.push(color);
		pointsDrag.push(drag);
		draw();
	},

	guessWord = function(){
		var guessing=document.getElementById("guessword").value;
		alert(guessing);
	},
	
	initialize=function (){
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
		communication.initM();
	};
	return{
		initialize:initialize
	};
	
	
}());
