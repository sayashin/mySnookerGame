class CueBall {
  constructor(x, y) {
    // Create a Matter.js body for the cue ball
    this.cball = Bodies.circle(x, y, 10, {
      friction: 0.01,
      restitution: 0.8,
      density: 0.05,
      label: "cueBall",
    });
    Composite.add(engine.world, [this.cball]);
  }

  draw() {
    // Render the cue ball
    fill(255);
    var pos = this.cball.position;
    circle(pos.x, pos.y, tableHeight / 36);

    // check if the ball is out of bounds
    if (
      pos.x < (width - tableWidth) / 2 + 30 ||
      pos.x > (width - tableWidth) / 2 + tableWidth - 30 ||
      pos.y < (height - tableHeight) / 2 + 30 ||
      pos.y > (height - tableHeight) / 2 + tableHeight - 30
    ) {
      Composite.remove(engine.world, [this.cball]);
      ballVisible = false;
    }
  }
}
