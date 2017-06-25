/*jshint esversion: 6 */
var biene;
var fridge;
var pesticide;
var beeAlive;
var fridgeOpen;
var tolerance;
var beeArray = [];
var pestArray = [];
var hives = [];
var flowers = [];
var bg;
var product;
var productJSON;
var can;
var data;
var dose;
var hiveImg;
var hive;
var done = false;
var mouse = false;
var hiveEl;
var flowerEl;
var flowerEls;
var hiveEls;
var myHive;
var myFlower;

function preload() {
  bg = loadImage("./assets/Feld.png");
  beeAlive = loadImage("./assets/Biene_lebend.png");
  fridgeOpen = loadImage("./assets/Kühlschrank_offen.png");
  productJSON = loadJSON("./products.json");
  dose = loadImage("./food/Pestizid_Dose.png");
  hiveImg = loadImage("./assets/Bienenstock.png");
  flower1 = loadImage("./flowers/Blume1.png");
  flower2 = loadImage("./flowers/Blume2.png");
  flower3 = loadImage("./flowers/Blume3.png");
  flower4 = loadImage("./flowers/Blume4.png");
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
  flower = new Flower();

  flowerEls = new Group();
  hiveEls = new Group();

  for (var l = 0; l < data.length; l++) {
    fridge.add(new Product(data[l].name, data[l].path, data[l].tolerance, data[l].x, data[l].y));
  }

  can = createSprite(width - 300, height - 300);
  can.addImage(dose);
  can.mouseActive = true;
  //
  // hiveEl = createSprite(120, 120);
  // hiveEl.addImage(hiveImg);
  // hiveEl.mouseActive = true;

  hives = new Group();

};

function mousePressed() {
  mouse = true;
}

function mouseReleased() {
  mouse = false;
}

function canControl() {
  if (can.mouseIsOver && mouseIsPressed) {
    can.position.x = mouseX;
    can.position.y = mouseY;

    pestArray.push(new Pesticide(mouseX, mouseY));
  }

}

function hiveControl() {
  hiveEls.add(hiveEl);
  if (!mouse && hiveEl.position.x > 0 && hiveEl.position.x < width / 2 && hiveEl.position.y > 600 && !done) {

    for (var b = 0; b < hive.bees; b++) {
      beeArray.push(new Bee());
    }
    done = true;
    hives.push(new Beehive());
  }

  for (var i = 0; i < hiveEls.length; i++) {
    myHive = hiveEls[i];
    if (myHive.mouseIsOver && mouseIsPressed) {

      if (myHive.overlap(myFlower)) {
        myHive.position.x = myHive.position.x;
        myHive.position.y = myHive.position.y;
      } else {
        myHive.position.x = mouseX;
        myHive.position.y = mouseY;
      }
    }
  }

  if (hives.length >= 3) {
    hiveEl.remove();
  }
}

function flowerControl() {
  flowerEls.add(flowerEl);

  if (!mouse && flowerEl.position.x > 0 && flowerEl.position.x < width / 2 && flowerEl.position.y > 600 && !done) {

    for (var b = 0; b < flower.bees; b++) {
      beeArray.push(new Bee());
    }
    flowers.push(new Flower());
    flowerEls.add(flowerEl);
  }

  for (var i = 0; i < flowerEls.length; i++) {
    myFlower = flowerEls[i];
    if (myFlower.mouseIsOver && mouseIsPressed) {
      if (myFlower.overlap(myHive)) {
        myFlower.position.x = myFlower.position.x;
        myFlower.position.y = myFlower.position.y;
      } else {
        myFlower.position.x = mouseX;
        myFlower.position.y = mouseY;
      }

    }
  }

  if (flowers.length == 7) {
    flowerEl.remove();
  }
}


function draw() {
  background(255);
  image(bg, 0, 0, width);

  // wenn die Slider geändert werden sollen die Control Funktionen als Callback ausgeführt werden.
  // pestControl();
  // beeControl();
  canControl();
  hiveControl();
  flowerControl();
  fridge.draw();

  // male soviel Pestizide/Biene wie Elemente in den Arrays vorhanden sind.
  for (var bee of beeArray) {
    bee.draw();
  }
  for (var pest of pestArray) {
    pest.draw();
  }

  for (var prod of fridge.products) {
    if (prod.on) {
      prod.show();
    } else {
      prod.hide();
    }
  }

  hive.button();

  flower.button();
  pesticide.button();

  
  hiveEl.debug = mouseIsPressed;
  flowerEl.debug = mouseIsPressed;
  drawSprites();

}
