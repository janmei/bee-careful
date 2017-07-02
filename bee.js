/*jshint esversion: 6 */

class Bee {
  constructor() {
    this.x = random(300, width - 300);
    this.y = random(100, 300);
    this.id = Math.round(random(0, 1));
    this.size = random(20, 50);
  }

  move() {
    var x = random(-2, 2);
    var y = random(-2, 2);
    var easing = 0.2;
    this.x += x * easing;
    this.y += y * easing;
  }

  draw() {
    if (this.id === 1) {
      push();
      scale(-1.0, 1.0);
      image(beeAlive, -this.x, this.y, this.size, this.size);
      pop();
    } else {
      image(beeAlive, this.x, this.y, this.size, this.size);
    }
    this.move();
  }
}
