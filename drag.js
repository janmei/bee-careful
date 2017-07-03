/*jshint esversion:6 */

var objects = [];

var lastTarget;

// class will be inherited to all movable objects.
class draggableObject {
  constructor(x, y, w, h) {
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 0;
    this.h = h || 0;
    this.done = false;
  }

  render() {
    // rect(this.x, this.y, this.w, this.h);
  }

  // checks if mouse is in hitbox.
  isHit(x, y) {
    if (x > this.x &&
      x < this.x + this.w &&
      y > this.y &&
      y < this.h + this.y) {
      return true;
    } else {
      return false;
    }
  }
}
