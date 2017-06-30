/*jshint esversion: 6 */

class Pesticide extends draggableObject {
  constructor(x, y) {
    super(width - 210, 73, dose.width, dose.height);

    this.name = "can";

    // this.x = x;
    // this.y = y;
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
    ellipse(this.x, this.y - 70, 60, 60);
    this.move();

    setTimeout(this.dissolve, 7000);
  }
  dissolve() {
    pestArray.shift();
    console.log("runs");
  }

  button() {
    fill('#E3FDFF');
    stroke('rgba(10, 48, 85, 0.5)');
    strokeWeight(8);
    tint(255, 128);
    rect(width - 150, 150, 220, 180, 10);
    image(dose, width - 210, 73);
    noTint();
  }

  render() {
    image(dose, this.x, this.y);

  }

}
