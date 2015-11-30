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
var alreadyDrawer="0";

/**
 * 
 * @param message Indica si hay al menos
 * un usuario de la aplicación que se ha 
 * propuesto como dibujante. Solo puede
 * haber un dibujante por partida.
 */
function changeDrawer(message){
    alreadyDrawer=message;
};

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
        sendMessage("deleteall");
};

/**
 * 
 * @param xcoord Coordenadas X del dibujo
 * @param ycoord Coordenadas Y del dibujo
 * @param cont Contexto 2d del canvas
 * @param colors Colores de cada punto del dibujo
 * @param dragg Indica si los puntos son por evento click o drag
 * @param tools Herramienta pertinente a cada punto
 * @param sizeP Tamanio con que se pinta cada punto
 * @param wid Alto del canvas
 * @param hei Ancho del canvas
 * @param texti Referencia a la imagen de textura de crayon
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

/**
 * 
 * @param word Palabra que se compara con la respuesta
 */
function compareWords(word){
    var newW=word.split(":");
    if (newW[1].toUpperCase().trim()===correctWord.toUpperCase().trim()){
        sendMessage("WIN,"+newW[0]);
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
		},

		drag = function (e) {
			if (paint) {
				addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
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

/**
 * 
 * @param color Nuevo color a usar al cambiarlo en la 
 * interfaz gráfica
 */
function changeColor(color){
	curColor=color;
};


/**
 * Muestra el jugador ganador y termina la partida
 * @param message Nombre del ganador
 */
function finishGame(message){
    var content="!! "+message+" ha ganado!!"
    console.log(content.toUpperCase());
    document.getElementById("col2").style.visibility='hidden';
    document.getElementById("col3").style.visibility='hidden';
    document.getElementById("canvasDiv").style.visibility='hidden';
    document.getElementById("winner").innerHTML=content.toUpperCase();
    document.getElementById("finished").style.visibility='visible'; 
};

/**
 * 
 * @param tool Nueva herramienta a usar al cambiarla en la 
 * interfaz gráfica
 */
function changeTool(tool){
	curTool=tool;	
};

/**
 * 
 * @param size Nuevo tamanio a usar al cambiarlo en la 
 * interfaz gráfica
 */
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

        sendMessage("1");
};


        

