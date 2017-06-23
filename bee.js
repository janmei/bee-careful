/*jshint esversion: 6 */

class Bee {
  constructor() {
    this.beeArray = [];

    this.x = random(300, windowWidth - 200);
    this.y = random(200, 100);
    this.id = Math.round(random(0, 1));
  }

  move() {
    var x = random(-2, 2);
    var y = random(-2, 2);
    var easing = 0.2;
    this.x += x * easing;
    this.y += y * easing;
  }

  draw(){
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

  hide(){
    tint(255, 70);
  }
}
