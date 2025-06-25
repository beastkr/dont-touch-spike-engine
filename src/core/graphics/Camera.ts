import GameObject from "../game-objects/GameObject";
import Vector2 from "../components/Vector2";
import { CAMERA_SCALE } from "../../constants/graphic";
class Camera extends GameObject implements ICamera{
    public constructor(sceneKey: string, campos?: IVector2) {
        super(sceneKey, campos);
        this.transform.scale = CAMERA_SCALE;
        
    }
}   

export default Camera;