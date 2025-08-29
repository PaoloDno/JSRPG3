

export function triggerCombat(party, monsters) {
  // Create Overlay
  const fightModal = document.createElement("div");
  fightModal.classList.add("fight-modal");

  // Modal content box
  const fightModalContent = document.createElement("div");
  fightModalContent.classList.add("fight-modal-content");

  // Close button
  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close");
  closeBtn.innerHTML = "&times;";

  // Header
  const header = document.createElement("div");
  header.classList.add("fight-header");
  header.textContent = "⚔️ Battle Start!";

  // Party display
  const partyDiv = document.createElement("div");
  partyDiv.classList.add("fight-party");
  partyDiv.innerHTML = "<h3>Your Party</h3>" +
    party.map(p => `<p>${p.name} (HP: ${p.hp}/${p.hpMax})</p>`).join("");

  // Enemies display
  const enemiesDiv = document.createElement("div");
  enemiesDiv.classList.add("fight-enemies");
  enemiesDiv.innerHTML = "<h3>Enemies</h3>" +
    monsters.map(m => `<p>${m.name} (HP: ${m.hp}/${m.hpMax})</p>`).join("");

  // Container for both sides
  const fightSection = document.createElement("div");
  fightSection.classList.add("fight-section");
  fightSection.appendChild(partyDiv);
  fightSection.appendChild(enemiesDiv);

  // Actions
  const actions = document.createElement("div");
  actions.classList.add("fight-actions");
  actions.innerHTML = `
    <button id="attackBtn">Attack</button>
    <button id="skillBtn">Skill</button>
    <button id="itemBtn">Item</button>
    <button id="runBtn">Run</button>
  `;

  // Assemble modal
  fightModalContent.appendChild(closeBtn);
  fightModalContent.appendChild(header);
  fightModalContent.appendChild(fightSection);
  fightModalContent.appendChild(actions);
  fightModal.appendChild(fightModalContent);
  document.body.appendChild(fightModal);

  // Close modal
  closeBtn.onclick = () => fightModal.remove();
  window.onclick = (e) => { if (e.target === fightModal) fightModal.remove(); };

  // Action buttons (example handlers)
  document.getElementById("attackBtn").onclick = () => {
    alert("You attack!");
  };
  document.getElementById("skillBtn").onclick = () => {
    alert("Use a skill!");
  };
  document.getElementById("itemBtn").onclick = () => {
    alert("Open inventory!");
  };
  document.getElementById("runBtn").onclick = () => {
    alert("You try to run!");
    fightModal.remove();
  };
}
