import * as PATH from '../../constants/global'
import AudioPlayer from '../../core/Audio/AudioPlayer'
import Text from '../../core/components/ui-components/Text'
import Vector2 from '../../core/components/Vector2'
import Scene from '../../core/game-engine/Scene'
import SceneManager from '../../core/game-engine/SceneManager'
import Renderer from '../../core/graphics/Renderer'
import ResourceManager from '../../core/ResourceManager'
import TileSet from '../../core/tile/TileSet'
import ScoreManager from '../objects/ScoreManager'

class LoadingScene extends Scene {
    private resources: string[]
    private doneLoading: boolean = false
    private safeprogress: number = 0
    private nextScene: string = 'menu'

    private progressbar: Text
    constructor() {
        super('loading')

        this.progressbar = new Text(this.name, new Vector2(200, 275), new Vector2(), [
            'sss',
            '50px Ariel',
            'white',
        ])
    }

    public async entry(sceneKey?: string) {
        this.doneLoading = false
        let preloadimg = SceneManager.sceneList.get(sceneKey ?? 'menu')?.preloadimg
        let preloadsfx = SceneManager.sceneList.get(sceneKey ?? 'menu')?.preloadsfx
        this.nextScene = sceneKey ?? 'menu'
        this.resources = preloadimg ?? []
        ResourceManager.addtolist(this.resources)
        ResourceManager.loadImages(this.resources)
            .then(() => {
                ResourceManager.loadFont()
                TileSet.initialize()
                TileSet.addToTileSet(PATH.BUTTON_SPRITE)
                this.resources = preloadsfx ?? []
                ResourceManager.loadSounds(this.resources)
                    .then(() => {
                        AudioPlayer.initialize()
                        if (!SceneManager.sceneList.get(this.nextScene)?.created) {
                            SceneManager.sceneList.get(this.nextScene)?.create()
                        }
                        this.doneLoading = true
                    })
                    .catch((error) => {
                        console.error('Error loading resources:', error)
                    })
            })
            .catch((error) => {
                console.error('Error loading resources:', error)
            })
    }

    public update(delta: number): void {
        this.safeprogress = this.safeprogress < 0.5 ? this.safeprogress + delta : 0.5
        this.progressbar.text[0] = String(Math.floor((this.safeprogress / 0.5) * 100)) + '%'
        if (this.doneLoading && this.safeprogress >= 0.5) {
            SceneManager.setActive(this.nextScene)
            ScoreManager.initialize()
        }
    }

    public render(delta: number): void {
        super.render(delta)
        Renderer.fillBlack()
        this.progressbar.render(delta, this.camera.transform.position)
    }

    public reset(): void {
        this.safeprogress = 0
    }
}

export default LoadingScene
