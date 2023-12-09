// Class representing a bouncing ball
class Ball {
    // Constructor to initialize ball properties
    constructor(x, y) {
        this.x = x;               // X-coordinate of the ball
        this.y = y;               // Y-coordinate of the ball
        this.vx = 0;              // X-component of velocity
        this.vy = 0;              // Y-component of velocity
        this.ax = 0;              // X-component of acceleration
        this.ay = 0;              // Y-component of acceleration
        this.maxSpeed = 10;       // Maximum speed of the ball
        this.size = 100;          // Size of the ball
        this.active = true;       // Flag to determine if the ball is active
        this.bc = false;          // Flag to indicate if the ball bounced
        this.fail = true;         // Flag to indicate if the ball has failed
    }

    // Apply gravity to the ball
    gravity(force) {
        this.ay = this.ay + force;
    }

    // Move the ball based on velocity and acceleration
    move() {
        this.fail = false;
        this.vx = this.vx + this.ax;
        this.vy = this.vy + this.ay;

        // Constrain velocity to avoid excessive speed
        this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
        this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

        this.x = this.x + this.vx;
        this.y = this.y + this.vy;

        // Deactivate the ball if it goes below the screen
        if (this.y - this.size / 2 > height) {
            this.active = false;
            this.fail = true;
        }
    }

    // Check for collision with a paddle and update ball properties
    bounce(paddle) {
        if (
            this.x > paddle.x - paddle.width / 2 &&
            this.x < paddle.x + paddle.width / 2 &&
            this.y + this.size / 2 > paddle.y - paddle.height / 2 &&
            this.y - this.size / 2 < paddle.y + paddle.height / 2
        ) {
            let dx = this.x - paddle.x;
            this.vx = this.vx + map(dx, -paddle.width / 2, paddle.width / 2, -2, 2);

            this.bc = this.bc + 1;
            this.vy = -this.vy;
            this.ay = 0;
            this.bc = true;
        } else {
            this.bc = false;
        }
    }

    // Display the ball on the canvas
    display() {
        // Display the ball image at its current position
        image(img, this.x, this.y, this.size, this.size);
        // Alternatively, display the ball as an ellipse
        // push();
        // fill(255, 50, 50);
        // stroke(0);
        // ellipse(this.x, this.y, this.size);
        // pop();
    }
}
