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
var name="";

/**
 * Función llamada por ClearCanvas a través de un mensaje
 * enviado al tópico cuando quien dibuja decide borrar todo
 */
function canvasClr() {
	ctx.clearRect(0, 0, cnvW,cnvH);
	pointsX = []; 
	pointsY = [];
	pointsColor = [];
	pointsTool = [];
	pointsSize = [];
	pointsDrag = [];
};

/**
 * Toma la palabra que se presume, es
 * la correcta y la envía para ser
 * consultada
 */
function guessWord (){
	var guessing=document.getElementById("guessword").value;
        sendMessage(name+":"+guessing);
};

/**
 * Inicializa el canvas para quien
 * juega como adivinador (COMPATIBLE CON IE)
 * Almacena el  nombre del jugador
 */
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
        name=document.getElementById("nombre").value;
};

/**
 * Añade un punto cuando quien pinta, dibuja
 * un nuevo punto sobre el canvas
 * @param  x coordenada x
 * @param  y coordenada y
 * @param  color color del punto
 * @param  tool herramienta con que se pinta el punto
 * @param  size tamaño con que se pinta el punto
 * @param  drag indica si viene de evento de arrastre de mouse o no
 */
 function addPoint(x, y, color, tool, size, drag) {

	pointsX.push(x);
	pointsY.push(y);
	pointsTool.push(tool);
	pointsSize.push(size);
	pointsColor.push(color);
	pointsDrag.push(drag);
        redraw(pointsX, pointsY, ctx, pointsColor, pointsDrag, pointsTool, pointsSize, cnvW, cnvH, crayonTI);
};