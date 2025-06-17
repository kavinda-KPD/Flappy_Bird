import {
  _decorator,
  Canvas,
  Component,
  director,
  Node,
  UITransform,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Ground")
export class Ground extends Component {
  @property({
    type: Node,
    tooltip: "Ground 1",
  })
  ground1: Node;

  @property({
    type: Node,
    tooltip: "Ground 2",
  })
  ground2: Node;

  @property({
    type: Node,
    tooltip: "Ground 3",
  })
  ground3: Node;

  //create ground with 3 nodes
  groundWidth1: number;
  groundWidth2: number;
  groundWidth3: number;

  public tempStartLocation1: Vec3 = new Vec3();
  public tempStartLocation2: Vec3 = new Vec3();
  public tempStartLocation3: Vec3 = new Vec3();

  gameSpeed: number = 50;

  protected onLoad(): void {
    this.startUp();
  }

  startUp() {
    //get ground width
    this.groundWidth1 = this.ground1.getComponent(UITransform).width;
    this.groundWidth2 = this.ground2.getComponent(UITransform).width;
    this.groundWidth3 = this.ground3.getComponent(UITransform).width;

    //set temporary starting locations of ground
    this.tempStartLocation1.x = 0;
    this.tempStartLocation2.x = this.groundWidth1;
    this.tempStartLocation3.x = this.groundWidth1 + this.groundWidth2;

    this.tempStartLocation1.y = this.ground1.position.y;
    this.tempStartLocation2.y = this.ground2.position.y;
    this.tempStartLocation3.y = this.ground3.position.y;

    //update position to final starting locations
    this.ground1.setPosition(this.tempStartLocation1);
    this.ground2.setPosition(this.tempStartLocation2);
    this.ground3.setPosition(this.tempStartLocation3);
  }

  start() {}

  update(deltaTime: number) {
    //place real location data into temp locations
    this.tempStartLocation1 = this.ground1.position;
    this.tempStartLocation2 = this.ground2.position;
    this.tempStartLocation3 = this.ground3.position;

    this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
    this.tempStartLocation2.x -= this.gameSpeed * deltaTime;
    this.tempStartLocation3.x -= this.gameSpeed * deltaTime;

    //get the canvas size prepared
    const scene = director.getScene();
    const canvas = scene.getComponentInChildren(Canvas);

    //check if ground1 went out of bounds. If so, return to the end of the line.
    if (this.tempStartLocation1.x <= 0 - this.groundWidth1) {
      this.tempStartLocation1.x = canvas.getComponent(UITransform).width;
    }

    //same with ground2
    if (this.tempStartLocation2.x <= 0 - this.groundWidth2) {
      this.tempStartLocation2.x = canvas.getComponent(UITransform).width;
    }

    //same with ground3
    if (this.tempStartLocation3.x <= 0 - this.groundWidth3) {
      this.tempStartLocation3.x = canvas.getComponent(UITransform).width;
    }

    //place new locations back into ground nodes
    this.ground1.setPosition(this.tempStartLocation1);
    this.ground2.setPosition(this.tempStartLocation2);
    this.ground3.setPosition(this.tempStartLocation3);
  }
}
