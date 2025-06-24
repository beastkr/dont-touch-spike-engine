import Text from "../../components/ui-components/Text";
class ScoreManager {
    static score: number = 0;
    static highscore: number = 0;
    static text: Text;
    static highScoreText: Text;
    static initialize() {
        ScoreManager.highscore = Number(localStorage.getItem('highscore'));
        ScoreManager.highScoreText.text[0] = String(ScoreManager.highscore)
    }
    static reset() {
        ScoreManager.score = 0;
        ScoreManager.text.text[0] = '0'
    }
    static increase() {
        ScoreManager.score++;
        if (ScoreManager.score > ScoreManager.highscore) {
            ScoreManager.highscore = ScoreManager.score;
            localStorage.setItem('highscore', String(ScoreManager.highscore))
            ScoreManager.highScoreText.text[0] = String(ScoreManager.highscore)
            console.log(localStorage)
        }
        ScoreManager.text.text[0] = String(ScoreManager.score);
    }

}

export default ScoreManager;