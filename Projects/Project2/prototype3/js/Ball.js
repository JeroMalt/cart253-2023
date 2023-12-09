class Ball {

constructor(x,y) { 
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0; 
    this.ay = 0;
    this.maxSpeed = 10;
    this.size = 100;
    this.active = true;
    this.bc = false;
    this.fail = true;

}

gravity(force) {
    this.ay = this.ay + force;
}

move() {
    this.fail = false;
    this.vx = this.vx + this.ax;
    this.vy = this.vy + this.ay;
    
    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);
    
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    if (this.y - this.size/2 > height) {
        this.active = false;
        this.fail = true;
    }
    
    
    
}

bounce(paddle) {
    if (this.x > paddle.x - paddle.width/2 && 
        this.x < paddle.x + paddle.width/2 &&
        this.y + this.size/2 > paddle.y - paddle.height/2 &&
        this.y - this.size/2 < paddle.y + paddle.height/2) {
        
        let dx = this.x - paddle.x;
        this.vx = this.vx + map(dx, -paddle.width/2,paddle.width/2,-2,2);

        this.bc = this.bc + 1;
        this.vy = -this.vy;
        this.ay = 0;
        this.bc = true;
        
        
        
    }
    else {
        this.bc = false;
    }

    
    
    
   

    

    
       
}

// displayBounce() {
//     push();
//     fill(255);
//     stroke(20);
//     textSize(100);
//     text(this.bc,100,200);
//     pop();
// }
// displayHighscore() {
//     if (this.hs < this.bc) {
//         this.hs = this.bc;
//     }
//     push();
//     fill(255);
//     stroke(20);
//     textSize(100);
//     text(this.hs,800,200);
//     pop();
// }




display() {
    image(img, this.x,this.y,this.size,this.size); 
    // push();
    // fill(255,50,50);
    // stroke(0);
    // ellipse(this.x,this.y,this.size);
    // pop();
}
}
