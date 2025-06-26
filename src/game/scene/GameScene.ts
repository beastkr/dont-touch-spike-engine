import Vector2 from "../../core/components/Vector2";
import Scene from "../../core/game-engine/Scene";
import CollidableObject from "../../core/game-objects/CollidableObject";
import SpriteRenderer from "../../core/graphics/SpriteRenderer";
import PlayerDTTS from "../objects/PlayerDTTS";
import { PLAYER_SPRITE, BACKGROUND_IMAGE, SPIKE_UP, BIRD_SPRITE, BUTTON_SPRITE } from "../../constants/global";
import SpikePool from "../objects/SpikePool";
import TileMap from "../../core/tile/TileMap";
import SceneManager from "../../core/game-engine/SceneManager";
import Text from "../../core/components/ui-components/Text";
import StupidBird from "../objects/StupidBird";
import GameObject from "../../core/game-objects/GameObject";
import ScoreManager from "../objects/ScoreManager";
import { JUMP_SOUND } from "../../constants/sfx";
import AudioChannel from "../../core/Audio/AudioChannel";
import Particle from "../objects/Particle";
import Time from "../../core/Time/Time";

class GameScene extends Scene {
    public player: PlayerDTTS;
    public spikePool: SpikePool;
    public score: number;
    private scoreText: Text;
    private jumpsound: AudioChannel;
    private particle: Particle;
    
    constructor() {
        super('game');
        this.preloadimg = [PLAYER_SPRITE, BACKGROUND_IMAGE, SPIKE_UP, BIRD_SPRITE, BUTTON_SPRITE];
        this.preloadsfx = [JUMP_SOUND]
    }
    public create() {
        this.created = true;
        this.createAudioChannel();
        this.score = 0;
        this.addBG();
        this.addScoreText();
        this.player = new PlayerDTTS(this.name, new Vector2(100,100), new Vector2(30,30));
        this.spikePool = new SpikePool(this.name, 1);
        this.particle = new Particle(this.name, this.player);
        this.addWall();
        this.addFloor();
    }

    private createAudioChannel() {
        this.jumpsound = new AudioChannel(this.name, JUMP_SOUND, 'jump')
    }

    public entry() {
        this.player.entry();
        this.spikePool.entry();
        this.score = 0;
    }

    public override update(delta: number) {
        if (!this.created) return;
        super.update(delta);
        this.player.update(delta);
        this.particle.update(delta)

        this.spikePool.update(delta);
        this.scoreText.text[0] = String(this.score);
        if (this.player.dead) {
            this.GameOver();
        }
        if (this.player.touchWall) {
            this.increase();
        }
        if (this.player.jumping) {
            this.particle.emitParticle(this.name, this.player, 0);
        }
        if (SceneManager.pausing) return;
    }


    private GameOver() {
        ScoreManager.setScore(this.score);     
        SceneManager.setActive('menu');
    }

    public override reset() {
        super.reset();

        this.player.reset();
        this.spikePool.reset();
        this.particle.reset();
   }

    private increase() {
        this.jumpsound.play();
        if (this.score%10==5 && this.spikePool.length()<7) {
            this.spikePool.addSpike(this.name);
        }
        this.spikePool.show();
        this.score++;
        if (this.score>ScoreManager.highscore) {
            ScoreManager.setHighScore(this.score);
        }

    }



    private addWall() {
        let wall = new CollidableObject(this.name, new Vector2(0, 350), new Vector2(5, 700));
        wall.spriterenderer = new SpriteRenderer(BUTTON_SPRITE);
        wall.collider.layer = 'wall';
        this.pushGameObject(wall);

        wall = new CollidableObject(this.name, new Vector2(400, 350), new Vector2(5, 700));
        wall.spriterenderer = new SpriteRenderer(BUTTON_SPRITE);
        wall.collider.layer = 'wall';
        this.pushGameObject(wall);   

 
    }

    public addFloor() {
        let tile = new TileMap(this.name, [[0,0,0,0,0,0,0,0,0]], new Vector2(50,50), new Vector2(0,520));
        this.pushGameObject(tile);
        
        let tile2 = new TileMap(this.name, [[0,0,0,0,0,0,0,0,0]], new Vector2(50,50), new Vector2(0, -20));
        tile2.transform.rotation = 180;
        this.pushGameObject(tile2) 
    }

    public override render(delta: number): void {
        if (!this.created) return;
        super.render(delta);
        let camPos = this.camera.transform.position;
        this.scoreText.render(delta, camPos);
        this.particle.render(delta, camPos);
        this.player.render(delta, camPos);
        this.spikePool.render(delta, camPos);
        this.pause();

    }

    private addScoreText() {
        let format = [String(this.score), '100px Arieal', 'white'];
        this.scoreText = new Text(this.name, new Vector2(200,200), new Vector2(200,100), format);
    }
    
    private addBG(){

        let bg = new GameObject(this.name, new Vector2(200,350), new Vector2(400,700));
        bg.spriterenderer = new SpriteRenderer(BACKGROUND_IMAGE);
        this.pushGameObject(bg);
        this.addBird(2,50,50);
        this.addBird(1,100,100);



    }

    private addBird(n: number, size: number, speed: number) {
        for (let i = 0; i<n; i++) {
            this.pushGameObject(new StupidBird(this.name, speed ,new Vector2(100,100), new Vector2(size,size)));
        }
    }


}

export default GameScene;