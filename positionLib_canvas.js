function polyP(arrpt,styles_,closeit,rotns){
	let numvertices=arrpt.length;
	let styles=Pen();
	if(styles_){styles=styles_;}
	let closer=0;
	if(closeit){closer=1;}
	let vertices=arrCopy(arrpt);
	if(rotns){for(let i=0; i<numvertices;i++){vertices[i]=vertices[i].rot(rotns);}}
	//
	if (styles.show.points){
		for(let i=0; i<numvertices; i++){
			let clr,stkwt;
			if(styles.color.points.length>0){clr=styles.color.points[0];}
			if(styles.color.points.length>1){clr=styles.color.points[i];}
			if(styles.wt.points.length>0){stkwt=styles.wt.points[0];}
			if(styles.wt.points.length>1){stkwt=styles.wt.points[i];}
			vertices[i].disp(clr,stkwt);
		}
	}
	//
	let centroid=new position(vertices[0].dim,vertices[0].scene);
	for(let i=0; i<numvertices; i++){centroid.add(vertices[i]);}
	centroid.origin=vertices[0].origin;
	centroid.scale(1/numvertices);
	centroid.upd();
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
			vertices[i].upd();
			ngbr.upd();
			let pts=[vertices[i],ngbr,centroid];
			area+=triangleP(pts,clr);
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
			perimeter+=vertices[i].connect(ngbr,clr,stkwt);
		}
	}
	return {'centroid':centroid,'area':area,'perimeter':perimeter};
}
function tristripP(arrpt,styles_,closeit,rotns,rounded){
	let numvertices=arrpt.length;
	let closer=0;
	if(closeit){closer=1;}
	let styles=Pen();
	if(styles_){styles=styles_;}
	let vertices=arrCopy(arrpt);
	if(rotns){for(let i=0; i<numvertices;i++){vertices[i]=vertices[i].rot(rotns);}}
	if (styles.show.points){
		for (let j=0; j<(numvertices-1+closer);j++){
			let clr,stkwt;
			if(styles.color.points.length>0){clr=styles.color.points[0];}
			if(styles.color.points.length>1){clr=styles.color.points[j];}
			if(styles.wt.points.length>0){stkwt=styles.wt.points[0];}
			if(styles.wt.points.length>1){stkwt=styles.wt.points[j];}
			vertices[j].disp(clr,stkwt);
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
			vertices[j].connect(ngbr1,clr,stkwt);
			vertices[j].connect(ngbr2,clr,stkwt);
		}
	}
	if (styles.show.fillit){
		for (let j=0; j<(numvertices-3+closer);j++){
			let clr;
			if(styles.color.fill.length>0){clr=styles.color.fill[0];}
			if(styles.color.fill.length>1){clr=styles.color.fill[j];}
			let pts=[vertices[j],vertices[(j+1)%numvertices],vertices[(j+2)%numvertices]];
			if      (rounded==0){triangleP(pts,clr);}
			else if (rounded==1){circleP(  pts,clr,1.8);}
		}
	}
}
function solidP(faces,closeit,pens,rotors){
	if(Array.isArray(pens)){
			if(Array.isArray(rotors)){
				for (let i=0; i<faces.length;i++){polyP(faces[i],closeit,pens[i],rotors[i]);}
			}
			else{
				for (let i=0; i<faces.length;i++){polyP(faces[i],closeit,pens[i],rotors);}
			}
		}
	else{
		if(Array.isArray(rotors)){
				for (let i=0; i<faces.length;i++){polyP(faces[i],closeit,pens,rotors[i]);}
			}
			else{
				for (let i=0; i<faces.length;i++){polyP(faces[i],closeit,pens,rotors);}
			}
	}
	return faces;
}
//----------------------------
function triangleP(pts,clr){
	let p5inst=pts[0].cnv;
	if (p5inst){
		if (clr){p5inst.fill(clr);}
		p5inst.push();
		p5inst.noStroke()
		p5inst.triangle(pts[0].screen.x,pts[0].screen.y,pts[1].screen.x,pts[1].screen.y,pts[2].screen.x,pts[2].screen.y);
		p5inst.pop();
	}
	else{
		if (clr){fill(clr);}
		push();
		noStroke();
		triangle(pts[0].screen.x,pts[0].screen.y,pts[1].screen.x,pts[1].screen.y,pts[2].screen.x,pts[2].screen.y);
		pop();
	}
	let area=0.5*Math.abs(det([
		[1,pts[0].screen.x,pts[0].screen.y],
		[1,pts[1].screen.x,pts[1].screen.y],
		[1,pts[2].screen.x,pts[2].screen.y],
		]));
	return area;
}
function circleP(pts,clr,fac){
	let circinfo=circumscribe(pts[0].pos,pts[1].pos,pts[2].pos);
	let ccenter=new position(circleinfo.center,pts[0].scene,pts[0].phys)
	ccenter.origin=pts[0].origin;
	ccenter.upd();
	let p5inst=pts[0].cnv;
	if (p5inst){
		if (clr){p5inst.fill(clr);}
		p5inst.push();
		p5inst.noStroke()
		p5inst.circle(ccenter.screen.x,ccenter.screen.y,fac*circinfo.r);
		p5inst.pop();
	}
	else{
		if (clr){fill(clr);}
		push();
		noStroke();
		circle(center.screen.x,ccenter.screen.y,fac*circinfo.r);
		pop();
	}
}
//-----------------------------------
function dotCircleP(r,style,detail_,rot,pos,mode,inst){
	let detail=500;


}