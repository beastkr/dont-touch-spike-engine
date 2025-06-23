import Gravity from './Gravity'
import Force from './Force'
import Vector2 from '../components/Vector2';

class Physics {
    static gravity: Gravity;
    static initialize() {
        Physics.gravity = new Gravity();
    }
    static addforce(position: Vector2, force: Force, delta:number) {
        position.x = position.x + force.power.x * delta;
        position.y = position.y + force.power.y * delta;
    }
}

export default Physics