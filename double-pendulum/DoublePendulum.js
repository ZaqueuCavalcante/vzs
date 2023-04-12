class DoublePendulum {
  constructor(x, y, r1, m1, r2, m2) {
    // Pendulum 1
    this.r1 = r1;
    this.m1 = m1;
    this.theta1 = PI / 2;
    this.v1 = 0.0;
    this.acc1 = 0.0;

    // Pendulum 2
    this.r2 = r2;
    this.m2 = m2;
    this.theta2 = PI / 2;
    this.v2 = 0.0;
    this.acc2 = 0.0;

    this.origin = createVector(x, y);
    this.pos1 = createVector();
    this.pos2 = createVector();

    this.g = 1;

    this.c = createGraphics(windowWidth, windowHeight);
    this.c.strokeWeight(2);
    this.c.stroke(168, 253, 246);

    this.tail_x = 0;
    this.tail_y = 0;
  }

  update() {
    let part1 = -1 * this.g * (2 * this.m1 + this.m2) * sin(this.theta1);
    let part2 = -1 * this.m2 * this.g * sin(this.theta1 - 2 * this.theta2);
    let part3 = -1 * 2 * sin(this.theta1 - this.theta2) * this.m2;
    let part4 =
      pow(this.v2, 2) * this.r2 +
      pow(this.v1, 2) * this.r1 * cos(this.theta1 - this.theta2);
    let part5 =
      this.r1 *
      (2 * this.m1 +
        this.m2 -
        this.m2 * cos(2 * this.theta1 - 2 * this.theta2));

    this.acc1 = (part1 + part2 + part3 * part4) / part5;

    part1 = 2 * sin(this.theta1 - this.theta2);
    part2 = pow(this.v1, 2) * this.r1 * (this.m1 + this.m2);
    part3 = this.g * (this.m1 + this.m2) * cos(this.theta1);
    part4 =
      pow(this.v2, 2) * this.r2 * this.m2 * cos(this.theta1 - this.theta2);
    part5 =
      this.r2 *
      (2 * this.m1 +
        this.m2 -
        this.m2 * cos(2 * this.theta1 - 2 * this.theta2));

    this.acc2 = (part1 * (part2 + part3 + part4)) / part5;

    this.v1 = this.v1 + this.acc1;
    this.theta1 = this.theta1 + this.v1;

    this.v2 = this.v2 + this.acc2;
    this.theta2 = this.theta2 + this.v2;

    this.tail_x = this.pos2.x;
    this.tail_y = this.pos2.y;

    this.pos1.set(this.r1 * sin(this.theta1), this.r1 * cos(this.theta1));
    this.pos2.set(this.r2 * sin(this.theta2), this.r2 * cos(this.theta2));

    this.pos1.add(this.origin);
    this.pos2.add(this.pos1);
  }

  draw() {
    stroke(216, 58, 124);
    line(this.origin.x, this.origin.y, this.pos1.x, this.pos1.y);
    line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);

    fill(247, 215, 71);
    circle(this.pos1.x, this.pos1.y, 4 * this.m1);
    circle(this.pos2.x, this.pos2.y, 4 * this.m2);

    if (frameCount > 1) {
      this.c.line(this.tail_x, this.tail_y, this.pos2.x, this.pos2.y);
    }

    image(this.c, 0, 0, windowWidth, windowHeight);
  }
}
