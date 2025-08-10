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
  }

  bannerScreen() {
    return `
      <div class="banner">banner here</div>
    `;
  }

  createTitleScreen() {
    return `
      <div>
        <h1>Quest</h1>
        <div class="flex column">
          <button>New Game</button>
          <button>Load Game</button>
          <button>Credits</button>
        </div>
      </div>
    `;
  }
}

const gameUI = new GAMEUI();
export default gameUI;
