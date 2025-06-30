import Button from "../../../core/components/ui-components/Button";
import Cursor from "../../../core/components/ui-components/Cursor";
import SceneManager from "../../../core/game-engine/SceneManager";
import PlayerState from "./PlayerState";
import Vector2 from "../../../core/components/Vector2";
import Renderer from "../../../core/graphics/Renderer";
import Observer from "../observer/Observer";
import PlayerDTTS from "../PlayerDTTS";

class RescueState extends PlayerState {
    private progress = 0;
    private rescueButton: Button;
    private cursor: Cursor;
    private killButton: Button;
    public constructor(player: PlayerDTTS) {
        super(player);
        this.addButton();

        this.cursor = new Cursor(SceneManager.getCurrentScene().name, new Vector2(), new Vector2(20, 20))

    }
    public onEnter(): void {
        if (this.player.dieOnce) {
            console.log('ngu vl')
            Observer.raiseEvent('gameover')
            return;
        }
        this.cursor.reset();
        this.progress = 0;
        this.player.dieOnce = true;
    }

    public onUpdate(delta: number): void {
        Observer.raiseEvent('spike')
        this.progress += delta;
        console.log('rescue now!!!!');
        this.killButton.update(delta);
        this.rescueButton.update(delta);
        this.cursor.update(delta);
        if (this.progress >= 5) {
            Observer.raiseEvent('gameover');
        }
    }
    public onRender(delta: number, camPos?: IVector2) {
        Renderer.fill('black', 0.4);
        this.rescueButton.render(delta, camPos);
        this.killButton.render(delta, camPos);
        this.cursor.render(delta, camPos);
    }

    public onExit(): void {
    }

    private addButton() {
        let button = new Button(SceneManager.getCurrentScene().name, new Vector2(200, 400), new Vector2(200, 100));
        button.setText('Continue');
        button.text.text[1] = "15px PressStart";
        button.text.text[2] = 'white';
        button.addonclick(() => {
            this.player.setState('playing');
        });
        this.rescueButton = button;
        let b = new Button(SceneManager.getCurrentScene().name, new Vector2(200, 250), new Vector2(200, 100));
        b.setText('Menu');
        b.text.text[1] = "15px PressStart";
        b.text.text[2] = 'white';
        b.addonclick(() => {
            Observer.raiseEvent('gameover');
        });
        this.killButton = b;
    }
}

export default RescueState;