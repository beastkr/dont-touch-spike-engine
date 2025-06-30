import Scene from "../../core/game-engine/Scene";
import Button from "../../core/components/ui-components/Button";
import Cursor from "../../core/components/ui-components/Cursor";
import Vector2 from "../../core/components/Vector2";
import SceneManager from "../../core/game-engine/SceneManager";
import GameObject from "../../core/game-objects/GameObject";
import SpriteRenderer from "../../core/graphics/SpriteRenderer";
import { BACKGROUND_IMAGE, BUTTON_SPRITE, LOGO } from "../../constants/global";
import ScoreManager from "../objects/ScoreManager";
import Text from "../../core/components/ui-components/Text";
import { BGM } from "../../constants/sfx";

class MenuScene extends Scene {
    private scoreText: Text;
    private prevScoreText: Text;
    constructor() {
        super('menu');
        this.preloadimg=[BACKGROUND_IMAGE, BUTTON_SPRITE, LOGO];
        this.preloadsfx = [BGM]
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
        let gameName = new GameObject(this.name, new Vector2(200,100), new Vector2(380,150));
        gameName.spriterenderer = new SpriteRenderer(LOGO);
        this.pushGameObject(gameName);

        this.addScoreText();

        let button = new Button(this.name, new Vector2(200, 400), new Vector2(200, 100));
        button.setText('Start Game');
        button.text.text[1] = "15px PressStart";
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
        this.resetCursor();
    }

    private resetCursor() {
        for (var g of this.gameObject) {
            if (g instanceof Cursor) {
                g = new Cursor(this.name, new Vector2(0,0), new Vector2(20,20));
            }
        }
    }

    private addScoreText() {
        this.scoreText = new Text(this.name, new Vector2(200,200), new Vector2(), ['', '20px PressStart', 'white']);
        this.prevScoreText = new Text(this.name, new Vector2(200,230), new Vector2(), ['', '20px PressStart', 'white']);
    }


}
export default MenuScene