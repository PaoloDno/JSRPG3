import Players from "./Players.js";
import gameUI from "./UI.js";
const {saveAttributes, savePlayer, getPlayer, updatePlayerData} = Players;


export function startNewGameScreen() {
  document.getElementById("content").innerHTML = `
    <div id="character-creation-screen">
      <form id="characterForm">
        <div id="character-creation-panel1">
          <h3>Choose Your Character</h3>
          
          <div class="row">
            <label>Name:</label>
            <input
              type="text"
              id="charName"
              placeholder="name"
              required
            />
          </div>

          <div class="row">
            <label>Gender:</label>
            <input type="radio" id="male" name="gender" value="male" />
            <label for="male">M</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              checked
            />
            <label for="female">F</label>
          </div>

          <div class="row">
            <label>Class:</label>
            <select id="job">
              <option value="warrior" selected>Warrior</option>
              <option value="mage">Mage</option>
              <option value="rogue">Rogue</option>
              <option value="tank">Tank</option>
            </select>
          </div>

          <div class="row">
            <label>Skill:</label>
            <select id="skill">
              <option value="magicBullet" selected>Magic Bullet</option>
              <option value="stealth">Stealth Slash</option>
              <option value="shieldBash">Shield Bash</option>
              <option value="chiBlast">Chi Blast</option>
              <option value="heal">Heal</option>
              <option value="quickSlash">Quick Slash</option>
            </select>
          </div>

          <div class="row">
            <label>Blessing:</label>
            <select id="blessing">
              <option value="fire" selected>Phoenix Statue</option>
              <option value="aqua">Mermaid Statue</option>
              <option value="tera">Dryad Statue</option>
              <option value="wind">Griffon Statue</option>
            </select>
          </div>
          <button type="button" id="confirm-character">CONFIRM</button>
        </div>
        <div id="character-creation-panel2">
          <div id="img-creation"></div>
          <div id="stat-display"></div>
        </div>
      </form>
    </div>   
  `;

  document.getElementById("characterForm").addEventListener("change", updateStatsDisplay);
  document.getElementById("confirm-character").addEventListener("click", confirmCharacter);
  document.querySelectorAll('input[name="gender"]').forEach(input => {
    input.addEventListener("change", updateStatsDisplay);
  });
  
  updateStatsDisplay();
}

function updateStatsDisplay() {
  const selectedGender = document.querySelector('input[name=gender]:checked')?.value;
  const selectedClass = document.getElementById("job")?.value;
  const selectedBlessing = document.getElementById("blessing")?.value;
  const characterImageDiv = document.getElementById("img-creation");

  console.log(selectedBlessing, selectedClass, selectedGender);
}

function confirmCharacter() {
  const name = document.getElementById("charName").value.trim();
  const selectedGender = document.querySelector('input[name="gender"]:checked')?.value;
  const selectedClass = document.getElementById("job")?.value;
  const selectedBlessing = document.getElementById("blessing")?.value;
  const selectedSkill = document.getElementById("skill")?.value;

  if (!name || !selectedGender || !selectedClass || !selectedBlessing || !selectedSkill) {
    return alert("Please complete all selections.");
  }

  const baseStats = applyBaseStat(selectedGender, selectedClass);
  let attributes = applyBlessing(selectedBlessing, { ...baseStats });
  let vitalStats = StatCalc(attributes);

  const newCharacter = {
    name,
    gender: selectedGender,
    class: selectedClass,
    blessing: selectedBlessing,
    skill: selectedSkill,
    equipment: {},
    bag: {},
    bagMax: 20,
    attributes: attributes,
    vitalStats: vitalStats,
    image: {
      avatar: `../misc/character/avatar/${selectedGender}-${selectedClass}.png`,
      image: `../misc/character/fullbody/${selectedGender}-${selectedClass}.png`,
      image2: `../misc/character/alt/${selectedGender}-${selectedClass}.png`
    },
    story: 1,
    location: 1
  };

  console.log( "Character Created:", newCharacter, attributes);
  saveAttributes( attributes, vitalStats );
  updatePlayerData(newCharacter);
  gameUI.saveGameTitleScreen();
}

function applyBlessing(blessing, stats) {
  const statBless = {
    fire: { str: 5, mgk: 5, spd: 5 },
    aqua: { mgk: 5, dex: 5, res: 5 },
    wind: { spd: 5, dex: 5, mgk: 5 },
    tera: { str: 5, def: 5, dur: 5 }
  };
  Object.entries(statBless[blessing] || {}).forEach(([stat, value]) => stats[stat] += value);
  return stats;
}

function StatCalc(stats) {
  return { 
    health: 20 + (stats.dur * 10) + (stats.def * 5) + (stats.res * 5) + (stats.str * 2),
    mana: 50 + (stats.mgk * 10),
    stamina: 50 + (stats.str * 7),
    armor: 2 + (stats.def * 2) + stats.dex,
    mgkRes: 2 + (stats.res * 2) + stats.mgk,
    critRate: Math.floor(15 + (stats.dex * 1.5) + (stats.spd * 0.5)),
    critDmg: Math.floor(125 + (stats.dex * 2) + (stats.str * 0.5) + (stats.mgk * 0.5)),
    actionSPD: 5 + stats.spd * 3 + stats.dex * 1
  };
}

function applyBaseStat(selectedGender, selectedClass) {
  let characterChoose = `${selectedGender}-${selectedClass}`;
  let addStat = {};

  switch (characterChoose) {
    // Male
    case "male-warrior":
      addStat = { str: 9, mgk: 5,  spd: 9, dex: 8,  def: 7, res: 5,  dur: 7 };
      break;
    case "male-mage":
      addStat = { str: 4,  mgk: 12, spd: 7, dex: 8, def: 5,  res: 7, dur: 7  };
      break;
    case "male-rogue":
      addStat = { str: 10, mgk: 4,  spd: 14, dex: 10, def: 4,  res: 4,  dur: 4  };
      break;
    case "male-tank":
      addStat = { str: 6, mgk: 5,  spd: 5,  dex: 6,  def: 9, res: 8, dur: 11 };
      break;
    case "male-priest":
      addStat = { str: 5,  mgk: 9, spd: 7,  dex: 6, def: 7,  res: 8, dur: 8  };
      break;

    // Female
    case "female-warrior":
      addStat = { str: 8, mgk: 8,  spd: 9, dex: 7, def: 6, res: 6,  dur: 6 };
      break;
    case "female-mage":
      addStat = { str: 4, mgk: 16,  spd: 5, dex: 8, def: 5, res: 7,  dur: 5 };
      break;
    case "female-rogue":
      addStat = { str: 10, mgk: 4,  spd: 9, dex: 10, def: 5, res: 6,  dur: 6 };
      break;
    case "female-tank":
      addStat = { str: 4, mgk: 9,  spd: 4, dex: 5, def: 10, res: 8,  dur: 10 };
      break;
    case "female-priest":
      addStat = { str: 4, mgk: 10,  spd: 6, dex: 10, def: 6, res: 6,  dur: 8 };
      break;
  }

  return addStat;
}
