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
    noFill();
    strokeWeight(10);
    stroke(0, 0, 255);
    rect(width/2 - 100, height/2 - 150, 200, 300, 10);
    noStroke();
    textAlign(CENTER);
    fill(0);
    text(this.tolerance, width/2, height/2);

  }
}
