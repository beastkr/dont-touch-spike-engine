import { PLAYER_SPRITE, SPIKE_UP } from "../../constants/global";
import CollidableObject from "../../core/game-objects/CollidableObject";
import SpriteRenderer from "../../core/graphics/SpriteRenderer";
import RigidBody from "../../core/physics/RigidBody";

class Spike extends CollidableObject {
    public rb: RigidBody;
    public constructor(sceneKey: string, pos?: IVector2, scale?: IVector2) {
        super(sceneKey, pos, scale);
        this.rb = new RigidBody();
        this.collider.layer = 'spike';
        this.spriterenderer = new SpriteRenderer(SPIKE_UP);
        this.collider.scale.y = this.transform.scale.y / 3;
        this.collider.scale.x = this.transform.scale.x* 0.8;

    }

    public override update(delta: number): void {
        super.update(delta);
        this.rb.update(delta, this.transform);
    }

    public override render(delta: number, campos?: IVector2): void {
        super.render(delta, campos);
    }

}

export default Spike;