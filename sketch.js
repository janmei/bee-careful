/*jshint esversion: 6 */

// load Variables
var tolerance,
  beeArray = [],
  pestArray = [],
  hives = [],
  flowers = [],
  flowerCounter = -1,
  flowerPool = [],
  flowerRound,
  objects = [],
  product,
  productJSON,
  can = [],
  data,
  dose,
  hive,
  done = false,
  target = false,
  lastY,
  lastDone,
  pestCounter = 0,
  deletable,
  newflower = false,
  newhive = false,
  vol = 0.1;

// preload sounds an essential Images and JSON
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
  data = productJSON.product; // calling JSON for data
  flowerPool = [flower2, flower1, flower3, flower4]; // setting Pool of Flowers for circling through them

  // Objekte erstellen
  // biene = new Bee();
  fridge = new Fridge();
  pesticide = new Pesticide();
  hive = new Beehive();
  flower = new Flower();

  flowerRound = flowerPool[flowerCounter]; // setting initial background flower for Button

  // for every element in JSON create new Product and add to the fridge.
  // gives name, path, tolerance, x and y Parameters
  for (var l = 0; l < data.length; l++) {
    fridge.add(new Product(data[l].name, data[l].path, data[l].tolerance, data[l].x, data[l].y));
  }

  // set initial 3 bees
  for (var a = 0; a < 3; a++) {
    beeArray.push(new Bee());
    fridge.tolerance += 2;
  }

  //start background buzzing
  singleBuzz.setVolume(0.1);
  singleBuzz.loop();
};

function mousePressed() {
  // for every object thats been pushed in to the array check if it has been hit with mouse.
  for (var i in objects) {
    var ob = objects[i];
    if (ob.isHit(mouseX, mouseY)) {
      target = ob;
      lastDone = target.done;
    }
  }
  // check if mouse hits can. Has to be seperate from other objects so it wont be deleted
  var canOb = can[0];
  if (canOb.isHit(mouseX, mouseY)) {
    target = canOb;
  }

  // play spray sound if target is hit
  if (target.name === "can") {
    spray.setVolume(0.3);
    spray.loop();
  }

}

function mouseReleased() {
  // changes value of target object to done to do further funct calls
  if (target.y > 600) {
    target.done = true;
  } else {
    target.done = false;
  }
  if (target.name === "can") {
    spray.stop();
  }

  // creates variables of last target to process them after mouseReleased
  lastTarget = target.name;
  lastY = target.y;
  target = false;
}

// soundController
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

// main Controller
function dragControl() {
  // apply mousex and mousey to targets position so it follows the mouse.
  if (mouseIsPressed && target) {
    target.x = mouseX - target.w / 2;
    target.y = mouseY - target.h / 2;

    // if the target is the spraycan then create ne Particles and count them
    if (target.name === "can") {
      pestArray.push(new Particles(target.x + 30, target.y + 90));
      pestCounter++;
      // flower is created when all flowers are on the field and the can is sprayed
      if (flowers.length === 7 && !newflower) {
        new Flower();
        newflower = true;
        flowerRound = flowerPool[flowerCounter];
      }

      // hive is created whenn all hive are on the field an the can is sprayed
      if (hives.length === 3 && !newhive) {
        new Beehive();
        newhive = true;
      }

      // every 15th item of the pestCounter remove one bee from the beeArray and count down the tolerance
      if (pestCounter % 15 === 2 && beeArray.length >= 4) {
        beeArray.shift();
        fridge.tolerance -= 3;

        // every 3rd item in beeArray will remove a hive or flower
        if (beeArray.length % 3 === 2) {
          hives.shift();
          flowers.shift();

          // finds the first flower or hive which has the value done = true; and remove it from the objects array
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

      // controls sound
      if (beeArray.length > 3) {
        buzzOn();
      } else {
        buzzOff();
      }
    }

  }
  // if the target which was clicked is y > 600
  if (lastY > 600 && !target && !lastDone) {
    if (lastTarget === "hive") { // hive was target
      // variables controled
      newhive = false;
      drop.play(); // sound played
      vol += 0.1; // volume up 0.1

      // create new objects if less then 4 are already in.
      if (hives.length <= 3) {
        new Beehive();
      }

      // for each hive push number of bees in beeArray
      for (var b = 0; b < hive.bees; b++) {
        beeArray.push(new Bee());
        fridge.tolerance += 3;
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
        fridge.tolerance += 3;
      }

      // update flower Button with next flower in flowerPool
      flowerRound = flowerPool[flowerCounter];
      // sets flower Counter to 0
      if (flowerCounter === flowerPool.length - 1) {
        flowerCounter = 0;
      }
    }
    lastDone = true;

    //sound controller
    if (beeArray.length > 3) {
      buzzOn();
    } else {
      buzzOff();
    }
  }
}

function draw() {

  background(255);
  image(bg, 0, 0, width, height);

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
