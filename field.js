/*jshint esversion: 6 */

class Feld {
  constructor(parm) {

  }
}

class Fridge {
  constructor() {
    this.products = [];
    this.tolerance = 0;
  }

  add(product){
    this.products.push(product);
    
  }

  draw(){
    image(fridgeOpen, width/2-120, height/2-140, 500, 480);
    textAlign(CENTER);
    fill(0);
    text(this.tolerance, width/2, height/2);

  }
}
