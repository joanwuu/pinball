import MainController from "./MainController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Barrier extends cc.Component {

    @property(cc.Label)
    lbScore: cc.Label = null;

    score: number = 5;

    main: MainController = null;
    onLoad() {

        this.setScore(this.score);
        
    }

    start() {
        this.lbScore.node.rotation = -this.node.rotation;
    }

    setScore(score: number) {
        this.score = score;
        this.lbScore.string = this.score.toString();
    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider): void {
        console.log("onBeginContact");
        this.setScore(this.score - 1);

        if (this.score == 0) {
            this.main.removeBarrier(this);
        }

    }

    onPreSolve(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider): void {
        console.log("onPreSolve");


    }

    onPostSolve(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider): void {
        console.log("onPostSolve");


    }

    onEndContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider): void {
        console.log("onEndContact");


    }


}
