let canvasC,canvasR, canvasS;
let canvasTX,canvasTY,canvasTZ;
let canvasRotX,canvasRotY,canvasRotZ;
let canvasSclX,canvasSclY,canvasSclZ;
let resetCanvasRb,resetCanvasCb,resetCanvasSb;
//----------------------------------------------
function canvasControls(){
	let rotH =createDiv('<b>rotate system</b>');
	let sclH =createDiv('<b>scale system</b>');
	let trnsH=createDiv('<b>shift system</b>');
	//
	let Bs=createDiv('');
	let rotD =createDiv('');
	let sclD=createDiv('');
	let trnsD =createDiv('');
	let rotB =createDiv('');
	let sclB =createDiv('');
	let trnsB =createDiv('');
	//
	canvasR=createP();
	canvasS=createP();
	canvasC=createP();
	//
	let lrx=createDiv('X');
	let lry=createDiv('Y');
	let lrz=createDiv('Z');
	let lsx=createDiv('X');
	let lsy=createDiv('Y');
	let lsz=createDiv('Z');
	let ltx=createDiv('X');
	let lty=createDiv('Y');
	let ltz=createDiv('Z');
	//
	canvasRotX=createSlider(-180       ,180       ,0);
	canvasRotY=createSlider(-180       ,180       ,0);
	canvasRotZ=createSlider(-180       ,180       ,0);
	canvasTX  =createSlider(-width*0.5 ,width *1.5,0);
	canvasTY  =createSlider(-height*0.5,height*1.5,0);
	canvasTZ  =createSlider(0          ,depth     ,0);
	canvasSclX=createSlider(-10        ,10        ,1,0.01);
	canvasSclY=createSlider(-10        ,10        ,1,0.01);
	canvasSclZ=createSlider(-10        ,10        ,1,0.01);
	//
	resetCanvasRb=createButton('reset');
	resetCanvasSb=createButton('reset');
	resetCanvasCb=createButton('reset');
	//---------------------------------------------
	rotH.parent(select('#canvasCtrls'));//lvl1
	sclH.parent(select('#canvasCtrls'));
	trnsH.parent(select('#canvasCtrls'));
	Bs.parent(select('#canvasCtrls'));
	Bs.id('resetCnv');
	//-------------------------------
	canvasR.parent(rotH);//lvl2
	canvasS.parent(sclH);
	canvasC.parent(trnsH);
	//
	rotD.parent(rotH);//lvl2
	sclD.parent(sclH)
	trnsD.parent(trnsH);
	//
	rotB.parent(Bs);//lvl2
	sclB.parent(Bs);
	trnsB.parent(Bs);
	//---------------------------------------

	//
	lrx.parent(rotD);//lvl3
	lry.parent(rotD);
	lrz.parent(rotD);
	lsx.parent(sclD);
	lsy.parent(sclD);
	lsz.parent(sclD);
	ltx.parent(trnsD);
	lty.parent(trnsD);
	ltz.parent(trnsD);
	//
	resetCanvasRb.parent(rotB);
	resetCanvasSb.parent(sclB);
	resetCanvasCb.parent(trnsB);
	//-----------------------------------------------
	canvasRotX.parent(lrx);//lvl4
	canvasRotY.parent(lry);
	canvasRotZ.parent(lrz);
	canvasSclX.parent(lsx);
	canvasSclY.parent(lsy);
	canvasSclZ.parent(lsz);
	canvasTX.parent(ltx);
	canvasTY.parent(lty);
	canvasTZ.parent(ltz);
	//----------------------------------------
	canvasRotX.changed(updateviewC);
	canvasRotY.changed(updateviewC);
	canvasRotZ.changed(updateviewC);
	canvasSclX.changed(updateviewC);
	canvasSclY.changed(updateviewC);
	canvasSclZ.changed(updateviewC);
	canvasTX.changed(updateviewC);
	canvasTY.changed(updateviewC);
	canvasTZ.changed(updateviewC);
}
//----------------------------------------------
function updateviewC(){
	//=================
	let rx=canvasRotX.value()*Math.PI/180,ry=canvasRotY.value()*Math.PI/180,rz=canvasRotZ.value()*Math.PI/180;
	let rrx=nf(rx*180/Math.PI,3,1),rry=nf(ry*180/Math.PI,3,1),rrz=nf(rz*180/Math.PI,3,1);
	canvasR.html(rrx +'°<br>'+rry +'°<br>' +rrz +'°')
	//let R=rollpitchyaw([rx,ry,rz]);
	//--------
	let tx=canvasTX.value(),ty=canvasTY.value(),tz=canvasTZ.value()
	let cx=nf(tx,3,1),cy=nf(ty,3,1),cz=nf(tz,3,1);
	canvasC.html(cx +'<br>'+cy +'<br>' +cz )
	//-----------
	let sx=canvasSclX.value(),sy=canvasSclY.value(),sz=canvasSclZ.value()
	let ssx=nf(sx,3,1),ssy=nf(sy,3,1),ssz=nf(sz,3,1);
	canvasS.html(ssx +'<br>'+ssy +'<br>' +ssz )
	//----------
	resetScreen()
	rot(rx,ry,rz);
	scaleCnvs(sx,sy,sz);
	trans(tx,ty,tz);
	canvasTupd=true;
}
function resetcanvas(digi){
	slidersReset(digi);
}
function slidersResetC(digi){
	if(digi){
		canvasTX.value(-width/2);
		canvasTY.value(-height/2);
	}
	else{
		canvasTX.value(0);
		canvasTY.value(0);
	}
	canvasTZ.value(0);
	canvasRotX.value(0);
	canvasRotY.value(0);
	canvasRotZ.value(0);
	fX.value(1);
	fY.value(1);
	poffX.value(0);
	poffY.value(0);
	skew.value(0);
	updateviewC();
}