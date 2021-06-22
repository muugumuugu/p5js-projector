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
  let intDt =createDiv('<b>intrinsic</b>');
  let extDt =createDiv('<b>extrinsic</b>');
  let ornD =createDiv('orientation');
  let cenD =createDiv('positioning');
  let focD =createDiv('focal lengths');
  let poffD=createDiv('principle axis offset');
  let skewD=createDiv('skew');
  orn  =createP();
  cen  =createP();
  foc  =createP();
  poff =createP();
  skewP=createP();
  let lrx=createSpan('    ROT X\s');
  let lry=createSpan('<br>ROT Y\s');
  let lrz=createSpan('<br>ROT Z\s');
  let lpx=createSpan('    POS X\s');
  let lpy=createSpan('<br>POS Y\s');
  let lpz=createSpan('<br>POS Z\s');
  let lfx=createSpan('    foc X\s');
  let lfy=createSpan('<br>foc Y\s');
  let lpoffx=createSpan('    poff X\s');
  let lpoffy=createSpan('<br>poff Y\s');
  let lskew=createSpan('');
  camRotX=createSlider(-180       ,180       ,0);
  camRotY=createSlider(-180       ,180       ,0);
  camRotZ=createSlider(-180       ,180       ,0);
  camCX  =createSlider(-width*0.5 ,width *1.5,0);
  camCY  =createSlider(-height*0.5,height*1.5,0);
  camCZ  =createSlider(0          ,depth     ,0);
  fX     =createSlider(  -2       ,2         ,1,0.001);
  fY     =createSlider(  -2       ,2         ,1,0.001);
  poffX  =createSlider(  -2       ,2         ,0,0.001);
  poffY  =createSlider(  -2       ,2         ,0,0.001);
  skew   =createSlider(  -2       ,2         ,0,0.001);
  //---------------------------------------------
  extDt.parent(select('#camControls'));
  intDt.parent(select('#camControls'));
  extD.parent(extDt);
  intDM.parent(intDt);
  intDs.parent(intDt);
  intDs.style('width:100%');
  //
  ornD.parent(extD);
  cenD.parent(extD);
  focD.parent(intDM);
  poffD.parent(intDM);
  skewD.parent(intDs);
  skewD.style('width:100%;')
  //
  orn.parent(ornD);
  cen.parent(cenD);
  foc.parent(focD);
  poff.parent(poffD);
  skewP.parent(skewD);
  //
  lrx.parent(ornD);
  lry.parent(ornD);
  lrz.parent(ornD);
  lpx.parent(cenD);
  lpy.parent(cenD);
  lpz.parent(cenD);
  lfx.parent(focD);
  lfy.parent(focD);
  lpoffx.parent(poffD);
  lpoffy.parent(poffD);
  lskew.parent( skewD);
  //
  camRotX.parent(lrx);
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
  camRotX.changed(updateview);
  camRotY.changed(updateview);
  camRotZ.changed(updateview);
  camCX.changed(updateview);
  camCY.changed(updateview);
  camCZ.changed(updateview);
  fX.changed(updateview);
  fY.changed(updateview);
  poffX.changed(updateview);
  poffY.changed(updateview);
  skew.changed(updateview);
}
//----------------------------------------------
function updateview(){
  //=================
  let rx=camRotX.value()*Math.PI/180,ry=camRotY.value()*Math.PI/180,rz=camRotZ.value()*Math.PI/180;
  let camR=rollpitchyaw([rx,ry,rz])
  let rrx=nf(rx*180/Math.PI,3,1),rry=nf(ry*180/Math.PI,3,1),rrz=nf(rz*180/Math.PI,3,1);
  orn.html(rrx +'° '+rry +'° ' +rrz +'°')
  //--------
  let cx=camCX.value(),cy=camCY.value(),cz=camCZ.value()
  let camC=[cx,cy,cz];
  let ccx=nf(cx,3,1),ccy=nf(cy,3,1),ccz=nf(cz,3,1);
  cen.html('\t\[' + ccx +', '+ccy +', ' +ccz +'\]')
  //-----------
  let focx=fX.value(),focy=fY.value();
  let px=poffX.value(), py=poffY.value();
  let s=skew.value();
  let ffx=nf(focx,1,3),ffy=nf(focy,1,3);
  let ppx=nf(px,1,3),ppy=nf(py,1,3);
  foc.html('\t\[' + ffx +', '+ffy +'\]\t');
  poff.html('\t\[' + ppx +', '+ppy +'\]\t');
  skewP.html(nf(s,3,3));
  //----------
  let camextr=poseM(camR,camC);
  let camintr=intrinsicM(focx,focy,px,py,s);
  //-----------
  let camCurr=Camera(camintr,camextr);
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
  fX.value(1);
  fY.value(1);
  poffX.value(0);
  poffY.value(0);;
  skew.value(0);
  updateview();
}