class TileSet {
    static tileSet: Map<number, string>;
    static size: number = 0;

    static initialize() {
        TileSet.tileSet = new Map<number, string>();
    }

    static addToTileSet(imgpath: string) {
        TileSet.tileSet.set(TileSet.size, imgpath);
        TileSet.size++;
    }

    static getTile(id: number): string {
        return TileSet.tileSet.get(id) || '';
    }
}

export default TileSet;