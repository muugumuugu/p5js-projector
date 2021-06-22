
let globalT=tMatrix();
//
function resetScreen(){
  globalT=tMatrix();
}
//
function rotX(ang){
  let mainM=matMult(minor(globalT,3,3),adjoint(rotMatrix('x',ang)));
  globalT[0]=mainM[0];
  globalT[1]=mainM[1];
  globalT[2]=mainM[1];
  return globalT;
}
function rotY(ang){
  let mainM=matMult(minor(globalT,3,3),adjoint(rotMatrix('y',ang)));
  globalT[0]=mainM[0];
  globalT[1]=mainM[1];
  globalT[2]=mainM[1];
  return globalT;
}
function rotZ(ang){
  let mainM=matMult(minor(globalT,3,3),adjoint(rotMatrix('z',ang)));
  globalT[0]=mainM[0];
  globalT[1]=mainM[1];
  globalT[2]=mainM[1];
  return globalT;
}
function rot(ax,ay,az){
  rotX(ax);
  rotY(ay);
  rotZ(az);
}
//
function scaleX(fac){
  globalT[0][0]*=fac;
  globalT[1][0]*=fac;
  globalT[2][0]*=fac;
  globalT[3][0]*=fac;
}
function scaleY(fac){
  globalT[0][1]*=fac;
  globalT[1][1]*=fac;
  globalT[2][1]*=fac;
  globalT[3][1]*=fac;
}
function scaleZ(fac){
  globalT[0][2]*=fac;
  globalT[1][2]*=fac;
  globalT[2][2]*=fac;
  globalT[3][2]*=fac;
}
//
function trans(x,y,z){
  globalT[3][0]+=x;
  globalT[3][1]+=y;
  globalT[3][2]+=z;
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