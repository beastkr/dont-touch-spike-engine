import GameObject from "../game-objects/GameObject";
import ResourceManager from "../ResourceManager";
import AudioPlayer from "./AudioPlayer";

class AudioChannel extends GameObject {
    public AudioSource: HTMLAudioElement;
    public name: string;
    private cloneChannel: HTMLAudioElement[];
    private iterator: number = 0;
    public constructor(sceneKey: string, src: string, name: string){
        super(sceneKey);
        this.name = name;
        this.AudioSource = ResourceManager.soundList['/assets/sfx/' + src];
        AudioPlayer.addAudioChannel(this);
        if (this.AudioSource) {
            this.cloneChannel = new Array(2).fill(this.AudioSource.cloneNode() as HTMLAudioElement);
        }
    }

    public play() {
        this.cloneChannel[this.iterator].play();
        this.iterator = this.iterator+1 == 2? 0: this.iterator+1;
    }
    public stop() {
        if (this.AudioSource)
            this.AudioSource.pause()
    }

}
export default AudioChannel