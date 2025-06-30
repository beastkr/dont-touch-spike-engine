import Component from '../components/Component'
import Vector2 from '../components/Vector2'
import ResourceManager from '../ResourceManager'

class SpriteRenderer extends Component implements ISpriteRenderder {
    public color: Color
    public ctx: CanvasRenderingContext2D | null
    public flipvector: IVector2
    public rotation: number
    imgpath: string
    image: HTMLImageElement
    public constructor(imgpath?: string) {
        super()
        this.image = new Image()

        this.flipvector = new Vector2(1, 1)
        this.imgpath = imgpath ?? ''
        if (imgpath && this.imgpath != '') {
            const temp = ResourceManager.imagelist['/assets/images/' + imgpath]
            this.image = temp
        }
        this.color = [0, 0, 0, 1]
    }

    public rgb(): string {
        return `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`
    }
    public flipimage(flipvector: Vector2) {
        this.flipvector = flipvector
    }
    public render(
        pos: Vector2,
        scale: Vector2,
        campos: Vector2,
        frameRect?: [number, number, number, number]
    ) {
        const canvas = document.querySelector('canvas')!
        this.ctx = canvas.getContext('2d')
        let ctx = this.ctx

        // const sc = window.devicePixelRatio || 1;
        // canvas.width = CAMERA_SCALE.x * sc;
        // canvas.height = CAMERA_SCALE.y * sc;
        // ctx?.scale(sc, sc); // Draw as if normal

        if (!ctx) return

        const drawX = pos.x - campos.x
        const drawY = pos.y - campos.y

        ctx.save()

        ctx.translate(drawX, drawY)
        ctx.scale(this.flipvector.x, this.flipvector.y)

        const flippedX = this.flipvector.x === -1 ? -scale.x / 2 : -scale.x / 2
        const flippedY = this.flipvector.y === -1 ? -scale.y / 2 : -scale.y / 2
        ctx.rotate((this.rotation * Math.PI) / 180)
        if (this.imgpath === '') {
            ctx.beginPath()
            ctx.globalAlpha = this.color[3]
            ctx.arc(0, 0, scale.x / 2, 0, Math.PI * 2)
            ctx.fillStyle = this.rgb()
            ctx.fill()
            ctx.globalAlpha = 1
        } else {
            if (frameRect) {
                const [sx, sy, sw, sh] = frameRect
                ctx.globalAlpha = this.color[3]
                ctx.drawImage(this.image, sx, sy, sw, sh, flippedX, flippedY, scale.x, scale.y)
                ctx.globalAlpha = 1
            } else {
                ctx.globalAlpha = this.color[3]
                ctx.drawImage(this.image, flippedX, flippedY, scale.x, scale.y)
                ctx.globalAlpha = 1
            }
        }

        ctx.restore()
    }

    public rotate(degree: number) {
        this.rotation = degree
    }
}

export default SpriteRenderer
