import AnimatedGameObject from "../../game-objects/AnimatedGameObject";
import SpriteRenderer from "../../graphics/SpriteRenderer";
import Animator from "../../graphics/Animator";
import { BIRD_SPRITE } from "../../constants/global";
import Physics from "../../physics/Physics";
import Force from "../../physics/Force";
import Vector2 from "../../components/Vector2";
import { CAMERA_POSITION, CAMERA_SCALE } from "../../constants/graphic";
import { getRandom } from "../../math/Random";

class StupidBird extends AnimatedGameObject {
    private speed:number = 100;
    public constructor(sceneKey: string, pos?: IVector2, scale?: IVector2){
        super(sceneKey, pos, scale);
        this.spriterenderer = new SpriteRenderer(BIRD_SPRITE);
        this.animator = new Animator(this.spriterenderer);
        this.animator.loadAnim(true, BIRD_SPRITE, 16,16);
    }

    public update(delta:number) {
        super.update(delta);
        this.animator.play(delta);
        Physics.addforce(this.transform.position, new Force(new Vector2(this.speed,0)),delta)
        if (this.transform.position.x > CAMERA_SCALE.x+100 || this.transform.position.x < -100){
            this.speed = - this.speed;

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