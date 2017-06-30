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
var objects = [];
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
var target = false;
var lastY;
var lastDone;

var hiveCount = 0;


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
  rectMode(CENTER);
  data = productJSON.product;

  // Objekte erstellen
  biene = new Bee();
  fridge = new Fridge();
  pesticide = new Pesticide();
  hive = new Beehive();
  flower = new Flower();

  for (var l = 0; l < data.length; l++) {
    fridge.add(new Product(data[l].name, data[l].path, data[l].tolerance, data[l].x, data[l].y));
  }

  for (var a = 0; a <2; a++){
    beeArray.push(new Bee());
  }
};

function mousePressed() {
  mouse = true;
  for (var i in objects) {
    var ob = objects[i];

    if (ob.isHit(mouseX, mouseY)) {
      target = ob;
    }
  }
}

function mouseReleased() {
  target = false;
  mouse = false;
}

function canControl() {
  // if (can.mouseIsOver && mouseIsPressed) {
  //   can.position.x = mouseX;
  //   can.position.y = mouseY;
  //
  //   pestArray.push(new Pesticide(mouseX, mouseY));
  // }

  if (target.name === "can"){
    // pestArray.push(new Pesticide(target.x, target.y));
    // pestArray.push(new Pesticide());
  }

}

function hiveControl() {
  if (mouseIsPressed && target) {
    target.x = mouseX - target.w / 2;
    target.y = mouseY - target.h / 2;
    lastTarget = target.name;
    lastY = target.y;
    lastDone = target.done;
  }
  if (lastY > 600 && !target && !lastDone) {
    if (lastTarget === "hive") {
      hives.push(lastTarget);
      if (hives.length < 3) {
        objects.push(new Beehive());
      }

      for (var b = 0; b < hive.bees; b++) {
        beeArray.push(new Bee());
        fridge.tolerance += 10;
      }
    } else if (lastTarget === "flower") {
      flowers.push(lastTarget);
      if (flowers.length < 5) {
        objects.push(new Flower());
      }

      for (var c = 0; c < flower.bees; c++) {
        beeArray.push(new Bee());
        fridge.tolerance += 10;
      }
    }
    lastDone = true;
  }
}

function draw() {
  background(255);
  image(bg, 0, 0, width);

  hive.button();
  flower.button();
  pesticide.button();

  canControl();
  hiveControl();
  fridge.draw();
  fridge.tolControl();

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
  for (var o of objects) {
    o.render();
  }

  // pesticide.render();

  drawSprites();

}
