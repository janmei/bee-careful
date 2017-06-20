/*jshint esversion: 6 */

class Pesticide {
  constructor() {
    this.number = 0;
    this.tolerance = 100;
    this.beeArray = [];

    this.x = random(width-400, width-30);
    this.y = random(130, 430);

    this.range = 850;
  }

  count() {
    this.number += this.number + 1;
  }

  draw() {
    noStroke();
    fill('rgba(139, 195, 74, 0.4)');
    ellipse(this.x, this.y, 60, 60);
    fill(0);
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
