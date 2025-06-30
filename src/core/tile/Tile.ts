import { BUTTON_SPRITE } from '../../constants/global'
import CollidableObject from '../game-objects/CollidableObject'
import SpriteRenderer from '../graphics/SpriteRenderer'

class Tile extends CollidableObject {
    public id: number
    public constructor(sceneKey: string, id: number, pos?: IVector2, scale?: IVector2) {
        super(sceneKey, pos, scale)
        this.id = id
        this.spriterenderer = new SpriteRenderer(BUTTON_SPRITE)
    }
}

export default Tile
