import { startNewGameScreen } from "./CharacterCreation.js";
import Players from "./Players.js";

const { listSlots, loadPlayer } = Players;

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
        this.loadGameTitleScreen();
      });
    }
  }

  bannerScreen() {
    return `<div class="banner flex full center">banner here</div>`;
  }

  loadingScreen() {
    return `<div class="flex center full">Loading...</div>`;
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

  loadGameTitleScreen() {
    let slots = listSlots();

    // if all slots are null
    const allEmpty = slots.every(s => s.player === null);

    if (allEmpty) {
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
                (slot) => `
                  <div class="slot-card">
                    <h3>Slot ${slot.slot}</h3>
                    <p>${slot.player ? slot.player.name : "Empty"}</p>
                    <button data-slot="${slot.slot}">Load</button>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      `;

      // Add listeners to slot buttons
      document.querySelectorAll(".slot-card button").forEach((btn) => {
        btn.addEventListener("click", () => {
          const slotIndex = parseInt(btn.dataset.slot);
          console.log("Loading slot:", slotIndex);

          const loaded = loadPlayer(slotIndex);
          if (loaded) {
            console.log("Game loaded:", loaded);
            // TODO: transition into actual game UI
          }
        });
      });
    }
  }

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
        background: rgba(0,0,0,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
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
      .slot-card {
        border: 1px solid #ccc;
        padding: 10px;
        margin: 5px;
        border-radius: 5px;
        min-width: 120px;
        text-align: center;
      }
    `;
    document.head.appendChild(style);
  }
}

const gameUI = new GAMEUI();
export default gameUI;
