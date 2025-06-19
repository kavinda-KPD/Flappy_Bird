import {
  _decorator,
  CCFloat,
  Component,
  Node,
  Vec3,
  Animation,
  tween,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Bird")
export class Bird extends Component {
  @property({
    type: CCFloat,
    tooltip: "jump height",
  })
  jumpHeight: number = 3.5;

  @property({
    type: CCFloat,
    tooltip: "jump duration",
  })
  jumpDuration: number = 3.5;

  public birdAnimation: Animation;
  public birdLocation: Vec3;

  onLoad(): void {
    this.resetBird();
    this.birdAnimation = this.node.getComponent(Animation);
  }

  start() {}

  update(deltaTime: number) {}

  resetBird() {
    this.birdLocation = new Vec3(0, 0, 0);
    this.node.setPosition(this.birdLocation);
  }

  fly() {
    this.birdAnimation.stop;

    tween(this.node)
      .to(
        this.jumpDuration,
        new Vec3(
          this.node.position.x,
          this.node.position.y + this.jumpHeight,
          0
        ),
        {
          easing: "smooth",
          onUpdate: (target: Node, ratio: number) => {
            this.node.position = target.position;
          },
        }
      )
      .union()
      .to(
        this.jumpDuration,
        new Vec3(this.node.position.x, this.node.position.y, 0),
        {
          easing: "smooth",
        }
      )
      .start();

    this.birdAnimation.play();
  }
}
