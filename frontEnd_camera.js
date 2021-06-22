let cam=identityMatrix(4);//null; nullMatrix();//
let cen,orn;
let camCX,camCY,camCZ;
let camRotX,camRotY,camRotZ;
let refresh;
//----------------------------------------------
function camControls(){
  let ornD=createDiv('orientation');
  let cenD=createDiv('positioning');
  orn=createP();
  cen=createP();
  let lrx=createSpan('    ROT X\s');
  let lry=createSpan('<br>ROT Y\s');
  let lrz=createSpan('<br>ROT Z\s');
  let lpx=createSpan('    POS X\s');
  let lpy=createSpan('<br>POS Y\s');
  let lpz=createSpan('<br>POS Z\s');
  camRotX=createSlider(-180,180,0);
  camRotY=createSlider(-180,180,0);
  camRotZ=createSlider(-180,180,0);
  camCX=createSlider(-2*width,width ,0,1);
  camCY=createSlider(-2*height,height,0,1);
  camCZ=createSlider(0,depth ,0,1);
  ornD.parent(select('#camControls'))
  cenD.parent(select('#camControls'))
  orn.parent(ornD);
  cen.parent(cenD);
  lrx.parent(ornD);
  lry.parent(ornD);
  lrz.parent(ornD);
  lpx.parent(cenD);
  lpy.parent(cenD);
  lpz.parent(cenD);
  camRotX.parent(lrx);
  camRotY.parent(lry);
  camRotZ.parent(lrz);
  camCX.parent(lpx);
  camCY.parent(lpy);
  camCZ.parent(lpz);
  camRotX.changed(updateview);
  camRotY.changed(updateview);
  camRotZ.changed(updateview);
  camCX.changed(updateview);
  camCY.changed(updateview);
  camCZ.changed(updateview);
}
//----------------------------------------------
function updateview(){
  //=================
  let rx=camRotX.value()*PI/180,ry=camRotY.value()*PI/180,rz=camRotZ.value()*PI/180;
  let camR=rollpitchyaw([rx,ry,rz])
  let rrx=nf(rx*180/PI,3,1),rry=nf(ry*180/PI,3,1),rrz=nf(rz*180/PI,3,1);
  orn.html('\t\[ ' + rrx +'° '+rry +'° ' +rrz +'° \]')
  //--------
  let cx=camCX.value(),cy=camCY.value(),cz=camCZ.value()
  let camC=[cx,cy,cz];
  let ccx=nf(cx,3,1),ccy=nf(cy,3,1),ccz=nf(cz,3,1);
  cen.html('\t\[' + ccx +', '+ccy +', ' +ccz +' \]')
  //-----------
  let camextr=poseM(camR,camC);
  let camCurr=Camera(null,camextr);
  //-----------
  //if(matEq(camCurr,cam)){return false;}
  //-------------
  cam=arrCopy(camCurr);
  //=========================
  //faces_[i][j]=vecTransform(faces[i][j],cam)
  //return true;
}
function resetCam(digi){
  slidersReset(digi);
}
function slidersReset(digi){
  if(digi){
    camCX.value(-width/2);
    camCY.value(-height/2);
  }
  else{
    camCX.value(0);
    camCY.value(0);
  }
  camCZ.value(0);
  camRotX.value(0);
  camRotY.value(0);
  camRotZ.value(0);
  updateview();
}