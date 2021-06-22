function getrow(M,i){
  return M[i-1];
}
function getcol(M,j){
  let rows=M.length;
  let col=[];
  for (let i=0; i<rows;i++){
    col.push(M[i][j-1]);
  }
  return col;
}
function lookup(M,i,j){
  return M[i-1][j-1];
}
//---------------------------------
function minor(M,ii,jj){
  let rows=M.length;
  let cols=M[0].length;
  let C=[];
  let ci=0
  for (let i=0;i<rows;i++){
    if (i!=ii){
      C.push([]);
      for (let j=0;j<cols;j++){
        if (j!=jj){
          C[ci].push(M[i][j])
        }
      }
      ci++
    }
  }
  return C;
}
function cofactor(M,ii,jj){
  if ((ii+jj)%2==0){
    return det(minor(M,ii,jj));
  }
  else{
    return -1*det(minor(M,ii,jj));
  }
}
//-----------------------------------