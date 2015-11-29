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

		/*
		*Pinta el canvas completamente
		*/
		redraw = function () {
			

			for (var i = 0; i < clickX.length; i ++) {
				context.beginPath();
				if (clickDrag[i] && i) {
					context.moveTo(clickX[i - 1], clickY[i - 1]);
				} else {
					context.moveTo(clickX[i] - 1, clickY[i]);
				}
				context.lineTo(clickX[i], clickY[i]);
				
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
			
			if (curTool === "crayon") {
				context.globalAlpha = 0.4;
				context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
			}
			context.globalAlpha = 1; 
			sendMessage();			
		},

		// Guarda las propiedades de dibujo en un punto
		// @param x coordenada x
		// @param y coordenada y
		// @param dragging - Si el punto viene arrastrado
		addClick = function (x, y, dragging) {

			clickX.push(x);
			clickY.push(y);
			clickTool.push(curTool);
			clickColor.push(curColor);
			clickSize.push(curSize);
			clickDrag.push(dragging);
		},

		/*
		*Añade los mouseListeners a los eventos del
		*mouse sobre el canvas
		*/
		createUserEvents = function () {
			var press = function (e) {

				var mouseX = e.pageX - this.offsetLeft,
					mouseY = e.pageY - this.offsetTop;

				paint = true;
				addClick(mouseX, mouseY, false);
			    //communication.sendMessage();
				redraw();
			},

				drag = function (e) {
					if (paint) {
						addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
						//communication.sendMessage();						
						redraw();
					}					
				},

				release = function () {
					paint = false;
				},

				cancel = function () {
					paint = false;
				};

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

		/*
		*Inicializa los eventos del mouse
		*para los botones de la vista y
		*carga la textura de crayon. 
		*Prepara el canvas, compatible con IE
		*/
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
			document.getElementById("negro").addEventListener("click",function(){
				changeColor(document.getElementById("negro").value);
			});	
			document.getElementById("azul").addEventListener("click",function(){
				changeColor(document.getElementById("azul").value);
			});	
			document.getElementById("rojo").addEventListener("click",function(){
				changeColor(document.getElementById("rojo").value);
			});	
			document.getElementById("amarillo").addEventListener("click",function(){
				changeColor(document.getElementById("amarillo").value);
			});			
			document.getElementById("marron").addEventListener("click",function(){
				changeColor(document.getElementById("marron").value);
			});	
			document.getElementById("naranja").addEventListener("click",function(){
				changeColor(document.getElementById("naranja").value);
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
