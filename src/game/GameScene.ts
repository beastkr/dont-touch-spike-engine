import Vector2 from "../components/Vector2";
import Scene from "../game-engine/Scene";
import CollidableObject from "../game-objects/CollidableObject";
import SpriteRenderer from "../graphics/SpriteRenderer";
import PlayerDTTS from "./objects/PlayerDTTS";
import { BACKGROUND_IMAGE, PLAYER_SPRITE } from "../constants/global";
import SpikePool from "./objects/SpikePool";
import GameObject from "../game-objects/GameObject";
import ScoreManager from "./objects/ScoreManager";
import Text from "../components/ui-components/Text";
import AudioChannel from "../Audio/AudioChannel";
import { JUMP_SOUND } from "../constants/sfx";
import TileMap from "../tile/TileMap";
import StupidBird from "./objects/StupidBird";
class GameScene extends Scene {
    constructor() {
        super('game');


        let jumpAudio = new AudioChannel(this.name, JUMP_SOUND, 'jump');
        this.pushGameObject(jumpAudio);

        let bg = new GameObject(this.name, new Vector2(200,350), new Vector2(400,700));
        bg.spriterenderer = new SpriteRenderer(BACKGROUND_IMAGE);
        this.pushGameObject(bg);
        for (let i = 0; i<3; i++) {
            this.pushGameObject(new StupidBird(this.name,50 ,new Vector2(300,300), new Vector2(50,50)));  
        }
        for (let i = 0; i<3; i++) {
            this.pushGameObject(new StupidBird(this.name,100 ,new Vector2(100,100), new Vector2(100,100)));
        }


        let tile = new TileMap(this.name, [[0,0,0,0,0,0,0,0,0]], new Vector2(50,50), new Vector2(0,550-50));
        this.pushGameObject(tile);
        
        let tile2 = new TileMap(this.name, [[0,0,0,0,0,0,0,0,0]], new Vector2(50,50), new Vector2(0,0));
        tile2.transform.rotation = 180;
        this.pushGameObject(tile2)

        let format = [String(ScoreManager.score), '100px Arieal', 'white'];
        let scoreText = new Text(this.name, new Vector2(200,200), new Vector2(200,100), format);
        ScoreManager.text = scoreText;
        this.pushGameObject(scoreText);

        let wall = new CollidableObject(this.name, new Vector2(0, 350), new Vector2(5, 700));
        wall.spriterenderer = new SpriteRenderer(PLAYER_SPRITE);
        wall.collider.layer = 'wall';
        this.pushGameObject(wall);

        wall = new CollidableObject(this.name, new Vector2(400, 350), new Vector2(5, 700));
        wall.spriterenderer = new SpriteRenderer(PLAYER_SPRITE);
        wall.collider.layer = 'wall';
        this.pushGameObject(wall);    

        let player = new PlayerDTTS(this.name, new Vector2(200, 200), new Vector2(30, 30));
        let spike = new SpikePool(this.name, 6, 90, 0);
        let spike2 = new SpikePool(this.name, 6, 270, 400);

        player.spikeLeft = spike;
        player.spikeright = spike2;
        spike2.setplayer(player);
        spike.setplayer(player);
        this.pushGameObject(spike);
        this.pushGameObject(spike2);
        this.pushGameObject(player);
    }

    public override reset() {
        super.reset();

        ScoreManager.reset();
        
    }


}

export default GameScene;