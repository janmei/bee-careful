/*jshint esversion:6 */

class Beehive extends draggableObject{
  constructor() {
    super (99, 69, hiveImg.width, hiveImg.height); // gets Parameters from draggableObject
    this.name = "hive";
    this.bees = 3;
    hives.push("hive");
    objects.push(this);
  }

  button() {
    fill('#E3FDFF');
    stroke('rgba(10, 48, 85, 0.5)');
    strokeWeight(8);
    tint(255, 128);
    rect(150, 110, 140, 100, 10);
    image(hiveImg, 99, 69);
    noTint();
  }

  render(){
    image(hiveImg, this.x, this.y);
  }

}
