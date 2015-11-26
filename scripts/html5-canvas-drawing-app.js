

var drawingApp = (function () {

	"use strict";

	var canvas,
		context,
		canvasWidth = 490,
		canvasHeight = 220,
		colorPurple = "#cb3594",
		colorGreen = "#659b41",
		colorYellow = "#ffcf33",
		colorBrown = "#986928",
		outlineImage = new Image(),
		crayonImage = new Image(),
		markerImage = new Image(),
		eraserImage = new Image(),
		crayonBackgroundImage = new Image(),
		markerBackgroundImage = new Image(),
		eraserBackgroundImage = new Image(),
		crayonTextureImage = new Image(),
		clickX = [], 
		clickY = [],
		clickColor = [],
		clickTool = [],
		clickSize = [],
		clickDrag = [],
		paint = false,
		curColor = colorGreen,
		curTool = "marker",
		curSize = "normal",
		mediumStartX = 18,
		mediumStartY = 19,
		mediumImageWidth = 93,
		mediumImageHeight = 46,
		drawingAreaX = 111,
		drawingAreaY = 11,
		drawingAreaWidth = 267,
		drawingAreaHeight = 200,
		toolHotspotStartY = 23,
		toolHotspotHeight = 38,
		sizeHotspotStartY = 157,
		sizeHotspotHeight = 36,
		totalLoadResources = 8,
		curLoadResNum = 0,
		sizeHotspotWidthObject = {
			huge: 39,
			large: 25,
			normal: 18,
			small: 16
		},

		// Clears the canvas.
		clearCanvas = function () {

			context.clearRect(0, 0, canvasWidth, canvasHeight);
		},

		// Redraws the canvas.
		redraw = function () {

			var locX,
				locY,
				radius,
				i,
				selected,

				drawMarker = function (x, y, color, selected) {

					if (selected) {
						context.drawImage(markerImage, x, y, mediumImageWidth, mediumImageHeight);
					} else {
						context.drawImage(markerImage, 0, 0, 59, mediumImageHeight, x, y, 59, mediumImageHeight);
					}
				};

			// Make sure required resources are loaded before redrawing
			if (curLoadResNum < totalLoadResources) {
				return;
			}

			clearCanvas();

			if (curTool === "crayon") {

				// Draw the crayon tool background
				context.drawImage(crayonBackgroundImage, 0, 0, canvasWidth, canvasHeight);

				// Draw purple crayon
				selected = (curColor === colorPurple);
				locX = selected ? 18 : 52;
				locY = 19;
				//drawCrayon(locX, locY, colorPurple, selected);

				// Draw green crayon
				selected = (curColor === colorGreen);
				locX = selected ? 18 : 52;
				locY += 46;
				//drawCrayon(locX, locY, colorGreen, selected);

				// Draw yellow crayon
				selected = (curColor === colorYellow);
				locX = selected ? 18 : 52;
				locY += 46;
				//drawCrayon(locX, locY, colorYellow, selected);

				// Draw brown crayon
				selected = (curColor === colorBrown);
				locX = selected ? 18 : 52;
				locY += 46;
				//drawCrayon(locX, locY, colorBrown, selected);

			} else if (curTool === "marcador") {

				// Draw the marker tool background
				context.drawImage(markerBackgroundImage, 0, 0, canvasWidth, canvasHeight);

				// Draw purple marker
				selected = (curColor === colorPurple);
				locX = selected ? 18 : 52;
				locY = 19;
				drawMarker(locX, locY, colorPurple, selected);

				// Draw green marker
				selected = (curColor === colorGreen);
				locX = selected ? 18 : 52;
				locY += 46;
				drawMarker(locX, locY, colorGreen, selected);

				// Draw yellow marker
				selected = (curColor === colorYellow);
				locX = selected ? 18 : 52;
				locY += 46;
				drawMarker(locX, locY, colorYellow, selected);

				// Draw brown marker
				selected = (curColor === colorBrown);
				locX = selected ? 18 : 52;
				locY += 46;
				drawMarker(locX, locY, colorBrown, selected);

			} else if (curTool === "borrador") {

				context.drawImage(eraserBackgroundImage, 0, 0, canvasWidth, canvasHeight);
				context.drawImage(eraserImage, 18, 19, mediumImageWidth, mediumImageHeight);
			}

			// Draw line on ruler to indicate size
			switch (curSize) {
			case "pequeño":
				locX = 467;
				break;
			case "normal":
				locX = 450;
				break;
			case "grande":
				locX = 428;
				break;
			case "mgrande":
				locX = 399;
				break;
			default:
				break;
			}
			locY = 189;
			context.beginPath();
			context.rect(locX, locY, 2, 12);
			context.closePath();
			context.fillStyle = '#333333';
			context.fill();

			// Keep the drawing in the drawing area
			context.save();
			context.beginPath();
			context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
			context.clip();

			// For each point drawn
			for (i = 0; i < clickX.length; i += 1) {

				// Set the drawing radius
				switch (clickSize[i]) {
				case "pequeño":
					radius = 2;
					break;
				case "normal":
					radius = 5;
					break;
				case "grande":
					radius = 10;
					break;
				case "mgrande":
					radius = 20;
					break;
				default:
					break;
				}

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
					//context.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
					context.strokeStyle = 'white';
				} else {
					//context.globalCompositeOperation = "source-over";	// To erase instead of draw over with white
					context.strokeStyle = clickColor[i];
				}
				context.lineCap = "round";
				context.lineJoin = "round";
				context.lineWidth = radius;
				context.stroke();
			}
			context.closePath();
			//context.globalCompositeOperation = "source-over";// To erase instead of draw over with white
			context.restore();

			// Overlay a crayon texture (if the current tool is crayon)
			if (curTool === "crayon") {
				context.globalAlpha = 0.4; // No IE support
				context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
			}
			context.globalAlpha = 1; // No IE support

			// Draw the outline image
			context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
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
					//redraw();
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

		// Calls the redraw function after all neccessary resources are loaded.
		resourceLoaded = function () {

			curLoadResNum += 1;
			if (curLoadResNum === totalLoadResources) {
				redraw();
				createUserEvents();
			}
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

			// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
			canvas = document.createElement('canvas');
			canvas.setAttribute('width', canvasWidth);
			canvas.setAttribute('height', canvasHeight);
			canvas.setAttribute('id', 'canvas');
			document.getElementById('canvasDiv').appendChild(canvas);
			if (typeof G_vmlCanvasManager !== "undefined") {
				canvas = G_vmlCanvasManager.initElement(canvas);
			}
			context = canvas.getContext("2d"); // Grab the 2d canvas context
			// Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
			//     context = document.getElementById('canvas').getContext("2d");

			// Load images
			crayonImage.onload = resourceLoaded;
			crayonImage.src = "images/crayon-outline.png";

			markerImage.onload = resourceLoaded;
			markerImage.src = "images/marker-outline.png";

			eraserImage.onload = resourceLoaded;
			eraserImage.src = "images/eraser-outline.png";

			crayonBackgroundImage.onload = resourceLoaded;
			crayonBackgroundImage.src = "images/crayon-background.png";

			markerBackgroundImage.onload = resourceLoaded;
			markerBackgroundImage.src = "images/marker-background.png";

			eraserBackgroundImage.onload = resourceLoaded;
			eraserBackgroundImage.src = "images/eraser-background.png";

			crayonTextureImage.onload = resourceLoaded;
			crayonTextureImage.src = "images/crayon-texture.png";

			outlineImage.onload = resourceLoaded;
			outlineImage.src = "images/pato.png";
			
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
		
		};

	return {
		init: init
	};
}());