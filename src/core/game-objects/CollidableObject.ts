import GameObject from "./GameObject";
import BoxCollider from "../components/Collider/BoxCollider";
class CollidableObject extends GameObject implements ICollidableGameObject {
    public collider: ICollider;
    public layer: string = 'default';
    constructor(sceneKey: string, pos?: IVector2, scale?: IVector2) {
        super(sceneKey, pos, scale);
        this.collider = new BoxCollider(sceneKey, pos, scale);
    }
    public override update(delta: number): void {

        super.update(delta);
        this.collider.position.x = this.transform.position.x;
        this.collider.position.y = this.transform.position.y;

    }
    public override render(delta: number, campos?: IVector2): void {
        super.render(delta, campos);
        //this.collider.drawDebug(this.spriterenderer.ctx);
    }
}

export default CollidableObject;