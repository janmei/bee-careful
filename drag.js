var objects = [];

var draggableObject = function(x, y, w, h) {
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 0;
    this.h = h || 0;

    this.render = function() {
        rect(this.x, this.y, this.w, this.h);
    };

    this.isHit = function(x, y) {
        if(this.x < this.x + this.w &&
           this.x + this.w > x &&
           this.y < y + this.h &&
           this.h + this.y > y) {
            return true;
        } else {
            return false;
        }
    };

    objects.push(this);
};

var target = false;

var a = new draggableObject(80, 80, 50, 50);
var b = new draggableObject(130, 130, 20, 20);

var draw = function() {
    background(51);

    a.render();
    b.render();

    if(mouseIsPressed && target) {
        target.x = mouseX;
        target.y = mouseY;
    }
};

var mousePressed = function() {
    for(var i in objects) {
        var ob = objects[i];

        if(ob.isHit(mouseX, mouseY)) {
            target = ob;
        }
    }

    println(target);
};

var mouseReleased = function() {
    target = false;
};
