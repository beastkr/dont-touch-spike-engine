import Gravity from './Gravity'
import Force from './Force'
import Vector2 from '../components/Vector2';
import Transform from '../components/Transform';
import RigidBody from './RigidBody';
import Player from '../game-objects/Player';

class Physics {
    static gravity: Gravity;
    static initialize() {
        Physics.gravity = new Gravity();
    }
    static addforce(transform: RigidBody, force: Force) {
        transform.onAddForce(force);
    }

    static stopforce(transform: RigidBody, force: Force) {
        transform.onStopForce(force);
    }
    static applyGravity(delta: number, transform: RigidBody) {
        let t = new Vector2(0, Physics.gravity.power.y*delta)
        transform.onAddForce(Physics.gravity)
    }
}

export default Physics