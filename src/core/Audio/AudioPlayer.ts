import { JUMP_SOUND } from "../../constants/sfx";
import AudioChannel from "./AudioChannel";

class AudioPlayer {
    static channel: Map<string, AudioChannel>;
    static initialize() {
        AudioPlayer.channel = new Map<string, AudioChannel>();
    }
    static play(key: string) {
        AudioPlayer.channel.get(key)?.play();
    }
    static addAudioChannel(channel: AudioChannel) {
        AudioPlayer.channel.set(channel.name, channel);
    }


}

export default AudioPlayer;