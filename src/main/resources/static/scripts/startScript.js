var startApp=(function(){
	"use strict";
	var beDrawer=function(){
		drawingApp.init();
		document.getElementById('col2').style.visibility='visible';
		document.getElementById('initialButtons').style.visibility='hidden';
	},
	
	beGuesser=function (){
		guesserApp.initialize();
		document.getElementById('col3').style.visibility='visible';
		document.getElementById('initialButtons').style.visibility='hidden';
	},
	
	start=function(){
		document.getElementById("col2").style.visibility='hidden';
		document.getElementById("col3").style.visibility='hidden';
		document.getElementById("initialButtons").style.visibility='visible';
		document.getElementById("drawer").addEventListener("click",beDrawer);
		document.getElementById("guesser").addEventListener("click",beGuesser);
			
	};
	
	return{
		start:start
	};
}());
	
	

