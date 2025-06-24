import Spike from "../game/objects/Spike";
import Tile from "./Tile";

class SpikeTile extends Tile {
    spike: Spike;
    public constructor(sceneKey: string, id: number, pos?: IVector2, scale?: IVector2){
        super(sceneKey, id, pos, scale);
        this.id = id;
        this.spriterenderer.color = [0,0,0,0];
        this.spike = new Spike(sceneKey, pos, scale)
        this.spike.collider.scale.x = this.transform.scale.x/2;
        this.spike.collider.scale.y = this.transform.scale.y;

    }
    public render(delta:number, campos?:IVector2) {
        this.spike.render(delta, campos)
    } 
    public override update(delta: number): void {
        this.spike.transform.rotation = this.transform.rotation;
        this.spike.update(delta);
    }
}

export default SpikeTile;