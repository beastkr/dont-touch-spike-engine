import { GRAVITY } from '../../constants/physicconfig'
import Vector2 from '../components/Vector2'
import Force from './Force'
class Gravity extends Force {
    constructor() {
        super()
        this.power = new Vector2(0, GRAVITY)
    }
}

export default Gravity
