import GameObject from "../game-objects/GameObject";
import Vector2 from "../components/Vector2";
class Camera extends GameObject implements ICamera{
    public constructor(sceneKey: string) {
        super(sceneKey);
        this.transform.scale = new Vector2(400, 700);
        
    }
}   

export default Camera;