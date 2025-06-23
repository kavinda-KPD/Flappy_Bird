import { _decorator, Component, instantiate, Node, NodePool, Prefab } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PipePool")
export class PipePool extends Component {
  @property({
    type: Prefab,
    tooltip: "Pipe",
  })
  public preFabPipe: Prefab = null;

  @property({
    type: Node,
  })
  pipePoolHome: Node = null;

  public pool = new NodePool();
  public createPipe;

  initPool() {
    console.log("PipePool: Initializing pool...");
    let initCount = 3;

    for (let i = 0; i < initCount; i++) {
      this.createPipe = instantiate(this.preFabPipe);
      console.log("PipePool: Created pipe", i, this.createPipe);

      if (i === 0) {
        this.pipePoolHome.addChild(this.createPipe);
        console.log("PipePool: Added first pipe to scene");
      } else {
        this.pool.put(this.createPipe);
        console.log("PipePool: Added pipe to pool");
      }
    }
  }

  addPool() {
    console.log("PipePool: addPool() called, pool size:", this.pool.size());
    if (this.pool.size() > 0) {
      this.createPipe = this.pool.get();
      console.log("PipePool: Got pipe from pool");
    } else {
      this.createPipe = instantiate(this.preFabPipe);
      console.log("PipePool: Created new pipe instance");
    }

    this.pipePoolHome.addChild(this.createPipe);
    console.log(
      "PipePool: Added pipe to scene, total children:",
      this.pipePoolHome.children.length
    );
  }

  resetPool() {
    this.pipePoolHome.removeAllChildren();
    this.pool.clear();
    this.initPool();
  }

  start() {
    console.log("PipePool: start() called");
    this.initPool();
  }

  update(deltaTime: number) {}
}
