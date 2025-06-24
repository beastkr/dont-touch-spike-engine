import Scene from "./game-engine/Scene";
import SceneManager from "./game-engine/SceneManager";
import Renderer from "./graphics/Renderer";

class InputManager {
    static key: string = '';
    static mousepos: number[] = [0,0,0,0]
    static initialize() { 
        const CANVAS = document.querySelector('canvas') as HTMLCanvasElement;

        
        window.addEventListener('keydown', (event: KeyboardEvent) => {
            InputManager.key = event.key;
        });

        window.addEventListener('keyup', (event: KeyboardEvent) => {
            InputManager.key = '';

        });
        CANVAS.addEventListener("mousemove", (event: MouseEvent) => {
            const rect = CANVAS.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            InputManager.mousepos[0] = x;
            InputManager.mousepos[1] = y;
        });
        CANVAS.addEventListener("click", (event: MouseEvent) => {
            const rect = CANVAS.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            InputManager.mousepos[0] = x;
            InputManager.mousepos[1] = y;
            InputManager.mousepos[2] = x;
            InputManager.mousepos[3] = y;
        });
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === 'hidden') {
                SceneManager.pause();
                console.log('Game paused');
            }
            else {
                SceneManager.resume();
                console.log('Game resumed');
            }
        });

    }

    static reset() {
        InputManager.mousepos = [0,0,0,0];
    }
}

export default InputManager