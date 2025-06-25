import Transform from "../components/Transform";
import Vector2 from "../components/Vector2";
import SceneManager from "../game-engine/SceneManager";
import SpriteRenderer from "../graphics/SpriteRenderer";
class GameObject implements IGameObject {
    public transform: ITransform;
    public spriterenderer: ISpriteRenderder;
    public originalTransform: ITransform;

    public constructor(sceneKey: string, pos?: IVector2, scale?: IVector2) {
        this.spriterenderer = new SpriteRenderer();
        this.transform = new Transform(pos, scale);
        let t = new Vector2(this.transform.position.x, this.transform.position.y);
        let s = new Vector2(this.transform.scale.x, this.transform.scale.y);
        this.originalTransform = new Transform(t,s);
    }

    public render(delta: number, campos?: IVector2){
        if (this.spriterenderer) {
            let pos = this.transform.position;
            let scale = this.transform.scale;
            this.spriterenderer.rotate(this.transform.rotation);
            this.spriterenderer.render(pos, scale, campos);
        }
    }

    public update(delta:number){
        
    } 
    
    public reset() {
        let pos = new Vector2(this.originalTransform.position.x, this.originalTransform.position.y);
        let scale = new Vector2(this.originalTransform.scale.x, this.originalTransform.scale.y);
        this.transform = new Transform(pos, scale);
        this.spriterenderer.flipimage(this.transform.flip)
        this.transform.rotation = this.originalTransform.rotation;
    }
}
export default GameObject;