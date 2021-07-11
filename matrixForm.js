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
function getFrms(){
	let frm=document.getElementById('MATRIXFRM')
	//------------------------------------------------------
	frontend.cnvs.FORMS={};
	//..................
	frontend.cnvs.FORMS.netMATRIX=frm.contentWindow.document.getElementById('cnvsM').getElementsByTagName('input');
	//------------------------------------------------------
	frontend.cam.FORMS={};
	//.................
	frontend.cam.FORMS.netMATRIX=frm.contentWindow.document.getElementById('camM').getElementsByTagName('input');
	//
	frontend.cam.FORMS.netPose=frm.contentWindow.document.getElementById('POSEM').getElementsByTagName('input');
	frontend.cam.FORMS.netIntrinsic=frm.contentWindow.document.getElementById('INTRINSIC').getElementsByTagName('input');
	//-------------------------------------------------------
	matrixFormDOM();
}
//-----------------------------------------
function matrixFormDOM(){
	fillCamM();
	for (let i=0;i<4;i++){for (let j=0;j<4;j++){frontend.cam.FORMS.netMATRIX[index1D(i,j,4)].onchange=function(){camGetFrmEntry('net',i,j);}}}
	fillCnvsM();
	for (let i=0;i<4;i++){for (let j=0;j<4;j++){frontend.cnvs.FORMS.netMATRIX[index1D(i,j,4)].onchange=function(){cnvsGetFrmEntry(i,j);}}}
	fillPoseM();
	for (let i=0;i<4;i++){for (let j=0;j<4;j++){frontend.cam.FORMS.netPose[index1D(i,j,4)].onchange=function(){camGetFrmEntry('pose',i,j);}}}
	fillIntM();
	for (let i=0;i<4;i++){for (let j=0;j<4;j++){frontend.cam.FORMS.netIntrinsic[index1D(i,j,4)].onchange=function(){camGetFrmEntry('intrinsic',i,j);}}}
}
//-------------------------------------------
function cnvsGetFrmEntry(i,j){
	scene.canvasT[i][j]=parseFloat(frontend.cnvs.FORMS.netMATRIX[index1D(i,j,4)].value);
	frontend.cnvs.FORMS.netMATRIX[index1D(i,j,4)].value=scene.canvasT[i][j].fmt(5,4);
}
//
function camGetFrmEntry(frm,i,j){
	if(scene.cam==null){scene.cam=identityMatrix(4);}
	if(scene.camComponents==null){decomposeCam();}
	switch(frm){
		case 'net':
			scene.cam[i][j]=parseFloat(frontend.cam.FORMS.netMATRIX[index1D(i,j,4)].value);
			frontend.cam.FORMS.netMATRIX[index1D(i,j,4)].value=scene.cam[i][j].fmt(5,4);
			break;
		case 'pose':
			if (i<3){
				scene.camComponents.ROT[i][j]=parseFloat(frontend.cam.FORMS.netPose[index1D(i,j,4)].value);
				frontend.cam.FORMS.netPose[index1D(i,j,4)].value=scene.camComponents.ROT[i][j].fmt(5,4);
			}
			else{
				scene.camComponents.POS[j]=-1*parseFloat(frontend.cam.FORMS.netPose[index1D(i,j,4)].value);
				frontend.cam.FORMS.netPose[index1D(i,j,4)].value=scene.camComponents.POS[j].fmt(4,4);
			}
			scene.cam=Camera(poseM(scene.camComponents.ROT,scene.camComponents.POS),scene.camComponents.INTRINSIC);
			break;
		case 'intrinsic':
			scene.camComponents.INTRINSIC[i][j]=parseFloat(frontend.cam.FORMS.netIntrinsic[index1D(i,j,4)].value);
			scene.cam=Camera(poseM(scene.camComponents.ROT,scene.camComponents.POS),scene.camComponents.INTRINSIC);
			frontend.cam.FORMS.netIntrinsic[index1D(i,j,4)].value=scene.camComponents.INTRINSIC[i][j].fmt(4,4);
			break;
	}
	fillCamM();
	decomposeCam();
}
//------------------------------------------
let camRfrm,camPfrm,camIntfrm;
let cnvThetafrm,cnvPosfrm,cnvsRMfrms;
//-----------------------------------------
function fillCamM(){
	let camMtemp=scene.cam||identityMatrix(4);
	for (let i=0;i<4;i++){for (let j=0;j<4;j++){frontend.cam.FORMS.netMATRIX[index1D(i,j,4)].value=camMtemp[i][j].fmt(5,4);}}
}
function fillCnvsM(){
	for (let i=0;i<4;i++){for (let j=0;j<4;j++){frontend.cnvs.FORMS.netMATRIX[index1D(i,j,4)].value=scene.canvasT[i][j].fmt(5,4);}}
}
//
function fillPoseM(){
	let cammatrix=scene.cam||identityMatrix(4);
	let decomp=scene.camComponents||decomposeCam(cammatrix);
	let poseMatrix=transM(decomp.POS,decomp.ROT);
	for (let i=0;i<4;i++){for (let j=0;j<4;j++){frontend.cam.FORMS.netPose[index1D(i,j,4)].value=poseMatrix[i][j].fmt(4,4);}}
}
function fillIntM(){
	let cammatrix=scene.cam||identityMatrix(4);
	let decomp=scene.camComponents||decomposeCam(cammatrix);
	for (let i=0;i<4;i++){for (let j=0;j<4;j++){frontend.cam.FORMS.netIntrinsic[index1D(i,j,4)].value=decomp.INTRINSIC[i][j].fmt(4,4);}}
}