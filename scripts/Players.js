let defaultPlayer = {
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
  blessings: null,
  story: {}
};

let playerData = JSON.parse(localStorage.getItem("playerData")) || {
  active: { ...defaultPlayer },
  slots: [null, null, null] // up to 3 slots
};

function getPlayer() {
  return playerData.active;
}


export function updatePlayerData(data) {
  playerData.active = { ...playerData.active, ...data };
  localStorage.setItem("playerData", JSON.stringify(playerData));
  return playerData.active;
}

function saveAttributes(attributes, vitalStats) {
  const p = getPlayer();
  p.attributes = attributes;
  p.vitalStats = vitalStats;
  localStorage.setItem("playerData", JSON.stringify(playerData));
}

function savePlayer(slot = 1, savedata = getPlayer()) {
  playerData.slots[slot - 1] = savedata;
  playerData.active = savedata;
  localStorage.setItem("playerData", JSON.stringify(playerData));
  console.log(`Game saved to slot ${slot}:`, savedata);
}

function loadPlayer(slot = 1) {
  const saved = playerData.slots[slot - 1];
  if (saved) {
    playerData.active = saved;
    localStorage.setItem("playerData", JSON.stringify(playerData));
    console.log(`Loaded player from slot ${slot}`);
    return saved;
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
  getPlayer,
  updatePlayerData,
  saveAttributes,
  savePlayer,
  loadPlayer,
  listSlots
};
