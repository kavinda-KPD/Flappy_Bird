import {
  _decorator,
  CCInteger,
  Collider2D,
  Component,
  Contact2DType,
  director,
  EventKeyboard,
  EventMouse,
  input,
  Input,
  IPhysics2DContact,
  KeyCode,
  Node,
} from "cc";
import { Ground } from "./Ground";
import { Results } from "./Results";
import { Bird } from "./Bird";
import { PipePool } from "./PipePool";
const { ccclass, property } = _decorator;

@ccclass("GameControll")
export class GameControll extends Component {
  @property({
    type: Ground,
    tooltip: "Ground",
  })
  public ground: Ground;

  @property({
    type: CCInteger,
    tooltip: "Game Speed",
  })
  public speed: number = 300;

  @property({
    type: PipePool,
    tooltip: "Pipe Pool",
  })
  public pipeQueue: PipePool;

  @property({
    type: CCInteger,
    tooltip: "Pipes Speed",
  })
  public pipesSpeed: number = 200;

  @property({
    type: Results,
    tooltip: "Results",
  })
  public results: Results;

  @property({
    type: Bird,
    tooltip: "Bird",
  })
  public bird: Bird;

  public isOver: boolean = false;

  onLoad(): void {
    console.log("GameControll: onLoad() called");
    this.initListener();
    this.results.resetScore();
    director.pause();
    this.startGame();
    this.isOver = true;
    console.log("GameControll: Game started");
  }

  initListener() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

    this.node.on(
      Node.EventType.TOUCH_START,
      () => {
        if (this.isOver === true) {
          this.resetGame();
          this.bird.resetBird();
          this.startGame();
        }

        if (this.isOver === false) {
          this.bird.fly();
        }
      },
      this
    );
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this.stopGame();
        break;

      case KeyCode.KEY_S:
        this.results.addScore();
        break;

      case KeyCode.KEY_D:
        this.resetGame();
        this.bird.resetBird();
        break;
    }
  }

  startGame() {
    console.log("GameControll: startGame() called");
    this.results.hideResult();
    director.resume();
    console.log("GameControll: Director resumed");
  }

  stopGame() {
    this.results.showResult();
    this.isOver = true;
    director.pause();
  }

  resetGame() {
    this.results.resetScore();
    this.pipeQueue.resetPool();
    this.isOver = false;
    this.startGame();
  }

  passPipe() {
    this.results.addScore();
  }

  createPipe() {
    this.pipeQueue.addPool();
  }

  contactGroundPipe() {
    let collider = this.bird.getComponent(Collider2D);

    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    this.bird.hitSomeThing = true;
  }

  birdStuck() {
    this.contactGroundPipe();

    if (this.bird.hitSomeThing) {
      this.stopGame();
    }
  }

  update(deltaTime: number) {
    if (this.isOver === false) {
      this.birdStuck();
    }
  }
}
