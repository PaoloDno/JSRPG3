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
    if (!name) return alert("Please enter a character name.");

    const selectedGender = document.querySelector('input[name="gender"]:checked').value;
    const selectedClass = document.getElementById("job").value;
    const selectedBlessing = document.getElementById("blessing").value;
    const selectedSkill = document.getElementById("skill").value;
    
    const baseStats = { str: 50, mgk: 30, spd: 40, dex: 30, def: 40, res: 30, dur: 70 };
    const blessedStats = applyBlessing(selectedBlessing, baseStats);
    let attributes = StatCalc(blessedStats);
    let passive = assignRandomPassive(selectedBlessing);

    const newCharacter = {
        name,
        gender: selectedGender,
        class: selectedClass,
        blessing: selectedBlessing,
        image: {
            avatar: `../misc/character/avatar/${selectedGender}-${selectedClass}.png`,
            image: `../misc/character/fullbody/${selectedGender}-${selectedClass}.png`,
            image2: `../misc/character/alt/${selectedGender}-${selectedClass}.png`
        }
    };
}

function applyBlessing(blessing, stats) {
    const statBless = {
        fire: { str: 30, def: 10, spd: 10 },
        aqua: { mgk: 20, dex: 20, res: 10 },
        wind: { spd: 30, dex: 10, mgk: 10 },
        tera: { def: 20, res: 20, dur: 20 }
    };
    Object.entries(statBless[blessing] || {}).forEach(([stat, value]) => stats[stat] += value);
    return stats;
}

function StatCalc(stats) {
    return { health: 50 + stats.dur * 10, mana: 50 + stats.mgk * 10, critDmg: 100 + stats.str * 0.5 };
}

function assignRandomPassive(blessing) {
    const passivePool = { fire: ["Berserker", "Flame Aura"], aqua: ["Mana Overflow", "Ice Shield"] };
    return passivePool[blessing]?.[Math.floor(Math.random() * passivePool[blessing].length)] || null;
}
