import { _decorator, CCInteger, Component, Node } from "cc";
import { Ground } from "./Ground";
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

  onLoad(): void {}

  initListener() {}

  startGame() {}
}
