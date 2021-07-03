function rgbcubeV(side,center,rot,scene_){
	let st=Pen(6);
	//
	push();
	colorMode(RGB,255,255,255,255);
	fill(255,0,0,255);//back left, opp inward = B
	square_(side,st,rot,center,'B',scene_);
	fill(0,0,255,255);//into the screen right; opp left : R
	square_(side,st,rot,center,'R',scene_);
	fill(0,255,0,255);//bottom
	square_(side,st,rot,center,'D',scene_);
	fill(255,0,0,192);//inwardsin circle , right in isolated isometric = F
	square_(side,st,rot,center,'F',scene_);
	fill(0,0,255,192);//left ; outward L
	square_(side,st,rot,center,'L',scene_);
	fill(0,255,0,192);//top
	square_(side,st,rot,center,'U',scene_);
	pop();
}
//
function cubeV(side,center,rot,digi,cnv){
	let st=Pen(6);
	//
	square_(side,st,rot,center,'B',scene_);
	square_(side,st,rot,center,'R',scene_);
	square_(side,st,rot,center,'D',scene_);
	square_(side,st,rot,center,'L',scene_);
	square_(side,st,rot,center,'U',scene_);
	square_(side,st,rot,center,'F',scene_);
}
function cuboidV(dimensions,center,stylus,rotn,digi,store){
	let pen=Pen(7);
	if(stylus){pen=stylus;}
	let sides;
	if (Array.isArray(dimensions)){sides=arrCopy(dimensions);}
	else{sides=vec2arr(sides);}
	let faces=[];
	for (let i=0; i<3;i++){
		let verticesF=[];
		let verticesB=[];
		let fac=[[-1,1,1,-1],[-1,-1,1,1],[1,1,1,1]]
		for(let k=0; k<4; k++){
			let v=[ sides[0]*fac[i][k], sides[1]*fac[(i+1)%3][k], sides[2]*fac[(i+2)%3][k]];
			v=vecSum(v,center);
			if (digi){v=vecDigitize(v);}
			verticesF.push(v);
			verticesB.push(vecDot(v,[-1,-1,-1]));
		}
		faces.push(verticesF);
		faces.push(verticesB);
	}
	if (store){return ({faces:faces,pen:pen,rotor:rotn})}
	return solidV(faces,true,pen,rotn);
}