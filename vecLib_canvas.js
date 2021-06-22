function vecDigitize(vec,cnv){
	let shift;
	if(cnv){shift=vec3(cnv.width/2,cnv.height/2,0);}
	else{shift=vec3(width/2,height/2,0);}
	return vecSum(vecDot(vec,[1,-1,1]),shift);
}
//===================================
function vecPlot(vec,clr,stkwt,cnv){
	let cors;
	if (Array.isArray(vec)){cors=arr2vec(vec);}
	else{cors=vec;}
	if (canvasTupd){vec=vecTransform(vec,canvasT);}
	if (cam){vec=vecTransform(vec,cam);}
	if (cnv){
		if (clr){cnv.stroke(clr);}
		if (stkwt){cnv.strokeWeight(clr);}
		cnv.point(cors.x,cors.y)
	}
	else{
		if (clr){stroke(clr);}
		if (stkwt){strokeWeight(clr);}
		point(cors.x,cors.y)
	}
}
function vecConnect(vec1,vec2,clr,stkwt,cnv){
	let v1,v2;
	if (Array.isArray(vec1)){v1=arr2vec(vec1);}
	else {v1=vec1;}
	if (Array.isArray(vec2)){v2=arr2vec(vec2);}
	else {v2=vec2;}
	if (canvasTupd){
		v1=vecTransform(v1,canvasT);
		v1=vecTransform(v1,canvasT);
	}
	if (cam){
		v1=vecTransform(v1,cam);
		v2=vecTransform(v2,cam)
	}
	if (cnv){
		if (clr){cnv.stroke(clr);}
		if (stkwt){cnv.strokeWeight(clr);}
		line(v1.x,v1.y,v2.x,v2.y);
	}
	else{
		if (clr){stroke(clr);}
		if (stkwt){strokeWeight(clr);}
		line(v1.x,v1.y,v2.x,v2.y);
	}
	return vecDist(v1,v2);
}
//------------
function polyV(arrpt,styles_,closeit,cnv){
	let numvertices=arrpt.length;
	let styles=Pen();
	if(styles_){styles=styles_;}
	let closer=0;
	if(closeit){closer=1;}
	let vertices=arrCopy(arrpt);
	//
	if (styles.show.points){
		for(let i=0; i<numvertices; i++){
			let clr,stkwt;
			if(styles.color.points.length>0){clr=styles.color.points[0];}
			if(styles.color.points.length>1){clr=styles.color.points[i];}
			if(styles.wt.points.length>0){stkwt=styles.wt.points[0];}
			if(styles.wt.points.length>1){stkwt=styles.wt.points[i];}
			vecPlot(vertices[i],clr,stkwt,cnv);
		}
	}
	//
	let centroid=vec3();
	for(let i=0; i<numvertices; i++){centroid=vecSum(centroid,vertices[i]);}
	centroid=vecScale(centroid,1/numvertices);
	//
	let area,perimeter;
	//
	if (styles.show.fillit){
	area=0;
		for(let i=0; i<(numvertices-1+closer); i++){
			let clr;
			let ngbr=vertices[(i+1)%numvertices];
			if(styles.color.fill.length>0){clr=styles.color.fill[0];}
			if(styles.color.fill.length>1){clr=styles.color.fill[i];}
			let pts=[vertices[i],ngbr,centroid];
			area+=triangleV(pts,clr,cnv);
		}
	}
	//
	if (styles.show.edges){
		perimeter=0;
		for(let i=0; i<(numvertices-1+closer); i++){
			let clr,stkwt;
			let ngbr=vertices[(i+1)%numvertices];
			if(styles.color.edges.length>0){clr=styles.color.edges[0];}
			if(styles.color.edges.length>1){clr=styles.color.edges[i];}
			if(styles.wt.edges.length>0){stkwt=styles.wt.edges[0];}
			if(styles.wt.edges.length>1){stkwt=styles.wt.edges[i];}
			perimeter+=vecConnect(vertices[i],ngbr,clr,stkwt,cnv);
		}
	}
	return {'centroid':centroid,'area':area,'perimeter':perimeter};
}
function tristripV(arrpt,styles_,closeit,rounded,cnv){
	let numvertices=arrpt.length;
	let closer=0;
	if(closeit){closer=1;}
	let styles=Pen();
	if(styles_){styles=styles_;}
	let vertices=arrCopy(arrpt);
	if (styles.show.points){
		for (let j=0; j<(numvertices-1+closer);j++){
			let clr,stkwt;
			if(styles.color.points.length>0){clr=styles.color.points[0];}
			if(styles.color.points.length>1){clr=styles.color.points[j];}
			if(styles.wt.points.length>0){stkwt=styles.wt.points[0];}
			if(styles.wt.points.length>1){stkwt=styles.wt.points[j];}
			vecPlot(vertices[j],clr,stkwt,cnv);
		}
	}
	if (styles.show.edges){
		for (let j=0; j<(numvertices-1+closer);j++){
			let clr,stkwt;
			let ngbr1=vertices[(j+1)%numvertices];
			let ngbr2=vertices[(j+2)%numvertices];
			if(styles.color.edges.length>0){clr=styles.color.edges[0];}
			if(styles.color.edges.length>1){clr=styles.color.edges[j];}
			if(styles.wt.edges.length>0){stkwt=styles.wt.edges[0];}
			if(styles.wt.edges.length>1){stkwt=styles.wt.edges[j];}
			vecConnect(vertices[j],ngbr1,clr,stkwt,cnv);
			vecConnect(vertices[j],ngbr2,clr,stkwt,cnv);
		}
	}
	if (styles.show.fillit){
		for (let j=0; j<(numvertices-3+closer);j++){
			let clr;
			if(styles.color.fill.length>0){clr=styles.color.fill[0];}
			if(styles.color.fill.length>1){clr=styles.color.fill[j];}
			let pts=[vertices[j],vertices[(j+1)%numvertices],vertices[(j+2)%numvertices]];
			if      (rounded==0){triangleV(pts,clr,    cnv);}
			else if (rounded==1){circleV(  pts,clr,1.8,cnv);}
		}
	}
}
function solidV(faces,styles,closeit){
	for (let i=0; i<faces.length;i++){polyV(faces[i],styles,closeit);}
	return faces;
}
//----------
function triangleV(points,clr,cnv){
	let p5inst=cnv;
	//
	let pts=arrCopy(points);
	if (canvasTupd){for(let i=0; i<3;i++){pts[i]=vecTransform(pts[i],canvasT);}}
	if (cam){for(let i=0; i<3;i++){pts[i]=vecTransform(pts[i],cam);}}
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
function circleV(points,clr,fac,cnv){
	let pts=arrCopy(points);
	if (canvasTupd){for(let i=0; i<3;i++){pts[i]=vecTransform(pts[i],canvasT);}}
	if (cam){for(let i=0; i<3;i++){pts[i]=vecTransform(pts[i],cam);}}
	//
	let circinfo=circumscribe(pts[0],pts[1],pts[2]);
	//
	let p5inst=cnv
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