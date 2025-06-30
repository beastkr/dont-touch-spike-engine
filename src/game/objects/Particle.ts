import Vector2 from '../../core/components/Vector2'
import GameObject from '../../core/game-objects/GameObject'
import Observer from './observer/Observer'
import PlayerDTTS from './PlayerDTTS'

class Particle extends GameObject {
    public num: number
    public list: GameObject[]
    private emitting = false
    private elapse = 0
    private progress = 2
    private playerPos: PlayerDTTS
    private key = ''
    constructor(sceneKey: string, playerPos: PlayerDTTS) {
        super(sceneKey)
        this.list = []
        this.playerPos = playerPos
        this.key = sceneKey
        Observer.attach('jump', 'emitParticle', () => {
            this.emitParticle(sceneKey, playerPos, 0)
        })
    }
    public update(delta: number): void {
        this.elapse += delta

        if (this.progress <= 0.5) {
            this.progress += delta
        }

        if (this.progress >= 0.5 && this.emitting) {
            this.emitting = false
        }
        if (this.list[0]?.transform.scale.x === 0.1) {
            this.list.shift()
        }

        this.shrink(delta)
        if (this.emitting && this.elapse >= 0.1) {
            this.emit(this.key, this.playerPos.transform.position, 0)
            this.elapse = 0
        }
    }

    public emitParticle(sceneKey: string, player: PlayerDTTS, time: number) {
        if (this.progress <= 3) {
            this.emitting = true
            this.progress = 0
        }
    }

    public emit(sceneKey: string, player: IVector2, time: number) {
        var x = player.x
        var y = player.y
        let t = new GameObject(sceneKey, new Vector2(x, y), new Vector2(20, 20))
        t.spriterenderer.color = [255, 255, 255, 1]
        this.list.push(t)
    }
    private shrink(delta: number) {
        for (var p of this.list) {
            p.transform.scale.x =
                p.transform.scale.x - 40 * delta > 0 ? p.transform.scale.x - 40 * delta : 0.1
        }
    }

    public reset() {
        this.list = []
        this.emitting = false
        this.progress = 0
    }

    public render(delta: number, campos?: IVector2): void {
        for (var p of this.list) {
            p.render(delta, campos)
        }
    }
}
export default Particle
