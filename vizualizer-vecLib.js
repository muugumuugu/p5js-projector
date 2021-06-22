let DEPTH=sz,depth=sz;
//=================================================================
function setup() {
  angleMode(DEGREES);
  colorMode(HSB,360,100,100,255);
  //----------------------------
  cnv=createCanvas(sz,sz);
  cnv.parent(select('#cnvs'));
  cnv.mouseOver(coorDisp);
  cnv.mouseMoved(coorDisp);
  //-------------------------------
  background(0);
  drawGrid(10,true);
  //-------------------------------
  setSoundSys();
  //-------------------------------
  makeTerrain();
  makePos();
  //-------------------------------
  camControls();
  updateview();
}
function draw() {
  background(0);
  drawGrid(10,true,true);
  coorDisp();
  //---------------------
  resetScreen()
  //---------------------
  spec=fft.analyze();
  //--------------------
  //rotX(-3.6725);
  //rotSpec(0,Scene(4));
  terrainG(0,Scene(1),0);
  //cuboidV([100,200,300],null,true)
}
//==========================================================================
function keyPressed(){
    if      (key=='o'){resetCam();}
    else if (key=='c'){resetCam(true);}
}