import ColliderController from './ColliderController'

class Collider implements ICollider {
    public position: IVector2
    public isTrigger: boolean
    public id: number
    public layer: string
    public scale: IVector2
    public constructor(sceneKey: string) {
        this.isTrigger = false
        this.id = ColliderController.size.get(sceneKey) || 0
        ColliderController.addcollider(this, sceneKey)
        this.layer = 'default'
    }

    public collide(target: string): [ICollider, boolean] {
        return [this, false]
    }
    public drawDebug(ctx?: CanvasRenderingContext2D | null) {
        if (ctx && !this.isTrigger) {
            ctx.strokeStyle = 'red'
            ctx.strokeRect(
                this.position.x - this.scale.x / 2,
                this.position.y - this.scale.y / 2,
                this.scale.x,
                this.scale.y
            )
        }
    }
    public checkCollide(): ICollider[] {
        return []
    }
}
export default Collider
