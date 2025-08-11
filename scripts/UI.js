import { startNewGameScreen } from "./CharacterCreation.js";

class GAMEUI {
  constructor() {
    this.top = document.getElementById("top");
    this.app = document.getElementById("content");
    this.bot = document.getElementById("bottom");

    this.showTitleScreen();
  }

  showTitleScreen() {
    this.top.innerHTML = this.bannerScreen();
    this.app.innerHTML = this.createTitleScreen();
    this.bot.innerHTML = this.bannerScreen();

    const newGameBtn = document.getElementById("new-start-button");
    if (newGameBtn) {
      newGameBtn.addEventListener("click", () => {
        console.log("New Game Started!");
        startNewGameScreen();
      });
    }
  }

  bannerScreen() {
    return `
      <div class="banner flex full center">banner here</div>
    `;
  }

  createTitleScreen() {
    return `
      <div class="full">
        <div class="flex column center full">
          <h1 class="flex center">Quest</h1>
          <button id="new-start-button">New Game</button>
          <button>Load Game</button>
          <button>Credits</button>
        </div>
      </div>
    `;
  }
}

const gameUI = new GAMEUI();
export default gameUI;
