function rgbcubeP(side,center,rot,scene){
  let st=Pen(6);
  //
  fill(255,0,0,255);//back left, opp inward = B
  square_(side,st,rot,center,'B',scene);
  fill(0,0,255,255);//into the screen right; opp left : R
  square_(side,st,rot,center,'R',scene);
  fill(0,255,0,255);//bottom
  square_(side,st,rot,center,'D',scene);
  fill(255,0,0,192);//inwardsin circle , right in isolated isometric = F
  square_(side,st,rot,center,'F',scene);
  fill(0,0,255,192);//left ; outward L
  square_(side,st,rot,center,'L',scene);
  fill(0,255,0,192);//top
  square_(side,st,rot,center,'U',scene);
}

function cubeP(side,center,rot,scene){
  //
  let st=Pen(6);
  //
  square_(side,st,rot,center,'B',scene);
  square_(side,st,rot,center,'R',scene);
  square_(side,st,rot,center,'D',scene);
  square_(side,st,rot,center,'L',scene);
  square_(side,st,rot,center,'U',scene);
  square_(side,st,rot,center,'F',scene);
}
function cuboidP(l,h,b,center,rot,scene){
  //
  let st=Pen(7);
  //
  rect_(l,h,st,rot,center,'B',b,scene);
  rect_(b,h,st,rot,center,'R',l,scene);
  rect_(b,l,st,rot,center,'D',h,scene);
  rect_(l,h,st,rot,center,'F',b,scene);
  rect_(b,h,st,rot,center,'L',l,scene);
  rect_(b,l,st,rot,center,'U',h,scene);

}