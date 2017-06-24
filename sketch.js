/*jshint esversion: 6 */
var biene;
var fridge;
var pesticide;
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
var banana;
var can;
var data;
var dose;
var hiveImg;
var hive;
var done = false;
var mouse = false;

function preload() {
  bg = loadImage("./assets/Feld.png");
  beeAlive = loadImage("./assets/Biene_lebend.png");
  fridgeOpen = loadImage("./assets/Kühlschrank_offen.png");
  productJSON = loadJSON("./products.json");
  dose = loadImage("./food/Pestizid_Dose.png");
  hiveImg = loadImage("./assets/beehive.png");
}
// einmaliger Aufruf
var setup = function() {
  createCanvas(windowWidth, windowHeight);
  data = productJSON.product;
  // Objekte erstellen
  biene = new Bee();
  fridge = new Fridge();
  pesticide = new Pesticide();
  hive = new Beehive();


  for (var l = 0; l < data.length; l++) {
    fridge.add(new Product(data[l].name, data[l].path, data[l].tolerance, data[l].x, data[l].y));
  }

  // slider für Bienen
  slider = createSlider(0, 10, 3);
  slider.position(200, 600);
  slider.style('width', '150px');
  slider.id("slider");
  val = slider.value();

  // Slider für Pesticide
  slider2 = createSlider(0, 10, 0);
  slider2.position(width - 300, 600);
  slider2.style('width', '150px');
  slider2.id("slider2");
  val2 = slider2.value();

  can = createSprite(width - 300, height - 300);
  can.addImage(dose);
  can.mouseActive = true;

  hiveEl = createSprite(120, 120);
  hiveEl.addImage(hiveImg);
  hiveEl.mouseActive = true;



  // Einmaliges Aufrufen um die Slider und werte zu initialisieren
  beeControl();
};

function mousePressed() {
  mouse = true;
}

function mouseReleased(){
  mouse = false;
}

// prüft ob die slider werte größer oder kleiner sind und passt das beeArray an diesen Wert an
function beeControl() {
  fridge.tolControl();
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

  // if(val > 3){
  //   slider.value(3);
  // }
}

// selbe Funktion wie bei den Bienen nur auf pestArray bezogen und den Slider für Pestizide
function pestControl() {
  fridge.tolControl();
  if (val2 >= pestArray.length) {
    for (var j = pestArray.length; j < val2; j++) {
      pestArray.push(new Pesticide());
      fridge.tolerance -= 10;
      if (val > 2) {
        beeArray.shift();
      }
      // verringert den wert vom Bienen slider wenn Pestizid Slider erhöht wird.
      slider.value(beeArray.length);
    }
  } else {
    for (var k = pestArray.length; k > val2; k--) {
      pestArray.shift();
      fridge.tolerance += 10;

      if (val2 < 5) {
        beeArray.push(new Bee());
      }

      // erhöht den wert vom Bienen slider wenn Pestizid Slider verringert wird.
      slider.value(beeArray.length);

    }
  }

  if (fridge.tolerance <= 0) {
    fridge.tolerance = 0;
  }
}

function canControl() {
  if (can.mouseIsOver && mouseIsPressed) {
    can.position.x = mouseX;
    can.position.y = mouseY;

    pestArray.push(new Pesticide(mouseX, mouseY));
  }

  if (hiveEl.mouseIsOver && mouseIsPressed) {
    hiveEl.position.x = mouseX;
    hiveEl.position.y = mouseY;

  } else if (!mouse && hiveEl.position.x > 0 && hiveEl.position.x < width / 2 && hiveEl.position.y > 500 && !done) {

    for(var b = 0; b < hive.bees; b++){
      beeArray.push(new Bee());
    }
    done = true;

  }

}



function draw() {
  background(255);
  image(bg, 0, 0, width);

  val = slider.value();
  val2 = slider2.value();

  // wenn die Slider geändert werden sollen die Control Funktionen als Callback ausgeführt werden.
  // pestControl();
  // beeControl();
  canControl();
  fridge.draw();

  // male soviel Pestizide/Biene wie Elemente in den Arrays vorhanden sind.
  for (var bee of beeArray) {
    bee.draw();
  }
  for (var pest of pestArray) {
    pest.draw();
  }
  text(val, 250, 580);

  for (var prod of fridge.products) {
    if (prod.on) {
      prod.show();
    } else {
      prod.hide();
    }
  }

  hive.button();

  drawSprites();

}
