import GameScene from '../../game/scene/GameScene'
import LoadingScene from '../../game/scene/LoadingScene'
import MenuScene from '../../game/scene/MenuScene'
import Scene from './Scene'

class SceneManager {
    static activeScene: string
    static sceneList: Map<string, IScene>
    static pausing: boolean = false
    static resumable: boolean = false

    static initialize() {
        SceneManager.sceneList = new Map<string, IScene>()
        SceneManager.initScene()
        SceneManager.sceneList.set('loading', new LoadingScene())
        SceneManager.setActive('menu')
    }
    static initScene(): void {
        SceneManager.sceneList.set('menu', new MenuScene())
        SceneManager.sceneList.set('game', new GameScene())
    }

    static update(delta: number): void {
        SceneManager.sceneList.get(SceneManager.activeScene)?.update(delta)
    }
    static render(delta: number): void {
        SceneManager.sceneList.get(SceneManager.activeScene)?.render(delta)
    }

    static setActive(key: string) {
        if (this.getCurrentScene().name == 'loading' || this.sceneList.get(key)?.created) {
            this.getCurrentScene().reset()
            this.activeScene = key
            this.getCurrentScene().entry()
            return
        }
        this.getCurrentScene().reset()
        this.activeScene = 'loading'
        let loading = this.getCurrentScene()
        if (loading instanceof LoadingScene) {
            loading.entry(key).then(() => {})
        }
    }

    static getCurrentScene(): IScene {
        return SceneManager.sceneList.get(SceneManager.activeScene) || new Scene()
    }

    static pause() {
        console.log('pausing')
        SceneManager.pausing = true
        SceneManager.resumable = false
    }
    static resume() {
        console.log('resume')
        SceneManager.pausing = false
    }
}
export default SceneManager
