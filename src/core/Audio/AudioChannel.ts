import GameObject from "../game-objects/GameObject";
import ResourceManager from "../ResourceManager";
import AudioPlayer from "./AudioPlayer";

class AudioChannel extends GameObject {
    public AudioSource: HTMLAudioElement;
    public name: string;
    public constructor(sceneKey: string, src: string, name: string){
        super(sceneKey);
        this.name = name;
        this.AudioSource = ResourceManager.soundList['/assets/sfx/' + src];
        AudioPlayer.addAudioChannel(this);
    }

    public play() {
        if (this.AudioSource) {
            const clone = this.AudioSource.cloneNode() as HTMLAudioElement;
            clone.play();
        }
    }
    public stop() {
        if (this.AudioSource)
            this.AudioSource.pause()
    }

}
export default AudioChannel