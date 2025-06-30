class Time implements ITime {
    static currentTime: number
    static prevTime: number
    static deltaTime: number
    static initialize(): void {
        Time.prevTime = 0
        Time.currentTime = performance.now() / 1000
    }
    static startFrame(): void {
        Time.currentTime = performance.now() / 1000
        Time.delta()
    }
    static endFrame(): void {
        Time.prevTime = Time.currentTime
    }
    static delta(): void {
        Time.deltaTime = Time.currentTime - Time.prevTime
    }
}

export default Time
