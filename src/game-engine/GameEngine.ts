import AudioPlayer from '../Audio/AudioPlayer';
import Renderer from '../graphics/Renderer';
import InputManager from '../InputManager';
import Physics from '../physics/Physics';
import Time from '../Time/Time'
import SceneManager from './SceneManager';

class GameEngine implements IGameEngine {
    public constructor() {
        SceneManager.initialize();
        Physics.initialize();
    }
    public loop(): void {
        Time.startFrame();
        if (SceneManager.pausing) Time.deltaTime = 0;
        this.update(Time.deltaTime);
        this.render(Time.deltaTime);
        Time.endFrame();
        requestAnimationFrame(this.loop.bind(this));
    }
    public update(delta: number): void {
        SceneManager.update(delta);
    }
    public render(delta: number): void {
        SceneManager.render(delta);
    }
    public start(): void {

        Time.initialize();
        let camera = SceneManager.sceneList.get(SceneManager.activeScene)?.camera;
        
        if (camera) {
            Renderer.initialize(camera);
        }
        InputManager.initialize();
        this.loop();
    }


}

export default GameEngine;