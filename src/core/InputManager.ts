import Scene from "./game-engine/Scene";
import SceneManager from "./game-engine/SceneManager";
import Renderer from "./graphics/Renderer";

class InputManager {
    static key: string = '';
    static keyboard: boolean = true;
    static mousepos: number[] = [0,0,0,0]
    static initialize() { 
        const CANVAS = document.querySelector('canvas') as HTMLCanvasElement;

        window.addEventListener('keydown', (event: KeyboardEvent) => {
            if (SceneManager.pausing && SceneManager.resumable) SceneManager.resume();
            InputManager.key = event.key;
        });

        window.addEventListener('keyup', (event: KeyboardEvent) => {
            InputManager.key = '';
        });

        CANVAS.addEventListener("mousemove", (event: MouseEvent) => {
            const rect = CANVAS.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            InputManager.mousepos[0] = x/Renderer.ratioX;
            InputManager.mousepos[1] = y/Renderer.ratioY;
            InputManager.mousepos[2] = 0;
            InputManager.mousepos[3] = 0;
        });
        
        CANVAS.addEventListener("click", (event: MouseEvent) => {
            if (SceneManager.pausing && SceneManager.resumable) SceneManager.resume();
            const rect = CANVAS.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            InputManager.mousepos[0] = x/Renderer.ratioX;
            InputManager.mousepos[1] = y/Renderer.ratioY;
            InputManager.mousepos[2] = x/Renderer.ratioX;
            InputManager.mousepos[3] = y/Renderer.ratioY;
        });

        CANVAS.addEventListener('mouseup', () => {
            InputManager.mousepos[2] = 0;
            InputManager.mousepos[3] = 0;
        });

        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === 'hidden') {
                SceneManager.pause();
            }
            else {
                SceneManager.resumable = true;
            }
        });
        
        window.addEventListener('resize', ()=> {
            Renderer.resizeCanvas();
            InputManager.initialize();
        });

        window.addEventListener('blur', () => {
            SceneManager.pause();
        });

        window.addEventListener('focus', () => {
            SceneManager.resumable = true;
        });

    }

    static reset() {
        InputManager.mousepos = [0,0,0,0];
    }
}

export default InputManager