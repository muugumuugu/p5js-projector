//
function square_V(side,style,rot,pos,plane){
	regpoly(side/Math.sqrt(2),4,style,rot,pos,plane);
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