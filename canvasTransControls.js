let canvasC,canvasR, canvasS;
let canvasTX,canvasTY,canvasTZ;
let canvasRotX,canvasRotY,canvasRotZ;
let canvasSclX,canvasSclY,canvasSclZ;
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
	canvasRotX=createSlider(-180       ,180       ,0,0.05);
	canvasRotY=createSlider(-180       ,180       ,0,0.05);
	canvasRotZ=createSlider(-180       ,180       ,0,0.05);
	canvasTX  =createSlider(-width *2.5,width *2.5 ,0.1);
	canvasTY  =createSlider(-height*2.5,height*2.5 ,0.1);
	canvasTZ  =createSlider(-depth *2.5,depth *2.5 ,0.1);
	canvasSclX=createSlider(-10        ,10        ,1,0.01);
	canvasSclY=createSlider(-10        ,10        ,1,0.01);
	canvasSclZ=createSlider(-10        ,10        ,1,0.01);
	//
	let resetCanvasRb=createButton('reset');
	let resetCanvasSb=createButton('reset');
	let resetCanvasCb=createButton('reset');
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
	canvasRotX.changed(updateviewCnvs);
	canvasRotY.changed(updateviewCnvs);
	canvasRotZ.changed(updateviewCnvs);
	canvasSclX.changed(updateviewCnvs);
	canvasSclY.changed(updateviewCnvs);
	canvasSclZ.changed(updateviewCnvs);
	canvasTX.changed(updateviewCnvs);
	canvasTY.changed(updateviewCnvs);
	canvasTZ.changed(updateviewCnvs);
	//
	resetCanvasRb.mousePressed(resetCnvRot);
	resetCanvasSb.mousePressed(resetCnvScl);
	resetCanvasCb.mousePressed(resetCnvTrns);
	//-------------------------------
}
//----------------------------------------------
function updateviewCnvs(){
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
	let ssx=nf(sx,2,2),ssy=nf(sy,2,2),ssz=nf(sz,2,2);
	canvasS.html(ssx +'<br>'+ssy +'<br>' +ssz )
	//----------
	resetScreen()
	rot(rx,ry,rz);
	scaleCnvs(sx,sy,sz);
	trans(tx,ty,tz);
	canvasTupd=true;
}
//--------------------------------------------------
function resetCnvRot(){
	cnvSlidersReset('r');
	updateviewCnvs();
}
function resetCnvScl(){
	cnvSlidersReset('s');
	updateviewCnvs();
}
function resetCnvTrns(){
	cnvSlidersReset('t');
	updateviewCnvs();
}
//--------------------------------------------------
function resetcanvas(digi){
	cnvSlidersReset('r',digi);
	cnvSlidersReset('s',digi);
	cnvSlidersReset('t',digi);
}
function cnvSlidersReset(option,digi){
	switch (option){
		case 'r':
			canvasRotX.value(0);
			canvasRotY.value(0);
			canvasRotZ.value(0);
			break;
		case 't':
			if (digi){
				canvasTX.value(width/2);
				canvasTY.value(-height/2);
			}
			else{
				canvasTX.value(0);
				canvasTY.value(0);
			}
			canvasTZ.value(0);
			break;
		case  's':
			canvasSclX.value(1);
			canvasSclY.value(1);
			if (digi){
				canvasSclY.value(-1);
			}
			canvasSclZ.value(1);
	}
}