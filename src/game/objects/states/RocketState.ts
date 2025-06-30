import PlayerState from "./PlayerState";
import Physics from "../../../core/physics/Physics";
import Force from "../../../core/physics/Force";

class RocketState extends PlayerState {
    private progress: number = 0;
    public onEnter(): void{
        this.progress = 0;
        this.player.reset();
        Physics.addforce(this.player.rb, new Force(this.player.speed.mul(5)));
    }

    public onUpdate(delta: number): void {
        this.progress+= delta;
        if (this.progress>=2) {this.player.setState('playing')}
        this.player.flagreset();
        this.player.checkBouncing();
    }

    public onExit(): void {

    }
    public onRender(delta: number, camPos?: IVector2): void {
        
    }
}

export default RocketState