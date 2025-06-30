import InputManager from '../../InputManager'
import CollidableObject from '../../game-objects/CollidableObject'
import SpriteRenderer from '../../graphics/SpriteRenderer'
import BoxCollider from '../Collider/BoxCollider'
import Vector2 from '../Vector2'

class Cursor extends CollidableObject implements ICollidableGameObject {
    public clicking: boolean = false
    public constructor(sceneKey: string, pos?: Vector2, scale?: Vector2) {
        super(sceneKey, pos, scale)
        InputManager.reset()
        if (pos && scale) {
            this.collider = new BoxCollider(sceneKey, pos, scale)
        } else this.collider = new BoxCollider(sceneKey)
        this.collider.layer = 'cursor'
        this.spriterenderer = new SpriteRenderer()
        this.spriterenderer.color = [0, 0, 0, 0]
    }

    public override update(delta: number) {
        super.update(delta)
        this.clicking = InputManager.mousepos[3] == 0
        this.transform.position.x = InputManager.mousepos[0]
        this.transform.position.y = InputManager.mousepos[1]
    }
    public override render(delta: number, campos?: Vector2) {
        super.render(delta, campos)
    }

    public reset() {
        this.transform.position = new Vector2()
    }
}

export default Cursor
