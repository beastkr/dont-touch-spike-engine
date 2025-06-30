import { PLAYER_SPRITE } from '../../constants/global'
import { JUMP_FORCE, PLAYER_SPEED } from '../../constants/physicconfig'
import Vector2 from '../../core/components/Vector2'
import Player from '../../core/game-objects/Player'
import Animator from '../../core/graphics/Animator'
import SpriteRenderer from '../../core/graphics/SpriteRenderer'
import InputManager from '../../core/InputManager'
import RigidBody from '../../core/physics/RigidBody'
import Observer from './observer/Observer'
import DeadState from './states/DeadStates'
import PlayerState from './states/PlayerState'
import PlayingState from './states/PlayingState'
import RescueState from './states/RescueState'

class PlayerDTTS extends Player {
    public rb: RigidBody
    public speed: Vector2 = new Vector2(PLAYER_SPEED, 0)
    private canJump: boolean = true
    private bounced: boolean = false
    public touchGround: boolean = false
    public bouncable: boolean = false
    public dead: boolean = false
    public touchWall: boolean = false
    public jumping: boolean = false
    public active: boolean = true
    private states: { [key: string]: PlayerState }
    public currentState: PlayerState
    public dieOnce: boolean = false

    constructor(sceneKey: string, pos?: IVector2, scale?: IVector2) {
        super(sceneKey, pos, scale)
        this.rb = new RigidBody(this.transform.position, this.transform.scale)
        this.setUpAnimator()
        this.collider.scale.y = this.transform.scale.y / 2
        this.states = {
            playing: new PlayingState(this),
            dead: new DeadState(this),
            rescue: new RescueState(this),
        }
        this.setState('playing')
        Observer.attach('gameover', 'dieOnceReset', () => {
            this.dieOnce = false
            this.dead = false
        })
    }

    public update(delta: number) {
        if (this.active) {
            super.update(delta)
            this.currentState.onUpdate(delta)

            this.rb.update(delta, this.transform)
            if (this.dead) Observer.raiseEvent('gameover')
        }
        console.log(this.dieOnce)
        console.log('dead:', this.dead)
    }

    public setState(name: string) {
        if (this.currentState) this.currentState.onExit()
        this.currentState = this.states[name]
        this.currentState.onEnter()
    }

    public disable() {
        this.active = false
    }
    public enable() {
        this.active = true
    }

    public checkAllCollider() {
        let coll = this.collider.checkCollide()
        for (var c of coll) {
            if (c.layer == 'wall') {
                this.bounced = true
            }
            if (c.layer == 'spike') {
                this.setState('dead')
            }
        }
    }

    public flagreset() {
        this.touchWall = false
        this.touchGround = false
        this.bounced = false
        this.jumping = false
    }

    public checkBouncing() {
        let t = this.collider.collide('wall')[1]
        if (!t) {
            this.bouncable = true
        } else {
            this.bounce()
            this.bouncable = false
        }
    }

    public render(delta: number, campos?: IVector2): void {
        super.render(delta, campos)
        this.animator.play(delta)
        this.currentState.onRender(delta, campos)
    }
    private setUpAnimator() {
        this.spriterenderer = new SpriteRenderer(PLAYER_SPRITE)
        this.animator = new Animator(this.spriterenderer)
        this.animator.loadAnim(true, PLAYER_SPRITE, 16, 16)
    }

    public bounce() {
        if (this.bouncable) {
            this.rb.velocity.x = -this.rb.velocity.x
            this.bouncable = false
            this.touchWall = true
            this.flip()
        }
    }

    public jump() {
        if ((InputManager.key == ' ' || InputManager.mousepos[2] != 0) && this.canJump) {
            Observer.raiseEvent('jump')
            this.jumping = true
            this.rb.velocity.y = -JUMP_FORCE
            this.canJump = false
            InputManager.mousepos[2] = 0
        }

        if (InputManager.key == '' && InputManager.mousepos[2] == 0 && !this.canJump) {
            this.canJump = true
        }
    }

    public reset(): void {
        super.reset()
        this.rb.reset()
        this.flagreset()
    }

    public entry(): void {
        this.dieOnce = false
        this.setState('playing')
    }

    private flip() {
        this.transform.flip.x *= -1
        this.spriterenderer.flipimage(this.transform.flip)
    }
}

export default PlayerDTTS
