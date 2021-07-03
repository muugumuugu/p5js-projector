//
function resetScreen(){
	scene.canvasT=tMatrix();
	scene.canvasTupd=false;
}
//
function rotX(ang){
	let mainM=matMult(minor(scene.canvasT,3,3),transposed(rotMatrix('x',ang)));
	scene.canvasT[0]=mainM[0];
	scene.canvasT[1]=mainM[1];
	scene.canvasT[2]=mainM[2];
	return scene.canvasT;
}
function rotY(ang){
	let mainM=matMult(minor(scene.canvasT,3,3),transposed(rotMatrix('y',ang)));
	scene.canvasT[0]=mainM[0];
	scene.canvasT[1]=mainM[1];
	scene.canvasT[2]=mainM[2];
	return scene.canvasT;
}
function rotZ(ang){
	let mainM=matMult(minor(scene.canvasT,3,3),transposed(rotMatrix('z',ang)));
	scene.canvasT[0]=mainM[0];
	scene.canvasT[1]=mainM[1];
	scene.canvasT[2]=mainM[2];
	return scene.canvasT;
}
function rot(ax,ay,az){
	rotX(ax);
	rotY(ay);
	rotZ(az);
}
//
function scaleX(fac){
	scene.canvasT[0][0]*=fac;
	scene.canvasT[1][0]*=fac;
	scene.canvasT[2][0]*=fac;
	scene.canvasT[3][0]*=fac;
}
function scaleY(fac){
	scene.canvasT[0][1]*=fac;
	scene.canvasT[1][1]*=fac;
	scene.canvasT[2][1]*=fac;
	scene.canvasT[3][1]*=fac;
}
function scaleZ(fac){
	scene.canvasT[0][2]*=fac;
	scene.canvasT[1][2]*=fac;
	scene.canvasT[2][2]*=fac;
	scene.canvasT[3][2]*=fac;
}
function scaleCnvs(sx,sy,sz){
	scaleX(sx);
	scaleY(sy);
	scaleZ(sz);
}
//
function trans(x,y,z){
	scene.canvasT[3][0]+=x;
	scene.canvasT[3][1]+=y;
	scene.canvasT[3][2]+=z;
}
////========
//builtin systems
//========
const isosys=scaledMatrix([
	[Math.sqrt(3),0,-Math.sqrt(3)],
	[1,2,1],
	[Math.sqrt(2),-Math.sqrt(2),Math.sqrt(2)],

],1/Math.sqrt(6));//from 1st quadrant.
//=======
//cameras
//========
//diametric
const dtheta=Math.atan(1/2);
const diametriccam=[
	[ 0.8944,0.4472,0,0],//col1[Math.cos(dtheta),0,-Math.cos(dtheta)]
	[ 0     ,1     ,0,0],//col2[Math.sin(dtheta),1,Math.sin(dtheta)],
	[-0.8944,0.4472,1,0],
	[ 0     ,0     ,0,1]
]
const cabinetcam=[
	[ 2,1,0,0],
	[ 0,1,0,0],
	[-1,2,1,0],
	[ 0,0,0,1]
]
//isometric
const isocam=[
	[ 0.8660 ,0.5,0,0],//col1:[Math.cos(Math.PI/6),0,-Math.cos(Math.PI/6)],
	[ 0      ,1  ,0,0],//col2:[Math.sin(Math.PI/6),1,Math.sin(Math.PI/6)],
	[-0.8660 ,0.5,1,0],//col3 for z axis
	[0       ,0  ,0,1]//column 4 for translation.
]
//orthographic
const orthocam=[
	[1,0,0,0],
	[0,1,0,0],
	[0,0,1,0],
	[0,0,0,1]
]