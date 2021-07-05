//PARALLEL
function stereoproject(vec){
	let zlim;
	if(scene.cnv){
		zlim=(scene.cnv.width+scene.cnv.height)/2;
		if(scene.cnv.DEPTH){zlim=scene.cnv.DEPTH;}
	}
	else{
		zlim=(width+height)/2;
		if(DEPTH){zlim=DEPTH;}
	}
	let camdist=(zlim-vec.z)/zlim;
	if (camdist==0){camdist=1.0;}
	return vecSum(vecScale(vecSum(vec,negSC),1/camdist),SC);
}
//CURVILIENEAR
function fisheyeview(vec){
	let R;
	if(scene.cnv){
		R=Math.min(scene.cnv.width,scene.cnv.height);
		if(scene.cnv.DEPTH){R=Math.min(scene.cnv.DEPTH,R);}
	}
	else{
		R=Math.min(width,height);
		if(DEPTH){R=Math.min(DEPTH,R);}
	}
	let vecTemp=vecSum(vec,TRENCH)
	const d =vecMag(vecTemp);
	if(d!=0){return vecSum(vecScale(vecTemp,R/d),SC);}
	else{return vec;}
}
function humanview(){
	const fac=1;
	let vanishx,vanishy,vanishz;
	if(scene.cnv){
		vanishx=scene.cnv.width;
		vanishy=scene.cnv.height;
		vanishz=(scene.cnv.width+scene.cnv.height)/2;
		if(scene.cnv.DEPTH){vanishz=scene.cnv.DEPTH;}
	}
	else{
		vanishx=width;
		vanishy=height;
		vanishz=(height+width)/2;
		if(DEPTH){vanishz=DEPTH;}
	}
	const fx=Math.abs(vanishx*fac-pos_.x);
	if (fx!=0){pos_.x*=(1/fx)}
	const fy=Math.abs(vanishy*fac-pos_.y);
	if (fy!=0){pos_.y*=(1/fy)}
	const d =Math.abs(vanishz*fac-pos_.z);
	if(d!=0){
		pos_.x*=(vanishz*fac/d);
		pos_.y*=(vanishz*fac/d);
	}
	return this.fix(pos_,3)
}