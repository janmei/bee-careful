/*jshint esversion: 6 */

class Pesticide {
  constructor() {
    this.number = 0;
    this.tolerance = 100;
    this.beeArray = [];

    this.x = random(100, width - 100);
    this.y = random(100, 300);

    this.range = 850;
    this.img = loadImage("./food/Pestizid_Dose.png");

    this.can = createSprite(width / 2, height / 2);
    this.can.addImage(this.img);
    this.can.mouseActive = true;
  }

  count() {
    this.number += 1;
  }

  move() {
    var x = random(-5, 5);
    var y = random(-5, 5);
    var easing = 0.1;
    this.x += x * easing;
    this.y += y * easing;
  }

  draw() {
    noStroke();
    fill('rgba(139, 195, 74, 0.4)');
    ellipse(this.x, this.y, 60, 60);
    fill(0);
    this.move();
  }

  bottle() {
    if (this.can.mouseIsOver && mouseIsPressed) {
      console.log("yes");
      this.can.position.x = mouseX;
      this.can.position.y = mouseY;
    }
  }

}
