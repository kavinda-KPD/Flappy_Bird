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
  jumpHeight: number = 50;

  @property({
    type: CCFloat,
    tooltip: "jump duration",
  })
  jumpDuration: number = 0.3;

  public birdAnimation: Animation;
  public birdLocation: Vec3;
  public hitSomeThing: boolean = false;

  onLoad(): void {
    this.resetBird();
    this.birdAnimation = this.node.getComponent(Animation);
  }

  start() {}

  update(deltaTime: number) {}

  resetBird() {
    this.birdLocation = new Vec3(0, 0, 0);
    this.node.setPosition(this.birdLocation);
    this.hitSomeThing = false;
  }

  fly() {

    this.birdAnimation.stop();

    // Use proper tween syntax for Cocos Creator
    tween(this.node)
      .to(
        this.jumpDuration,
        {
          position: new Vec3(
            this.node.position.x,
            this.node.position.y + this.jumpHeight,
            0
          ),
        },
        {
          easing: "smooth",
        }
      )
      .start();

    this.birdAnimation.play();
  }
}
