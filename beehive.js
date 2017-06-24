/*jshint esversion:6 */

class Beehive {
  constructor() {
    this.bees = 5;
  }
  button() {
    fill('#E3FDFF');
    stroke('rgba(10, 48, 85, 0.5)');
    strokeWeight(8);
    tint(255, 128);
    rect(100, 100, 150, 120, 10);
    image(hiveImg, 120, 120, hiveImg.width/2.5, hiveImg.height/2.5);
    noTint();
  }
}
