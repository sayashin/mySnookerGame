class CueStick {
  constructor(cueball) {
    this.cueBall = cueball;
    this.center = cueball.cball.position; // Cue ball's position from Matter.js
    this.stickLength = 150;
    this.angle = 0; // Current angle of the stick
    this.dragging = false;
    this.offset = 100;
    this.directionStart;
    this.directionEnd;
    this.maxForce = 2;
    this.maxDragDistance = 0;
  }

  // if not dragging update the angle of the stick dynamically based on the mouse position
  update(mouseX, mouseY) {
    if (!this.dragging) {
      this.angle = atan2(mouseY - this.center.y, mouseX - this.center.x);
    }
  }

  draw() {
    // Calculate the starting point of the stick
    let stickStartX = this.center.x + this.offset * cos(this.angle);
    let stickStartY = this.center.y + this.offset * sin(this.angle);

    // Draw the stick
    push();
    // Translate to the start position of the cue stick
    translate(stickStartX, stickStartY);
    rotate(this.angle);
    fill(200, 115, 41);
    noStroke();
    rectMode(CENTER);
    rect(0, 0, this.stickLength, 7);
    fill(0, 100, 200);
    rect(-75, 0, 5, 7);
    fill(150, 80, 20);
    rect(this.stickLength / 2, 0, 25, 7);

    // Draw the stick dragging point
    fill(255, 0, 0);
    noStroke();
    ellipse(0, 0, 12, 12);
    pop();
  }

  // Check if the mouse is close to the dragging point of the stick to start dragging
  mousePressed(mx, my) {
    let stickStartX = this.center.x + this.offset * cos(this.angle);
    let stickStartY = this.center.y + this.offset * sin(this.angle);

    if (dist(mx, my, stickStartX, stickStartY) < 20) {
      this.directionStart = createVector(mouseX, mouseY);
      this.dragging = true;
    }
  }

  //dragging the cueStick and hiting the cueBall
  mouseDragged(mx, my) {
    if (this.dragging && !stickHide) {
      let newDistance = dist(this.center.x, this.center.y, mx, my);
      this.offset = constrain(newDistance, this.stickLength / 2, 300); // constrain distance of dragging to prevent extremes

      //calculate stick position during dragging
      let stickStartX =
        this.center.x + (this.offset - this.stickLength / 2) * cos(this.angle);
      let stickStartY =
        this.center.y + (this.offset - this.stickLength / 2) * sin(this.angle);
      let distanceToBall = dist(
        stickStartX,
        stickStartY,
        this.center.x,
        this.center.y
      );

      // save the maximum distance from stick to ball in order to calculate the force of hitting
      if (this.offset > this.maxDragDistance) {
        this.maxDragDistance = this.offset;
      }

      // If the stick is hitting the ball, apply force
      if (distanceToBall < tableHeight / 36 / 2) {
        this.directionEnd = createVector(this.center.x, this.center.y);
        let ballDirection = p5.Vector.sub(
          this.directionEnd,
          this.directionStart
        );
        ballDirection.normalize(); // Normalize to get direction only

        // map the maximum distance of the stick to the maximum power possible
        let forcePower = map(
          this.maxDragDistance,
          this.stickLength / 2,
          300,
          0,
          this.maxForce
        );

        // apply the force power to the matter.js cueBall body
        ballDirection.mult(forcePower);
        Matter.Body.applyForce(
          cueball.cball,
          cueball.cball.position,
          ballDirection
        );
        stickHide = true;
      }
    }
  }

  // Stop draggings calculations
  mouseReleased() {
    this.dragging = false;
  }
}
