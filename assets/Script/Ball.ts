const {ccclass, property} = cc._decorator;

@ccclass
export default class Ball extends cc.Component {


    rigidBody: cc.RigidBody = null;

    isTouchedGround: boolean = false;

    onLoad() {
        this.rigidBody = this.getComponent(cc.RigidBody);
    }


    update(dt: number) {
        if (this.isTouchedGround) {
            this.rigidBody.active = false;
            this.rigidBody.linearVelocity = cc.Vec2.ZERO;

            let pathPos: cc.Vec2[] = [];
            pathPos.push(this.node.position);
            pathPos.push(cc.v2(326,-484));
            pathPos.push(cc.v2(333,605));
            pathPos.push(cc.v2(152,541));


            this.node.runAction(cc.sequence(
                cc.cardinalSplineTo(2, pathPos, 1),
                cc.callFunc(function () {
                    this.rigidBody.active = true;
                }.bind(this)),

            ));
            this.isTouchedGround = false;
        }
    }

    onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider): void {
        // console.log("onBeginContact");

        if (otherCollider.node.name == "ground") {
            this.isTouchedGround = true;

        }


    }

    onPreSolve(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider): void {
        // console.log("onPreSolve");


    }

    onPostSolve(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider): void {
        // console.log("onPostSolve");


    }

    onEndContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider): void {
        // console.log("onEndContact");


    }


}
