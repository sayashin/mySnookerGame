function createTable() {
  const holeSize = (tableHeight / 36) * 1.5;
  const frameSize = 15;
  const cornerSize = 25;
  const cushions = [];
  const cushionHeight = 12;
  const cushionAngle = 0.06;

  this.draw = function () {
    //call all the elements functions for drawing
    this.field();
    this.frame();
    this.corners();
    this.drawCushions();
    this.holes();
    this.drawLines();
  };

  //setup the field
  this.field = function () {
    fill(78, 136, 52);
    noStroke();
    rect(
      (width - tableWidth) / 2,
      (height - tableHeight) / 2,
      tableWidth,
      tableHeight,
      15,
      15,
      15,
      15
    );
  };

  //setup the frame of the table
  this.frame = function () {
    fill(64, 35, 13);
    noStroke();
    rect(
      (width - tableWidth) / 2,
      (height - tableHeight) / 2,
      tableWidth,
      frameSize,
      15,
      15,
      0,
      0
    ); //top
    rect(
      (width - tableWidth) / 2 + tableWidth - frameSize,
      (height - tableHeight) / 2,
      frameSize,
      tableHeight,
      0,
      15,
      15,
      0
    ); //right
    rect(
      (width - tableWidth) / 2,
      (height - tableHeight) / 2 + tableHeight - frameSize,
      tableWidth,
      frameSize,
      0,
      0,
      15,
      15
    ); //bottom
    rect(
      (width - tableWidth) / 2,
      (height - tableHeight) / 2,
      frameSize,
      tableHeight,
      15,
      0,
      0,
      15
    ); //left
  };

  //setup the yellow corners of the table
  this.corners = function () {
    fill(255, 220, 0);
    noStroke();
    rect(
      (width - tableWidth) / 2,
      (height - tableHeight) / 2,
      cornerSize,
      cornerSize,
      15,
      0,
      0,
      0
    ); //top left
    rect(width / 2 - 25 / 2, (height - tableHeight) / 2, cornerSize, 15); //top mid
    rect(
      (width - tableWidth) / 2 + tableWidth - 25,
      (height - tableHeight) / 2,
      cornerSize,
      cornerSize,
      0,
      15,
      0,
      0
    ); //top right
    rect(
      (width - tableWidth) / 2 + tableWidth - 25,
      (height - tableHeight) / 2 + tableHeight - 25,
      cornerSize,
      cornerSize,
      0,
      0,
      15,
      0
    ); //bottom right
    rect(
      width / 2 - 25 / 2,
      (height - tableHeight) / 2 + tableHeight - 15,
      cornerSize,
      15
    ); //bottom mid
    rect(
      (width - tableWidth) / 2,
      (height - tableHeight) / 2 + tableHeight - 25,
      cornerSize,
      cornerSize,
      0,
      0,
      0,
      15
    ); //bottom left
  };

  //setup the holes of the table
  this.holes = function () {
    fill(0);
    ellipse(
      (width - tableWidth) / 2 + holeSize,
      (height - tableHeight) / 2 + holeSize,
      holeSize
    ); //top left
    ellipse(
      width / 2 - 25 / 2 + holeSize / 2,
      (height - tableHeight) / 2 + holeSize,
      holeSize
    ); //top mid
    ellipse(
      (width - tableWidth) / 2 + tableWidth - holeSize,
      (height - tableHeight) / 2 + holeSize,
      holeSize
    ); //top right
    ellipse(
      (width - tableWidth) / 2 + holeSize,
      (height - tableHeight) / 2 + tableHeight - holeSize,
      holeSize
    ); //bottom left
    ellipse(
      width / 2 - 25 / 2 + holeSize / 2,
      (height - tableHeight) / 2 + tableHeight - holeSize,
      holeSize
    ); //bottom mid
    ellipse(
      (width - tableWidth) / 2 + tableWidth - holeSize,
      (height - tableHeight) / 2 + tableHeight - holeSize,
      holeSize
    ); //bottom right
  };

  //setup the cushions of the table
  this.createCushions = function () {
    cushions.push(
      Bodies.trapezoid(
        width / 2 - tableWidth / 4 + holeSize / 2,
        (height - tableHeight) / 2 + frameSize + cushionHeight / 2,
        tableHeight - holeSize * 2 - frameSize - cushionHeight / 2,
        cushionHeight,
        -cushionAngle,
        {
          isStatic: true,
          restitution: 1,
          label: "cushion",
        }
      )
    );
    cushions.push(
      Bodies.trapezoid(
        width / 2 + tableWidth / 4 - holeSize / 2,
        (height - tableHeight) / 2 + frameSize + cushionHeight / 2,
        tableHeight - holeSize * 2 - frameSize - cushionHeight / 2,
        cushionHeight,
        -cushionAngle,
        {
          isStatic: true,
          restitution: 1,
          label: "cushion",
        }
      )
    );
    cushions.push(
      Bodies.trapezoid(
        (width - tableWidth) / 2 + frameSize + cushionHeight / 2,
        height / 2,
        tableHeight - cornerSize * 2 - holeSize / 2,
        cushionHeight,
        cushionAngle,
        {
          isStatic: true,
          angle: Math.PI / 2,
          restitution: 1,
          label: "cushion",
        }
      )
    );
    cushions.push(
      Bodies.trapezoid(
        width / 2 - tableWidth / 4 + holeSize / 2,
        (height - tableHeight) / 2 +
          tableHeight -
          frameSize -
          cushionHeight / 2,
        tableHeight - holeSize * 2 + cushionHeight,
        cushionHeight,
        cushionAngle,
        {
          isStatic: true,
          restitution: 1,
          label: "cushion",
        }
      )
    );
    cushions.push(
      Bodies.trapezoid(
        width / 2 + tableWidth / 4 - holeSize / 2,
        (height - tableHeight) / 2 +
          tableHeight -
          frameSize -
          cushionHeight / 2,
        tableHeight - holeSize * 2 + cushionHeight,
        cushionHeight,
        cushionAngle,
        {
          isStatic: true,
          restitution: 1,
          label: "cushion",
        }
      )
    );
    cushions.push(
      Bodies.trapezoid(
        (width - tableWidth) / 2 + tableWidth - frameSize - cushionHeight / 2,
        height / 2,
        tableHeight - cornerSize * 2 - holeSize * 2 + cushionHeight / 2,
        cushionHeight,
        -cushionAngle,
        {
          isStatic: true,
          angle: Math.PI / 2,
          restitution: 1,
          label: "cushion",
        }
      )
    );
    //adds the cushions to the world
    for (var i = 0; i < cushions.length; i++) {
      Composite.add(engine.world, [cushions[i]]);
    }
  };

  // draw the cushions
  this.drawCushions = function () {
    for (var i = 0; i < cushions.length; i++) {
      var vertices = cushions[i].vertices;
      push();
      noStroke();
      fill(52, 98, 25);
      beginShape();
      for (var j = 0; j < vertices.length; j++) {
        vertex(vertices[j].x, vertices[j].y);
      }
      endShape(CLOSE);
      pop();
    }
  };

  // draw the white lines of the table
  this.drawLines = function () {
    stroke(255);
    noFill();
    arc(
      (width - tableWidth) / 2 + tableWidth / 5,
      height / 2,
      190,
      190,
      90,
      270
    );
    line(
      (width - tableWidth) / 2 + tableWidth / 5,
      (height - tableHeight) / 2 + frameSize + cushionHeight,
      (width - tableWidth) / 2 + tableWidth / 5,
      (height - tableHeight) / 2 + tableHeight - frameSize - cushionHeight
    );
  };
}
