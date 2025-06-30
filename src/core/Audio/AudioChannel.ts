import GameObject from '../game-objects/GameObject'
import ResourceManager from '../ResourceManager'
import AudioPlayer from './AudioPlayer'

class AudioChannel extends GameObject {
    public AudioSource: HTMLAudioElement
    public name: string
    private iterator: number = 0
    private playing: boolean = false
    public once: boolean = false
    public constructor(sceneKey: string, src: string, name: string) {
        super(sceneKey)
        this.name = name
        this.play
        this.AudioSource = ResourceManager.soundList['/assets/sfx/' + src]
        AudioPlayer.addAudioChannel(this)
    }

    public play() {
        if (!this.playing) {
            console.log('playing ', this.name)
            this.AudioSource.play().then(() => {
                if (!this.once) this.playing = false
            })
        }
        this.playing = true
    }
    public stop() {
        if (this.AudioSource) this.AudioSource.pause()
        this.playing = false
    }
}
export default AudioChannel
