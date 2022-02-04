
function Particle() {
    // where the particles start, try (0,0), (0, random(height)), (random(width), 0),etc
    this.pos = createVector(random(width), random(height));
    // spider web movement based on noise:
    // this.vel = p5.Vector.random2D();
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    // speed of the particles
    this.maxspeed = 4;
    this.h = 0;

    this.prevPos = this.pos.copy();

    this.update = function () {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    };

    this.follow = function (vectors) {
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        // play with x, y
        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
    };

    this.applyForce = function (force) {
        this.acc.add(force);
    };

    this.show = function () {
        // colors
        stroke(this.h, 255, 255, 25);
        this.h = this.h + 1;
        if (this.h > 255) {
            this.h = 0;
        }
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        // comment the line below to never update the previous position
        this.updatePrev();
    };

    this.updatePrev = function () {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    };

    this.edges = function () {
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
        }
    };
}