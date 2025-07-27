// // <!-- Snooker Game Using p5.js and Matter.js
// The sketch file is where all the global variables are initialized and where all the other functions and classes are called from.
// Then the createTable function is called to draw the entire game table and add the cushions to the matter.js engine.
// Then the 4 game options are displayed: 1-regular, 2- red balls random positions, 3- all balls in random positions
// and 4- the custom extension, which tries to simulate the bumpers of a pinball machine.
// Once the option is chosen, the color balls class is called and the balls appear in position and the player must click
// with the mouse to make the white ball appear within the area it has to be placed.
// When the white ball appears the player can activate the stick by clicking with the mouse on the white ball.
// Once the cue stick class is called and the stick appears, the player can rotate the stick around the ball by moving the mouse,
// once he chooses the direction he can click on the middle of the stick (marked with a red dot) in order to hit the white ball.
// I chose a back and forth mouse only movement because it is more intuitive and natural than using mouse and keys,
// the force with which the ball is hit is given by the maximum distance back that the stick has been moved from the ball.
// Red balls are removed from the array when they are pocketed. And colored balls are returned to their original position,
// unless they started at random, they return to random.
// The interaction of the cue ball with the other balls and cushions is marked in the console.
// My extension tries to add a kind of pinball flipper bumpers to the game, when the balls hit the bumpers
// they are thrown out with more force like in the pinball game. I don't know if it's a unique idea but I've never seen it anywhere else. -->

// Import Matter.js library
var Engine = Matter.Engine;
var Composite = Matter.Composite;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Composites = Matter.Composites;
var engine;

// Variables for table balls and stick
var table;
var tableWidth = 1200;
var tableHeight = tableWidth / 2;
var cueball;
var ballVisible = false;
var colorballs;
var cueStick;
var stickHide = false;

// Variables for options and collision detection
var optionSelected = false;
var collisionMessage = "";

function setup() {
  createCanvas(1400, 800);
  engine = Engine.create(); // Initialize the physics engine
  engine.world.gravity.y = 0; // Disable vertical gravity
  angleMode(DEGREES);

  // Initialize the table
  table = new createTable();
  table.createCushions();
  colorballs = new ColorBalls(); // Initialize game balls on the table

  // check for collision events and handle them in the detectCollision function
  Matter.Events.on(engine, "collisionStart", function (event) {
    detectCollision(event);
  });
}

function draw() {
  background(0);
  Engine.update(engine);
  table.draw();

  // display the game options, and then draw the balls
  if (!optionSelected) {
    displayOptions();
  } else {
    colorballs.draw();
  }

  //If cueBall and stick are on, it draws them. And updates the stick position.
  if (ballVisible) {
    cueball.draw();
    if (cueStick) {
      cueStick.update(mouseX, mouseY);
      if (!stickHide) {
        cueStick.draw();
      }
    }
  }
}

function mousePressed() {
  //When you click on the cueBall the cueStick is activated
  if (ballVisible) {
    let cBallDist = dist(
      mouseX,
      mouseY,
      cueball.cball.position.x,
      cueball.cball.position.y
    );
    if (cBallDist < 20) {
      stickHide = false;
      cueStick = new CueStick(cueball);
    }
  }

  // Check if mouse click is within the arc and activate cueBall
  var arcX = (width - tableWidth) / 2 + tableWidth / 5;
  var distFromCenter = dist(mouseX, mouseY, arcX, height / 2);

  if (distFromCenter <= 95 && mouseX < arcX) {
    if (!ballVisible) {
      cueball = new CueBall(mouseX, mouseY);
      ballVisible = true;
    }
  }

  // to check if the mouse click is on the center of the cueStick to move it
  if (cueStick) {
    cueStick.mousePressed(mouseX, mouseY);
  }
}

//start dragging the cueStick
function mouseDragged() {
  if (cueStick) {
    cueStick.mouseDragged(mouseX, mouseY);
  }
}

//stop dragging calculatioins of the cueStick
function mouseReleased() {
  if (ballVisible && cueStick) {
    cueStick.mouseReleased();
  }
}

// Main menu options selection keys
function keyPressed() {
  if (
    !optionSelected &&
    (key === "1" || key === "2" || key === "3" || key === "4")
  ) {
    optionSelected = true;
    if (key === "1") {
      colorballs.switchOptions("standard");
    } else if (key === "2") {
      colorballs.switchOptions("randomRed");
    } else if (key === "3") {
      colorballs.switchOptions("randomAll");
    } else if (key === "4") {
      colorballs.switchOptions("flipper");
    }
  }
}

//display gaming options
function displayOptions() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Make CLICK on the semi-circle to active the white ball", width / 2, height / 10);
  text("Make CLICK on the white ball to activate stick", width / 2, (height / 10)*9);
  text("Press 1 for standard snooker", width / 2, height / 5);
  text("Press 2 for random red balls", width / 2, (height / 5) * 2);
  text("Press 3 for all random balls", width / 2, (height / 5) * 3);
  text("Press 4 for FLIPPER MODE (Extension)", width / 2, (height / 5) * 4);
}
