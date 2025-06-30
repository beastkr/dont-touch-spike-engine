import CollidableObject from './CollidableObject'

class Player extends CollidableObject implements IAnimatedGameObject {
    public animator: IAnimator

    public constructor(sceneKey: string, pos?: IVector2, scale?: IVector2) {
        super(sceneKey, pos, scale)
        this.collider.layer = 'player'
    }
    public override update(delta: number): void {
        super.update(delta)
    }
    public override render(delta: number, campos?: IVector2): void {
        super.render(delta, campos)
        if (this.animator) {
            this.spriterenderer.render(
                this.transform.position,
                this.transform.scale,
                campos,
                this.animator.getCurrentFrameRect()
            )
        }
    }
}

export default Player
