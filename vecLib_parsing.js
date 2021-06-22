function vec2arr(vecObj){
  if(typeof(vecObj)=='object'){
    let dim=Object.keys(vecObj).length;
    let ind=['x','y','z','w'];
    let arr=[];
    for(let i=0;i<min(dim,4);i++){arr.push(vecObj[ind[i]]);}
    for(let j=4;j<dim;j++){
      let indx='d'+j;
      arr.push(vecObj[indx]);
    }
    return arr;
  }
  else{return [];}
}
function arr2vec(arr){
  let ind=['x','y','z','w'];//till 4 d
  let v={};
  for (let i=0;i<min(arr.length,4);i++){v[ind[i]]=arr[i];}
  for (let j=4;j<arr.length;j++){
    let indx='d'+j;
    v[indx]=arr[j];
  }
  return v;
}
//---------------------------
function vec4(x,y,z,w){
  let v=vec3(x,y,z);
  v.w=0;
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