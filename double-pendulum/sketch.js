let pendulum1;
let pendulum2;

function setup() {
  let w = windowWidth;
  let h = windowHeight;

  createCanvas(w, h);

  pendulum1 = new DoublePendulum(w / 2, h / 4, 160, 8, 200, 3);
  pendulum2 = new DoublePendulum(w / 2, h / 4, 160, 8, 200.001, 3);

  strokeWeight(4);
}

function draw() {
  background(13, 17, 23);

  pendulum1.update();
  pendulum1.draw();

  pendulum2.update();
  pendulum2.draw();
}
