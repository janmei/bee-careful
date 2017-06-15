/*jshint esversion: 6 */

class Bee {
  constructor() {
    this.number = 0;
    this.tolerance = 100;
    this.beeArray = [];

    this.x = random(30, 400);
    this.y = random(30, 400);

    this.range = 850;
  }

  count() {
    this.number += this.number + 1;
  }

  draw() {
    push();
    scale(-1.0, 1.0);
    image(beeAlive, this.x - beeAlive.width, this.y, 50, 50);
    pop();
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
}
