/*jshint esversion: 6 */
var biene;
var fridge;
var beeAlive;
var fridgeOpen;
var val;
var val2;
var tolerance;
var slider;
var beeArray = [];
var pestArray = [];
var bg;
var product;
var productJSON;
function preload() {
  bg = loadImage("./assets/Feld.png");
  beeAlive = loadImage("./assets/Biene_lebend.png");
  fridgeOpen = loadImage("./assets/Kühlschrank_offen.png");
  productJSON = loadJSON("products.json");
}
// einmaliger Aufruf
var setup = function() {
  createCanvas(windowWidth, windowHeight);

  // Objekte erstellen
  biene = new Bee();
  fridge = new Fridge();
  pest = new Pesticide();
  apple = new Product("apple", 50);
  fridge.add(apple);

  // slider für Bienen
  slider = createSlider(0, 10, 5);
  slider.position(200, 600);
  slider.style('width', '150px');
  val = slider.value();

  // Slider für Pesticide
  slider2 = createSlider(0, 10, 0);
  slider2.position(1000, 600);
  slider2.style('width', '150px');

  // Einmaliges Aufrufen um die Slider und werte zu initialisieren
  beeControl();
};

// prüft ob die slider werte größer oder kleiner sind und passt das beeArray an diesen Wert an
function beeControl() {
  // falls slider wert größer ist, werden soviele Objekte in das Array gepusht bis die selbe Länge wie der sliderwert erreicht wird.
  if (val > beeArray.length) { // falls der sliderwert größer ist als die Länge des Arrays
    for (var j = beeArray.length; j < val; j++) { // zähle bis zum Wert vom Slider
      beeArray.push(new Bee()); // Pushe jedes mal ein neues Objekt in das Array
      fridge.tolerance += 10; // tolerance wird erhöht um die Produkte auszugrauen
    }
  } else { // wenn der sliderwert kleiner ist
    for (var k = beeArray.length; k > val; k--) { // zähle auf den sliderwert herunter
      beeArray.shift(); // entferne jedes mal das erste Element aus dem Array
      fridge.tolerance -= 10; // verringere die tolerance um 10.
    }
  }
}

// selbe Funktion wie bei den Bienen nur auf pestArray bezogen und den Slider für Pestizide
function pestControl() {
  if (val2 > pestArray.length) {
    for (var j = pestArray.length; j < val2; j++) {
      pestArray.push(new Pesticide());
      console.log("push");
      fridge.tolerance -= 10;
      beeArray.shift();

      // verringert den wert vom Bienen slider wenn Pestizid Slider erhöht wird.
      slider.value(beeArray.length);

    }
  } else {
    for (var k = pestArray.length; k > val2; k--) {
      pestArray.shift();
      console.log("shift");
      fridge.tolerance += 10;
      beeArray.push(new Bee());

      // erhöht den wert vom Bienen slider wenn Pestizid Slider verringert wird.
      slider.value(beeArray.length);
    }
  }
}

// tint(255, 70);
// filter(GRAY);

function draw() {
  background(255);
  image(bg, 0, 0, width);

  // variablen für die Werte der jeweiligen Slider
  val = slider.value();
  val2 = slider2.value();

  // wenn die Slider geändert werden sollen die Control Funktionen als Callback ausgeführt werden.
  slider.changed(beeControl);
  slider2.changed(pestControl);

  fridge.draw();

  // male soviel Pestizide/Biene wie Elemente in den Arrays vorhanden sind.
  for (var bee of beeArray) {
    bee.draw();
  }
  for (var pest of pestArray) {
    pest.draw();
  }
  for (var produ of fridge.products){
    produ.show(width/2, height/2);
  }

  text(val, 250, 580);
}
