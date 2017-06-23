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
  pesticide = new Pesticide();
  apple = new Product("apple", 50, width / 2 + 200, height / 2 + 70);
  kiwi = new Product("kiwi", 30, width / 2, height / 2 + 70);
  milk = new Product("milk", 0, width / 2 - 80, height / 2 + 150);
  honey = new Product("honey", 60, width / 2 - 90, height / 2 + 100);
  grapes = new Product("grapes", 60, width / 2 + 20, height / 2 + 170);
  cheese = new Product("cheese", 0, width / 2 + 30, height / 2 + 230);
  tomatoes = new Product("tomato-box", 40, width / 2 - 30, height / 2 + 105);
  mush_box = new Product("mush_box", 0, width / 2 - 90, height / 2 + 220);
  kakao = new Product("kakao", 10, width / 2 - 40, height / 2 + 160);
  salad = new Product("salad", 0, width / 2 - 20, height / 2 + 225);
  butter = new Product("butter", 0, width / 2 - 80, height / 2 + 65);
  ice = new Product("Eis", 0, width / 2 + 60, height / 2 + 100);

  fridge.add(apple);
  fridge.add(kiwi);
  fridge.add(milk);
  fridge.add(honey);
  fridge.add(grapes);
  fridge.add(cheese);
  fridge.add(tomatoes);
  fridge.add(mush_box);
  fridge.add(kakao);
  fridge.add(salad);
  fridge.add(butter);
  fridge.add(ice);


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


  // Einmaliges Aufrufen um die Slider und werte zu initialisieren
  beeControl();


};

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
  if (val2 > pestArray.length) {
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

function draw() {
  background(255);
  image(bg, 0, 0, width);

  val = slider.value();
  val2 = slider2.value();

  // wenn die Slider geändert werden sollen die Control Funktionen als Callback ausgeführt werden.
  pestControl();
  beeControl();
  fridge.draw();

  pesticide.bottle();

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
}
