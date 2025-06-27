import GameEngine from "./core/game-engine/GameEngine";

document.addEventListener("click", start);

function start() {document.title = 'Don\'t Touch The Spike'
let game = new GameEngine();
document.removeEventListener("click", start);
game.start();}
