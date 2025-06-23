import Force from './Force'
import Vector2 from '../components/Vector2';
class Gravity extends Force {
    constructor() {
        super();
        this.power = new Vector2(0, 300);
    }

}

export default Gravity