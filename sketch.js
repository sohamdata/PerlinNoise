var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff = 0;
var particles = [];
var flowfield;

function setup() {
    createCanvas((window.innerWidth), (window.innerHeight));
    colorMode(HSB, 255);
    cols = floor(width / scl);
    rows = floor(height / scl);
    flowfield = new Array(cols * rows);

    // no of particles dropping
    for (var i = 0; i < 300; i++) {
        particles[i] = new Particle();
    }
    // background(255);
}

function draw() {
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            var index = x + y * cols;
            // create vectors from an angle
            var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
            // try removing a vector components and see what happens
            // put different factors of noise and see what happens
            /// try factors of PI 
            var v = p5.Vector.fromAngle(angle);
            // magnitude of force
            // -> how closely the particles follow the flowfield/vectors
            v.setMag(1);
            flowfield[index] = v;
            xoff += inc;
            stroke(0, 50);
            // to draw the vectors 
            // push();
            // translate(x * scl, y * scl);
            // rotate(v.heading());
            // strokeWeight(1);
            // line(0, 0, scl, 0);
            // pop();
        }
        yoff += inc;

        zoff += 0.0003;
    }

    for (var i = 0; i < particles.length; i++) {
        // comment out the following line to see the particles
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].edges();
        particles[i].show();
    }
}