/*jshint esversion:6 */

class Flower extends draggableObject{
  constructor() {
    super(300, 65, flower1.width, flower1.height);
    this.name = "flower";
    this.bees = 2;
    this.flowerCircle = flowerPool[flowerCounter];
  }
  button(flower) {
    fill('#E3FDFF');
    stroke('rgba(10, 48, 85, 0.5)');
    strokeWeight(8);
    tint(255, 128);
    rect(320, 110, 140, 100, 10);
    image(flower, 300, 65);
    noTint();
  }

  render(){
    image(this.flowerCircle, this.x, this.y);
  }

}
