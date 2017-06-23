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
    image(this.img, width -300, height-200, this.img.width / 2, this.img.height / 2);
  }

  slider(y) {
    if (y <= 50) {
      y = 50;
    } else if (y >= 900) {
      y = 900;
    }

    fill(139, 195, 74);
    ellipse(700, y, 60, 60);

    return y;

  }
}
