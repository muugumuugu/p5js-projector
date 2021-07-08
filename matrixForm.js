function toggleSliderTbl(){
	if (select('#switchView').html()=='MATRIX VIEW &gt;&gt;'){
		document.getElementById("matrices").style.display='block';
		select('#switchView').html('Sliding Controls &gt;&gt;');
	}
	else{
		document.getElementById("matrices").style.display='none';
		select('#switchView').html('MATRIX VIEW &gt;&gt;');
	}
}
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
let frm;
let canvasMfrm,camMfrm;
let poseMfrm,intrinsicMfrm;
let camRfrm,camPfrm,camIntfrm;
let cnvThetafrm,cnvPosfrm,cnvsRMfrms;

//-----------------------------------------
function fillCamM(){
	let camMtemp;
	if(scene.cam){camMtemp=scene.cam;}else{camMtemp=identityMatrix(4);}
	for (let i=0;i<4;i++){for (let j=0;j<4;j++){camMfrm[index1D(i,j,4)].value=camMtemp[i][j].fmt(4,4);}}
}
function fillCnvsM(){
	for (let i=0;i<4;i++){for (let j=0;j<4;j++){canvasMfrm[index1D(i,j,4)].value=scene.canvasT[i][j].fmt(4,4);}}
}
//
function fillPoseM(){
}
function fillIntM(){
}
function getFrms(){
	let frm=document.getElementById('form')
	canvasMfrm=frm.contentWindow.document.getElementById('cnvsM').getElementsByTagName('input');
	camMfrm=frm.contentWindow.document.getElementById('camM').getElementsByTagName('input');
	poseMfrm=frm.contentWindow.document.getElementById('POSEM').getElementsByTagName('input');
	intrinsicMfrm=frm.contentWindow.document.getElementById('INTRINSIC').getElementsByTagName('input');
	matrixFormDOM();
}
//-----------------------------------------
function matrixFormDOM(){
	fillCamM();
	for (let i=0;i<4;i++){
		for (let j=0;j<4;j++){
			camMfrm[index1D(i,j,4)].onchange=function(){camGetFrmEntry(i,j);}
		}
	}
	fillCnvsM();
	for (let i=0;i<4;i++){
		for (let j=0;j<4;j++){
			canvasMfrm[index1D(i,j,4)].onchange=function(){cnvsGetFrmEntry(i,j);}
		}
	}
	fillPoseM();
	for (let i=0;i<4;i++){
		for (let j=0;j<4;j++){
			poseMfrm[index1D(i,j,4)].onchange=function(){poseGetFrmEntry(i,j);}
		}
	}
	fillIntM();
	for (let i=0;i<4;i++){
		for (let j=0;j<4;j++){
			intrinsicMfrm[index1D(i,j,4)].onchange=function(){intrinsicGetFrmEntry(i,j);}
		}
	}
}
function cnvsGetFrmEntry(i,j){
	scene.canvasT[i][j]=parseFloat(canvasMfrm[index1D(i,j,4)].value);
	canvasMfrm[index1D(i,j,4)].value=scene.canvasT[i][j].fmt(4,4);
}
function camGetFrmEntry(i,j){
	if(scene.cam==null){scene.cam=identityMatrix(4);}
	scene.camT=parseFloat(canvasMfrm[index1D(i,j,4)].value);
}
//------------------------------------------