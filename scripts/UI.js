import { startNewGameScreen } from "./CharacterCreation.js";

class GAMEUI {
  constructor() {
    this.top = document.getElementById("top");
    this.app = document.getElementById("content");
    this.bot = document.getElementById("bottom");

    this.injectStyles();

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

    const loadGameBtn = document.getElementById("load-game-button");
    if (loadGameBtn) {
      loadGameBtn.addEventListener("click", () => {
        console.log("Load Game!");
        let slots = JSON.parse(
          localStorage.getItem("playerData.slots") || "[]"
        );

        if (slots.length === 0) {
          this.app.innerHTML = `
        <div class="flex column center full">
          <p>No save slots found.</p>
        </div>
      `;
        } else {
          this.app.innerHTML = `
        <div class="flex column center full">
          <h2>Select Save Slot</h2>
          <div class="flex row">
            ${slots
              .map(
                (slot, i) => `
              <div class="slot-card">
                <h3>Slot ${i + 1}</h3>
                <p>${slot?.playerName || "Empty"}</p>
                <button data-slot="${i}">Load</button>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `;

          // add listeners to slot buttons
          document.querySelectorAll(".slot-card button").forEach((btn) => {
            btn.addEventListener("click", () => {
              let slotIndex = btn.dataset.slot;
              console.log("Loading slot:", slotIndex, slots[slotIndex]);
              // load into game state here
            });
          });
        }
      });
    }
  }

  bannerScreen() {
    return `
      <div class="banner flex full center">banner here</div>
    `;
  }

  loadingScreen() {
    return `
      <div class=""></div>
    `;
  }

  createTitleScreen() {
    return `
      <div class="full">
        <div class="flex column center full">
          <h1 class="flex center">Quest</h1>
          <button id="new-start-button">New Game</button>
          <button id="load-game-button">Load Game</button>
          <button>Credits</button>
        </div>
      </div>
    `;
  }

  saveGameTitleScreen() {
    return `
      <div class="modal-overlay">
        <div class="modal-box">
          <h2>Save Game</h2>
          <p>Do you want to save your progress?</p>
          <button id="confirm-save">Yes</button>
          <button id="cancel-save">Cancel</button>
        </div>
      </div>
    `;
  }

  loadGameTitleScreen() {}

  //css
  injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7); /* dark transparent */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000; /* above everything */
      }
      .modal-box {
        background: white;
        padding: 20px;
        border-radius: 8px;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
      }
      .modal-box button {
        margin-top: 10px;
      }
    `;
    document.head.appendChild(style);
  }
}

const gameUI = new GAMEUI();
export default gameUI;
