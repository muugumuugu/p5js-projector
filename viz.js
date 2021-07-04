let fft, mic,spec,amp;
function setSoundSys(){
	mic = new p5.AudioIn();
	mic.start();
	amp=new p5.Amplitude();
	amp.setInput(mic);
	fft = new p5.FFT();
	fft.setInput(mic);
}
//==========================================
let cublings=[];
let numb=36;
let cubeD=Math.PI*sz*0.4/(numb*2)
function makePos(){
	for (let i=0; i<numb;i++){
		let ang=map(i,0,numb,360,0);
		let x=sz*0.4*cos(ang);
		let z=sz*0.4*sin(ang);
		//let y=map(z,-50,50,-25,25);
		let y=0;
		let angg=(ang)*TWO_PI/360;
		let rotn=Rotor([0,PI/2-angg,0])
		cublings.push({
			'x':x,
			'y':y,
			'z':z,
			'rot':rotn,
			'val':null,
			'offset':0
		});
	}

}
//--------------
function rotSpec(modee){
	for (let i=0; i<numb; i++){
		let ind=floor(i*spec.length*0.8/numb);
		let h=25+spec[ind]*sz*0.5/255;
		strokeWeight(0.8);
		stroke(0,0,0,200);
		let off=floor((i+frameCount)%numb);
		let fills=i;
		cublings[off].val=h;
		cublings[off].offset=i;
		push();
		fill(map(cublings[i].offset,0,numb,0,360),100,100,100);
		if (modee==PMODE){
			cuboidP(
				cubeD,cublings[i].val,cubeD,//l,h,b
				[cublings[i].x,cublings[i].y,cublings[i].z],
				cublings[i].rot);
			}
		else{
			cuboidV(
				[cubeD,cublings[i].val,cubeD],
				[cublings[i].x,cublings[i].y,cublings[i].z],
				null,cublings[i].rot,
				true//digitizee
				);
		}
		pop();
	}
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let scl=50;
let rows=Math.floor(sz*1.5/scl),cols=Math.floor(sz*1.5/scl);
let terrain=[];
function makeTerrain(){
	for (var x = 0; x < cols; x++) {
		terrain[x] = [];
		for (var y = 0; y < rows; y++) {
			terrain[x][y] = 0; //specify a default value for now
		}
	}
}
//--------------
function terrainG(modee,roundit){
	for (let y = 0; y < rows; y++) {
		let xoff = 0;
	let r=sq(cols/2)+sq(rows/2);
		for (let x = 0; x < cols; x++) {
		let dx=sq(x-cols/2)
		let dy=sq(y-rows/2)
		let radwise=floor(map(dx+dy,0,r,0,800));
		let freqen=spec[radwise]/255;
		terrain[x][y] =freqen*freqen*255;
		}
	}
	if (modee==PMODE){
			for (let z = 0; z < rows-1; z++) {
					let terrainpts=[];
					let tstyles=new Pen(4);
				for (let x = 0; x < cols-1; x++) {
					let xi=x-cols/2
					let cor =240-120*log(1+terrain[x][z])/log(16)
					tstyles.color.fill.push(color(cor, 100, 100,100));
					tstyles.color.fill.push(color(cor, 100, 100,100));
					let t1=new position([(x-cols/2)*scl, terrain[x][z],(z-rows/2)*scl,]);
					let t2=new position([(x-cols/2)*scl, terrain[x][z+1],(z-rows/2)*scl+scl]);
					t1.digitize();
					t2.digitize();
					terrainpts.push(t1);
					terrainpts.push(t2);
					}
					tristripP(terrainpts,tstyles,false,null,roundit);
		}
	}
	else{
		for (let z = 1; z < rows-1; z++) {
			let terrainpts=[];
			let tstyles=new Pen(4);
			for (let x = 1; x < cols; x++) {
				let cor =240-120*log(1+terrain[x][z])/log(16)
				tstyles.color.fill.push(color(cor, 100, 100,100));
				tstyles.color.fill.push(color(cor, 100, 100,100));
				let t1=vec3((x-cols/2)*scl, terrain[x][z]  ,(z-rows/2)*scl);
				t1=vecDigitize(t1);
				terrainpts.push(t1);
				let t2=vec3((x-cols/2)*scl, terrain[x][z+1],(z-rows/2)*scl+scl);
				t2=vecDigitize(t2)
				terrainpts.push(t2);
			}
			let t0=vec3((cols/2)*scl, terrain[cols-1][z]  ,(z-rows/2)*scl+scl);
			t0=vecDigitize(t0);
			terrainpts.push(t0);
			tristripV(terrainpts,false,tstyles,null,roundit);
		}
	}
}
//============================================