/*jshint esversion:6 */
class Product {
  constructor(paramName, paramTolerance, x, y) {
    this.name = paramName;
    this.path = "./food/" + this.name + ".png";
    this.tolerance = paramTolerance;
    this.on = true;
    this.img = loadImage(this.path);
    this.x = x;
    this.y = y;
    this.scale = 3.5;

  }

  hide() {
    tint(255, 70);
    // this.img.filter(GRAY);
    image(this.img, this.x, this.y, this.img.width / this.scale, this.img.height / this.scale);

    noTint();
  }

  show(x, y) {
    image(this.img, this.x, this.y, this.img.width / this.scale, this.img.height / this.scale);
  }
}
