/*jshint esversion:6 */
class Product {
  constructor(paramName, paramTolerance) {
    this.name = paramName;
    this.path = "./food/" + this.name + ".png";
    this.tolerance = paramTolerance;
    this.on = true;
    this.img = loadImage(this.path);

  }

  hide(x, y) {
    tint(255, 70);
    this.img.filter(GRAY);
    image(this.img, x, y, 30, 40);

    noTint();
  }

  show(x, y) {
    image(this.img, x, y, 30, 40);
  }
}
