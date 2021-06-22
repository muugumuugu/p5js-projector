function sgn(num,format){
  let formats=[[0,1,-1],['+','+','-']];
  let format_=0;
  if (format){format_=format}
  if(num==0){return formats[format_][0];}
  if(num >0){return formats[format_][1];}
  return formats[format_][2];
}
function logMatrix(M) {
  let rows = M.length;
  let cols = M[0].length;
  let matrixx = "\n";
  for (let i = 0; i < rows; i++) {
    let row = " | ";
    for (let j = 0; j < cols; j++) {
      row += (sgn(M[i][j],1)+' ' + nf(Math.abs(M[i][j]), 5, 3) + " | ");
    }
    matrixx += row + "\n";
  }
  let dat={};
  dat.matrix=matrixx;
  dat.order=rows+'X'+cols;
  dat.rows=M;
  dat.cols=transposed(M);
  console.log(matrixx);
  return dat;
}
//=============================
function arr2mat(data,m,n){
  let rows=1;
  if(m){rows=m;}
  let cols=data.length/rows;
  if(n){cols=n;}
  if (rows*cols!=data.length){return null;}
  let M=[];
  for(let i=0; i<rows;i++){
    M.push([]);
    for(let j=0; j<cols;j++){
      M[i].push(data[i*cols+j]);
    }
  }
  return M;
}
function mat2arr(M){
  let arr=[];
  for (let i=0; i<M.length; i++){
    for(let j=0;j<M[0].length;j++){
      arr.push(M[i][j]);
    }
  }
  return arr;
}
//=============================
function index1D(x,y,colums){
  return (x*colums+y);
}
function index2D(ind,colums){
  return [Math.floor(ind/colums),ind%colums];
}
//===================================

function rotMatrix(dir,ang){//pre multipliers
  let rot;
  if (Array.isArray(dir)){
    rot=rollpitchyaw(dir);
  }
  switch(dir.toUpperCase()){
    case 'X':
      rot=[
        [1,0,0],
        [0,Math.cos(ang),-Math.sin(ang)],
        [0,Math.sin(ang),Math.cos(ang)]
      ];
      break;
    case 'Y':
      rot=[
        [Math.cos(ang),0,Math.sin(ang)],
        [0,1,0],
        [-Math.sin(ang),0,Math.cos(ang)]
      ];
      break;
    case 'Z':
      rot=[
        [Math.cos(ang),-Math.sin(ang),0],
        [Math.sin(ang),Math.cos(ang),0],
        [0,0,1]
      ];
      break;
  }
  return rot;
}

//=====================================
