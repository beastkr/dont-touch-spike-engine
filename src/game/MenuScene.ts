import Scene from "../game-engine/Scene";
import Camera from "../graphics/Camera";
import Renderer from "../graphics/Renderer";
import Button from "../components/ui-components/Button";
import Cursor from "../components/ui-components/Cursor";
import Vector2 from "../components/Vector2";
import ColliderController from "../components/Collider/ColliderController";
import SceneManager from "../game-engine/SceneManager";
import GameObject from "../game-objects/GameObject";
import SpriteRenderer from "../graphics/SpriteRenderer";
import { BACKGROUND_IMAGE } from "../constants/global";
import ScoreManager from "./objects/ScoreManager";
import Text from "../components/ui-components/Text";
class MenuScene extends Scene {
    constructor() {

        super('menu');
        let bg = new GameObject(this.name, new Vector2(200,350), new Vector2(400,700));
        bg.spriterenderer = new SpriteRenderer(BACKGROUND_IMAGE);
        this.pushGameObject(bg);

        let format = [String(ScoreManager.score), '100px Arieal', 'white'];
        let scoreText = new Text(this.name, new Vector2(200,100), new Vector2(200,100), format);
        ScoreManager.highScoreText = scoreText;
        this.pushGameObject(scoreText);

        let button = new Button(this.name, new Vector2(200, 400), new Vector2(200, 100));
        button.setText('Start Game');
        button.addonclick(() => {
            SceneManager.setActive('game');
        });
        this.pushGameObject(button);
        this.pushGameObject(new Cursor(this.name, new Vector2(0,0), new Vector2(20,20)));
        console.log(this.gameObject)
        console.log(ColliderController.sceneColliderList)
    }

    public override update(delta: number): void {
        super.update(delta);
    }

    public override render(delta: number): void {
        super.render(delta);
    }


}
export default MenuScene