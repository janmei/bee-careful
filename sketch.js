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
  if (hiveEl.mouseIsOver && mouseIsPressed) {
    hiveEl.position.x = mouseX;
    hiveEl.position.y = mouseY;

  } else if (!mouse && hiveEl.position.x > 0 && hiveEl.position.x < width / 2 && hiveEl.position.y > 600 && !done) {

    for (var b = 0; b < hive.bees; b++) {
      beeArray.push(new Bee());
    }
    done = true;
    hives.push(new Beehive());
  }

  for(var i=0; i<allSprites.length; i++)
    {
    var mySprite = allSprites[i];
      if(mySprite.mouseIsOver && mouseIsPressed){

        mySprite.position.x = mouseX;
        mySprite.position.y = mouseY;
      }
    }

  if (hives.length >= 3) {
    hiveEl.remove();
  }
}
function flowerControl() {
  if (flowerEl.mouseIsOver && mouseIsPressed) {
    flowerEl.position.x = mouseX;
    flowerEl.position.y = mouseY;

  } else if (!mouse && flowerEl.position.x > 0 && flowerEl.position.x < width / 2 && flowerEl.position.y > 600 && !done) {

    for (var b = 0; b < flower.bees; b++) {
      beeArray.push(new Bee());
    }
    done = true;
    flowers.push(new Flower());
  }

  for(var i=0; i<allSprites.length; i++)
    {
    var mySprite = allSprites[i];
      if(mySprite.mouseIsOver && mouseIsPressed){

        mySprite.position.x = mouseX;
        mySprite.position.y = mouseY;
      }
    }

  if (hives.length >= 3) {
    flowerEl.remove();
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
  text(val, 250, 580);

  for (var prod of fridge.products) {
    if (prod.on) {
      prod.show();
    } else {
      prod.hide();
    }
  }

  hive.button();

  flower.button();

  drawSprites();

}
