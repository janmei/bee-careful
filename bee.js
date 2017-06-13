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
    fill(0);
    ellipse(this.x, this.y, 60, 60);
  }

  slider(y){
    if (y <= 50){
      y = 50;
    }else if (y >= 900) {
      y = 900;
    }

    fill(0);
    ellipse(700, y, 60, 60);

    return y;

  }
}
