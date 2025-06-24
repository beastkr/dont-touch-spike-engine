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
        });
        
        CANVAS.addEventListener("click", (event: MouseEvent) => {
            console.log(InputManager.mousepos)
            const rect = CANVAS.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            InputManager.mousepos[0] = x/Renderer.ratioX;
            InputManager.mousepos[1] = y/Renderer.ratioY;
            InputManager.mousepos[2] = x/Renderer.ratioX;
            InputManager.mousepos[3] = y/Renderer.ratioY;
        });

        // CANVAS.addEventListener("touchstart", (e: TouchEvent) => {

        //     InputManager.keyboard = false;
        //     const touch = e.touches[0];
        //     InputManager.mousepos[0] = touch.clientX/Renderer.ratioX;
        //     InputManager.mousepos[1] = touch.clientY/Renderer.ratioY;
        //     InputManager.mousepos[2] = touch.clientX/Renderer.ratioX;
        //     InputManager.mousepos[3] = touch.clientY/Renderer.ratioY;
        //     InputManager.key = ' ';
        // }, { passive: true });
        // CANVAS.addEventListener("touchend", (e: TouchEvent) => {
        //     if (InputManager.keyboard) return; 
        //     //e.preventDefault();
        //     if (!InputManager.keyboard) {            
        //         InputManager.key = '';
        //         InputManager.mousepos[0] = -1000;
        //         InputManager.mousepos[1] = -1000;
        //         InputManager.mousepos[2] = 0;
        //         InputManager.mousepos[3] = 0;}

        // }, { passive: false });


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
        
        window.addEventListener('resize', ()=> {
            Renderer.resizeCanvas();
            InputManager.initialize();
        });

    }

    static reset() {
        InputManager.mousepos = [0,0,0,0];
    }
}

export default InputManager