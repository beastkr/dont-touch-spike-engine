import Camera from "../graphics/Camera";
import InputManager from "../InputManager";
import Button from "../components/ui-components/Button";
import ColliderController from "../components/Collider/ColliderController";
import Vector2 from "../components/Vector2";
import ResourceManager from "../ResourceManager";
import Cursor from "../components/ui-components/Cursor";
import Renderer from "../graphics/Renderer";
import GameObject from "../game-objects/GameObject";

class Scene implements IScene{
    public name: string;
    public gameObject: IGameObject[];
    public camera: ICamera;
    public originalPos: Map<GameObject, [IVector2, IVector2]>

    public constructor(string?: string) {
        this.originalPos = new Map<GameObject, [IVector2, IVector2]>();
        this.name = string ? string : 'default';
        this.gameObject = [];
        this.camera = new Camera(this.name);
        if (!Renderer.canvas) {Renderer.initialize(this.camera);}        
        InputManager.initialize();  
    }

    public pushGameObject(object: IGameObject) {
        this.gameObject.push(object);
        let t = new Vector2(object.transform.position.x, object.transform.position.y);
        let s = new Vector2(object.transform.scale.x, object.transform.scale.y)
        this.originalPos.set(object, [t,s]);
    }
    public reset() {

        for (const object of this.gameObject) {
            const original = this.originalPos.get(object);
            if (original) {
                object.transform.position = new Vector2(original[0].x, original[0].y);
                object.transform.scale = new Vector2(original[1].x, original[1].y);
            }

            if ('reset' in object && typeof object.reset === 'function') {
                (object as any).reset();
            }
        }
    }

        
    public update(delta: number): void {
        for (var object of this.gameObject) {
            object.update(delta);
        }
    }    
    public render(delta: number): void {
        Renderer.flip();
        for (var object of this.gameObject) {
            object.render(delta, this.camera.transform.position);
        }
    }    
}
export default Scene;