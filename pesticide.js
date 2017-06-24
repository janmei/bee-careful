/*jshint esversion: 6 */

class Pesticide {
  constructor(x, y) {
    this.number = 0;

    this.x = x;
    this.y = y;

    this.range = 850;
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
    ellipse(this.x, this.y-70, 60, 60);
    this.move();

    setTimeout(this.dissolve, 7000);
  }
  dissolve(){
    pestArray.shift();
  }

}
