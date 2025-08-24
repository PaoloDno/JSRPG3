// ---------------- CITY MAIN ----------------
export function showTownUI(app, bot, ui) {
  app.innerHTML = `
    <div class="city-ui">
      <h1>Welcome to the City</h1>
      <p>Choose a location:</p>
    </div>
  `;

  bot.innerHTML = `
    <div class="control-panel">
      <button id="inn-btn">Inn</button>
      <button id="guild-btn">Guild</button>
      <button id="shop-btn">Shop</button>
    </div>
  `;

  bot.querySelector("#inn-btn").addEventListener("click", () => ui.showInnScreen());
  bot.querySelector("#guild-btn").addEventListener("click", () => ui.showGuildScreen());
  bot.querySelector("#shop-btn").addEventListener("click", () => ui.showShopScreen());
}

// ---------------- INN ----------------
export function showInnUI(app, bot, ui) {
  app.innerHTML = `
    <div class="inn-ui">
      <h2>Welcome to the Inn</h2>
      <p>What would you like to do?</p>
    </div>
  `;

  bot.innerHTML = `
    <div class="control-panel">
      <button id="rest-btn">Rest</button>
      <button id="gamble-btn">Gamble</button>
      <button id="buy-btn">Buy Supplies</button>
      <button id="storage-btn">Storage</button>
      <button id="back-to-city">Go Back to City</button>
    </div>
  `;

  function rest() {
    alert("You rest at the inn. HP/MP fully recovered.");
  }

  function gamble() {
    alert("You gamble and... lose gold!");
  }

  function buy() {
    alert("Buying supplies… (open shop system here)");
  }

  function storage() {
    alert("Opening storage system…");
  }

  bot.querySelector("#rest-btn").addEventListener("click", rest);
  bot.querySelector("#gamble-btn").addEventListener("click", gamble);
  bot.querySelector("#buy-btn").addEventListener("click", buy);
  bot.querySelector("#storage-btn").addEventListener("click", storage);
  bot.querySelector("#back-to-city").addEventListener("click", () => ui.showCityScreen());
}

// ---------------- GUILD ----------------
export function showGuildUI(app, bot, ui) {
  app.innerHTML = `
    <div class="guild-ui">
      <h2>Welcome to the Guild</h2>
      <p>Here you can accept quests or hire companions.</p>
    </div>
  `;

  bot.innerHTML = `
    <div class="control-panel">
      <button id="quest-btn">Take Quest</button>
      <button id="hire-btn">Hire Companion</button>
      <button id="back-to-city">Go Back to City</button>
    </div>
  `;

  function takeQuest() {
    alert("You accept a new quest!");
  }

  function hireCompanion() {
    alert("You hire a brave warrior!");
  }

  bot.querySelector("#quest-btn").addEventListener("click", takeQuest);
  bot.querySelector("#hire-btn").addEventListener("click", hireCompanion);
  bot.querySelector("#back-to-city").addEventListener("click", () => ui.showCityScreen());
}

// ---------------- SHOP ----------------
export function showStoreUI(app, bot, ui) {
  app.innerHTML = `
    <div class="shop-ui">
      <h2>Welcome to the Shop</h2>
      <p>Browse goods and make purchases.</p>
    </div>
  `;

  bot.innerHTML = `
    <div class="control-panel">
      <button id="buy-item-btn">Buy Item</button>
      <button id="sell-item-btn">Sell Item</button>
      <button id="back-to-city">Go Back to City</button>
    </div>
  `;

  function buyItem() {
    alert("You buy a potion!");
  }

  function sellItem() {
    alert("You sell an old sword!");
  }

  bot.querySelector("#buy-item-btn").addEventListener("click", buyItem);
  bot.querySelector("#sell-item-btn").addEventListener("click", sellItem);
  bot.querySelector("#back-to-city").addEventListener("click", () => ui.showCityScreen());
}


export function showBlacksmithUI(app, bot, ui) {
  app.innerHTML = `
    <div class="guild-ui">
      <h2>Welcome to the Guild</h2>
      <p>Here you can accept quests or hire companions.</p>
    </div>
  `;

  bot.innerHTML = `
    <div class="control-panel">
      <button id="quest-btn">Take Quest</button>
      <button id="hire-btn">Hire Companion</button>
      <button id="back-to-city">Go Back to City</button>
    </div>
  `;

  function takeQuest() {
    alert("You accept a new quest!");
  }

  function hireCompanion() {
    alert("You hire a brave warrior!");
  }

  bot.querySelector("#quest-btn").addEventListener("click", takeQuest);
  bot.querySelector("#hire-btn").addEventListener("click", hireCompanion);
  bot.querySelector("#back-to-city").addEventListener("click", () => ui.showCityScreen());
}