

export const Party = [];

// ===== Functions to modify the party =====
export function addToParty(member) {
  Party.push(member);
}

export function removeFromParty(name) {
  const index = Party.findIndex(m => m.name === name);
  if (index !== -1) Party.splice(index, 1);
}

export function updatePartyMember(name, newData) {
  const index = Party.findIndex(m => m.name === name);
  if (index !== -1) Party[index] = { ...Party[index], ...newData };
}

// ===== Party Factory =====
export function initializeCharacter(baseCharacter) {
  return {
    name: baseCharacter.name || "Unknown",
    lvl: baseCharacter.level || 1,
    hitpoint: baseCharacter.vitalStats?.hp || 100,
    hitpointMax: baseCharacter.vitalStats?.hpMax || 100,
    manapoint: baseCharacter.vitalStats?.mp || 50,
    manapointMax: baseCharacter.vitalStats?.mpMax || 50,
    spPoint: baseCharacter.vitalStats?.sp || 50,
    spPointMax: baseCharacter.vitalStats?.spMax || 50,
    stats: {
      str: baseCharacter.attributes?.str || 10,
      mgk: baseCharacter.attributes?.mgk || 10,
      spd: baseCharacter.attributes?.spd || 10,
      dex: baseCharacter.attributes?.dex || 10,
      def: baseCharacter.attributes?.def || 10,
      res: baseCharacter.attributes?.res || 10,
      dur: baseCharacter.attributes?.dur || 10
    },
    armor: baseCharacter.vitalStats?.armor || 0,
    mgkRes: baseCharacter.vitalStats?.mgkRes || 0,
    critRate: baseCharacter.vitalStats?.critRate || 0,
    critDmg: baseCharacter.vitalStats?.critDmg || 0,
    actionSPD: baseCharacter.vitalStats?.actionSPD || 0,
    img: baseCharacter.display?.avatarHover || "🙂"
  };
}


export function initializeCompanion(name, Level) {
  // Example companion scaling
  const companionBase = {
    "Wolf":  { hp: 50, mp: 0, str: 6, mgk: 0, spd: 8, dex: 5, def: 3, res: 2, dur: 3, img: "🐺" },
    "Mage":  { hp: 30, mp: 40, str: 2, mgk: 8, spd: 5, dex: 5, def: 2, res: 4, dur: 2, img: "🧙" },
    "Knight":{ hp: 70, mp: 10, str: 8, mgk: 1, spd: 4, dex: 4, def: 7, res: 4, dur: 6, img: "🛡️" }
  };

  let base = companionBase[name] || companionBase["Wolf"];
  let scale = 1 + (Level * 0.2);
  let stats = {
      str: Math.floor(base.str * scale),
      mgk: Math.floor(base.mgk * scale),
      spd: Math.floor(base.spd * scale),
      dex: Math.floor(base.dex * scale),
      def: Math.floor(base.def * scale),
      res: Math.floor(base.res * scale),
      dur: Math.floor(base.dur * scale)
  };

   let vitalStats = StatCalc(stats);

  return {
    name,
    lvl: Level,
    ...vitalStats,
    stats,
    img: base.img
  };
}

//export a 

function StatCalc(stats) {
  return { 
    hp: 20 + (stats.dur * 10) + (stats.def * 5) + (stats.res * 5) + (stats.str * 2),
    mp: 50 + (stats.mgk * 10),
    sp: 50 + (stats.str * 7),
    hpMax: 20 + (stats.dur * 10) + (stats.def * 5) + (stats.res * 5) + (stats.str * 2),
    mpMax: 50 + (stats.mgk * 10),
    spMax: 50 + (stats.str * 7),
    armor: 2 + (stats.def * 2) + stats.dex,
    mgkRes: 2 + (stats.res * 2) + stats.mgk,
    critRate: Math.floor(15 + (stats.dex * 1.5) + (stats.spd * 0.5)),
    critDmg: Math.floor(125 + (stats.dex * 2) + (stats.str * 0.5) + (stats.mgk * 0.5)),
    actionSPD: 5 + stats.spd * 3 + stats.dex * 1
  };
}

export const GetParty = [
  // char,
  // party
]

// set party
// delete party
