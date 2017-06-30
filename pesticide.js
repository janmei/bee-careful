/*jshint esversion: 6 */

class Pesticide extends draggableObject {
  constructor() {
    super(460, 70, dose.width, dose.height);

    this.name = "can";
  }


  button() {
    fill('#E3FDFF');
    stroke('rgba(10, 48, 85, 0.5)');
    strokeWeight(8);
    tint(255, 128);
    rect(490, 110, 140, 100, 10);
    image(dose, 460, 70);
    noTint();
  }

  render() {
    image(dose, this.x, this.y);

  }

}

class Particles {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.size = 0;
  }

  move() {
    var x = random(-5, 5);
    var y = random(-5, 5);
    var easing = 0.1;
    this.x += x * easing;
    this.y += y * easing;
  }

  draw() {
    this.size += 1;
    noStroke();
    fill(139, 195, 74, 128-this.size);
    ellipse(this.x, this.y - 70, 60+this.size, 60+this.size);
    this.move();
    if (this.size > 128){
      this.size = 0;
      pestArray.shift();
    }
  }
}
