/*jshint esversion: 6 */
var biene;
var fridge;
var val;
var tolerance;
var slider;
var array = [];
var setup = function() {
  createCanvas(windowWidth, windowHeight);
  biene = new Bee();
  fridge = new Fridge();

  slider = createSlider(0, 255, 0);
  slider.position(200, 600);
  slider.style('width', '150px');
};

function beeControl() {
  if (val > array.length) {
    for (var j = array.length; j < val; j++) {
      array.push(new Bee());
      console.log("push");
      fridge.tolerance += 10;
    }
  } else {
    for (var k = array.length; k > val; k--) {
      array.shift();
      console.log("shift");
      fridge.tolerance -= 10;
    }
  }
}
//
// function mouseDragged(){
//   biene.slider(mouseY);
//   return false;
// }

function draw() {
  val = slider.value();

  slider.changed(beeControl);

  background(255);
  fridge.draw();
  for (var bee of array) {
    bee.draw();
  }

  text(val, 250, 580);

}
