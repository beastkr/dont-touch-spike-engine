import { PLAYER_SPRITE, SPIKE_UP } from "../../constants/global";
import CollidableObject from "../../core/game-objects/CollidableObject";
import SpriteRenderer from "../../core/graphics/SpriteRenderer";

class Spike extends CollidableObject {
    public constructor(sceneKey: string, pos?: IVector2, scale?: IVector2) {
        super(sceneKey, pos, scale);
        this.collider.layer = 'spike';
        this.spriterenderer = new SpriteRenderer(SPIKE_UP);
        this.collider.scale.y = this.transform.scale.y / 2;

    }

    public override update(delta: number): void {
        super.update(delta);
    }

    public override render(delta: number, campos?: IVector2): void {
        super.render(delta, campos);
    }

}

export default Spike;