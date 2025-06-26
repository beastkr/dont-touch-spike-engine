import Spike from './Spike'
import GameObject from '../../core/game-objects/GameObject';
import Vector2 from '../../core/components/Vector2';
import PlayerDTTS from './PlayerDTTS';
import { getRandom, getRandom2Range } from '../../core/math/Random';
import SceneManager from '../../core/game-engine/SceneManager';

class SpikePool extends GameObject {
    public spikeList: Spike[] = [];
    public isLeft: boolean = false;
    private offset: number[] = [10, 390]

    constructor(sceneKey: string, initsize: number, pos?: IVector2, scale?: IVector2) {
        super(sceneKey, pos, scale);
        this.transform.rotation = 90;
        for (var i=0; i<initsize; i++) {
            this.spikeList.push(new Spike(sceneKey, pos, new Vector2(50,50)));
        }
    }
    public length() {
        return this.spikeList.length;
    }

    public update(delta: number): void {
        let v = this.isLeft? 100:-100;
        for (var s of this.spikeList) {
            if (s.transform.position.x<this.offset[0] || s.transform.position.x>this.offset[1]){
                s.rb.velocity.x = v;
            }
            else {
                s.rb.velocity.x = 0;
                s.transform.position.x = this.isLeft? this.offset[0]: this.offset[1];
            }
            s.transform.rotation = this.transform.rotation;
            s.update(delta);
        } 
    }

    public show() {
        this.isLeft = !this.isLeft;
        this.transform.rotation = this.isLeft ? 90: -90;
        for (var s of this.spikeList) {
            s.transform.position.x = this.isLeft ? -20 : 420;
        }
        this.RandomizeY();
    }

    private RandomizeY() {
        const posList = [0, 0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i<Math.min(posList.length-1, this.spikeList.length);i++){
            posList[i] = 1;
        }
        for (var i = 0; i<posList.length; i++) {
            let n = getRandom(0, posList.length-1);
            let t = posList[i];
            posList[i] = posList[n];
            posList[n] = t;
        }
        let iterator = 0;
        let space = 0;
        for (var i = 0; i<posList.length; i++) {
            if (posList[i] == 1) {
                this.spikeList[iterator].transform.position.y = 125 + i*50;
                iterator++;
            }
        }
        
    }


    public addSpike(sceneKey: string, n: number) {
        for (var i=0; i<n; i++) {
            this.spikeList.push(new Spike(sceneKey, new Vector2(-100,-100), new Vector2(50,50)));
        }
    }

    public hide() {
        for (var s of this.spikeList) {
            s.transform.position = new Vector2(-100,-100);
        }
    }
    public entry() {
        this.reset();
    }

    public reset(): void {
        this.isLeft = false;
        this.hide();
    }

    public render(delta: number, campos?: IVector2): void {
        for (var s of this.spikeList){
            s.render(delta, SceneManager.getCurrentScene().camera.transform.position)
        }
    }
}

export default SpikePool;