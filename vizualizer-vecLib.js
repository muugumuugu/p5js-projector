let vizID=0;
//=================================================================
function setup() {
	angleMode(DEGREES);
	colorMode(HSB,360,100,100,255);
	//----------------------------
	cnv=createCanvas(sz,sz);
	cnv.parent(select('#cnvs'));
	//-------------------------------
	background(0);
	drawGrid(10,true);
	//-------------------------------
	setSoundSys();
	//-------------------------------
	makeTerrain();
	makePos();
	//-------------------------------
	DEPTH=sz;
	updateOnResize();
	//-------------------------------
	camControls();
	canvasControls();
	updateviewCam();
	updateviewCnvs();
}
function draw() {
	clear();
	drawGrid(10,true,true);
	coorDisp();
	//---------------------

	//---------------------
	spec=fft.analyze();
	//--------------------
	if(vizID==0){
		rotSpec();
	}
	else{
		terrainG();
	}
}
//==========================================================================
function keyPressed(){
		if      (key=='o'){resetcam();}
		else if (key=='c'){resetcam(true);}
}