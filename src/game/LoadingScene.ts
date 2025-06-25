import Scene from "../core/game-engine/Scene";
import ResourceManager from "../core/ResourceManager";
import * as PATH from '../constants/global'
import * as SFX_PATH from '../constants/sfx'
import SceneManager from "../core/game-engine/SceneManager";
import AudioPlayer from "../core/Audio/AudioPlayer";
import ScoreManager from "./objects/ScoreManager";
import TileSet from "../core/tile/TileSet";
import GameObject from "../core/game-objects/GameObject";
import AnimatedGameObject from "../core/game-objects/AnimatedGameObject";
import Vector2 from "../core/components/Vector2";
import Text from "../core/components/ui-components/Text";

class LoadingScene extends Scene {
    private resources: string[];
    private doneLoading: boolean = false;
    private safeprogress: number = 0;

    private progressbar: Text;
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
                this.doneLoading = true;
                
                                    


            }).catch((error)=>{
                console.error('Error loading resources:', error);
            });            
        }).catch((error) => {
            console.error('Error loading resources:', error);
        });
        this.progressbar = new Text(this.name, new Vector2(200,275), new Vector2(), ['sss', '50px Ariel', 'black'])

    }

    public update(delta: number): void {
        this.safeprogress = this.safeprogress < 2 ? this.safeprogress+delta : 2;
        this.progressbar.text[0] = String(Math.floor(this.safeprogress / 2 * 100)) + '/100';
        if (this.doneLoading&&this.safeprogress>=2) {
            SceneManager.setActive('menu');
            ScoreManager.initialize();
        }
    }
    public render(delta: number): void {
        super.render(delta);
        this.progressbar.render(delta, this.camera.transform.position);
    }

    public reset(): void {
        this.safeprogress = 0;
    }

}

export default LoadingScene;