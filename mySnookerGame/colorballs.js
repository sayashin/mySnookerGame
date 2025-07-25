class ColorBalls {
  constructor() {
    this.redBalls = Composite.create(); // Create an empty composite to hold the red balls pyramid
    this.otherBalls = []; // Array to hold the other 6 balls
    this.flippers = []; // Array to hold the flipper bumpers
    this.colorBallsPotted = 0;

    const ballDiameter = tableHeight / 36;
    const gap = 2; // Gap between red balls
    const baseX = width * 0.75; // Starting X position for the pyramid
    const pyramidHeight = 5 * (ballDiameter + gap); // Calculate total height of the pyramid
    const baseY = height / 2 + ballDiameter / 2 + gap / 2; // Adjust the base Y position to center the pyramid on the screen

    // positions and colors of the color balls
    const positions = [
      { x: baseX + pyramidHeight, y: height / 2, label: "black", color: [0] },
      {
        x: baseX - pyramidHeight - gap,
        y: height / 2,
        label: "orange",
        color: [255, 100, 0],
      },
      { x: width / 2, y: height / 2, label: "blue", color: [0, 0, 255] },
      {
        x: (width - tableWidth) / 2 + tableWidth / 5,
        y: height / 2,
        label: "brown",
        color: [150, 50, 0],
      },
      {
        x: (width - tableWidth) / 2 + tableWidth / 5,
        y: height / 2 - 190 / 2,
        label: "green",
        color: [0, 255, 0],
      },
      {
        x: (width - tableWidth) / 2 + tableWidth / 5,
        y: height / 2 + 190 / 2,
        label: "yellow",
        color: [255, 255, 0],
      },
    ];

    // Build the red balls pyramid
    for (let row = 0; row < 5; row++) {
      const ballsInRow = 5 - row;
      // Calculate the starting Y position for this row
      const startY = baseY - (ballsInRow * (ballDiameter + gap)) / 2;

      for (let col = 0; col < ballsInRow; col++) {
        const x = baseX - row * (ballDiameter + gap); // X position of the ball (moves leftward per row)
        const y = startY + col * (ballDiameter + gap); // Y position of the ball
        const ball = Bodies.circle(x, y, ballDiameter / 2, {
          friction: 0.01,
          restitution: 0.8,
          density: 0.05,
          label: "redBall",
        });
        Composite.add(this.redBalls, [ball]);
      }
    }
    // Add the pyramid to the world
    Composite.add(engine.world, [this.redBalls]);

    // Add other color balls
    for (let i = 0; i < positions.length; i++) {
      const ball = Bodies.circle(
        positions[i].x,
        positions[i].y,
        ballDiameter / 2,
        {
          friction: 0.01,
          restitution: 0.8,
          density: 0.05,
          label: "otherBall",
        }
      );
      this.otherBalls.push({
        ball,
        position: { x: positions[i].x, y: positions[i].y },
        color: positions[i].color,
      });
      // Add the color balls to the world
      Composite.add(engine.world, [ball]);
    }
  }

  // activates the chosen game option
  switchOptions(option) {
    this.option = option;
    if (this.option === "randomRed" || this.option === "randomAll") {
      this.randomizeBalls(this.option);
    } else if (this.option === "flipper") {
      this.flipper();
    }
  }

  // positions for the random options
  randomizeBalls(option) {
    this.bounds = {
      xMin: (width - tableWidth) / 2 + 30,
      xMax: (width - tableWidth) / 2 + tableWidth - 30,
      yMin: (height - tableHeight) / 2 + 30,
      yMax: (height - tableHeight) / 2 + tableHeight - 30,
    };

    if (option === "randomRed") {
      // Randomize positions for red balls using Perlin noise
      for (let i = 0; i < this.redBalls.bodies.length; i++) {
        const redBall = this.redBalls.bodies[i];
        const x = map(
          noise(width + i * 0.25),
          0,
          1,
          this.bounds.xMin + tableWidth / 2,
          this.bounds.xMax
        );
        const y = map(
          noise(height + i * 0.25),
          0,
          1,
          this.bounds.yMin,
          this.bounds.yMax
        );
        Body.setPosition(redBall, { x, y });
      }
    } else if (option === "randomAll") {
      // Randomize red balls first
      this.randomizeBalls("randomRed");

      // Randomize positions for other balls
      for (let i = 0; i < this.otherBalls.length; i++) {
        const ball = this.otherBalls[i].ball;
        const x = random(this.bounds.xMin, this.bounds.xMax);
        const y = random(height * 0.4, height * 0.6);
        Body.setPosition(ball, { x, y });
      }
    }
  }

  // extension option. create bumpers to interact with the balls like pinball flipper
  flipper() {
    const flippersPositions = [
      { x: width * 0.2, y: height * 0.33 },
      { x: width * 0.8, y: height * 0.33 },
      { x: width * 0.4, y: height * 0.5 },
      { x: width * 0.6, y: height * 0.5 },
      { x: width * 0.2, y: height * 0.66 },
      { x: width * 0.8, y: height * 0.66 },
    ];

    for (let i = 0; i < flippersPositions.length; i++) {
      const flipper = Bodies.circle(
        flippersPositions[i].x,
        flippersPositions[i].y,
        (tableHeight / 36) * 1.2,
        {
          isStatic: true,
          restitution: 1.2,
          friction: 0,
          density: 0.05,
          label: "flipper",
        }
      );
      this.flippers.push(flipper);
      // add the bumpers to the world
      Composite.add(engine.world, [flipper]);
    }
  }

  draw() {
    push();
    noStroke();
    fill(255, 0, 0);

    // Draw red balls
    for (let i = this.redBalls.bodies.length - 1; i >= 0; i--) {
      const redBall = this.redBalls.bodies[i];
      const pos = redBall.position;
      // Check if the ball is outside the field
      if (this.isOutOfBounds(pos)) {
        // Remove the ball from the composite and the world
        this.colorBallsPotted = 0;
        Composite.remove(this.redBalls, redBall);
      } else {
        // Draw the ball if it's inside the field
        circle(pos.x, pos.y, tableHeight / 36);
      }
    }

    // Draw the other color balls
    for (let j = this.otherBalls.length - 1; j >= 0; j--) {
      const { ball, position, color } = this.otherBalls[j];
      const pos = ball.position;
      // Check if the ball is outside the field
      if (this.isOutOfBounds(pos)) {
        this.colorBallsPotted++;
        if (this.option === "randomAll") {
          let x = random(this.bounds.xMin, this.bounds.xMax);
          let y = random(height * 0.4, height * 0.6);
          Body.setPosition(ball, { x, y }); // Reset random position
          Body.setVelocity(ball, { x: 0, y: 0 }); // Stop movement
        } else {
          Body.setPosition(ball, position); // Reset to original position
          Body.setVelocity(ball, { x: 0, y: 0 }); // Stop movement
        }
      } else {
        fill(this.otherBalls[j].color);
        circle(pos.x, pos.y, tableHeight / 36);
      }

      // check if 2 color balls consecutive potted
      if (this.colorBallsPotted >= 2) {
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(16);
        text(
          "ERROR: two consecutive coloured balls are potted",
          width / 2,
          height * 0.9
        );
      }
    }

    // Draw the flipper bumpers
    if (this.option === "flipper") {
      for (let i = 0; i < this.flippers.length; i++) {
        const flipper = this.flippers[i];
        const pos = flipper.position;
        fill(0, 0);
        stroke(255, 255, 100);
        strokeWeight(3);
        circle(pos.x, pos.y, (tableHeight / 36) * 2);
        noStroke();
        fill(64, 35, 13);
        circle(pos.x, pos.y, (tableHeight / 36) * 1.4);
      }
    }

    pop();
  }

  // check if the balls are potted
  isOutOfBounds(pos) {
    return (
      pos.x < (width - tableWidth) / 2 + 30 ||
      pos.x > (width - tableWidth) / 2 + tableWidth - 30 ||
      pos.y < (height - tableHeight) / 2 + 30 ||
      pos.y > (height - tableHeight) / 2 + tableHeight - 30
    );
  }
}
