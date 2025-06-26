import Camera from "../graphics/Camera";
import InputManager from "../InputManager";
import Button from "../components/ui-components/Button";
import ColliderController from "../components/Collider/ColliderController";
import Vector2 from "../components/Vector2";
import ResourceManager from "../ResourceManager";
import Cursor from "../components/ui-components/Cursor";
import Renderer from "../graphics/Renderer";
import GameObject from "../game-objects/GameObject";
import { CAMERA_POSITION } from "../../constants/graphic";
import Transform from "../components/Transform";
import SceneManager from "./SceneManager";


class Scene implements IScene{
    public name: string;
    public gameObject: IGameObject[];
    public camera: ICamera;
    public preloadimg: string[] = [];
    public preloadsfx: string[]= [];

    public created: boolean= false;
    public constructor(string?: string) {
        this.name = string ? string : 'default';
        this.gameObject = [];
        this.camera = new Camera(this.name, CAMERA_POSITION);
        if (!Renderer.canvas) {Renderer.initialize(this.camera);}
    }

    public create() {
        this.created = true;
    }
    public pushGameObject(object: IGameObject) {
        this.gameObject.push(object);
        let t = new Vector2(object.transform.position.x, object.transform.position.y);
        let s = new Vector2(object.transform.scale.x, object.transform.scale.y);
        object.originalTransform = new Transform(t,s);
        object.originalTransform.rotation = object.transform.rotation;
    }
    public reset() {
        for (const object of this.gameObject) {
            object.reset();
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
    public pause() {
        if (SceneManager.pausing) {
            Renderer.pause();
        }
    }

    public entry() {
    }
}
export default Scene;