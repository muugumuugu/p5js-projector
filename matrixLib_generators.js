function arrCopy(arr){
  let temp=[];
  for (let i=0;i<arr.length; i++){
    if(Array.isArray(arr[i])){temp.push(arrCopy(arr[i]));}
    else{temp.push(arr[i]);}
  }
  return temp;
}
function fillarr(size,filler){
  let filler_=0
  if (filler){filler_=filler;}
  let sz=0;
  if(size){sz=size;}
  let arr=[];
  for (let i=0;i<sz;i++){
    arr.push(filler_);
  }
  return arr;
}
//--------------
function nullMatrix(m,n){
  let rows=1;
  if (m){rows=m;}
  let cols=rows;
  if (n){cols=n;}
  let O=[];
  for (let i=0; i<rows; i++){
    O.push(fillarr(cols,0.0));
  }
  return O;
}
function identityMatrix(n){
  let rows=1;
  if (n){rows=n;}
  let cols=rows;
  let I=[];
  for (let i=0; i<rows; i++){
    I.push([]);
    for (let j=0;j<cols;j++){
      if(i==j){I[i].push(1.0);}
      else{I[i].push(0.0);}
    }
  }
  return I;
}
//===========================
function rollpitchyaw(angles){
  let angs;
  if (Array.isArray(angles)){angs=arrCopy(angles);}
  else{angs=vec2arr(angles);}
  let c=[];
  let s=[];
  for (let i=0; i<3 ;i++){
      c[i]=Math.cos(angs[i])
      s[i]=Math.sin(angs[i])
  }
  return ([
    [ c[0]*c[1] , c[0]*s[0]*s[1]*s[2] - c[2]*s[0]      , s[0]*s[2]      + c[0]*c[2]*s[1] ],
    [ c[1]*s[0] , c[0]*c[2]           + s[0]*s[1]*s[2] , c[2]*s[0]*s[1] - c[0]*s[2]      ],
    [ -s[1]     , c[1]*s[2]                            , c[1]*c[2]                       ]
  ]);

}
function stretcher(scales){
  let temp=identityMatrix(4);
  let sclArr;
  if(!Array.isArray(scales)){sclArr=vec2arr(scales);}
  else{sclArr=arrCopy(scales);}
  for (let i=0;i<3; i++){temp[i][i]=sclArr[i];}
  return temp;
}
//--------------
function tMatrix(angles,translations,stretches){
  let M=identityMatrix(4);
  if(angles){M=rollpitchyaw(angles);}
  if(stretches){M=matMult(M,stretcher(scales));}
  if (translations){
    if (Array.isArray(translations)){M[3]=arrCopy(translations);}
    else (M[3]=vec2arr(translations));
  }
  return M;
}
//===========================