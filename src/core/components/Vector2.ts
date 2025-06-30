class Vector2 implements IVector2 {
    public x: number
    public y: number

    public constructor(x?: number, y?: number) {
        this.x = x ?? 0
        this.y = y ?? 0
    }
    public squaredistance(other: IVector2): number {
        const dx = this.x - other.x
        const dy = this.y - other.y
        return dx * dx + dy * dy
    }
    public mul(n: number): IVector2 {
        return new Vector2(this.x * n, this.y * n)
    }
}
export default Vector2
