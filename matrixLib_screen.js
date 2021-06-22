//
function resetScreen(){
  canvasT=tMatrix();
  canvasTupd=false;
}
//
function rotX(ang){
  let mainM=matMult(minor(canvasT,3,3),adjoint(rotMatrix('x',ang)));
  canvasT[0]=mainM[0];
  canvasT[1]=mainM[1];
  canvasT[2]=mainM[1];
  return canvasT;
}
function rotY(ang){
  let mainM=matMult(minor(canvasT,3,3),adjoint(rotMatrix('y',ang)));
  canvasT[0]=mainM[0];
  canvasT[1]=mainM[1];
  canvasT[2]=mainM[1];
  return canvasT;
}
function rotZ(ang){
  let mainM=matMult(minor(canvasT,3,3),adjoint(rotMatrix('z',ang)));
  canvasT[0]=mainM[0];
  canvasT[1]=mainM[1];
  canvasT[2]=mainM[1];
  return canvasT;
}
function rot(ax,ay,az){
  rotX(ax);
  rotY(ay);
  rotZ(az);
}
//
function scaleX(fac){
  canvasT[0][0]*=fac;
  canvasT[1][0]*=fac;
  canvasT[2][0]*=fac;
  canvasT[3][0]*=fac;
}
function scaleY(fac){
  canvasT[0][1]*=fac;
  canvasT[1][1]*=fac;
  canvasT[2][1]*=fac;
  canvasT[3][1]*=fac;
}
function scaleZ(fac){
  canvasT[0][2]*=fac;
  canvasT[1][2]*=fac;
  canvasT[2][2]*=fac;
  canvasT[3][2]*=fac;
}
//
function trans(x,y,z){
  canvasT[3][0]+=x;
  canvasT[3][1]+=y;
  canvasT[3][2]+=z;
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
  [0.8944,0,-0.8944],//[Math.cos(dtheta),0,-Math.cos(dtheta)]
  [0.4472,1, 0.4472],//[Math.sin(dtheta),1,Math.sin(dtheta)],
  [0,     0, 1     ] //last row to preserve Z axis
]
const preDiamSclcam=[
  [ 2,1,0],
  [ 0,1,0],
  [-1,2,1] 
]
//isometric
const isocam=[
  [0.8660,0,-0.8660],//[Math.cos(Math.PI/6),0,-Math.cos(Math.PI/6)],
  [0.5   ,1, 0.5   ],//[Math.sin(Math.PI/6),1,Math.sin(Math.PI/6)],
  [0     ,0, 1     ] //last row to preserve Z axis
]
//orthographic
const orthocam=[
  [1,0,0],
  [0,1,0],
  [0,0,1]//last row to preserve Z axis
]