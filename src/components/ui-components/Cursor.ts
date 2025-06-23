import GameObject from '../../game-objects/GameObject'
import Vector2 from '../Vector2'
import SpriteRenderer from '../../graphics/SpriteRenderer'
import BoxCollider from '../Collider/BoxCollider'
import InputManager from '../../InputManager'
import CollidableObject from '../../game-objects/CollidableObject'

class Cursor extends CollidableObject implements ICollidableGameObject{
    public clicking: boolean = false;
    public constructor(sceneKey: string, pos?: Vector2, scale?: Vector2) {
        super(sceneKey, pos, scale);
        InputManager.mousepos = [0,0,0,0]
        if (pos && scale) {
            this.collider = new BoxCollider(sceneKey, pos, scale);
        }
        else this.collider = new BoxCollider(sceneKey);
        this.collider.layer = 'cursor'
        this.spriterenderer = new SpriteRenderer()
        this.spriterenderer.color = [0,0,0,0]

    }

    public override update(delta: number){
        super.update(delta);
        this.transform.position.x = InputManager.mousepos[0];
        this.transform.position.y = InputManager.mousepos[1];

    }
    public override render(delta: number, campos?: Vector2) {
        super.render(delta, campos);
        this.collider.drawDebug(this.spriterenderer.ctx);
    }
}

export default Cursor

