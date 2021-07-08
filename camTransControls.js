let cen,orn,foc,poff,skewP;
let camCX,camCY,camCZ;
let camRotX,camRotY,camRotZ;
let fX,fY,poffX,poffY,skew;
let refresh;
//----------------------------------------------
function camControls(){
	let intDM  =createDiv('');
	let intDs  =createDiv('');
	let extD  =createDiv('');
	//
	let intDt =createDiv("<b>camera's intrinsic settings</b>");
	let extDt =createDiv("<b>camera's extrinsic settings</b>");
	//
	let ornD =createDiv('orientation');
	let cenD =createDiv('positioning');
	let focD =createDiv('focal lengths');
	let poffD=createDiv('p.axis offset');
	let skewD=createDiv('skew');
	//
	orn  =createP();
	cen  =createP();
	foc  =createP();
	poff =createP();
	skewP=createP();
	//
	let lrx=createSpan('X&nbsp;');
	let lry=createSpan('Y&nbsp;');
	let lrz=createSpan('Z&nbsp;');
	let obH=createP('');//button holder.
	let lpx=createSpan('X&nbsp;');
	let lpy=createSpan('Y&nbsp;');
	let lpz=createSpan('Z&nbsp;');
	let pbH=createP('');
	let lfx=createSpan('X&nbsp;');
	let lfy=createSpan('Y&nbsp;');
	let fbH=createP('');
	let lpoffx=createSpan('X&nbsp;');
	let lpoffy=createSpan('Y&nbsp;');
	let pobH=createP('');
	let lskew=createSpan('');
	let sbH=createP('');
	//
	camRotX=createSlider(-180 , 180 , 0, 0.05);
	camRotY=createSlider(-180 , 180 , 0, 0.05);
	camRotZ=createSlider(-180 , 180 , 0, 0.05);
	camCX  =createSlider(-200 , 200 , 0, 0.05);
	camCY  =createSlider(-200 , 200 , 0, 0.05);
	camCZ  =createSlider(-200 , 200 , 0, 0.05);
	fX     =createSlider(  -2 ,   2 , 1, 0.001);
	fY     =createSlider(  -2 ,   2 , 1, 0.001);
	poffX  =createSlider(  -2 ,   2 , 0, 0.001);
	poffY  =createSlider(  -2 ,   2 , 0, 0.001);
	skew   =createSlider(  -2 ,   2 , 0, 0.0001);
	let resetCamOb=createButton('reset');
	let resetCamPb=createButton('reset');
	let resetCamFb=createButton('reset');
	let resetCamPob=createButton('reset');
	let resetCamSb=createButton('reset');
	//------------------------------------------------------------------------
	extDt.parent(select('#camControls'));//lvl1
	intDt.parent(select('#camControls'));
	//...................
	extD.parent(extDt);//lvl2
	intDM.parent(intDt);
	intDs.parent(intDt);
	intDs.style('width:540px;');
	//....................................
	ornD.parent(extD);//lvl3
	cenD.parent(extD);
	focD.parent(intDM);
	poffD.parent(intDM);
	skewD.parent(intDs);
	skewD.style('width:540px;')
	//...............................
	orn.parent(ornD);//lvl4
	cen.parent(cenD);
	foc.parent(focD);
	poff.parent(poffD);
	skewP.parent(skewD);
	//
	lrx.parent(ornD);//lvl4
	lry.parent(ornD);
	lrz.parent(ornD);
	obH.parent(ornD);
	lpx.parent(cenD);
	lpy.parent(cenD);
	lpz.parent(cenD);
	pbH.parent(cenD);
	lfx.parent(focD);
	lfy.parent(focD);
	fbH.parent(focD);
	lpoffx.parent(poffD);
	lpoffy.parent(poffD);
	pobH.parent(poffD);
	lskew.parent( skewD);
	sbH.parent( skewD);
	//....................................
	camRotX.parent(lrx);//lvl5
	camRotY.parent(lry);
	camRotZ.parent(lrz);
	camCX.parent(lpx);
	camCY.parent(lpy);
	camCZ.parent(lpz);
	fX.parent(lfx);
	fY.parent(lfy);
	poffX.parent(lpoffx);
	poffY.parent(lpoffy);
	skew.parent(lskew);
	//
	resetCamOb.parent(obH);
	resetCamPb.parent(pbH);
	resetCamFb.parent(fbH);
	resetCamPob.parent(pobH);
	resetCamSb.parent(sbH);
	//-------------------------------------------
	camRotX.changed(updateviewCam);
	camRotY.changed(updateviewCam);
	camRotZ.changed(updateviewCam);
	camCX.changed(updateviewCam);
	camCY.changed(updateviewCam);
	camCZ.changed(updateviewCam);
	fX.changed(updateviewCam);
	fY.changed(updateviewCam);
	poffX.changed(updateviewCam);
	poffY.changed(updateviewCam);
	skew.changed(updateviewCam);
	//
	resetCamOb.mousePressed(resetCamOrn);
	resetCamPb.mousePressed(resetCamPos);
	resetCamFb.mousePressed(resetCamFoc);
	resetCamPob.mousePressed(resetCamPoff);
	resetCamSb.mousePressed(resetCamSkew);
	//-----------------------------------------
}
//----------------------------------------------
function updateviewCam(){
	//====================================
	const rx=camRotX.value()*Math.PI/180;const ry=camRotY.value()*Math.PI/180;const rz=camRotZ.value()*Math.PI/180;
	let camR=rollpitchyaw([rx,ry,rz])
	let rrx=(rx*180/Math.PI),rry=(ry*180/Math.PI),rrz=(rz*180/Math.PI);
	rrx=rrx.fmt(1,3);rry=rry.fmt(1,3);rrz=rrz.fmt(1,3);
	orn.html(rrx +'° '+rry +'° ' +rrz +'°')
	//--------
	const cx=camCX.value();const cy=camCY.value();const cz=camCZ.value()
	let camC=[cx*VANISH.x/100,cy*VANISH.y/100,cz*VANISH.z/100];
	const ccx=cx.fmt(2,3); const ccy=cy.fmt(2,3); const ccz=cz.fmt(2,3);
	cen.html(ccx +'% '+ccy +'% ' +ccz+ '%')
	//-----------
	const focx=fX.value();  const focy=fY.value();
	const  px=poffX.value();const py=poffY.value();
	const s=skew.value();
	const ffx=focx.fmt(3,1);const ffy=focy.fmt(3,1)
	const ppx=px.fmt(3,1) ; const ppy=py.fmt(3,1);
	foc.html('\t\[' + ffx +', '+ffy +'\]\t');
	poff.html('\t\[' + ppx +', '+ppy +'\]\t');
	skewP.html(s.fmt(5,1));
	//======================================
	let camextr=poseM(camR,camC);
	let camintr=intrinsicM(focx,focy,px,py,s);
	//-------------------------------------
	//let camCurr=Camera(camintr,camextr);
	//if(matEq(camCurr,scene.cam)){return false;}
	//return true;
	//-------------------------------------
	let camTemp=Camera(camintr,camextr);
	if(matEq(camTemp,identityMatrix(4))){scene.cam=null;}
	else{scene.cam=camTemp;}
	//------------------------------------
	fillCamM()
	//========================================
}

