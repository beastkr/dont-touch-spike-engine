import PlayerDTTS from "../PlayerDTTS";

abstract class PlayerState {
    protected player: PlayerDTTS;

    constructor(player: PlayerDTTS) {
        this.player = player;
    }

    public abstract onEnter(): void;
    public abstract onUpdate(delta: number): void;
    public abstract onExit(): void;
    public abstract onRender(delta: number, camPos?: IVector2): void;
}

export default PlayerState;
