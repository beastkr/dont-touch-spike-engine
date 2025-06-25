import Transform from "../components/Transform";
import Vector2 from "../components/Vector2";
import Force from "./Force";

class RigidBody {
    public velocity: IVector2;
    public mass: number = 1;

    public constructor(pos?: IVector2, scale?:IVector2) {
        this.velocity = new Vector2();
    }

    public update(delta: number, transform: Transform) {
        transform.position.x += this.velocity.x*delta;
        transform.position.y += this.velocity.y*delta;
    }

    public onAddForce(f: Force) {
        this.velocity.y += f.power.y/this.mass;
        this.velocity.x += f.power.x/this.mass;
        if(this.velocity.y>=1000) this.velocity.y = 1000;
    }

    public onStopForce(f: Force) {
        this.velocity.x -= f.power.x;
        this.velocity.y -= f.power.y;
    }
    public reset(){
        this.velocity = new Vector2();
    }

}

export default RigidBody;