import Spike from './Spike'
import GameObject from '../../game-objects/GameObject';
import Vector2 from '../../components/Vector2';
import PlayerDTTS from './PlayerDTTS';

class SpikePool extends GameObject {
    private spikelist: Spike[];
    private player: PlayerDTTS;
    private marginPos: number;
    private isLeft: boolean = false;    

    public constructor(sceneKey: string, size: number, direction: number, marginPos: number) {
        
        super(sceneKey);
        if (direction == 90) this.isLeft = true;
        this.marginPos = marginPos;
        this.spikelist = []
        for (let i = 0; i < size; i++) {
            let spike = new Spike(sceneKey ,new Vector2(-100, -100), new Vector2(50,50));
            spike.transform.rotation = direction;
            this.spikelist.push(spike);
        }
    } 

    public hide() {
        for (let spike of this.spikelist) {
            if (this.player.facingLeft == this.isLeft) spike.transform.position = new Vector2(-100, -100);
        }
    }

public expose() {
    const offset = this.isLeft ? 15 : -15;

    // If player is already facing this side, hide instead
    if (this.player.facingLeft === this.isLeft) {
        this.hide();
        return;
    }

    const maxRetries = 3; // Try avoiding overlap max 3 times
    for (const spike of this.spikelist) {
        let attempts = 0;
        let r: number;
        let success = false;

        while (attempts < maxRetries && !success) {
            r = this.getRandom(50, 500);
            spike.transform.position = new Vector2(this.marginPos + offset, r);

            const [, isColliding] = spike.collider.collide('spike');
            if (!isColliding) {
                success = true;
            }

            attempts++;
        }

        if (!success) {
            console.warn('Spike placement failed after retries.');
        }
    }
}

    public update(delta: number) {
        for (let spike of this.spikelist) {
            spike.update(delta);
        }
    }

    public render(delta: number, campos: Vector2) {
        for (let spike of this.spikelist) {
            spike.render(delta, campos);
            const canvas = document.querySelector('canvas')!;
            const ctx = canvas.getContext('2d');
        }
    }
    
    public setplayer(player: PlayerDTTS) {
        this.player = player;
    }

    public reset() {
        for (let spike of this.spikelist) {
            spike.transform.position = new Vector2(-100, -100);
        }        
    }
    
    public getRandom(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
        
    }

}

export default SpikePool;