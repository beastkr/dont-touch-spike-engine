import GameObject from './GameObject'

class AnimatedGameObject extends GameObject implements IAnimatedGameObject {
    public animator: IAnimator

    public render(delta: number, campos?: IVector2): void {
        let pos = this.transform.position
        let scale = this.transform.scale
        this.spriterenderer.render(pos, scale, campos, this.animator.getCurrentFrameRect())
    }
}

export default AnimatedGameObject
