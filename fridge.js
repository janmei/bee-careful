/*jshint esversion: 6 */

class Fridge {
  constructor() {
    this.products = [];
    this.tolerance = 0;
  }

  add(product){
    this.products.push(product);
  }

  tolControl(){
    // hide product items in fridge if tolerance is smaller than current value
    var tol = this.tolerance;
    this.products.forEach(function (item, index) {
      if (tol < item.tolerance){
        item.on = false;
    }else {
      item.on = true;
    }
  });
}

  draw(){
    image(fridgeOpen, width/2-120, height/2-140, 500, 480);
    textAlign(CENTER);
    fill(0);
    noStroke();
    // text(this.tolerance, width/2, height/2-200);

  }
}
