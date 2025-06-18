import {
  _decorator,
  CCInteger,
  Component,
  director,
  EventKeyboard,
  EventMouse,
  input,
  Input,
  KeyCode,
  Node,
} from "cc";
import { Ground } from "./Ground";
import { Results } from "./Results";
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
    type: CCInteger,
    tooltip: "Pipes Speed",
  })
  public pipesSpeed: number = 200;

  @property({
    type: Results,
    tooltip: "Results",
  })
  public results: Results;

  onLoad(): void {
    this.initListener();
    this.results.resetScore();
    director.pause();
  }

  initListener() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
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
        break;
    }
  }

  startGame() {
    this.results.hideResult();
    director.resume();
  }

  stopGame() {
    this.results.showResult();
    director.pause();
  }

  resetGame() {
    this.results.resetScore();
    this.startGame();
  }
}
