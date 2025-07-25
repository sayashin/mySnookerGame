function detectCollision(event) {
  let pairs = event.pairs; // Iterate over all pairs of colliding bodies

  // Go through each pair to find any collisions with the flipper bumpers
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i];
    let ball, ball2, ball3, flipper;

    // Identify which body is the cue ball and which is the flipper bumper
    if (pair.bodyA.label === "cueBall" && pair.bodyB.label === "flipper") {
      ball = pair.bodyA;
      flipper = pair.bodyB;
    } else if (
      pair.bodyA.label === "flipper" &&
      pair.bodyB.label === "cueBall"
    ) {
      ball = pair.bodyB;
      flipper = pair.bodyA;
    }

    // If a collision between ball and flipper is detected apply the bump to the ball
    if (ball && flipper) {
      Matter.Body.setVelocity(ball, {
        x: ball.velocity.x * 2,
        y: ball.velocity.y * 2,
      });
    }

    // Identify which body is the color ball and which is the flipper
    if (pair.bodyA.label === "otherBall" && pair.bodyB.label === "flipper") {
      ball2 = pair.bodyA;
      flipper = pair.bodyB;
    } else if (
      pair.bodyA.label === "flipper" &&
      pair.bodyB.label === "otherBall"
    ) {
      ball2 = pair.bodyB;
      flipper = pair.bodyA;
    }

    // If a collision between color ball and flipper is detected apply the bump to the ball
    if (ball2 && flipper) {
      Matter.Body.setVelocity(ball2, {
        x: ball2.velocity.x * 2,
        y: ball2.velocity.y * 2,
      });
    }

    // Identify which body is the red ball and which is the flipper
    if (pair.bodyA.label === "redBall" && pair.bodyB.label === "flipper") {
      ball3 = pair.bodyA;
      flipper = pair.bodyB;
    } else if (
      pair.bodyA.label === "flipper" &&
      pair.bodyB.label === "otherBall"
    ) {
      ball3 = pair.bodyB;
      flipper = pair.bodyA;
    }

    // If a collision between red ball and flipper is detected apply the bump to the ball
    if (ball3 && flipper) {
      Matter.Body.setVelocity(ball3, {
        x: ball3.velocity.x * 2,
        y: ball3.velocity.y * 2,
      });
    }

    // Check if the cue ball collide with the other bodies
    if (pair.bodyA.label === "cueBall" || pair.bodyB.label === "cueBall") {
      // Identify the other body involved in the collision
      let otherBody;
      if (pair.bodyA.label === "cueBall") {
        otherBody = pair.bodyB;
      } else {
        otherBody = pair.bodyA;
      }

      // Check if the other body is a cushion, a red ball or a color ball by its label and display the console log message
      if (otherBody.label === "cushion") {
        collisionMessage = "Cue ball hit a cushion";
        console.log(collisionMessage);
      } else if (otherBody.label === "redBall") {
        collisionMessage = "Cue ball hit a red ball";
        console.log(collisionMessage);
      } else if (otherBody.label === "otherBall") {
        collisionMessage = "Cue ball hit a color ball";
        console.log(collisionMessage);
      }
    }
  }
}
