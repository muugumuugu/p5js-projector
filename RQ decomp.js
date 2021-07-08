//QR decomp

x=transposed(A)[0];
a=vecMag(x)*(-1)*Math.sign(x[k])
pivot=x[k];
//(after it all entries are 0 in upper triangular form)
//for us k==0 coz x=0th column
u=vecCopy(x);
//u[0]-=$\alpha$
v=vecNormalize(u);
let row=[vec2arr(v)];
let col=transposed(row)
Q1=matrixDiff(identityMatrix(m)-2*matMult(col,row))
let AA=minor(matMult(Q,A),0,0);
//repeat on AA
//Qk = fill with identity:|$I_{k-1}$  0 |
//                        |0    $Q_{k}$|
//total iterations to get qs=m-1
Q=transposed(matMult(null,null,Qarr.reversed));
R=matMult(matMult(null,null,Qarr.reversed),A);