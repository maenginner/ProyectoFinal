"use strict";

var clickX=[];
var clickY = [];
var clickColor = [];
var clickTool = [];
var clickSize = [];
var clickDrag = [];
var canvas;
var context;
var canvasWidth = 800;
var canvasHeight = 600;
var crayonTextureImage = new Image();
var paint = false;
var curColor = "#659b41";
var curTool = "marker";
var curSize = 5;
var correctWord="";
/*
*Limpia el canvas completamente, reiniciando los datos a
*sus valores iniciales 
*/
function clearCanvas() {
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        clickX = []; 
	clickY = [];
	clickColor = [];
	clickTool = [];
	clickSize = [];
	clickDrag = [];
};

/*
*Pinta el canvas completamente
*/
function redraw(xcoord, ycoord, cont, colors, dragg, tools, sizeP, wid, hei, texti ){
	for (var i = 0; i < xcoord.length; i ++) {
		cont.beginPath();
		if (dragg[i] && i) {
			cont.moveTo(xcoord[i - 1], ycoord[i - 1]);
		} else {
			cont.moveTo(xcoord[i] - 1, ycoord[i]);
		}
		cont.lineTo(xcoord[i], ycoord[i]);
		
		if (tools[i] === "borrador") {
			cont.strokeStyle = 'white';
		} else {
			cont.strokeStyle = colors[i];
		}
		cont.lineCap = "round";
		cont.lineJoin = "round";
		cont.lineWidth = sizeP[i];
		cont.stroke();
	}
	cont.closePath();
	cont.restore();
	
	if (tools[tools.length-1] === "crayon") {
		cont.globalAlpha = 0.4;
		cont.drawImage(texti, 0, 0, wid, hei);
	}
	cont.globalAlpha = 1; 
};

// Guarda las propiedades de dibujo en un punto
// @param x coordenada x
// @param y coordenada y
// @param dragging - Si el punto viene arrastrado
function addClick (x, y, dragging) {

	clickX.push(x);
	clickY.push(y);
	clickTool.push(curTool);
	clickColor.push(curColor);
	clickSize.push(curSize);
	clickDrag.push(dragging);  
        var index=clickX.length-1;
        var message=clickX[index]+","+clickY[index]+","+clickColor[index]+","+clickTool[index]+","+clickSize[index]+","+clickDrag[index];
        sendMessage(message);
        redraw(clickX, clickY, context, clickColor, clickDrag, clickTool, clickSize, canvasWidth,canvasHeight,crayonTextureImage);
};

function compareWords(word){
    console.log("funciona "+word);
    if (word===correctWord){
        console.log("HAY GANADOR!!!!!!!");
    }
};
/*
*Añade los mouseListeners a los eventos del
*mouse sobre el canvas
*/
function createUserEvents () {
	var press = function (e) {
        	var mouseX = e.pageX - this.offsetLeft,
		mouseY = e.pageY - this.offsetTop;
		paint = true;
		addClick(mouseX, mouseY, false);
        		//redraw(clickX, clickY, context, clickColor, clickDrag, clickTool, clickSize);
		},

		drag = function (e) {
			if (paint) {
				addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                          //      redraw(clickX, clickY, context, clickColor, clickDrag, clickTool, clickSize);
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
};
		
function changeColor(color){
	curColor=color;
};
		
function changeTool(tool){
	curTool=tool;	
};
		
function changeSize (size){
	curSize=size;	
};

/*
*Inicializa los eventos del mouse
*para los botones de la vista y
*carga la textura de crayon. 
*Prepara el canvas, compatible con IE
*/
function init() {

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
        correctWord=document.getElementById("palabra").value;
        console.log(correctWord);
        initM();
};


        

