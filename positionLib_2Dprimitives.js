//
function square_(side,style,rot,pos,cubie,scene_){
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
  regpoly(side/Math.sqrt(2),4,style,rot,mid,pos,plane,null,scene_);
}
//
function rect_(wd,ht,style,rot,pos,cubie,d,scene_){
  let ptarr=[];
  //
  let mid;
  let plane;
  if(cubie){
    switch (cubie.toUpperCase()){
      case 'D':
        plane='ZX';
        mid=[0,-d*0.5,0]
        break;
      case 'U':
        plane='ZX';
        mid=[0,d*0.5,0];
        break;
      case 'F':
        mid=[0,0,-d*0.5]
        plane='XY';
        break;
      case 'B':
        mid=[0,0,d*0.5]
        plane='XY';
        break;
      case 'L':
        mid=[-d*0.5,0,0];
        plane='YZ';
        break;
      case 'R':
        mid=[d*0.5,0,0];
        plane='YZ';
        break;
    }
  }
  ptarr=getrectarr(wd,ht,mid,rot,pos,plane,scene_);
  let val=polyP(ptarr,style,true,null);
  return val;
}
function getrectarr(wd,ht,origin,rotns,placeit,plane,scene_){
  let ptarr=[];
  let v1,v2,v3,v4;
  v1=new position([-wd/2,ht/2,0],scene_);
  v2=new position([-wd/2,-ht/2,0],scene_);
  v3=new position([wd/2,-ht/2,0],scene_);
  v4=new position([wd/2,ht/2,0],scene_);
  let temp=[v1,v2,v3,v4];
  for (i=0; i<4 ;i++){
    let v=temp[i];
    if (plane=='YZ'){v.coors=[v.pos.z,v.pos.y,v.pos.x]}
    else if (plane=='ZX'){v.coors=[v.pos.y,v.pos.z,v.pos.x]}
    if (origin){v.add(origin);}
    if (rotns){v=v.rot(rotns);}
    if (placeit){v.shiftO(placeit);}
    v.digitize();
    ptarr.push(v);
  }
  return ptarr;
}
