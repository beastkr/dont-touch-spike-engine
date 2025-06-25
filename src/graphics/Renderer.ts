import Text from "../components/ui-components/Text";
import Vector2 from "../components/Vector2";
import { CAMERA_SCALE } from "../constants/graphic";
import SceneManager from "../game-engine/SceneManager";

class Renderer{
    static canvas: HTMLCanvasElement;
    static camera: ICamera;
    static ratioX: number;
    static ratioY: number;
    static initialize(camera: ICamera) {
        Renderer.camera = camera;
        if (!Renderer.canvas) {
            Renderer.canvas = document.createElement('canvas');
        }
        
        const ctx = Renderer.canvas.getContext('2d');
        

        Renderer.canvas.height = camera.transform.scale.y;
        Renderer.canvas.width = camera.transform.scale.x;
        Renderer.canvas.style.position = 'absolute';
        Renderer.canvas.style.top = '50%';
        Renderer.canvas.style.left = '50%';
        Renderer.canvas.style.transform = 'translate(-50%, -50%)';
        
        document.body.appendChild(Renderer.canvas);
        Renderer.resizeCanvas();
        

        
    }

    static flip() :void{ 
        const canvas = document.querySelector('canvas')!;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
            ctx.imageSmoothingEnabled = false;
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, Renderer.camera.transform.scale.x, Renderer.camera.transform.scale.y);
        }
    }
    static getCanvas(): HTMLCanvasElement {
        return Renderer.canvas;
    }
    static resizeCanvas() {
        
        const windowRatio = window.innerWidth / window.innerHeight;
        const gameRatio = CAMERA_SCALE.x / CAMERA_SCALE.y;

        let width, height;

        if (windowRatio > gameRatio) {
            height = window.innerHeight;
            width = height * gameRatio;
        } else {
            width = window.innerWidth;
            height = width / gameRatio;
        }

        Renderer.canvas.style.width = `${width}px`;
        Renderer.canvas.style.height = `${height}px`;
        Renderer.ratioX = width/CAMERA_SCALE.x;
        Renderer.ratioY = height/CAMERA_SCALE.y;
        Renderer.canvas.style.imageRendering = "pixelated"; // Keep pixel art sharp
    }

    static pause() {
        const canvas = document.querySelector('canvas')!;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
            ctx.globalAlpha = 0.9;
            ctx.imageSmoothingEnabled = false;
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, Renderer.camera.transform.scale.x, Renderer.camera.transform.scale.y);
            ctx.globalAlpha = 1;
        }
        let t = new Text('', new Vector2(200,250), new Vector2(), ['Click to continue', '30px Ariel', 'white']);
        t.render(0, SceneManager.getCurrentScene().camera.transform.position);
    }

}
export default Renderer