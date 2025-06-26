import { PLAYER_SPRITE } from "../../constants/global";
import { JUMP_FORCE, PLAYER_SPEED } from "../../constants/physicconfig";
import Vector2 from "../../core/components/Vector2";
import Player from "../../core/game-objects/Player";
import Animator from "../../core/graphics/Animator";
import SpriteRenderer from "../../core/graphics/SpriteRenderer";
import InputManager from "../../core/InputManager";
import Force from "../../core/physics/Force";
import Physics from "../../core/physics/Physics";
import RigidBody from "../../core/physics/RigidBody";
import Particle from "./Particle";

class PlayerDTTS extends Player{
    public rb: RigidBody;
    public speed: Vector2 = new Vector2(PLAYER_SPEED,0);
    private canJump: boolean = true;    
    private bounced: boolean = false;
    public touchGround: boolean = false;
    public bouncable: boolean = false;
    public dead: boolean = false;
    public touchWall: boolean = false;
    public jumping: boolean = false;
    public active: boolean = true;

    constructor(sceneKey: string, pos?: IVector2, scale?: IVector2) {
        super(sceneKey, pos, scale);
        this.rb = new RigidBody(this.transform.position, this.transform.scale);
        this.setUpAnimator();
        this.collider.scale.y = this.transform.scale.y/2;
    }

    public update(delta: number) {
        if (this.active){
            super.update(delta);
            this.flagreset();
            this.checkAllCollider();
            this.checkBouncing();
            if (this.touchGround && this.rb.velocity.y>=0) this.rb.velocity.y = 0;
            else {Physics.addforce(this.rb, Physics.gravity)}
            this.jump();
            this.rb.update(delta, this.transform);
        }


    }

    public disable() {
        this.active = false;
    }
    public enable() {
        this.active = true;
    }

    private checkAllCollider() {
        let coll = this.collider.checkCollide();
        for (var c of coll) {
            if (c.layer == 'wall') {
                this.bounced = true;
            }
            if (c.layer == 'ground') {
                this.touchGround = true;
            }
            if (c.layer == 'spike') {
                this.dead = true;
            }
        }
    }


    public flagreset() {
        this.touchWall = false;
        this.touchGround = false;
        this.dead = false;
        this.bounced = false;
        this.jumping = false;
    }
    
    private checkBouncing() {
        let t = this.collider.collide('wall')[1]
        if (!t){
            this.bouncable = true;
        }
        else {
            this.bounce();
            this.bouncable = false;
        }
    }

    public render(delta: number, campos?: IVector2): void {

        super.render(delta, campos);
        this.animator.play(delta);
    }

    private setUpAnimator() {
        this.spriterenderer = new SpriteRenderer(PLAYER_SPRITE)
        this.animator = new Animator(this.spriterenderer);
        this.animator.loadAnim(true, PLAYER_SPRITE, 16, 16);
    }

    private bounce() {
        if (this.bouncable) {
            this.rb.velocity.x = -this.rb.velocity.x;
            this.bouncable = false;
            this.touchWall = true;
            this.flip();
        }

    }

    private jump() {
        if ((InputManager.key == ' ' || InputManager.mousepos[2]!=0) && this.canJump) {
            this.jumping = true;
            this.rb.velocity.y = -JUMP_FORCE;
            this.canJump = false;
            InputManager.mousepos[2] =0;
        }

        if ((InputManager.key == '' && InputManager.mousepos[2] == 0) && !this.canJump) {
            this.canJump = true;
        }
    }


    public reset(): void {
        super.reset();
        this.rb.reset();
        this.flagreset();
    }

    public entry(): void {
        Physics.addforce(this.rb, new Force(this.speed));
    }


    private flip() {
        this.transform.flip.x *= -1;
        this.spriterenderer.flipimage(this.transform.flip)
    }
}

export default PlayerDTTS;