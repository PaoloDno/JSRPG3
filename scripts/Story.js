// Story.js
import Players from "./Players.js";
import gameUI from "./UI.js";

// --- Story Triggers ---
export const storyTriggers = [
  {
    id: "1",
    description: "Start of new Adventure",
    condition: (player) => player.level >= 10,
    onTrigger: (gameUI, player) => {
      gameUI.showStoryScreen(`
        As you touch the runes, the door rumbles and opens slowly...
      `);
      player.story.progress = "enteredAncientRuins";
    },
  },
  {
    id: "2",
    description: "A hooded stranger waits silently.",
    condition: true, // always true for now
    onTrigger: (gameUI, player) => {
      gameUI.showStoryScreen(`
        Stranger: "So, you finally arrived..."
      `);
      player.story.progress = "metStranger";
    },
  },
];

// --- Story Box Renderer ---
export function showStory(app, text, onContinue) {
  app.innerHTML = `
    <div class="story-box">
      <p>${text}</p>
      <button id="continue-btn">Continue</button>
    </div>
  `;

  document.getElementById("continue-btn").addEventListener("click", () => {
    if (onContinue) onContinue();
  });
}

// --- Interaction Handler ---
export function interactWith(objectId) {
  const player = Players.getPlayer();
  const trigger = storyTriggers.find((t) => t.id === objectId);

  if (trigger && trigger.condition(player)) {
    trigger.onTrigger(gameUI, player);
  } else {
    console.log("Nothing happens.");
  }
}
