import { CAMERA_SCALE } from '../../constants/graphic'
import GameObject from '../game-objects/GameObject'
class Camera extends GameObject implements ICamera {
    public constructor(sceneKey: string, campos?: IVector2) {
        super(sceneKey, campos)
        this.transform.scale = CAMERA_SCALE
    }
}

export default Camera
