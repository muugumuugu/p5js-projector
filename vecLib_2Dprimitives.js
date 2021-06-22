function regpolyV(r,num,styles,center,planeN,xdir,cnv){
  let n=3;
  if (num){n=num;}
  let angadd=Math.PI/2-Math.PI/n;
  let ptarr=[];
  for (i=0; i<n ;i++){
    let ang=i*2*Math.PI/n;
    let vv=pol2cart(r,ang+angadd,planeN,xdir);
    if (center){vv=vecSum(vv,center);}
    ptarr.push(vv);
  }
  let dat=polyV(ptarr,styles,true,cnv);
  return dat;
}
//
function square_V(side,style,rot,pos,cubie,scene_){
  let mid;
  let plane;
  if(cubie){
    switch (cubie.toUpperCase()){
      case 'D':
        plane='ZX';
        mid=[0,-side*0.5,0]
        break;
      case 'U':
        plane='ZX';
        mid=[0,side*0.5,0];
        break;
      case 'F':
        mid=[0,0,-side*0.5]
        plane='XY';
        break;
      case 'B':
        mid=[0,0,side*0.5]
        plane='XY';
        break;
      case 'L':
        mid=[-side*0.5,0,0];
        plane='YZ';
        break;
      case 'R':
        mid=[side*0.5,0,0];
        plane='YZ';
        break;
    }    
  }
  regpoly(side/Math.sqrt(2),4,style,rot,-Math.PI/4,mid,pos,plane,null,scene_);
}
//
function rect_V(wd,ht,style,mid,cnv){
  let ptarr=getrectarr(wd,ht,mid,cnv);
  let val=poly(ptarr,style,true,cnv);
  return val;
}
function getrectarrV(wd,ht,origin,rotns,placeit,plane,scene_){
  let ptarr=[];
  let v1,v2,v3,v4;
  
  return ptarr;
}
//
/*
let sides=[1,2,3];//half widths.
let faces=[];
for (let i=0; i<3;i++){
  let verticesF=[];
  let verticesB=[];
  let fac=[[-1,1,1,-1],[-1,-1,1,1],[1,1,1,1]]
  for(let k=0; k<4; k++){
    verticesF.push([ sides[0]*fac[i][k], sides[1]*fac[(i+1)%3][k], sides[2]*fac[(i+2)%3][k]]);
    verticesB.push([-sides[0]*fac[i][k],-sides[1]*fac[(i+1)%3][k],-sides[2]*fac[(i+2)%3][k]]);
  }
  faces.push(verticesF);
  faces.push(verticesB);
}
*/