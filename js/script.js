let w, h, color, scale, round, eraser = false, isenable;
function setup() {
  w = document.getElementById('body').offsetWidth;
  h = document.getElementById('body').offsetHeight - document.getElementById('header').offsetHeight;
  cnv = createCanvas(w, h);
  background("white");
  inputColor = createColorPicker('#000000');
  inputColor.addClass("input-color");
  inputColor.position(w/100*10,h/100*1.5);
  inputSize = createInput('1');
  inputSize.addClass("input-num");
  inputSize.position(w/100*20,h/100*1.5);
  inputRound = createSlider('');
  inputRound.position(w/100*30,h/100*3);
  inputRound.addClass("input-range");
  btnErase = createButton("erase");
  btnErase.position(w/100*55,h/100*1.5);
  btnErase.addClass("button");
  btnErase.mousePressed(eraserCanvas);
  btnClear = createButton("clear");
  btnClear.position(w/100*70,h/100*1.5);
  btnClear.addClass("button");
  btnClear.mousePressed(clearCanvas);
  btnSave = createButton("save");
  btnSave.position(w/100*85,h/100*1.5);
  btnSave.addClass("button");
  btnSave.mousePressed(saveImage);
}
function draw() {
  color = inputColor.value();
  scale = inputSize.value();
  round = inputRound.value();
  if(scale < 0){
    scale *= -1;
  }
  if (mouseIsPressed && isenable) {
    noStroke();
    square(mouseX-5*scale, mouseY-5*scale, 10*scale, 10*scale/200*round);
    if(eraser){
      erase();
    }else{
      noErase();
      fill(color);
    }
  }
}
function windowResized(){
  w = document.getElementById('body').offsetWidth;
  h = document.getElementById('body').offsetHeight - document.getElementById('header').offsetHeight;
  resizeCanvas(w,h);
}
const eraserCanvas = function(){
  if(eraser){
    eraser = false;
    btnErase.removeClass("active");
    btnErase.addClass("button");
  }else{
    eraser = true;
    btnErase.addClass("active");
  }
};
const clearCanvas = function(){
  clear();
  eraser = false;
  btnErase.addClass("button");
};
const saveImage = function(){
  save(cnv,'paint.jpg');
};
document.addEventListener('mousemove', function(event) {
	if(isenable){
    document.getElementById('mousecircle').style.left = event.pageX-5*scale+"px";
    document.getElementById('mousecircle').style.width = 10*scale+"px";
    document.getElementById('mousecircle').style.top = event.pageY-5*scale+"px";
    document.getElementById('mousecircle').style.height = 10*scale+"px";
    document.getElementById('mousecircle').style.borderRadius = 10*scale/200*round+"px";
  }
  if(eraser){
    document.getElementById('mousecircle').style.borderColor = "#000";
  }else{
    document.getElementById('mousecircle').style.borderColor = color;
  }
  if(event.pageY <= document.getElementById('header').offsetHeight){
    isenable = false;
  }else{
    isenable = true;
  }
});




