import Transform from "../components/Transform";
import SceneManager from "../game-engine/SceneManager";
import SpriteRenderer from "../graphics/SpriteRenderer";
class GameObject implements IGameObject {
    public transform: ITransform;
    public spriterenderer: ISpriteRenderder;

    public constructor(sceneKey: string, pos?: IVector2, scale?: IVector2) {
        this.spriterenderer = new SpriteRenderer();
        this.transform = new Transform(pos, scale);
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
}
export default GameObject;