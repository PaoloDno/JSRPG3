import { startNewGameScreen } from "./CharacterCreation.js";
import Players from "./Players.js";
import { showStory } from "./Story.js";
import {
  showTownUI,
  showInnUI,
  showGuildUI,
  showBlacksmithUI,
  showStoreUI,
} from "./Town.js";

import { guildDungeonLocation, processLocation } from "./Location.js";


const { listSlots, loadPlayer, savePlayer, setPlayer } = Players;

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
        this.startStory();
        //startNewGameScreen();
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

  startStory() {
    showStory(
      this.app,
      "The wind howls across the forgotten plains... Your journey begins.",
      () => startNewGameScreen()
    );
  }

  beginAdventure() {
    showStory(
      this.app,
      "You awaken in the City of Dawnreach, a bustling hub of adventurers.",
      () => this.showCityScreen()
    );
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
    const allEmpty = slots.every((s) => s.player === null);

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
          <div class="card-slots">
            ${slots
              .map(
                (slot) => `
                  <div class="card-slot">
                    <h3>Slot ${slot.slot}</h3>
                    <p>${slot.player ? slot.player.name : "Empty"}</p>
                    ${
                      slot.player
                        ? `<button data-slot=${slot.slot}>Load</button>`
                        : "this slot is FREE"
                    }
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      `;

      // Add listeners to slot buttons
      document.querySelectorAll(".card-slot button").forEach((btn) => {
        btn.addEventListener("click", () => {
          const slotIndex = parseInt(btn.dataset.slot);
          console.log("Loading slot:", slotIndex);

          const loaded = loadPlayer(slotIndex);
          if (loaded) {
            console.log("Game loaded:", loaded);
            // TODO: transition into actual game UI
            this.beginAdventure();
          }
        });
      });
    }
  }

  saveGameTitleScreen() {
    let slots = listSlots();

    this.app.innerHTML = `
    <div class="flex column center full">
      <h2>Save Game</h2>
      <div class="card-slots">
        ${slots
          .map(
            (slot) => `
              <div class="card-slot">
                <h3>Slot ${slot.slot}</h3>
                <p>${
                  slot.player
                    ? slot.player.name + " (Lv." + slot.player.level + ")"
                    : "Empty"
                }</p>
                <button data-slot=${
                  slot.slot
                } class="saveBtn">Save Here</button>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;

    // Add listeners to slot buttons
    document.querySelectorAll(".card-slot button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const slotIndex = parseInt(btn.dataset.slot);
        console.log("Saving to slot:", slotIndex);

        // Save active player to chosen slot
        savePlayer(slotIndex);

        alert(`Game saved to Slot ${slotIndex}!`);
        // Optionally return to game UI
        this.beginAdventure();
      });
    });
  }

  // SHOWCITYSCREEN
  showCityScreen() {
    showTownUI(this.app, this.bot, this);
  }

  showInnScreen() {
    showInnUI(this.app, this.bot, this);
  }

  showGuildScreen() {
    showGuildUI(this.app, this.bot, this);
  }

  showStoreScreen() {
    showStoreUI(this.app, this.bot, this);
  }

  showBlacksmithScreen() {
    showBlacksmithUI(this.app, this.bot, this);
  }

  EnterDungeonScreen(dungeon = guildDungeonLocation, room = 0) {
    processLocation(dungeon, dungeon[room], this.app, this.bot, this);
  }

  // dungeons battle seq

  
  showMapScreen() {
    this.app.innerHTML = `
    <div class="map-ui">
      <h2>World Map</h2>
      <p>You see the vast lands of the kingdom before you.</p>
    </div>
  `;

  this.bot.innerHTML = `
    <div class="control-panel">
      <button id="back-to-city">Back to City</button>
    </div>
  `;

  this.bot.querySelector("#back-to-city").addEventListener("click", () => {
    this.showCityScreen();
    });
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
      .card-slot {
        border: 1px solid #ccc;
        padding: 10px;
        margin: 5px;
        border-radius: 5px;
        min-width: 120px;
        text-align: center;
      }

      .card-slot .saveBtn{
        background-color: red;
      }
      .card-slots {
        position: relative;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding: 0 0.5rem;
      }
      
      .control-panel {
        position: relative;
        display: grid;
        width: 100%;
        grid-template-columns: 1fr 1fr;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding: 0 0.5rem;
      }


      @media (max-width: 768px) {
        /* Styles for devices smaller than 768px (tablets & phones) */
        .card-slots {
        display: flex;
        flex-direction: column;
        gap:0.5rem;
        }
        .card-slot {
          padding: 5px 10px;
        }
}
    `;
    document.head.appendChild(style);
  }
}

const gameUI = new GAMEUI();
export default gameUI;
