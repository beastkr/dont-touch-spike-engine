import Scene from "../game-engine/Scene";
import ResourceManager from "../ResourceManager";
import * as PATH from '../constants/global'
import * as SFX_PATH from '../constants/sfx'
import SceneManager from "../game-engine/SceneManager";
import AudioPlayer from "../Audio/AudioPlayer";
import ScoreManager from "./objects/ScoreManager";
import TileSet from "../tile/TileSet";

class LoadingScene extends Scene {
    private resources: string[];
    constructor() {
        super('loading');


        this.resources = Object.values(PATH);
        ResourceManager.addtolist(this.resources);
        ResourceManager.loadImages(this.resources).then(() => {
            TileSet.initialize();
            TileSet.addToTileSet(PATH.BUTTON_SPRITE);
            this.resources = Object.values(SFX_PATH);
            ResourceManager.loadSounds(this.resources).then(()=>{
                AudioPlayer.initialize();
                SceneManager.initScene();
                SceneManager.setActive('menu');
                ScoreManager.initialize();

            }).catch((error)=>{
                console.error('Error loading resources:', error);
            });            
        }).catch((error) => {
            console.error('Error loading resources:', error);
        });
    }

}

export default LoadingScene;