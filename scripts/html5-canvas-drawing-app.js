var drawingApp = (function () {
	"use strict";
	var canvas,
		context,
		canvasWidth = 800,
		canvasHeight = 600,
		crayonTextureImage = new Image(),
		clickX = [], 
		clickY = [],
		clickColor = [],
		clickTool = [],
		clickSize = [],
		clickDrag = [],
		paint = false,
		curColor = "#659b41",
		curTool = "marker",
		curSize = 5,

		/*
		*Limpia el canvas completamente, reiniciando los datos a
		*sus valores iniciales 
		*/
		clearCanvas = function () {
			context.clearRect(0, 0, canvasWidth, canvasHeight);
			clickX = []; 
			clickY = [];
			clickColor = [];
			clickTool = [];
			clickSize = [];
			clickDrag = [];
		},

		// Redraws the canvas.
		redraw = function () {
			
			// For each point drawn
			for (var i = 0; i < clickX.length; i ++) {
				// Set the drawing path
				context.beginPath();
				// If dragging then draw a line between the two points
				if (clickDrag[i] && i) {
					context.moveTo(clickX[i - 1], clickY[i - 1]);
				} else {
					// The x position is moved over one pixel so a circle even if not dragging
					context.moveTo(clickX[i] - 1, clickY[i]);
				}
				context.lineTo(clickX[i], clickY[i]);
				
				// Set the drawing color
				if (clickTool[i] === "borrador") {
					context.strokeStyle = 'white';
				} else {
					context.strokeStyle = clickColor[i];
				}
				context.lineCap = "round";
				context.lineJoin = "round";
				context.lineWidth = clickSize[i];
				context.stroke();
			}
			context.closePath();
			context.restore();

			// Overlay a crayon texture (if the current tool is crayon)
			if (curTool === "crayon") {
				context.globalAlpha = 0.4;
				context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
			}
			context.globalAlpha = 1; 			
		},

		// Adds a point to the drawing array.
		// @param x
		// @param y
		// @param dragging
		addClick = function (x, y, dragging) {

			clickX.push(x);
			clickY.push(y);
			clickTool.push(curTool);
			clickColor.push(curColor);
			clickSize.push(curSize);
			clickDrag.push(dragging);
		},

		// Add mouse and touch event listeners to the canvas
		createUserEvents = function () {
			var press = function (e) {
				// Mouse down location
				var mouseX = e.pageX - this.offsetLeft,
					mouseY = e.pageY - this.offsetTop;

				paint = true;
				addClick(mouseX, mouseY, false);
				redraw();
			},

				drag = function (e) {
					if (paint) {
						addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);						
						redraw();
					}					
				},

				release = function () {
					paint = false;
				},

				cancel = function () {
					paint = false;
				};

			// Add mouse event listeners to canvas element
			canvas.addEventListener("mousedown", press, false);
			canvas.addEventListener("mousemove", drag, false);
			canvas.addEventListener("mouseup", release);
			canvas.addEventListener("mouseout", cancel, false);

		},
		
		changeColor = function(color){
				curColor=color;
		},
		
		changeTool = function (tool){
				curTool=tool;	
		},
		
		changeSize = function (size){
			curSize=size;	
		},

		// Creates a canvas element, loads images, adds events, and draws the canvas for the first time.
		init = function () {

			canvas = document.createElement('canvas');
			canvas.setAttribute('width', canvasWidth);
			canvas.setAttribute('height', canvasHeight);
			canvas.setAttribute('id', 'canvas');
			document.getElementById('canvasDiv').appendChild(canvas);
			if (typeof G_vmlCanvasManager !== "undefined") {
				canvas = G_vmlCanvasManager.initElement(canvas);
			}
			context = canvas.getContext("2d"); // Grab the 2d canvas context			

			// Load images
			crayonTextureImage.src = "images/crayon-texture.png";
			createUserEvents();
			
			document.getElementById("purpura").addEventListener("click",function(){
				changeColor(document.getElementById("purpura").value);
			});
			document.getElementById("verde").addEventListener("click",function(){
				changeColor(document.getElementById("verde").value);
			});	
			document.getElementById("amarillo").addEventListener("click",function(){
				changeColor(document.getElementById("amarillo").value);
			});			
			document.getElementById("marron").addEventListener("click",function(){
				changeColor(document.getElementById("marron").value);
			});	
			document.getElementById("crayon").addEventListener("click",function(){
				changeTool(document.getElementById("crayon").value);
			});
			document.getElementById("marcador").addEventListener("click",function(){
				changeTool(document.getElementById("marcador").value);
			});	
			document.getElementById("borrador").addEventListener("click",function(){
				changeTool(document.getElementById("borrador").value);
			});			
			document.getElementById("delgado").addEventListener("click",function(){
				changeSize(document.getElementById("delgado").value);
			});
			document.getElementById("medio").addEventListener("click",function(){
				changeSize(document.getElementById("medio").value);
			});
			document.getElementById("grueso").addEventListener("click",function(){
				changeSize(document.getElementById("grueso").value);
			});
			document.getElementById("mgrueso").addEventListener("click",function(){
				changeSize(document.getElementById("mgrueso").value);
			});		
			document.getElementById("clear").addEventListener("click",clearCanvas);
		};

	return {
		init: init
	};
}());