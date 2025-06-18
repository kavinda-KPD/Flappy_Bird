import { _decorator, Component, Label, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Results")
export class Results extends Component {
  @property({
    type: Label,
    tooltip: "Score Label",
  })
  public scoreLabel: Label;

  @property({
    type: Label,
    tooltip: "High Score Label",
  })
  public highScoreLabel: Label;

  @property({
    type: Label,
    tooltip: "Result End Label",
  })
  public resultEndLabel: Label;

  maxScore: number = 0;
  currentScore: number = 0;

  protected onLoad(): void {
    this.resetScore();
  }

  updateScore(num: number) {
    this.currentScore = num;
    this.scoreLabel.string = this.currentScore.toString();
  }

  resetScore() {
    this.updateScore(0);

    this.hideResult();
  }

  addScore() {
    this.updateScore(this.currentScore + 1);
  }

  showResult() {
    this.maxScore = Math.max(this.maxScore, this.currentScore);

    this.highScoreLabel.string = "High Score: " + this.maxScore.toString();

    //show result end label
    this.resultEndLabel.node.active = true;
    this.highScoreLabel.node.active = true;
  }

  hideResult() {
    this.resultEndLabel.node.active = false;
    this.resultEndLabel.node.active = false;
  }

  start() {}

  update(deltaTime: number) {}
}
