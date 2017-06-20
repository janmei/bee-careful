/*jshint esversion: 6 */

class Bee {
  constructor() {
    this.number = 0;
    this.tolerance = 100;
    this.beeArray = [];

    this.x = random(30, 400);
    this.y = random(30, 400);

    this.range = 850;
    this.id = Math.round(random(0, 1));

  }

  count() {
    this.number += this.number + 1;
  }

  move() {
    var x = random(-2, 2);
    var y = random(-2, 2);
    var easing = 0.2;
    this.x += x * easing;
    this.y += y * easing;
  }

  draw() {
    push();
      if (this.id === 1) {
        scale(-1.0, 1.0);
        image(beeAlive, this.x - beeAlive.width, this.y, 50, 50);
      } else {
        scale(1.0, 1.0);
        image(beeAlive, this.x, this.y, 50, 50);
      }
    pop();
    this.move();
  }

  slider(y) {
    if (y <= 50) {
      y = 50;
    } else if (y >= 900) {
      y = 900;
    }

    fill(0);
    ellipse(700, y, 60, 60);

    return y;
  }

  hide(){
    tint(255, 70);
  }
}
