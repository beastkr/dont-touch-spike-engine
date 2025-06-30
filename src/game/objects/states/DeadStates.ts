import Physics from "../../../core/physics/Physics";
import PlayerState from "./PlayerState";

class DeadState extends PlayerState {
    private bouncing: boolean = false;
    private progress: number = 0;
    private bounceTime: number = 0;
    public onEnter(): void{
        this.progress = 0;
        this.bouncing = false;
        this.bounceTime = 0;
    }

    public onUpdate(delta: number): void {
        this.progress+= delta;
        if (this.progress>=2) {
            this.player.setState('rescue');
        }
        this.player.transform.rotation += delta*3000;
        this.unbounce();
        this.bounce();
        if (this.player.touchGround && this.player.rb.velocity.y>=0) this.player.rb.velocity.y = 0;
        else Physics.addforce(this.player.rb, Physics.gravity);    

    }

    public onExit(): void {
        this.bouncing = false;
        this.progress = 0;
        this.player.dead = false;
        this.bounceTime = 0;
    }

    public onRender(delta: number, camPos?: IVector2): void {
        
    }

    private unbounce() {
        if (!this.player.collider.collide('spike')[1]) {
            this.bouncing = false;
        }
    }

    private bounce() {
        for (var c of this.player.collider.checkCollide()){
            if (c.layer == 'spike') {
                if (!this.bouncing && this.bounceTime<2) {
                    this.bounceTime++;
                    this.player.rb.velocity.y *= -this.bounceTime;
                    this.player.rb.velocity.x *=-this.bounceTime;
                    
                    this.bouncing = true;
                }
            }
        }
    }
}

export default DeadState;