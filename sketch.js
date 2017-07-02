/*jshint esversion: 6 */
var biene;
var tolerance;
var beeArray = [];
var pestArray = [];
var hives = [];
var flowers = [];
var flowerCounter = 0;
var flowerPool = [];
var flowerRound;
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
let lastDone;
var pestCounter = 0;
var playSound = false;
var deletable;

function preload() {
  bg = loadImage("./assets/Feld.png");
  beeAlive = loadImage("./assets/Biene_lebend.png");
  fridgeOpen = loadImage("./assets/Body_Kühlschrank.png");
  productJSON = loadJSON("./products.json");
  dose = loadImage("./food/Pestizid_Dose.png");
  hiveImg = loadImage("./assets/Bienenstock.png");
  flower1 = loadImage("./flowers/Blume1.png");
  flower2 = loadImage("./flowers/Blume2.png");
  flower3 = loadImage("./flowers/Blume3.png");
  flower4 = loadImage("./flowers/Blume4.png");
  drop = loadSound("./sounds/drop.caf");
  spray = loadSound("./sounds/spray.mp3");
  dig = loadSound("./sounds/digging1.mp3");
  buzz = loadSound("./sounds/bee.mp3");
}
// einmaliger Aufruf
var setup = function() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  data = productJSON.product;
  flowerPool = [flower2, flower1, flower3, flower4];
  flowerRound = flowerPool[flowerCounter];
  // Objekte erstellen
  biene = new Bee();
  fridge = new Fridge();
  pesticide = new Pesticide();
  hive = new Beehive();
  flower = new Flower();

  for (var l = 0; l < data.length; l++) {
    fridge.add(new Product(data[l].name, data[l].path, data[l].tolerance, data[l].x, data[l].y));
  }

  for (var a = 0; a < 3; a++) {
    beeArray.push(new Bee());
    fridge.tolerance += 5;

  }


};

function mousePressed() {

  mouse = true;
  for (var i in objects) {
    var ob = objects[i];

    if (ob.isHit(mouseX, mouseY)) {
      target = ob;
      lastDone = target.done;
    }
  }
  if (target.name === "can") {
    spray.setVolume(0.3);
    spray.play();
  }

}

function mouseReleased() {
  if (target.y > 600) {
    target.done = true;
  } else {
    target.done = false;
  }
  if (target.name === "can") {
    spray.stop();
  }
  target = false;
  mouse = false;
}

function filterArray() {
  deletable = objects.filter(function (el) {
    return el.done === true;
  });
}

function dragControl() {
  if (mouseIsPressed && target) {
    target.x = mouseX - target.w / 2;
    target.y = mouseY - target.h / 2;
    lastTarget = target.name;
    lastY = target.y;

    if (target.name === "can") {
      pestArray.push(new Particles(target.x + 30, target.y + 90));
      pestCounter++;
      playSound = true;
      if (pestCounter % 15 === 2 && beeArray.length >= 3) {
        beeArray.shift();
        fridge.tolerance -= 5;
        console.log(beeArray.length % 2);
        if (beeArray.length % 3 === 2) {
          console.log("run");
          hives.shift();
          flowers.shift();
          deletable.shift();
        }
      }
    }
  }

  if (!target && lastTarget === "can") {
    playSound = false;
  }

  if (lastY > 600 && !target && !lastDone) {
    filterArray();
    if (lastTarget === "hive") { // Hive Controller
      drop.play();
      if (hives.length <= 3) {
        new Beehive();
      }

      for (var b = 0; b < hive.bees; b++) {
        beeArray.push(new Bee());
        fridge.tolerance += 5;
      }

    } else if (lastTarget === "flower") { // Flower Controller
      dig.setVolume(0.2);
      dig.play();
      if (flowers.length < 7) {
        new Flower();
      }

      for (var c = 0; c < flower.bees; c++) {
        beeArray.push(new Bee());
        fridge.tolerance += 5;
      }
      flowerRound = flowerPool[flowerCounter];
      flowerCounter++;
      if (flowerCounter === flowerPool.length) {
        flowerCounter = 0;
      }
    }
    lastDone = true;
  }
}



function draw() {
  background(255);
  image(bg, 0, 0, width);

  hive.button();
  flower.button(flowerRound);
  pesticide.button();

  dragControl();
  fridge.draw();
  fridge.tolControl();

  // male soviel Pestizide/Biene wie Elemente in den Arrays vorhanden sind.
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
  for (var bee of beeArray) {
    bee.draw();
  }
  for (var pest of pestArray) {
    pest.draw();
  }
}
