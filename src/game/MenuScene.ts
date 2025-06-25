import Scene from "../core/game-engine/Scene";
import Camera from "../core/graphics/Camera";
import Renderer from "../core/graphics/Renderer";
import Button from "../core/components/ui-components/Button";
import Cursor from "../core/components/ui-components/Cursor";
import Vector2 from "../core/components/Vector2";
import ColliderController from "../core/components/Collider/ColliderController";
import SceneManager from "../core/game-engine/SceneManager";
import GameObject from "../core/game-objects/GameObject";
import SpriteRenderer from "../core/graphics/SpriteRenderer";
import { BACKGROUND_IMAGE } from "../constants/global";
import ScoreManager from "./objects/ScoreManager";
import Text from "../core/components/ui-components/Text";
class MenuScene extends Scene {
    constructor() {

        super('menu');
        let bg = new GameObject(this.name, new Vector2(200,350), new Vector2(400,700));
        bg.spriterenderer = new SpriteRenderer(BACKGROUND_IMAGE);
        this.pushGameObject(bg);

        let format = ['DON\'T TOUCH\nTHE SPIKE', '30px Times New Roman', 'white'];
        let gameName = new Text(this.name, new Vector2(200, 100), new Vector2(), format);
        this.pushGameObject(gameName);

        format = [String(ScoreManager.score), '100px Arieal', 'white'];
        let scoreText = new Text(this.name, new Vector2(200,200), new Vector2(200,100), format);
        ScoreManager.highScoreText = scoreText;
        this.pushGameObject(scoreText);

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

    public override update(delta: number): void {
        super.update(delta);
    }

    public override render(delta: number): void {
        super.render(delta);
    }


}
export default MenuScene