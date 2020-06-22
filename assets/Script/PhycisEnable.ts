import RigidBody = cc.RigidBody;

const {ccclass, property} = cc._decorator;

@ccclass
export default class PhysicsEnable extends cc.Component {



    onLoad() {

        let manager = cc.director.getPhysicsManager();
        manager.enabled = true;
        manager.gravity = cc.v2(0, -1000);

        cc.director.getPhysicsManager().debugDrawFlags =
            cc.PhysicsManager.DrawBits.e_aabbBit | //轴向外边框
            cc.PhysicsManager.DrawBits.e_pairBit | //粗测阶段物体
            cc.PhysicsManager.DrawBits.e_centerOfMassBit | //质心位置
            cc.PhysicsManager.DrawBits.e_jointBit | //关节链接信息
            cc.PhysicsManager.DrawBits.e_shapeBit //碰撞盒
        ;


    }

    start () {

    }

    // update (dt) {}
}
