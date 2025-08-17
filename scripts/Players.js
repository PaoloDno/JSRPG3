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

// Load or initialize playerData
let playerData = JSON.parse(localStorage.getItem("playerData")) || {
  active: player,
  slots: [null, null, null] // up to 3 slots
};

// If a saved active exists, load it into player
if (playerData.active) {
  player = playerData.active;
}

function saveAttributes(attributes, vitalStats) {
  player.attributes = attributes;
  player.vitalStats = vitalStats;
  playerData.active = player;
  localStorage.setItem("playerData", JSON.stringify(playerData));
}

function savePlayer(slot = 1, savedata = player) {
  // Slot index is slot-1 (slots array is 0-based)
  playerData.slots[slot - 1] = savedata;
  playerData.active = savedata;

  localStorage.setItem("playerData", JSON.stringify(playerData));
  console.log(`Game saved to slot ${slot}:`, savedata);
}

function loadPlayer(slot = 1) {
  const saved = playerData.slots[slot - 1];
  if (saved) {
    player = saved;
    playerData.active = player;
    localStorage.setItem("playerData", JSON.stringify(playerData));
    console.log(`Loaded player from slot ${slot}`);
    return player;
  } else {
    console.log(`Slot ${slot} is empty`);
    return null;
  }
}

function listSlots() {
  return playerData.slots.map((data, i) => ({
    slot: i + 1,
    player: data
  }));
}

export default {
  saveAttributes,
  savePlayer,
  loadPlayer,
  listSlots
};
