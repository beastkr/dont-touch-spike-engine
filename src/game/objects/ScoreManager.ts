import Text from "../../components/ui-components/Text";
class ScoreManager {
    static score: number = 0;
    static highscore: number = 0;
    static text: Text;
    static highScoreText: Text;
    static reset() {
        this.score = 0;
        ScoreManager.text.text[0] = '0'
    }
    static increase() {
        this.score++;
        if (this.score > this.highscore) {
            this.highscore = this.score;
            this.highScoreText.text[0] = String(this.highscore)
        }
        ScoreManager.text.text[0] = String(ScoreManager.score);
    }

}

export default ScoreManager;