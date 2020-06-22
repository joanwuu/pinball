import Ball from "./Ball";
import Barrier from "./Barrier";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainController extends cc.Component {

    @property(cc.Prefab)
    prefabBall: cc.Prefab = null;

    @property([cc.Prefab])
    prefabBarriers: cc.Prefab[] = [];

    balls: Ball[] = [];
    barriers: Barrier[] = [];

    onLoad() {

        this.addBarriers();
    }

    addBall(triggerBall: Ball) {

        let newBall = cc.instantiate(this.prefabBall).getComponent<Ball>(Ball);
        this.balls.push(newBall);
        newBall.node.parent = this.node;
        newBall.node.position = triggerBall.node.position;



    }

    addBarriers() {
        let startPosX = -290;
        let endPosY = 250;

        let currentX = startPosX + this.randomSpace();

        while(currentX < endPosY) {
            let barrier = cc.instantiate(this.prefabBarriers[Math.floor(Math.random() * this.prefabBarriers.length)]).getComponent<Barrier>(Barrier);
            barrier.node.rotation = Math.random() * 360;
            barrier.node.parent = this.node;
            barrier.node.position = cc.v2(currentX, -400);
            barrier.main = this;
            this.barriers.push(barrier);
            currentX += this.randomSpace();
        }

    }

    randomSpace(): number {
        return 100 + Math.random() * 100;
    }

    removeBarrier(barrier: Barrier) {
        let idx = this.barriers.indexOf(barrier);
        if (idx != -1) {
            this.barriers.splice(idx, 1);
            barrier.node.removeFromParent(false);
        }
    }
}
