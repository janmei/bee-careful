/*jshint esversion:6 */

class Flower {
  constructor() {
    this.bees = 2;

    flowerEl = createSprite(207, 390);
    flowerEl.addImage(flower1);
    flowerEl.mouseActive = true;

    done = false;
  }
  button() {
    fill('#E3FDFF');
    stroke('rgba(10, 48, 85, 0.5)');
    strokeWeight(8);
    tint(255, 128);
    rect(100, 300, 220, 180, 10);
    image(flower1, 166, 320);
    noTint();
  }

}
