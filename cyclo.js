/*================================================================================
CycloMenu v1.0
Created by Abhishek Ghosh
----------------------------------------------------------------------------------
PRE-REQUISITES:
---------------
PARENT:
	class=cycloParent
	id=cParent
	
ELEMENTS:
	tag: DIV 
	class=cycloElement (cycloElement highlight)
================================================================================*/

var whichEl=0;
function initCyclo(innerRad)
{
	whichEl=0;
	var parent=document.getElementById("cParent");
	var N=parent.getElementsByTagName("div").length;
	var Wpx=parent.style.width; 
	var W=Number(Wpx.substr(0,Wpx.length-2));
	var Hpx=parent.style.width; 
	var H=Number(Hpx.substr(0,Hpx.length-2));
	if(W>=H)
	{
		parent.style.height=W+"px";
		D=W;
	}
	else
	{
		parent.style.width=H+"px";
		D=H;
	}
	var R=D/2;
	if(isNaN(innerRad)) { innerRad=100; }	
	var L=innerRad;
	var i,dTheta;
	dTheta=2*Math.PI/N;
	dThetaDeg=360/N;
	var thisLeft, thisTop;
	for(i=0;i<N;i++)
	{
		var thisItem=parent.getElementsByTagName("div").item(i);
		thisLeft=R+L*Math.cos(i*dTheta)+"px";
		thisTop=R+L*Math.sin(i*dTheta)+"px";
		thisItem.style.left=thisLeft;
		thisItem.style.top=thisTop;
		thisItem.style.webkitTransform="rotate("+i*dThetaDeg+"deg)";
		thisItem.style.msTransform="rotate("+i*dThetaDeg+"deg)";
		thisItem.style.MozTransform="rotate("+i*dThetaDeg+"deg)";
		thisItem.style.OTransform="rotate("+i*dThetaDeg+"deg)";
		thisItem.style.transform="rotate("+i*dThetaDeg+"deg)";			
		thisItem.addEventListener("click",function () { bringForth(this); },false);
	}
}
function rotateC(times)
{
	var parent=document.getElementById("cParent");
	var N=parent.getElementsByTagName("div").length;
	var dThetaDeg=360/N;
	var i, elNx, whichElP, oIH;
	for(i=1;i<=times;i++)
	{
		if(whichEl>=0) 
		{ 
			elNx=(N-whichEl%N)%N; 
		} 
		else
		{
			whichElP=whichEl;
			while(whichElP<0) { whichElP+=N; }
			elNx=(N-whichElP%N)%N;
		}
		parent.getElementsByTagName("div").item(elNx).className="cycloElement";
		whichEl++;
		parent.style.webkitTransform="rotate("+whichEl*dThetaDeg+"deg)";
		parent.style.msTransform="rotate("+whichEl*dThetaDeg+"deg)";
		parent.style.MozTransform="rotate("+whichEl*dThetaDeg+"deg)";
		parent.style.OTransform="rotate("+whichEl*dThetaDeg+"deg)";
		parent.style.transform="rotate("+whichEl*dThetaDeg+"deg)";
		elNx--; if(elNx<0) { elNx=N-1; }
		parent.getElementsByTagName("div").item(elNx).className="cycloElement highlight";
	}
}
function rotateCC(times)
{
	var parent=document.getElementById("cParent");
	var N=parent.getElementsByTagName("div").length;
	var dThetaDeg=360/N;
	var i, elNx, whichElP;;
	for(i=1;i<=times;i++)
	{
		if(whichEl>=0) 
		{ 
			elNx=(N-whichEl%N)%N; 
		} 
		else
		{
			whichElP=whichEl;
			while(whichElP<0) { whichElP+=N; }
			elNx=(N-whichElP%N)%N;
		}
		parent.getElementsByTagName("div").item(elNx).className="cycloElement";
		whichEl--;
		parent.style.webkitTransform="rotate("+whichEl*dThetaDeg+"deg)";
		parent.style.msTransform="rotate("+whichEl*dThetaDeg+"deg)";
		parent.style.MozTransform="rotate("+whichEl*dThetaDeg+"deg)";
		parent.style.OTransform="rotate("+whichEl*dThetaDeg+"deg)";
		parent.style.transform="rotate("+whichEl*dThetaDeg+"deg)";
		elNx++; if(elNx>=N) { elNx=0; }
		parent.getElementsByTagName("div").item(elNx).className="cycloElement highlight";
	}
}
function bringForth(whoMe)
{
	var parent=document.getElementById("cParent");
	var N=parent.getElementsByTagName("div").length;
	var cnt=0; 
	var who=whoMe;
	while(who.previousSibling)
	{ 
		if(who.nodeType!=1) { cnt++; }						
		who=who.previousSibling;			
	}
	var elN, whichElP;
	if(whichEl>=0) 
	{ 
		elN=(N-whichEl%N)%N; 
	} 
	else
	{
		whichElP=whichEl;
		while(whichElP<0) { whichElP+=N; }
		elN=(N-whichElP%N)%N;
	}
	var gap=cnt-elN;
	if(gap>=0 && gap<=N/2) { rotateCC(gap); }
	else if(gap>=0 && gap>N/2) { rotateC(N-gap); }
	else if(gap<0 && gap<-N/2) { rotateCC(N+gap); }
	else { rotateC(-1*gap); }	
}

