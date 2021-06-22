//coordinates in screen system.
function intrinsicM(fx,fy,px,py){
  let fx_=1,fy_=1,px_=0,py_=0;
  if(fx){fx_=fx;fy_=fx;}
  if(fy){fy_=fy;}
  if(px){px_=px;py=px_;}
  if(py){py_=py;}
  return [[fx_,0,px_],[0,fy_,py_],[0,0,1]];
}
function poseM(CamRot,CamCenter){
  let CamC=nullMatrix(3,1);
  let R=identityMatrix(3);
  if (CamCenter){CamC=transposed([CamCenter]);}
  if (CamRot){R=arrCopy(CamRot);}//transposing post multipler rot matrix, but mogi rot matrice are pre, so double transpose=> no transpose;
  let T=matMult(R,CamC);
  //
  let pM=[];
  for (let i=0;i<3;i++){
    let row=arrCopy(R[i]);
    row.push(-T[i]);
    pM.push(row)
  }
  return pM;
}
function lookAtM(posV,lookPoint,upD){
  let CamC=vec3();
  if (posV){CamC=posV;}
  let upp=vec3(0,1,0)
  if(upD){upp=upD;}
  let looking=vec3();
  if(lookPoint){looking=lookPoint;}
  let zz=vecDiff(looking,CamC);
  zz=vecNormalize(zz);
  let xx=vecNormalize(vecCross(zz,upp));
  let yy=vecCross(xx,zz);
  zz=vecScale(zz,-1);
  return poseM(transposed([vec2arr(xx),vec2arr(yy),vec2arr(zz)]),vec2arr(CamC));
}
function Camera(intrinsic,extrinsic){
  let int_=intrinsicM();
  let ext_=poseM();
  if (intrinsic){int_=intrinsic;}
  if (extrinsic){ext_=extrinsic;}
  let cam_=matMult(int_,ext_);
  cam_.push([0,0,0,1]);
  return transposed(cam_);
}