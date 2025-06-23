
type Color = [number, number, number, number];


interface IGameEngine {
    loop(): void;
    update(delta: number): void;
    render(delta: number): void;
    start();            
}

interface ISceneManager {
    activeScene: string;
    sceneList: Map<string, IScene>;
    update(delta: number): void;
    render(delta: number): void;
}

interface IScene {
    name: string;
    camera: ICamera;
    originalPos: Map<IGameObject, [IVector2, IVector2]>;
    gameObject: IGameObject[];
    update(delta:number): void;
    render(delta: number): void;
    reset(): void;
}

interface ITime {
}

interface IGameObject {
    transform: ITransform;
    spriterenderer: ISpriteRenderder;
    update(delta:number): void;
    render(delta:number, campos?: IVector2): void;
}
interface ICollidableGameObject extends IGameObject{
    collider: ICollider;
}

interface IAnimatedGameObject extends IGameObject {
    spriterenderer: ISpriteRenderder;
    animator: IAnimator;
}

interface IComponent {

}
interface ITransform extends IComponent{
    position: IVector2;
    rotation: number;
    scale: IVector2;
    flip: IVector2;
}
interface IVector2 extends IComponent{
    x: number;
    y: number;
    squaredistance(other: IVector2): number;
}
interface ICollider extends IComponent{
    position: IVector2;
    scale: IVector2;
    layer: string;
    collide(target: string): [Collider, boolean];
    checkCollide(): ICollider[]
    drawDebug(ctx?: CanvasRenderingContext2D | null): void;
}
interface IBoxCollider extends ICollider{}
interface ICircleCollider extends ICollider{}

interface ICamera {
    transform: ITransform;
}

interface ISpriteRenderder extends IComponent{
    color: Color;
    rotation: number;
    ctx: CanvasRenderingContext2D | null;
    flipvector: IVector2;
    imgpath: string;
    image: HTMLImageElement
    ctx: CanvasRenderingContext2D | null;
    render(pos: Vector2, scale: Vector2, campos: Vector2, frameRect?: [number, number, number, number]): void;
    rgb(): string;
    flipimage(flipvector: IVector2): void;
    rotate(degree: number): void;
}

interface IAnimator extends IComponent {
    getCurrentFrameRect(): [number, number, number, number] | undefined;
    loadAnim(spritesheet: boolean, source: string | string[], frameWidth?: number, frameHeight?: number): void;
    play(delta: number): void;
    stop(): void;
}

interface IButton extends IGameObject {}
