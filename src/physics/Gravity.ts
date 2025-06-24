import Force from './Force'
import Vector2 from '../components/Vector2';
import { GRAVITY } from '../constants/physicconfig';
class Gravity extends Force {
    constructor() {
        super();
        this.power = new Vector2(0, GRAVITY);
    }

}

export default Gravity