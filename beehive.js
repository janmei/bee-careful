/*jshint esversion:6 */

class Beehive {
  constructor() {
    this.bees = 5;

    hiveEl = createSprite(207, 189);
    hiveEl.addImage(hiveImg);
    hiveEl.mouseActive = true;

    done = false;
  }
  button() {
    fill('#E3FDFF');
    stroke('rgba(10, 48, 85, 0.5)');
    strokeWeight(8);
    tint(255, 128);
    rect(100, 100, 220, 180, 10);
    image(hiveImg, 120, 120, hiveImg.width, hiveImg.height);
    noTint();
  }

}
