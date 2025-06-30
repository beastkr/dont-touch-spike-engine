import Vector2 from '../components/Vector2'
import GameObject from '../game-objects/GameObject'
import SpikeTile from './SpikeTile'
import Tile from './Tile'

class TileMap extends GameObject {
    public map: Tile[][]
    public size: IVector2

    public constructor(
        sceneKey: string,
        map: number[][],
        size: IVector2,
        pos?: IVector2,
        scale?: IVector2
    ) {
        super(sceneKey, pos, scale)
        this.size = size
        this.loadTile(sceneKey, map)
    }

    public override render(delta: number, campos?: IVector2) {
        for (var tiles of this.map) {
            for (var tile of tiles) {
                tile.render(delta, campos)
            }
        }
    }

    public override reset(): void {
        super.reset()
        for (var tiles of this.map) {
            for (var tile of tiles) {
                tile.reset()
            }
        }
    }

    public override update(delta: number): void {
        for (var tiles of this.map) {
            for (var tile of tiles) {
                tile.transform.rotation = this.transform.rotation
                tile.update(delta)
            }
        }
    }
    public loadTile(sceneKey: string, map: number[][]): void {
        this.map = []
        for (let i = 0; i < map.length; i++) {
            this.map[i] = []
            for (let j = 0; j < map[i].length; j++) {
                let x = (j + 0.5) * this.size.x + this.transform.position.x
                let y = (i + 0.5) * this.size.y + this.transform.position.y
                let pos = new Vector2(x, y)
                const tile = new SpikeTile(sceneKey, map[i][j], pos, this.size)
                this.map[i].push(tile)
            }
        }
    }
}
export default TileMap
