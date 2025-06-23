import {
  _decorator,
  Component,
  Node,
  Vec3,
  screen,
  find,
  UITransform,
} from "cc";
const { ccclass, property } = _decorator;

const random = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

@ccclass("Pipe")
export class Pipe extends Component {
  @property(Node)
  public topPipe: Node = null;

  @property(Node)
  public bottomPipe: Node = null;

  public tempLocalPositionUP: Vec3 = new Vec3(0, 0, 0);
  public tempLocalPositionDOWN: Vec3 = new Vec3(0, 0, 0);
  public scene = screen.windowSize;

  public game;
  public pipeSpeed: number;
  public tempSpeed: number;

  public isPassed: boolean = false;

  protected onLoad(): void {
    console.log("Pipe: onLoad() called");
    this.game = find("GameCtrl").getComponent("GameControll");
    this.pipeSpeed = this.game.pipesSpeed;
    this.initPosition();
    this.isPassed = false;
    console.log("Pipe: Initialized with speed:", this.pipeSpeed);
  }

  initPosition() {
    console.log("Pipe: initPosition() called");
    console.log("Pipe: Screen width:", this.scene.width);
    console.log(
      "Pipe: Top pipe width:",
      this.topPipe.getComponent(UITransform).width
    );

    // Position pipes just off the right edge of the screen
    this.tempLocalPositionUP.x = this.scene.width + 50;
    this.tempLocalPositionDOWN.x = this.scene.width + 50;

    let gap = random(90, 100);
    let topHeight = random(0, 450);

    this.tempLocalPositionUP.y = topHeight;

    this.tempLocalPositionDOWN.y = topHeight - gap * 10;

    this.bottomPipe.setPosition(this.tempLocalPositionDOWN);
    this.topPipe.setPosition(this.tempLocalPositionUP);

    console.log(
      "Pipe: Positioned at x:",
      this.tempLocalPositionUP.x,
      "y:",
      this.tempLocalPositionUP.y
    );
    console.log("Pipe: Gap:", gap, "Top height:", topHeight);
  }

  start() {}

  update(deltaTime: number) {
    this.tempSpeed = this.pipeSpeed * deltaTime;

    this.tempLocalPositionUP = this.topPipe.position;
    this.tempLocalPositionDOWN = this.bottomPipe.position;

    this.tempLocalPositionUP.x -= this.tempSpeed;
    this.tempLocalPositionDOWN.x -= this.tempSpeed;

    this.bottomPipe.setPosition(this.tempLocalPositionDOWN);
    this.topPipe.setPosition(this.tempLocalPositionUP);

    if (this.isPassed === false && this.topPipe.position.x < -24.990937) {
      this.isPassed = true;
      console.log("Pipe: Bird passed pipe at x:", this.topPipe.position.x);
      this.game.passPipe();
      this.game.createPipe();
    }

    if (this.topPipe.position.x < -this.scene.width) {
      console.log("Pipe: Destroying pipe at x:", this.topPipe.position.x);
      this.destroy();
    }
  }
}
