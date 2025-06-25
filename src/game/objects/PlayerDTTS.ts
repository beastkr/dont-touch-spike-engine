import { PLAYER_SPRITE } from "../../constants/global";
import Vector2 from "../../core/components/Vector2";
import Player from "../../core/game-objects/Player";
import Animator from "../../core/graphics/Animator";
import SpriteRenderer from "../../core/graphics/SpriteRenderer";
import InputManager from "../../core/InputManager";
import Force from "../../core/physics/Force";
import Physics from "../../core/physics/Physics";
import RigidBody from "../../core/physics/RigidBody";

class PlayerDTTS extends Player{
    public rb: RigidBody;
    public jumpForce: Vector2 = new Vector2(0,-1800);
    public speed: Vector2 = new Vector2(200,0);
    private canJump: boolean = true;    
    public touchGround: boolean = false;
    public bouncable: boolean = false;
    public dead: boolean = false;

    constructor(sceneKey: string, pos?: IVector2, scale?: IVector2) {
        super(sceneKey, pos, scale);
        this.rb = new RigidBody(this.transform.position, this.transform.scale);
        this.setUpAnimator();
    }

    public update(delta: number) {
        super.update(delta);
        let coll = this.collider.checkCollide();
        this.touchGround = false;
        this.bouncable = false;
        for (var c of coll) {
            if (c.layer == 'wall' && !this.bouncable){
                this.bouncable = true;
            }
            if (c.layer == 'ground') {
                this.touchGround = true;
            }
            if (c.layer == 'spike') {
                this.dead = true;
            }
        }
        if (this.bouncable) this.bounce();
        if (this.touchGround && this.rb.velocity.y>=0) this.rb.velocity.y = 0;
        else {Physics.addforce(this.rb, Physics.gravity)}

        this.jump();
        this.rb.update(delta, this.transform);


    }
    public render(delta: number, campos?: IVector2): void {
        super.render(delta, campos);
        this.animator.play(delta);
        this.collider.drawDebug(this.spriterenderer.ctx)
    }

    private setUpAnimator() {
        this.spriterenderer = new SpriteRenderer(PLAYER_SPRITE)
        this.animator = new Animator(this.spriterenderer);
        this.animator.loadAnim(true, PLAYER_SPRITE, 16, 16);
    }

    private bounce() {
        this.rb.velocity.x = -this.rb.velocity.x;
    }

    private jump() {
        if (InputManager.key == ' ' && this.canJump) {
            console.log('jump');
            this.rb.velocity.y = -800;
            this.canJump = false;
        }

        if (InputManager.key == '' && !this.canJump) {
            this.canJump = true;
        }
    }


    public reset(): void {
        super.reset();
        this.dead = false;
        this.rb.reset();
    }

    public entry(): void {
        Physics.addforce(this.rb, new Force(this.speed));
    }

}

export default PlayerDTTS;