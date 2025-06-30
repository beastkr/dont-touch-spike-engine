import { BGM } from '../../constants/sfx'
import AudioChannel from './AudioChannel'

class AudioPlayer {
    static channel: Map<string, AudioChannel>
    static initialize() {
        AudioPlayer.channel = new Map<string, AudioChannel>()
        const bgm = new AudioChannel('global', BGM, 'bgm')
        bgm.once = true
        bgm.AudioSource.loop = true
        bgm.AudioSource.volume = 0.3
    }
    static play(key: string) {
        console.log(this.channel)
        AudioPlayer.channel.get(key)?.play()
    }
    static addAudioChannel(channel: AudioChannel) {
        AudioPlayer.channel.set(channel.name, channel)
    }
    static stop(key: string) {
        AudioPlayer.channel.get(key)?.stop()
    }
}

export default AudioPlayer
