import GameObject from '../../game-objects/GameObject';
import BoxCollider from '../Collider/BoxCollider';
import InputManager from '../../InputManager';
import SpriteRenderer from '../../graphics/SpriteRenderer';
import Text from './Text';
class Button extends GameObject implements IButton, ICollidableGameObject {
    public collider: ICollider;
    public text: Text;
    private hovered: boolean;
    public textOnly: boolean;
    private onclickcallbacks: (() => void)[];
    public constructor(sceneKey:string, pos?: IVector2, scale?: IVector2) {
        super(sceneKey, pos, scale);
        this.spriterenderer = new SpriteRenderer('button.png');
        this.onclickcallbacks = [];
        this.text = new Text(sceneKey, pos, scale);
        this.text.text = ['Button', '20px Arieal', 'red'];
        if (pos && scale) {
            this.collider = new BoxCollider(sceneKey, pos, scale);
        }
        else this.collider = new BoxCollider(sceneKey);
        this.collider.layer = 'button';

    }

    public override update(delta: number) {
        super.update(delta);
        this.hovered = this.collider.collide('cursor')[1];
        if (this.hovered) {
            this.onhover();
        }
        if (InputManager.mousepos) {
            if (this.hovered && InputManager.mousepos[2]!=0 && InputManager.mousepos[3]!=0) {
                InputManager.mousepos[2] = 0;
                InputManager.mousepos[3] = 0;
                this.onclicked();
            }
        }
    }
    public override render(delta: number, campos?: IVector2) {
        super.render(delta, campos); 
        const ctx = this.spriterenderer.ctx;
        if (!ctx) return;

        const pos = this.transform.position;

        this.text.render(delta, campos);
        this.collider.drawDebug(ctx);
        
    }


    public onclicked() {
        console.log('clicked');
        for (const callback of this.onclickcallbacks) {
            callback();
        }
    }


    public addonclick(callback: () => void) {
        this.onclickcallbacks.push(callback);
    }
    public setText(text:string) {
        this.text.text[0] = text;
    }
    private onhover() {
        
    }
}

export default Button

