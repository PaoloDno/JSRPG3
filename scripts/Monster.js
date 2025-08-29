import Players from "./Players";

const { getPlayer } = Players;

let player = getPlayer();

import { initializeCharacter, } from "./Party"



// Encounter
export function processEncounter(app, encounterList, monsterLvl, onComplete) {
  const type = encounterList[Math.floor(Math.random() * encounterList.length)];

  if (type === "none") {
    app.innerHTML += `<p>The room is quiet...</p>`;
    onComplete();

  } else if (type === "monster") {
    
    triggerCombat(party, monsters);

    app.innerHTML += `<p>A monster appears!</p><button id="fightBtn">Fight</button>`;
    document.getElementById("fightBtn").onclick = () => {
      app.innerHTML += `<p>You defeated the monster!</p>`;

      //interact
      onComplete();
    };
  } else if (type === "treasure") {
    app.innerHTML += `<p>You found a chest!</p><button id="openBtn">Open</button>`;
    document.getElementById("openBtn").onclick = () => {
      app.innerHTML += `<p>You found gold!</p>`;
      
      //interact
      onComplete();
    };
  }
}


// Monster Factory
export function initializeMonster(name, floor, section) {
  // base stats (you can balance later)
  const baseStats = {
    "Goblin":     { hp: 40, mp: 10, str: 5, mgk: 2, spd: 6, dex: 5, def: 3, res: 2, dur: 3, img: "🗡️" },
    "Goblin Shaman": { hp: 30, mp: 25, str: 3, mgk: 6, spd: 4, dex: 4, def: 2, res: 4, dur: 2, img: "🔮" },
    "Hob Goblin": { hp: 60, mp: 15, str: 7, mgk: 3, spd: 5, dex: 5, def: 4, res: 3, dur: 4, img: "⚔️" },
    "Kobold":     { hp: 45, mp: 10, str: 6, mgk: 2, spd: 7, dex: 6, def: 3, res: 2, dur: 3, img: "🐉" },
    "Dragon Newt":{ hp: 120, mp: 40, str: 12, mgk: 8, spd: 8, dex: 7, def: 8, res: 6, dur: 6, img: "🐲" },
    "Dragon of End": { hp: 500, mp: 200, str: 25, mgk: 20, spd: 12, dex: 10, def: 15, res: 12, dur: 15, img: "🐉🔥" }
  };

  const base = baseStats[name] || baseStats["Goblin"]; // fallback

  // scale with floor + section
  const scale = 1 + (floor * 0.1) + (section * 0.05);

  const monster = {
    name,
    lvl: Math.floor(floor / 2) + 1,
    hitpoint: Math.floor(base.hp * scale),
    hitpointMax: Math.floor(base.hp * scale),
    manapoint: Math.floor(base.mp * scale),
    manapointMax: Math.floor(base.mp * scale),
    stats: {
      str: Math.floor(base.str * scale),
      mgk: Math.floor(base.mgk * scale),
      spd: Math.floor(base.spd * scale),
      dex: Math.floor(base.dex * scale),
      def: Math.floor(base.def * scale),
      res: Math.floor(base.res * scale),
      dur: Math.floor(base.dur * scale)
    },
    img: base.img,
    goldGain: Math.floor(10 * scale),
    expGain: Math.floor(5 * scale)
  };

  return monster;
}
