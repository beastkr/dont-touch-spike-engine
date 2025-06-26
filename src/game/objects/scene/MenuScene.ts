import Scene from "../../../core/game-engine/Scene";
import Camera from "../../../core/graphics/Camera";
import Renderer from "../../../core/graphics/Renderer";
import Button from "../../../core/components/ui-components/Button";
import Cursor from "../../../core/components/ui-components/Cursor";
import Vector2 from "../../../core/components/Vector2";
import ColliderController from "../../../core/components/Collider/ColliderController";
import SceneManager from "../../../core/game-engine/SceneManager";
import GameObject from "../../../core/game-objects/GameObject";
import SpriteRenderer from "../../../core/graphics/SpriteRenderer";
import { BACKGROUND_IMAGE, BUTTON_SPRITE } from "../../../constants/global";
import ScoreManager from "../ScoreManager";
import Text from "../../../core/components/ui-components/Text";
class MenuScene extends Scene {
    private scoreText: Text;
    private prevScoreText: Text;
    constructor() {
        super('menu');
        this.preloadimg=[BACKGROUND_IMAGE, BUTTON_SPRITE];
    }

    public override update(delta: number): void {
        super.update(delta);
    }

    public create(): void {
        this.created = true;
        let bg = new GameObject(this.name, new Vector2(200,350), new Vector2(400,700));
        bg.spriterenderer = new SpriteRenderer(BACKGROUND_IMAGE);
        this.pushGameObject(bg);
        this.addUI();


    }

    public addUI() {
        let format = ['DON\'T TOUCH\nTHE SPIKE', '30px Times New Roman', 'white'];
        let gameName = new Text(this.name, new Vector2(200, 100), new Vector2(), format);
        this.pushGameObject(gameName);

        this.addScoreText();

        let button = new Button(this.name, new Vector2(200, 400), new Vector2(200, 100));
        button.setText('Start Game');
        button.text.text[1] = '40px Times New Roman';
        button.text.text[2] = 'white'
        button.addonclick(() => {
            SceneManager.setActive('game');
        });
        this.pushGameObject(button);
        this.pushGameObject(new Cursor(this.name, new Vector2(0,0), new Vector2(20,20)));
    }

    public override render(delta: number): void {
        super.render(delta);
        if (this.created) {
            let camPos = this.camera.transform.position;
            this.scoreText.render(delta, camPos);
            this.prevScoreText.render(delta, camPos);            
        }

    }
    public entry() {
        ScoreManager.initialize();
        let highscore = ScoreManager.highscore;
        this.scoreText.text[0] = "Highscore: "+String(highscore);
        this.prevScoreText.text[0] = "Score: " + String(ScoreManager.score)
    }
    private addScoreText() {
        this.scoreText = new Text(this.name, new Vector2(200,200), new Vector2(), ['', '30px Ariel', 'white']);
        this.prevScoreText = new Text(this.name, new Vector2(200,230), new Vector2(), ['', '30px Ariel', 'white']);
    }


}
export default MenuScene