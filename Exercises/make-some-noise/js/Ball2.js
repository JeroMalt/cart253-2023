class Ball2 {
    constructor(x,y,note) {
        this.x = x;
        this.y = y;
        this.size = 25;
        this.fill = {
            r: random(100,200),
            g: random(100,200),
            b: random(100,200)
        };
        this.speed = 6;
        this.vx = random(-this.speed,this.speed);
        this.vy = random(-this.speed,this.speed);

        //oscillator
        this.oscillator = new p5.Oscillator();
        this.nearFreq = 400;
        this.farFreq = 525;
        this.oscillator.amp(0.025);
        this.oscillator.setType('sawtooth');
        this.oscillator.start();

        //synth
        this.note = note;
        this.synth = new p5.PolySynth();

    }

    move() {
        this.x += this.vx;
        this.y += this.vy;

        //update frequency
        let d = dist(this.x, this.y, width/2, height/2);
        let maxDist = dist(0,0, width/2, height/2);
        let newFreq = map(d,0,maxDist,this.nearFreq,this.farFreq);
        this.oscillator.freq(newFreq);
    }

    bounce() {
        if (this.x - this.size/2 < 0 || this.x + this.size/2 > width) {
            this.vx = -this.vx
            this.playNote();
        }
        if (this.y - this.size/2  < 0 || this.y + this.size/2 > height) {
            this.vy = -this.vy
            this.playNote();
        }
    }
    playNote() {
        this.synth.play(this.note,0.9,0,0.5);
    }
    display() {
        push();
        noStroke();
        fill(this.fill.r,this.fill.g,this.fill.b);
        ellipse(this.x, this.y, this.size);
        pop();

    }
}