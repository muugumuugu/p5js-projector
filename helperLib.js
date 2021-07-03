function Pen(show){
	let newpen={};
	newpen.show={};
	newpen.color={'points':[],'edges':[],'fill':[]};
	newpen.wt={'points':[],'edges':[]};
	if (show){
		if (Array.isArray(show)){
			newpen.show.points=(1==show[0]);
			newpen.show.edges=(1==show[1]);
			newpen.show.fillit=(1==show[2]);
		}
		else if (typeof(show)=='object'){
			newpen.show.points=show.points;
			newpen.show.edges=show.edges;
			newpen.show.fillit=show.fillit;
		}
		else{
			switch (show){
				case 0:
					break;
				case 1:
					newpen.show.points=true;
					break;
				case 2:
					newpen.show.edges=true;
					break;
				case 3:
					newpen.show.points=true;//1
					newpen.show.edges=true;//2
					break;
				case 4:
					newpen.show.fillit=true;
					break;
				case 5:
					newpen.show.points=true;//1
					newpen.show.fillit=true;//4
					break;
				case 6:
					newpen.show.edges=true;//2
					newpen.show.fillit=true;  //4
					break;
				case 7:
					newpen.show.points=true//1
					newpen.show.edges=true;//2
					newpen.show.fillit=true;//4
					break;
			}
		}
	}
	else{
		newpen.show.points=true;
	}
	return newpen;
}
//=============
function PhysProp(dimen){
	let prop={
		'mass':1,
		'vel':new position(dimen),
		'acc':new position(dimen),
		'density':1,
		'fricn':1};
	return prop;
}
function Scene(mode,cam,cnvs,stretches,center){
		let cnvs_=null,mode_=0,cam_=null,center_=vec3(),stretches_=vec3(1,1,1),canvasTupd=false,canvasT_=tMatrix();
		if(cnvs){cnvs_=cnvs;}
		if(mode){mode_=mode;}
		if(cam){cam_=cam;}
		if(canvasT){canvasT_=canvasT;}
		if(center){center_=center}
		if(stretches){stretches_=stretches;}
	return {'mode':mode_,'cam':cam_,'cnv':cnvs_,'stretches':stretches_,'center':center_,'canvasT':canvasT_,'canvasTupd':canvasTupd}
}
function Rotor(arr,theta){
	let obj=vec3();
	if (arr){
		if (Array.isArray(arr)){
			obj.x=arr[0];
			if (arr.length>1){obj.y=arr[1];}
			if (arr.length>2){obj.z=arr[2];}
		}
		else if (typeof(arr)=='object'){obj=arr;}
		else if (typeof(arr)=='number'){obj.x=arr;}
	}
	if(theta){return new Quaternion(obj,theta);}
	return obj;
}
//=============
function pol2cart(r,theta,plane,xdir){
	let posV;//draws on XY plane , plane argument is the optional unit vector for custom Z direcion
	posV=vec3(r*Math.cos(theta),r*Math.sin(theta),0);
	if (plane){
		posV=flipPlane(posV,plane,xdir);
	}
	return posV;
}
//---------------
function circumscribe(P1, P2, P3) {
	let D21=vecDiff(P2,P1);
	let D31=vecDiff(P3,P1);
	let F2 = 1/2*vecMagSq(D21);
	let F3 = 1/2*vecMagSq(D31);
	let N23=vecCross(D21,D31);
	D21=vecScale(D21,F3);
	D31=vecScale(D31,F2);
	let Rv=vecScale(vecCross(vecDiff(D31,D21),N23),1/vecMagSq(N23))
	let C=vecSum(P1,Rv);
	let r=vecMag(Rv);
	return {'center':C,'r':r,'plane':vecNormalize(N23)}
}
//---------------
function flipPlane(vecP,normal,xdir){
	let uz=vecNormalize(normal);
	let a=uz.x,b=uz.y,c=uz.z;
	let ux;
	if (xdir){ux=xdir;}
	else{//make random vec on plane the x axis.
		if      (a!=0){ux=[-(b+c)/a,1,1]}
		else if (b!=0){ux=[1,-(a+c)/b,1]}
		else if (c!=0){ux=[1,1,-(a+b)/c]}
	}
	ux=vecNormalize(ux)//returned parsed :)
	let uy=vecNormalize(vecCross(uz,ux));
	if(Array.isArray(vecP)){vecP=arr2vec(vecP);}
	ux=vecScale(ux,vecP.x);
	uy=vecScale(uy,vecP.y);
	uz=vecScale(uz,vecP.z)
	return vecSum(null,null,[ux,uy,uz])
}
//---------------
function applyTrans(pos,T){
	let posM=homogenize2Mat(pos);//homogenized coors
	let transf=matMult(posM,T)[0];
	return arr2vec(transf);
}
function rotAround(pos,v,ang){
	let q=new Quaternion(v,ang);
	return q.conjugation(pos).im;
}
//=============
function homogenize(vecObj){
	let w=1;
	if(vecObj.w){w=vecObj.w;}
	return [vecObj.x,vecObj.y,vecObj.z,w];
}
function homogenize2Mat(vecObj){
	return [homogenize(vecObj)];
}
//==============
function look(at,from){
	return Camera(null,lookAtM(from,at));
}
//==============
function drawGrid(scaled,showOrigin,label,rotaxes,inst){
	let fac=1;
	let w,h;
	if (scaled){fac=scaled;}
	if (inst){
		w=inst.width;
		h=inst.height;
		inst.push();
		//digitize
		inst.translate(w / 2, h / 2);
		//inst.scale(1, -1);
		//
		inst.colorMode(inst.RGB,255,255,255,255)
		inst.stroke(255, 255, 0, 64);//yellow and transparent
		inst.strokeWeight(1/fac);//1 pixel
		inst.scale(fac);
		//
		if (rotaxes){inst.rotate(-rotaxes);}//to become like a right hand without scaling by -1
		for (let i = 0; i < h / 2; i++) {//horiz
			inst.line(-w / 2, i, w / 2, i);
			inst.line(-w / 2, -i, w / 2, -i);
			if (label){
				inst.textSize(8*1/fac);
				inst.fill(255);
				if (i%10==5){
					inst.text('-\t ' + inst.nf(i,2,0),-8*1/fac,i);
					inst.text('+\t ' + inst.nf(i,2,0),-8*1/fac,-i)
					inst.circle(0,i,3/fac);
					inst.circle(0,-i,3/fac);
				}
			}
		}
		for (let i = 0; i < w / 2; i++) {
			inst.line(i, -h / 2, i, h / 2);//vert
			inst.line(-i, -h / 2, -i, h / 2);
			if (label){
				inst.textSize(8*1/fac);
				inst.fill(255);
				if (i%10==5){
					inst.text('+' + inst.nf(i,2,0),i-8/fac,(1+2*1/fac));
					inst.circle(i,0,3/fac);
					inst.circle(-i,0,3/fac);
					inst.text('-' + inst.nf(i,2,0),-i-8/fac,(1+2*1/fac))
				}
			}
		}
		inst.stroke(255, 0, 0, 192);//red but slight mask
		inst.line(-w / 2, 0, w / 2, 0); //X axis
		inst.line(0, -h / 2, 0, h / 2); //Y axis
		if(showOrigin){
			inst.strokeWeight(1)//scaled
			inst.stroke(0, 0, 255, 255);//blue and bright:)
			inst.point(0,0);
		}
		inst.pop();
	}
	else{
		w=width;
	h=height;
	push();
	//digitize
	translate(w / 2, h / 2);
	//scale(1, -1);//text gets reversed
	//
	colorMode(RGB,255,255,255,255)
	stroke(255, 255, 0, 64);//yellow and transparent
	strokeWeight(1/fac);//1 pixel
	scale(fac);
	//
		if (rotaxes){rotate(-rotaxes);}//to become like a right hand without scaling by -1
		//
	for (let i = 0; i < h / 2; i++) {//horiz
			line(-w / 2, i, w / 2, i);
			if (label){
				textSize(8*1/fac);
				fill(255);
				if (i%10==5){
					text('-\t ' + nf(i,2,0),-8*1/fac,i);
					circle(0,i,3/fac);
					circle(0,-i,3/fac);
					text('+\t ' + nf(i,2,0),-8*1/fac,-i)
				}
			}
			line(-w / 2, -i, w / 2, -i);
	}
	for (let i = 0; i < w / 2; i++) {
	  line(i, -h / 2, i, h / 2);//vert
			if (label){
				textSize(8*1/fac);
				fill(255);
				if (i%10==5){
					text('+' + nf(i,2,0),i-8/fac,(1+2*1/fac));
					circle(i,0,3/fac)
					circle(-i,0,3/fac)
					text('-' + nf(i,2,0),-i-8/fac,(1+2*1/fac))
				};
			}
			line(-i, -h / 2, -i, h / 2);
	}
	stroke(255, 0, 0, 192);//red but masked
	line(-w / 2, 0, w / 2, 0); //X axis
	line(0, -h / 2, 0, h / 2); //Y axis
		if(showOrigin){
			strokeWeight(1)//scaled
			stroke(0, 0, 255, 255);//blue and bright:)
			point(0,0);
		}
	pop();
	}

}
//------
function coorDisp(){
	fill(255);
	stroke(255);
	strokeWeight(0.2);
	textSize(14);
	text(nf(mouseX,3,1)+','+nf(mouseY,3,1),mouseX,mouseY);
}
//========================