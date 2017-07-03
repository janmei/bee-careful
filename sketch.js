/*jshint esversion: 6 */
var biene;
var tolerance;
var beeArray = [];
var pestArray = [];
var hives = [];
var flowers = [];
var flowerCounter = -1;
var flowerPool = [];
var flowerRound;
var objects = [];
var bg;
var product;
var productJSON;
var can = [];
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
var last;
var pestCounter = 0;
var deletable;
var newflower = false;
var newhive = false;
var vol = 0.1;

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
  drop = loadSound("./sounds/drop.mp3");
  spray = loadSound("./sounds/spray.mp3");
  dig = loadSound("./sounds/digging1.mp3");
  singleBuzz = loadSound("./sounds/bee.mp3");
  buzz = loadSound("./sounds/bees.wav");
}
// einmaliger Aufruf
var setup = function() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  data = productJSON.product;
  flowerPool = [flower2, flower1, flower3, flower4];
  // Objekte erstellen
  // biene = new Bee();
  fridge = new Fridge();
  pesticide = new Pesticide();
  hive = new Beehive();
  flower = new Flower();
  flowerRound = flowerPool[flowerCounter];

  for (var l = 0; l < data.length; l++) {
    fridge.add(new Product(data[l].name, data[l].path, data[l].tolerance, data[l].x, data[l].y));
  }

  for (var a = 0; a < 3; a++) {
    beeArray.push(new Bee());
    fridge.tolerance += 5;
  }

  console.log("sound");
  singleBuzz.setVolume(0.1);
  singleBuzz.loop();
};

function mousePressed() {
  mouse = true;
  for (var i in objects) {
    var ob = objects[i];
    if (ob.isHit(mouseX, mouseY)) {
      target = ob;
      lastDone = target.done;
      last = target;
      target.drag.x = mouseX;
      target.drag.y = mouseY;
      console.log(target.drag.x);
    }
  }
  var canOb = can[0];
  if (canOb.isHit(mouseX, mouseY)) {
    target = canOb;
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
  lastTarget = target.name;
  lastY = target.y;
  target = false;
  mouse = false;
}

function buzzOn() {
  if (buzz.isPlaying()) {
    buzz.setVolume(vol);
  } else {
    singleBuzz.stop();
    buzz.setVolume(vol);
    buzz.loop();

  }
}

function buzzOff() {
  if (buzz.isPlaying()) {
    singleBuzz.play();
    buzz.stop();
  }
}

function dragControl() {
  if (mouseIsPressed && target) {
    target.x = mouseX - target.w / 2;
    target.y = mouseY - target.h / 2;
    if (target.name === "can") {
      pestArray.push(new Particles(target.x + 30, target.y + 90));
      pestCounter++;
      if (flowers.length === 7 && !newflower) {
        new Flower();
        newflower = true;
        flowerRound = flowerPool[flowerCounter];
      }

      if (hives.length === 3 && !newhive) {
        new Beehive();
        newhive = true;
      }

      if (pestCounter % 15 === 2 && beeArray.length >= 4) {

        beeArray.shift();
        fridge.tolerance -= 5;

        if (beeArray.length % 3 === 2) {
          hives.shift();
          flowers.shift();

          var deletable = objects.find(function(item, index, object) {
            if (item.done) {
              object.splice(index, 1);
              buzz.setVolume(vol -= 0.1);
              return true;
            } else {
              return false;
            }
          });
        }
      }
      if (beeArray.length > 3) {
        buzzOn();
      } else {
        buzzOff();
      }
    }

  }

  if (lastY > 600 && !target && !lastDone) {

    if (lastTarget === "hive") {
      newhive = false; // Hive Controller
      drop.play();
      vol += 0.1;
      if (hives.length <= 3) {
        new Beehive();
      }

      for (var b = 0; b < hive.bees; b++) {
        beeArray.push(new Bee());
        fridge.tolerance += 5;
      }

    } else if (lastTarget === "flower") {
      newflower = false; // Flower Controller
      dig.setVolume(0.2);
      dig.play();
      vol += 0.1;
      if (flowers.length < 7) {
        new Flower();
      }
      for (var c = 0; c < flower.bees; c++) {
        beeArray.push(new Bee());
        fridge.tolerance += 5;
      }
      flowerRound = flowerPool[flowerCounter];

      if (flowerCounter === flowerPool.length - 1) {
        flowerCounter = 0;
      }
    }
    lastDone = true;
    if (beeArray.length > 3) {
      buzzOn();
    } else {
      buzzOff();
    }
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
  can[0].render();
  for (var bee of beeArray) {
    bee.draw();
  }
  for (var pest of pestArray) {
    pest.draw();
  }


}
