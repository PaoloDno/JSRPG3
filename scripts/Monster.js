
// Encounter
export function processEncounter(app, encounterList, onComplete) {
  const type = encounterList[Math.floor(Math.random() * encounterList.length)];

  if (type === "none") {
    app.innerHTML += `<p>The room is quiet...</p>`;
    onComplete();

  } else if (type === "monster") {
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
