import Scene from "../game-engine/Scene";
import ResourceManager from "../ResourceManager";
import * as PATH from '../constants/global'
import SceneManager from "../game-engine/SceneManager";

class LoadingScene extends Scene {
    private resources: string[];
    constructor() {
        super('loading');
        this.resources = Object.values(PATH);
        ResourceManager.addtolist(this.resources);
        ResourceManager.loadImages(this.resources).then(() => {
            console.log('All resources loaded');
            SceneManager.initScene();
            SceneManager.setActive('menu');
        }).catch((error) => {
            console.error('Error loading resources:', error);
        });
    }


}

export default LoadingScene;