function resetCamOrn(){
	camSlidersReset('o');
	updateviewCam();
}
function resetCamPos(){
	camSlidersReset('p');
	updateviewCam();
}
function resetCamFoc(){
	camSlidersReset('f');
	updateviewCam();
}
function resetCamPoff(){
	camSlidersReset('poff');
	updateviewCam();
}
function resetCamSkew(){
	camSlidersReset('s');
	updateviewCam();
}
//--------------------------------------------------
function resetcam(digi){
	camSlidersReset('o',digi);
	camSlidersReset('p',digi);
	camSlidersReset('f',digi);
	camSlidersReset('poff',digi);
	camSlidersReset('s',digi);
	scene.cam=null;
	updateviewCam();
}
function camSlidersReset(option,digi){
	switch (option){
		case 'o':
			camRotX.value(0);
			camRotY.value(0);
			camRotZ.value(0);
			break;
		case 'p':
			if (digi){
				camCX.value(width/2);
				camCY.value(-height/2);
			}
			else{
				camCX.value(0);
				camCY.value(0);
			}
			camCZ.value(0);
			break;
		case  'f':
			fX.value(1);
			fY.value(1);
			break;
		case  'poff':
			poffX.value(0);
			poffY.value(0);
			break;
		case 's':
			skew.value(0);
			break;
	}
}