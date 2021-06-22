function vec2arr(vecObj){
  if(vecObj){
    let arr=[vecObj.x,vecObj.y,vecObj.z];
    if (vecObj.w){arr.push(vecObj.w);}
    return arr;
  }
  else{return [];}
}
function arr2vec(arr){
  return vecG(arr[0],arr[1],arr[2],arr[3])
}
//---------------------------
function vecG(x,y,z,w){
  let v=vec3(x,y,z);
  if(w){v.w=w;}
  return v;
}
function vec3(x,y,z){
  let x_=0,y_=0,z_=0;
  if(x){x_=x;}
  if(y){y_=y;}
  if(z){z_=z;}
  return {'x':x_,'y':y_,'z':z_}
}