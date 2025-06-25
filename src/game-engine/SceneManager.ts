import ColliderController from "../components/Collider/ColliderController";
import Scene from "./Scene";
import Renderer from "../graphics/Renderer";
import MenuScene from "../game/MenuScene";
import LoadingScene from "../game/LoadingScene";
import GameScene from "../game/GameScene";
import InputManager from "../InputManager";

    class SceneManager {
        static activeScene: string;
        static sceneList: Map<string, IScene>;
        static pausing: boolean = false;
        static resumable: boolean = false;
        static initialize() {
            SceneManager.sceneList = new Map<string, IScene>();
            SceneManager.sceneList.set('loading', new LoadingScene());
            SceneManager.setActive('loading');
            
        }
        static initScene(): void{
            SceneManager.sceneList.set('menu', new MenuScene());
            SceneManager.sceneList.set('game', new GameScene());

        }

        static update(delta: number): void {
            SceneManager.sceneList.get(SceneManager.activeScene)?.update(delta);
        }
        static render(delta: number): void {
            SceneManager.sceneList.get(SceneManager.activeScene)?.render(delta);
        }

        static setActive(key: string) {
            InputManager.reset();
            if (SceneManager.sceneList.has(key)) {
                ColliderController.reset(key);
                SceneManager.getCurrentScene().reset();
                SceneManager.activeScene = key;
                let camera = SceneManager.sceneList.get(key)?.camera;
                if (camera) {
                    Renderer.initialize(camera);
                }
            }

        }

        static getCurrentScene(): IScene {
            return SceneManager.sceneList.get(SceneManager.activeScene) || new Scene();
        }

        static pause() {
            console.log('pausing')
            SceneManager.pausing = true;
            SceneManager.resumable = false;
        }
        static resume() {
            console.log('resume')
            SceneManager.pausing = false;
        }
    }
    export default SceneManager;