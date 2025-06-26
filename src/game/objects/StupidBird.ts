import AnimatedGameObject from "../../core/game-objects/AnimatedGameObject";
import SpriteRenderer from "../../core/graphics/SpriteRenderer";
import Animator from "../../core/graphics/Animator";
import { BIRD_SPRITE } from "../../constants/global";
import Physics from "../../core/physics/Physics";
import Force from "../../core/physics/Force";
import Vector2 from "../../core/components/Vector2";
import { CAMERA_POSITION, CAMERA_SCALE } from "../../constants/graphic";
import { getRandom } from "../../core/math/Random";
import RigidBody from "../../core/physics/RigidBody";

class StupidBird extends AnimatedGameObject {
    private speed:number;
    private rb: RigidBody;
    public constructor(sceneKey: string,speed: number , pos?: IVector2, scale?: IVector2){
        super(sceneKey, pos, scale);
        this.speed = speed;
        this.spriterenderer = new SpriteRenderer(BIRD_SPRITE);
        this.animator = new Animator(this.spriterenderer);
        this.animator.loadAnim(true, BIRD_SPRITE, 16,16);
        this.rb = new RigidBody(pos, scale);
        this.rb.velocity.x = this.speed;
        this.reset();
    }

    public update(delta:number) {
        super.update(delta);
        this.rb.update(delta,this.transform)
        this.animator.play(delta);
        if (this.transform.position.x > CAMERA_SCALE.x+100 || this.transform.position.x < -100){
            this.rb.velocity.x = - this.rb.velocity.x;

            this.transform.flip.x = -this.transform.flip.x;
            this.spriterenderer.flipimage(this.transform.flip);
        }

    }

    public reset() {
        this.transform.position.y = getRandom(CAMERA_POSITION.y+100, CAMERA_SCALE.y-100);
        this.transform.position.x = getRandom(CAMERA_POSITION.x, CAMERA_SCALE.x);
    }
}
export default StupidBird;