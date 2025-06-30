class ScoreManager {
    static score: number = 0
    static highscore: number = 0
    static initialize() {
        ScoreManager.highscore = Number(localStorage.getItem('highscore'))
    }
    static reset() {
        ScoreManager.score = 0
    }
    static setScore(score: number) {
        ScoreManager.score = score
    }
    static setHighScore(highscore: number) {
        ScoreManager.score = highscore
        localStorage.setItem('highscore', String(highscore))
    }
}

export default ScoreManager
