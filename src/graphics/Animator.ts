import SpriteRenderer from './SpriteRenderer'
import Component from '../components/Component';
import ResourceManager from '../ResourceManager'

class Animator extends Component implements IAnimator{
    public animation: string[];
    private sprite: SpriteRenderer;
    private fps: number = 4;
    private currentindex = 0;
    private safeprogress: number = 0;
    private starttime: number = 0;
    private interval: number;
    private spritesheet: boolean = false;
    private frameWidth: number = 0;
    private frameHeight: number = 0;
    private numFrames: number = 0;


    public constructor(sprite: SpriteRenderer) {
        super();
        this.animation = [];
        this.sprite = sprite;
        this.interval = 1000/this.fps;
    }
    public loadAnim(spritesheet: boolean, source: string | string[], frameWidth?: number, frameHeight?: number) {
        this.spritesheet = spritesheet;

        if (spritesheet && typeof source === 'string' && frameWidth && frameHeight) {
            this.sprite.image = ResourceManager.imagelist['/assets/images/'+source];
            this.frameWidth = frameWidth;
            this.frameHeight = frameHeight;
            this.numFrames = Math.floor(this.sprite.image.width / frameWidth);
        } else if (!spritesheet && Array.isArray(source)) {
            this.animation = source.map(anim => '../../assets/images/' + anim);
        }
    }


    public play(delta: number) {
        if (this.fps === 0) return;

        if (this.starttime === 0) {
            this.starttime = performance.now();
        }

        let safeholder = Math.floor((performance.now() % 1000) / this.interval);
        if (safeholder === this.safeprogress) return;

        this.safeprogress = safeholder;
        this.currentindex = (this.currentindex + 1) % (this.spritesheet ? this.numFrames : this.animation.length);

        if (!this.spritesheet) {
            this.sprite.image.src = this.animation[this.currentindex];
        }
    }

    public getCurrentFrameRect(): [number, number, number, number] | undefined {
        if (!this.spritesheet) return undefined;
        return [this.currentindex * this.frameWidth, 0, this.frameWidth, this.frameHeight];
    }

    public stop() {
        this.fps = 0;
    }

    public continue() {
        this.fps = 4;
    }

}
export default Animator;