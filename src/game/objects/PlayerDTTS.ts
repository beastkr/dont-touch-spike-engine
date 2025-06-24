import Player from "../../game-objects/Player";
import { BUTTON_SPRITE, BACKGROUND_IMAGE, PLAYER_SPRITE } from "../../constants/global";   
import SpriteRenderer from "../../graphics/SpriteRenderer";
import Physics from "../../physics/Physics";
import Force from "../../physics/Force";
import Vector2 from "../../components/Vector2";
import Animator from "../../graphics/Animator";
import InputManager from "../../InputManager";
import SpikePool from "./SpikePool";
import SceneManager from "../../game-engine/SceneManager";
import GameObject from "../../game-objects/GameObject";
import ScoreManager from "./ScoreManager";
import AudioPlayer from "../../Audio/AudioPlayer";
import { JUMP_FORCE, PLAYER_SPEED } from "../../constants/physicconfig";

class PlayerDTTS extends Player {
    private jumpCounter: number = 0;
    private jumpable: boolean = true;
    private jumping: boolean = false
    private touchCeiling: boolean = false;
    private jumpForce: Force = new Force(new Vector2(0, -JUMP_FORCE));
    private speed: Force = new Force(new Vector2(PLAYER_SPEED, 0));
    public facingLeft: boolean = false;
    private bouncing: boolean = false;
    private onground: boolean = false;
    public spikeLeft: SpikePool;
    public spikeright: SpikePool;

    public constructor(sceneKey: string, pos?: IVector2, scale?: IVector2) {
        super(sceneKey, pos, scale);
        this.spriterenderer = new SpriteRenderer(PLAYER_SPRITE);
        this.animator = new Animator(this.spriterenderer);
        this.animator.loadAnim(true, PLAYER_SPRITE, 16, 16);
        this.collider.scale.y = 0.5* this.collider.scale.y
    }

    public override update(delta: number) { 
        super.update(delta);
        this.transform.rotation = 0;
        Physics.addforce(this.transform.position, this.speed, delta);
        if (!this.onground) {
            Physics.addforce(this.transform.position, Physics.gravity, delta);
        }
        else {
            let coll = this.collider.collide('ground')[0];
            this.transform.position.y = coll.position.y - this.transform.scale.y/2 - coll.scale.y / 2 + 1;
        }        
        this.statReset();
        if (this.collider.checkCollide()){
            let coll = this.collider.checkCollide();
            for (var c of coll) {
                if (c.layer == 'ground'){
                    this.onground = true;
                }
                if (c.layer == 'ceiling') {
                    this.touchCeiling = true;
                }
            }
        }

        if(this.collider.collide('wall')[1] && !this.bouncing) {
            AudioPlayer.play('jump');
            ScoreManager.increase();
            this.spikeLeft.expose();
            this.spikeright.expose();
            this.facingLeft = !this.facingLeft;
            this.bouncing = true;
            this.speed.power.x = -this.speed.power.x;
            this.transform.flip.x = - this.transform.flip.x;
            this.spriterenderer.flipimage(this.transform.flip);

        }
        else if (!this.collider.collide('wall')[1]) {
            this.bouncing = false;
        }
        if (!this.jumpable) this.jumpCounter += delta;
        if (this.jumpCounter >= 150/1000) {
            this.jumping = false;
            if (InputManager.key == '') {           
                this.jumpable = true;
                this .jumpCounter = 0;
            }
        }        
        if (this.jumping&&!this.touchCeiling) {
            Physics.addforce(this.transform.position, this.jumpForce, delta);
            this.transform.rotation = -45;
        }

        this.animator.play(delta);
        if ((InputManager.key == ' ' || InputManager.mousepos[2] != 0) && this.jumpable) {
            this.jumpable = false;
            this.jumping = true;
            this.jumpCounter = 0;
            InputManager.mousepos[2]=0;
        }
        if (this.collider.collide('spike')[1]){
            this.gameover();
        }

    }

    public override render(delta: number, campos?: IVector2) {
        super.render(delta, campos);
    }
    public statReset() {
        this.onground = false;
        this.touchCeiling = false;
    }

    public reset() {
        this.onground = false;
        this.touchCeiling = false;
        this.bouncing = false;
        this.facingLeft = false;
        this.jumpable = true;
        this.jumping = false;
        this.transform.flip.x = 1;
        this.jumpCounter=0;
        this.speed.power.x = 200;
    }
    public gameover(){
        SceneManager.setActive('menu');
    }


}

export default PlayerDTTS;