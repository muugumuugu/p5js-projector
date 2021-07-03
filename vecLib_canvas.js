function vecDigitize(vec){
	let shift;
	if(scene.cnv){shift=vec3(scene.cnv.width/2,scene.cnv.height/2,0);}
	else{shift=vec3(width/2,height/2,0);}
	return vecSum(vecDot(vec,[1,-1,1]),shift);
}
//===================================
function vecPlot(vec,clr,stkwt){
	let cors;
	if (scene.canvasTupd){vec=vecTransform(vec,scene.canvasT);}
	if (scene.cam){vec=vecTransform(vec,scene.cam);}
	cors=vec;
	if (scene.cnv){
		if (clr){scene.cnv.stroke(clr);}
		if (stkwt){scene.cnv.strokeWeight(clr);}
		scene.cnv.point(cors.x,cors.y)
	}
	else{
		if (clr){stroke(clr);}
		if (stkwt){strokeWeight(clr);}
		point(cors.x,cors.y)
	}
}
function vecConnect(vec1,vec2,clr,stkwt){
	let v1,v2;
	if (Array.isArray(vec1)){v1=arr2vec(vec1);}
	else {v1=vec1;}
	if (Array.isArray(vec2)){v2=arr2vec(vec2);}
	else {v2=vec2;}
	if (scene.canvasTupd){
		v1=vecTransform(v1,scene.canvasT);
		v1=vecTransform(v1,scene.canvasT);
	}
	if (scene.cam){
		v1=vecTransform(v1,scene.cam);
		v2=vecTransform(v2,scene.cam)
	}
	if (scene.cnv){
		if (clr){scene.cnv.stroke(clr);}
		if (stkwt){scene.cnv.strokeWeight(clr);}
		scene.cnv.line(v1.x,v1.y,v2.x,v2.y);
	}
	else{
		if (clr){stroke(clr);}
		if (stkwt){strokeWeight(clr);}
		line(v1.x,v1.y,v2.x,v2.y);
	}
	return vecDist(v1,v2);
}
//------------
function polyV(arrpt,closeit,stylus,rotns){
	let numvertices=arrpt.length;
	let pen=Pen();
	if(stylus){pen=stylus;}
	let closer=0;
	if(closeit){closer=1;}
	let vertices=arrCopy(arrpt);
	if(rotns){
		if(Array.isArray(rotns)){for(let i=0; i<numvertices;i++){vertices[i]=vertices[i].rot(rotns[i]);}}
	else{for(let i=0; i<numvertices;i++){vertices[i]=vertices[i].rot(rotns);}}
	}
	//
	if (pen.show.points){
		for(let i=0; i<numvertices; i++){
			let clr,stkwt;
			if(pen.color.points.length>0){clr=pen.color.points[0];}
			if(pen.color.points.length>1){clr=pen.color.points[i];}
			if(pen.wt.points.length>0){stkwt=pen.wt.points[0];}
			if(pen.wt.points.length>1){stkwt=pen.wt.points[i];}
			vecPlot(vertices[i],clr,stkwt);
		}
	}
	//
	let centroid=vec3();
	for(let i=0; i<numvertices; i++){centroid=vecSum(centroid,vertices[i]);}
	centroid=vecScale(centroid,1/numvertices);
	//
	let area,perimeter;
	//
	if (pen.show.fillit){
	area=0;
		for(let i=0; i<(numvertices-1+closer); i++){
			let clr;
			let ngbr=vertices[(i+1)%numvertices];
			if(pen.color.fill.length>0){clr=pen.color.fill[0];}
			if(pen.color.fill.length>1){clr=pen.color.fill[i];}
			let pts=[vertices[i],ngbr,centroid];
			area+=triangleV(pts,clr);
		}
	}
	//
	if (pen.show.edges){
		perimeter=0;
		for(let i=0; i<(numvertices-1+closer); i++){
			let clr,stkwt;
			let ngbr=vertices[(i+1)%numvertices];
			if(pen.color.edges.length>0){clr=pen.color.edges[0];}
			if(pen.color.edges.length>1){clr=pen.color.edges[i];}
			if(pen.wt.edges.length>0){stkwt=pen.wt.edges[0];}
			if(pen.wt.edges.length>1){stkwt=pen.wt.edges[i];}
			perimeter+=vecConnect(vertices[i],ngbr,clr,stkwt);
		}
	}
	return {'centroid':centroid,'area':area,'perimeter':perimeter};
}
function tristripV(arrpt,closeit,stylus,rotns,rounded){
	let numvertices=arrpt.length;
	let closer=0;
	if(closeit){closer=1;}
	let pen=Pen();
	if(stylus){pen=stylus;}
	let vertices=arrCopy(arrpt);
	if (pen.show.points){
		for (let j=0; j<(numvertices-1+closer);j++){
			let clr,stkwt;
			if(pen.color.points.length>0){clr=pen.color.points[0];}
			if(pen.color.points.length>1){clr=pen.color.points[j];}
			if(pen.wt.points.length>0){stkwt=pen.wt.points[0];}
			if(pen.wt.points.length>1){stkwt=pen.wt.points[j];}
			vecPlot(vertices[j],clr,stkwt);
		}
	}
	if (pen.show.edges){
		for (let j=0; j<(numvertices-1+closer);j++){
			let clr,stkwt;
			let ngbr1=vertices[(j+1)%numvertices];
			let ngbr2=vertices[(j+2)%numvertices];
			if(pen.color.edges.length>0){clr=pen.color.edges[0];}
			if(pen.color.edges.length>1){clr=pen.color.edges[j];}
			if(pen.wt.edges.length>0){stkwt=pen.wt.edges[0];}
			if(pen.wt.edges.length>1){stkwt=pen.wt.edges[j];}
			vecConnect(vertices[j],ngbr1,clr,stkwt);
			vecConnect(vertices[j],ngbr2,clr,stkwt);
		}
	}
	if (pen.show.fillit){
		for (let j=0; j<(numvertices-3+closer);j++){
			let clr;
			if(pen.color.fill.length>0){clr=pen.color.fill[0];}
			if(pen.color.fill.length>1){clr=pen.color.fill[j];}
			let pts=[vertices[j],vertices[(j+1)%numvertices],vertices[(j+2)%numvertices]];
			if      (rounded==0){triangleV(pts,clr    );}
			else if (rounded==1){circleV(  pts,clr,1.8);}
		}
	}
}
function solidV(faces,closeit,pens,rotors){
	if(Array.isArray(pens)){
			if(Array.isArray(rotors)){
				for (let i=0; i<faces.length;i++){polyV(faces[i],closeit,pens[i],rotors[i]);}
			}
			else{
				for (let i=0; i<faces.length;i++){polyV(faces[i],closeit,pens[i],rotors);}
			}
		}
	else{
		if(Array.isArray(rotors)){
				for (let i=0; i<faces.length;i++){polyV(faces[i],closeit,pens,rotors[i]);}
			}
			else{
				for (let i=0; i<faces.length;i++){polyV(faces[i],closeit,pens,rotors);}
			}
	}
	return faces;
}
//----------
function triangleV(points,clr){
	let p5inst=scene.cnv;
	//
	let pts=arrCopy(points);
	if (scene.canvasTupd){for(let i=0; i<3;i++){pts[i]=vecTransform(pts[i],scene.canvasT);}}
	if (scene.cam){for(let i=0; i<3;i++){pts[i]=vecTransform(pts[i],scene.cam);}}
	//
	if (p5inst){
		if (clr){p5inst.fill(clr);}
		p5inst.push();
		p5inst.noStroke()
		p5inst.triangle(pts[0].x,pts[0].y,pts[1].x,pts[1].y,pts[2].x,pts[2].y);
		p5inst.pop();
	}
	else{
		if (clr){fill(clr);}
		push();
		noStroke();
		triangle(pts[0].x,pts[0].y,pts[1].x,pts[1].y,pts[2].x,pts[2].y);
		pop();
	}
	let area=0.5*Math.abs(det([
	[1,pts[0].x,pts[0].y],
	[1,pts[1].x,pts[1].y],
	[1,pts[2].x,pts[2].y],
	]));
	return area;
}
function circleV(points,clr,fac){
	let pts=arrCopy(points);
	if (scene.canvasTupd){for(let i=0; i<3;i++){pts[i]=vecTransform(pts[i],scene.canvasT);}}
	if (scene.cam){for(let i=0; i<3;i++){pts[i]=vecTransform(pts[i],scene.cam);}}
	//
	let circinfo=circumscribe(pts[0],pts[1],pts[2]);
	//
	let p5inst=scene.cnv
	if (p5inst){
		if (clr){p5inst.fill(clr);}
		p5inst.push();
		p5inst.noStroke()
		p5inst.circle(circinfo.center.x,circinfo.center.y,fac*circinfo.r);
		p5inst.pop();
	}
	else{
		if (clr){fill(clr);}
		push();
		noStroke();
		circle(circinfo.center.x,circinfo.center.y,fac*circinfo.r);
		pop();
	}
}
//----------
function regpolyV(r,num,styles,rotns,center,planeN,xdir,store){
	let n=3;
	if (num){n=num;}
	let angadd=Math.PI/2-Math.PI/n;
	let ptarr=[];
	for (i=0; i<n ;i++){
		let ang=i*2*Math.PI/n;
		let vv=pol2cart(r,ang+angadd,planeN,xdir);
		if (center){vv=vecSum(vv,center);}
		ptarr.push(vv);
	}
	if (store){return ({faces:[ptarr],pen:styles,rotors:rotns,close:true})}
	let dat=polyV(ptarr,true,styles,rotns);
	return dat;
}
function dotCircle(info,detail,pen,rotor,store){
	regpolyV(info.r,detail,pen,rotor,info.center,info.plane,null,store);
}