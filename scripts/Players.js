// import gameUI from "./UI.js";

let player = {
  name: null,
  class: null,
  gender: null,
  level: 1,
  vitalStats: { hp: 100, mp: 50, sp: 50 },
  attributes: {},
  skills: {},
  equipment: {},
  bag: {},
  bagMax: 20,
  location: null,
  blessings: null
};

// Load active session
const savedPlayer = JSON.parse(localStorage.getItem("playerData.active"));
if (savedPlayer) {
  player = savedPlayer;
}

/* If no name, go to title screen
if (!player.name) {
}

*/

function saveAttributes(attributes, vitalStats) {
  player.attributes = attributes;
  player.vitalStats = vitalStats;
}

function savePlayer(slot = 1) {
  // Save into slot
  localStorage.setItem(`playerSlot_${slot}`, JSON.stringify(player));

  // Also update active save
  localStorage.setItem("playerData.active", JSON.stringify(player));

  console.log(`Game saved to slot ${slot}`);
}

function loadPlayer(slot = 1) {
  const saved = JSON.parse(localStorage.getItem(`playerSlot_${slot}`));
  if (saved) {
    player = saved;
    localStorage.setItem("playerData.active", JSON.stringify(player));
    console.log(`Loaded player from slot ${slot}`);
    return player;
  } else {
    console.log(`Slot ${slot} is empty`);
    return null;
  }
}

function listSlots(maxSlots = 3) {
  const slots = [];
  for (let i = 1; i <= maxSlots; i++) {
    const data = JSON.parse(localStorage.getItem(`playerSlot_${i}`));
    slots.push({
      slot: i,
      player: data || null
    });
  }
  return slots;
}

export default {
  saveAttributes,
  savePlayer,
  loadPlayer,
  listSlots
};
