function vecScale(dat,k){
  let vArr;
  if (Array.isArray(dat)){vArr=[...dat];}
  else{vArr=vec2arr(dat);}
  return arr2vec(scaledArr(vArr,k)); 
}
function vecMagSq(vec){
  return arrSquash(vec2arr(vecDot(vec,vec)));
}
function vecMag(vec){
  return Math.sqrt(vecMagSq(vec));
}
function vecNormalize(vec){
  let r=vecMag(vec);
  if (r==0){return vec;}
  return vecScale(vec,1/r);
}
//................
function vecTransform(vec,Tmat){
  let varr;
  if (Array.isArray(vec)){varr=arr2vec(vec);}
  else {varr=vec;}
  return applyTrans(varr,Tmat);
}