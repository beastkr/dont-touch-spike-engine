import Vector2 from '../Vector2'
import Collider from './Collider'
import ColliderController from './ColliderController'

class BoxCollider extends Collider implements IBoxCollider {
    private sceneKey: string
    public constructor(sceneKey: string, pos?: IVector2, scale?: IVector2) {
        super(sceneKey)
        this.sceneKey = sceneKey
        pos = pos ?? new Vector2()
        scale = scale ?? new Vector2()
        this.position = new Vector2(pos.x, pos.y) ?? new Vector2()
        this.scale = new Vector2(scale.x, scale.y) ?? new Vector2(1, 1)
    }

    public collide(target: string): [ICollider, boolean] {
        for (var id in ColliderController.getAllColliders(this.sceneKey)) {
            let coll = ColliderController.getAllColliders(this.sceneKey)[id]
            if (id !== String(this.id) && coll instanceof BoxCollider && coll.layer == target) {
                const other = coll as BoxCollider

                const aMinX = this.position.x - this.scale.x / 2
                const aMaxX = this.position.x + this.scale.x / 2
                const aMinY = this.position.y - this.scale.y / 2
                const aMaxY = this.position.y + this.scale.y / 2

                const bMinX = other.position.x - other.scale.x / 2
                const bMaxX = other.position.x + other.scale.x / 2
                const bMinY = other.position.y - other.scale.y / 2
                const bMaxY = other.position.y + other.scale.y / 2

                const overlapX = aMinX < bMaxX && aMaxX > bMinX
                const overlapY = aMinY < bMaxY && aMaxY > bMinY

                if (overlapX && overlapY) {
                    return [other, true]
                }
            }
        }
        return [this, false]
    }

    public checkCollide(): ICollider[] {
        let othercoll = []
        for (var id in ColliderController.getAllColliders(this.sceneKey)) {
            let coll = ColliderController.getAllColliders(this.sceneKey)[id]
            if (id !== String(this.id) && coll instanceof BoxCollider) {
                const other = coll as BoxCollider

                const aMinX = this.position.x - this.scale.x / 2
                const aMaxX = this.position.x + this.scale.x / 2
                const aMinY = this.position.y - this.scale.y / 2
                const aMaxY = this.position.y + this.scale.y / 2

                const bMinX = other.position.x - other.scale.x / 2
                const bMaxX = other.position.x + other.scale.x / 2
                const bMinY = other.position.y - other.scale.y / 2
                const bMaxY = other.position.y + other.scale.y / 2

                const overlapX = aMinX < bMaxX && aMaxX > bMinX
                const overlapY = aMinY < bMaxY && aMaxY > bMinY

                if (overlapX && overlapY) {
                    othercoll.push(other)
                }
            }
        }
        return othercoll
    }
}
export default BoxCollider
