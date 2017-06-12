/*jshint esversion: 6 */

class Bee {
  constructor(paramNumber, paramInfluence) {
    this.number = paramNumber;
    this.influence = paramInfluence;

		this.beeArray = [];
  }

  count() {
    this.number += this.number + 1;
  }

  draw() {

		fill(0)
		ellipse(30,30,30, 60);

  }
}

class Pesticide {
  constructor(paramNumber, paramInfluence) {
    this.number = paramNumber;
    this.influence = paramInfluence;
  }
}

class Feld {
  constructor(parm) {

  }
}

var setup = function() {
  createCanvas(windowWidth, windowHeight);

};

function draw() {
	background(255);
	var biene = new Bee(12, 1);
	biene.draw();
}
