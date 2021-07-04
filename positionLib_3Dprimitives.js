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