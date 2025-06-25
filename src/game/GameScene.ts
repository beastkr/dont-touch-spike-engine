import Vector2 from "../core/components/Vector2";
import Scene from "../core/game-engine/Scene";
import CollidableObject from "../core/game-objects/CollidableObject";
import SpriteRenderer from "../core/graphics/SpriteRenderer";
import PlayerDTTS from "./objects/PlayerDTTS";
import { BACKGROUND_IMAGE, PLAYER_SPRITE } from "../constants/global";
import SpikePool from "./objects/SpikePool";
import ScoreManager from "./objects/ScoreManager";
import Physics from "../core/physics/Physics";
import TileMap from "../core/tile/TileMap";
import SceneManager from "../core/game-engine/SceneManager";

class GameScene extends Scene {
    public player: PlayerDTTS;
    public spikePool: SpikePool;
    constructor() {
        super('game');
        this.player = new PlayerDTTS(this.name, new Vector2(100,100), new Vector2(30,30));
        this.spikePool = new SpikePool(this.name);
        this.addWall();
    }

    public entry() {
        this.player.entry();
    }

    public override update(delta: number) {
        super.update(delta);
        this.player.update(delta);
        if (this.player.dead) {
            SceneManager.setActive('menu');
        }
    }

    public override reset() {
        super.reset();

        this.player.reset();
    }


    private addWall() {
        let wall = new CollidableObject(this.name, new Vector2(0, 350), new Vector2(5, 700));
        wall.spriterenderer = new SpriteRenderer(PLAYER_SPRITE);
        wall.collider.layer = 'wall';
        this.pushGameObject(wall);

        wall = new CollidableObject(this.name, new Vector2(400, 350), new Vector2(5, 700));
        wall.spriterenderer = new SpriteRenderer(PLAYER_SPRITE);
        wall.collider.layer = 'wall';
        this.pushGameObject(wall);   

        let tile = new TileMap(this.name, [[0,0,0,0,0,0,0,0,0]], new Vector2(50,50), new Vector2(0,550-50));
        this.pushGameObject(tile);
        
        let tile2 = new TileMap(this.name, [[0,0,0,0,0,0,0,0,0]], new Vector2(50,50), new Vector2(0,0));
        tile2.transform.rotation = 180;
        this.pushGameObject(tile2)  
    }

    public override render(delta: number): void {
        super.render(delta);
        this.player.render(delta, this.camera.transform.position);
        this.spikePool.render(delta, this.camera.transform.position);

    }

    public createWall() {

    }


}

export default GameScene;