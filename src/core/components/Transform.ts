import Force from "../physics/Force";
import Component from "./Component";
import Vector2 from "./Vector2";
class Transform extends Component implements ITransform {
    public position: IVector2;
    public rotation: number;
    public scale: IVector2;
    public flip: IVector2;
    constructor(pos?: IVector2, scale?: IVector2) {
        super();
        this.flip = new Vector2(1,1);
        this.rotation = 0;
        this.position = pos ?? new Vector2(0,0);  
        this.scale = scale ?? new Vector2(1,1);
    }
    public update(delta: number){}
}
export default Transform;