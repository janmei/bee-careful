/*jshint esversion:6 */
class Product {
  constructor(paramName, paramPath, paramTolerance, x, y) {
    // loads name, path, tolerance, x and y from Parameters.
    this.name = paramName;
    this.path = paramPath;
    this.tolerance = paramTolerance;
    this.on = true;
    this.img = loadImage(this.path);
    this.x = x;
    this.y = y;
    this.scale = 1.8;
  }

  hide() {
    // transparency of image is scaled down to 30
    tint(255, 30);
    // this.img.filter(GRAY);
    image(this.img, width / 2 + this.x, height / 2 + this.y, this.img.width / this.scale, this.img.height / this.scale);

    noTint();
  }

  show(x, y) {
    image(this.img, width / 2 + this.x, height / 2 + this.y, this.img.width / this.scale, this.img.height / this.scale);
  }
}
