//QR decomp
function QR(A){
	let Q=[];
	let x=transposed(A)[0];
	const a=vecMag(x)*(-1)*Math.sign(x[0])
	//x[k]=pivot ,after it all entries are 0 in upper triangular form)
	//for us k==0 coz x=0th column
	let u=vecCopy(x);
	u[0]-=a;
	let v=vecNormalize(u);
	let row=[vec2arr(v)];
	let col=transposed(row)
	Q[0]=matrixDiff(identityMatrix(A.length)-2*matMult(col,row))
	let AA=minor(matMult(Q[0],A),0,0);
	//repeat on AA
	//Qk = fill with identity:|$I_{k-1}$  0 |
	//                        |0    $Q_{k}$|
	//total iterations to get qs=m-1
	//Q=transposed(matMult(null,null,Qarr.reversed));
	//R=matMult(matMult(null,null,Qarr.reversed),A);
}