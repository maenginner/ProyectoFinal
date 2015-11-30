
var startApp=(function(){
	"use strict";
        
        var preDrawer=function (){               	
                document.getElementById("insertWord").style.visibility='visible';
                document.getElementById("en").addEventListener("click",beDrawer);
                document.getElementById('initialButtons').style.visibility='hidden';
                 if(alreadyDrawer==="1"){                    
                    preGuesser();                    
                }
        },
	 beDrawer=function(){    
                init();
                document.getElementById("insertWord").style.visibility='hidden';
		document.getElementById('col2').style.visibility='visible';
               
	},
	
        preGuesser = function(){
                document.getElementById("insertWord").style.visibility='hidden';
                document.getElementById('initialButtons').style.visibility='hidden';
                document.getElementById("insertName").style.visibility='visible';
                document.getElementById("nam").addEventListener("click",beGuesser);                
        },
	beGuesser=function (){
		initialize();
		document.getElementById('col3').style.visibility='visible';		
                document.getElementById("insertWord").style.visibility='hidden';
	},
	
	start=function(){
                initM();
		document.getElementById("col2").style.visibility='hidden';
		document.getElementById("col3").style.visibility='hidden';
		document.getElementById("initialButtons").style.visibility='visible';
                document.getElementById("insertWord").style.visibility='hidden';
                document.getElementById("insertName").style.visibility='hidden';
		document.getElementById("drawer").addEventListener("click",preDrawer);
		document.getElementById("guesser").addEventListener("click",preGuesser);	
	};
	
	return{
		start:start
	};
}());
	
	

