import GameObject from "../../game-objects/GameObject";

class Text extends GameObject {
    public text: string[];
    constructor(sceneKey: string, pos?: IVector2, scale?: IVector2, format?: string[]){
        super(sceneKey,pos,scale);
        this.text = format ?? [];
        this.spriterenderer.color = [0,0,0,0]
    }

    public override render(delta: number, campos?: IVector2){
        super.render(delta, campos);
        const ctx = this.spriterenderer.ctx;
        if (!ctx) return;
        let pos = this.transform.position;
        ctx.font = this.text[1];
        ctx.fillStyle = this.text[2];
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.fillText(this.text[0], pos.x, pos.y);
    }
    public update(delta: number) {

    }

}

export default Text;