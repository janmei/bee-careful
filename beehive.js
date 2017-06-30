/*jshint esversion:6 */

class Beehive extends draggableObject{
  constructor() {
    super (60, 80, hiveImg.width, hiveImg.height);
    this.name = "hive";
    this.bees = 5;
  }
  button() {
    fill('#E3FDFF');
    stroke('rgba(10, 48, 85, 0.5)');
    strokeWeight(8);
    tint(255, 128);
    rect(150, 150, 140, 100, 10);
    image(hiveImg, 60, 80, hiveImg.width, hiveImg.height);
    noTint();
  }

  render(){
    hiveEl = image(hiveImg, this.x, this.y);
  }

}
