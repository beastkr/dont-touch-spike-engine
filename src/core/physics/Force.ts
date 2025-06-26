import Vector2 from '../components/Vector2';
class Force {
    public power: Vector2;
    public constructor(power?: Vector2) {
        this.power = power ?? new Vector2(0, 0);
    }

}

export default Force