// ===== Party.js =====

import Players from "./Players.js";
const { getPlayer, setPlayer } = Players;

// ===== Companion Base Data =====
const COMPANION_BASE = {
  Wolf:   { hp: 50, mp: 0, str: 6, mgk: 0, spd: 8, dex: 5, def: 3, res: 2, dur: 3, img: "🐺" },
  Mage:   { hp: 30, mp: 40, str: 2, mgk: 8, spd: 5, dex: 5, def: 2, res: 4, dur: 2, img: "🧙" },
  Knight: { hp: 70, mp: 10, str: 8, mgk: 1, spd: 4, dex: 4, def: 7, res: 4, dur: 6, img: "🛡️" }
};

// ===== Helpers =====
function getPlayerData() {
  return getPlayer();
}

function persistParty(player) {
  setPlayer({ party: player.party || [] });
}

function calculateStats(stats) {
  const hp = 20 + (stats.dur * 10) + (stats.def * 5) + (stats.res * 5) + (stats.str * 2);
  const mp = 50 + (stats.mgk * 10);
  const sp = 50 + (stats.str * 7);

  return {
    hp, mp, sp,
    hpMax: hp,
    mpMax: mp,
    spMax: sp,
    armor: 2 + (stats.def * 2) + stats.dex,
    mgkRes: 2 + (stats.res * 2) + stats.mgk,
    critRate: Math.floor(15 + (stats.dex * 1.5) + (stats.spd * 0.5)),
    critDmg: Math.floor(125 + (stats.dex * 2) + (stats.str * 0.5) + (stats.mgk * 0.5)),
    actionSPD: 5 + stats.spd * 3 + stats.dex
  };
}

function scaleStats(baseStats, level) {
  const scale = 1 + (level * 0.2);
  const scaled = {};
  for (const key in baseStats) {
    scaled[key] = Math.floor(baseStats[key] * scale);
  }
  return scaled;
}

// ===== Party API =====
export const Party = {
  all: () => getPlayerData().party || [],

  add: (name, level = 1) => {
    const player = getPlayer();
    player.party = player.party || [];

    // Save only {name, lvl}
    player.party.push({ name, lvl: level });
    console.log(player)
    persistParty(player);
    console.log(`${name} (Lvl ${level}) added to party.`);
    console.log(Party.all());
    console.log(Party.battleReady());
  },

  remove: (name) => {
    const player = getPlayerData();
    if (!player.party) return;
    player.party = player.party.filter(member => member.name !== name);
    persistParty(player);
    console.log(`${name} removed from party.`);
  },

  update: (name, newData) => {
    const player = getPlayerData();
    if (!player.party) return;
    const index = player.party.findIndex(m => m.name === name);
    if (index !== -1) {
      player.party[index] = { ...player.party[index], ...newData };
      persistParty(player);
    }
  },

  clear: () => {
    const player = getPlayerData();
    player.party = [];
    persistParty(player);
    console.log(`Party cleared.`);
  },

  createPlayer: (base = {}) => ({
    name: base.name || "Unknown",
    lvl: base.level || 1,
    hitpoint: base.vitalStats?.hp || 100,
    hitpointMax: base.vitalStats?.hpMax || 100,
    manapoint: base.vitalStats?.mp || 50,
    manapointMax: base.vitalStats?.mpMax || 50,
    spPoint: base.vitalStats?.sp || 50,
    spPointMax: base.vitalStats?.spMax || 50,
    stats: {
      str: base.attributes?.str || 10,
      mgk: base.attributes?.mgk || 10,
      spd: base.attributes?.spd || 10,
      dex: base.attributes?.dex || 10,
      def: base.attributes?.def || 10,
      res: base.attributes?.res || 10,
      dur: base.attributes?.dur || 10
    },
    armor: base.vitalStats?.armor || 0,
    mgkRes: base.vitalStats?.mgkRes || 0,
    critRate: base.vitalStats?.critRate || 0,
    critDmg: base.vitalStats?.critDmg || 0,
    actionSPD: base.vitalStats?.actionSPD || 0,
    img: base.display?.avatarHover || "🙂"
  }),

  createCompanion: (name, level) => {
    const base = COMPANION_BASE[name] || COMPANION_BASE.Wolf;
    const { img, ...statsBase } = base;
    const stats = scaleStats(statsBase, level);

    return {
      name,
      lvl: level,
      img,
      stats,
      ...calculateStats(stats)
    };
  },

  battleReady: () => {
    const player = getPlayerData();
    const party = player.party || [];

    // Player combat data
    const playerStats = Party.createPlayer(player);
    const fullParty = [playerStats];

    // Companion combat data
    party.forEach(member => {
      if (!member?.name || !member?.lvl) return;

      const base = COMPANION_BASE[member.name] || COMPANION_BASE.Wolf;
      const { img, ...statsBase } = base;
      const scaledStats = scaleStats(statsBase, member.lvl);

      fullParty.push({
        name: member.name,
        lvl: member.lvl,
        img,
        stats: scaledStats,
        ...calculateStats(scaledStats)
      });
    });

    return fullParty;
  }
};
