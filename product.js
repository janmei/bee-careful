/*jshint esversion:6 */
class Product {
  constructor(paramName, paramTolerance) {
    this.name = paramName;
    this.path = "./food/" + this.name + ".png";
    this.tolerance = paramTolerance;

    this.img = loadImage(this.path);

  }

  hide() {

  }

  show(x, y) {
    image(this.img, x, y, 30, 40);
  }
}
