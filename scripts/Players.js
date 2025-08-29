let defaultPlayer = {
  name: null,
  class: null,
  gender: null,
  level: 1,
  vitalStats: { 
    hp: 100, mp: 50, sp: 50,
    hpMax: 100, mpMax: 50, spMax: 50,
    armor: 20,
    mgkRes: 20,
    critRate: 25,
    critDmg: 125,
    actionSPD: 25
  },
  attributes: {},
  skills: {},
  equipment: {},
  bag: {},
  party: [],
  bagMax: 20,
  location: null,
  blessings: null,
  story: 0
};

let playerData = JSON.parse(localStorage.getItem("playerData")) || {
  active: { ...defaultPlayer },
  slots: [null, null, null]
};

function getPlayer() {
  return playerData.active;
}

function setPlayer(activeData) {
  playerData.active = { ...playerData.active, ...activeData };
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
  setPlayer,
  saveAttributes,
  savePlayer,
  loadPlayer,
  listSlots
};
