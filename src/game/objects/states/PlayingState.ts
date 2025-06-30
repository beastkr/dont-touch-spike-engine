import PlayerState from "./PlayerState";
import Physics from "../../../core/physics/Physics";
import Force from "../../../core/physics/Force";
import Observer from "../observer/Observer";

class PlayingState extends PlayerState {
    public onEnter(): void{
        this.player.reset();
        Physics.addforce(this.player.rb, new Force(this.player.speed));
    }

    public onUpdate(delta: number): void {
        this.player.flagreset();
        this.player.checkAllCollider();
        this.player.checkBouncing();
        this.player.jump();
        Physics.addforce(this.player.rb, Physics.gravity);

    }

    public onExit(): void {

    }
    public onRender(delta: number, camPos?: IVector2): void {
        
    }
}

export default PlayingState;