import { processEncounter } from "./Monster.js";

export function processLocation(location, app, bot, ui) {
  app.innerHTML = `
  <div class=" full column center">
  <h1>${location.name}</h1>
  <p>${location.description}</p>
  </div>
  `;

  processEncounter(app, location.encounter || ["none"], () => {
    
    renderExits(app, location.exits, (next) => {
      processLocation(next, app, bot, ui);
    });
  });
}

function renderExits(app, exits, onMove) {
  const exitsDiv = document.createElement("div");
  exitsDiv.innerHTML = "<h3>Exits:</h3>";
  for (let dir in exits) {
    const btn = document.createElement("button");
    btn.textContent = dir;
    btn.onclick = () => onMove(exits[dir]);
    exitsDiv.appendChild(btn);
  }
  app.appendChild(exitsDiv);
}




// Overworld locations
export const worldLocations = {
  0: {
    name: "Town",
    description: "The bustling city center",
    exits: {
      north: 1, // forest
      east: 2,  // white mountain
      south: 3, // demon realm
      west: 4   // west road
    }
  },
  1: {
    name: "Forest",
    description: "A dark thick forest",
    exits: {
      north: "guildDungeon", // special dungeon entry
      south: 0               // back to town
    }
  },
  2: {
    name: "White Mountain",
    description: "A snowy peak touching the clouds",
    exits: {
      west: 0
    }
  },
  3: {
    name: "Demon Realm",
    description: "A cursed land crawling with demons",
    exits: {
      north: 0
    }
  },
  4: {
    name: "West Road",
    description: "A winding road leading out of the city",
    exits: {
      east: 0,
      west: 5
    }
  }
};

// Dungeon sub-location: Guild Dungeon
export const guildDungeonLocation = {
  0: {
    name: "Room 0",
    description: "You stand at the entrance of the labyrinth.",
    encounter: ["none"], // no encounter here
    exits: {
      north: 1,
      south: 2
    }
  },
  1: {
    name: "Room 1",
    description: "A narrow corridor with strange carvings.",
    encounter: ["none", "monster"],
    exits: {
      south: 0,
      east: 3,
      west: 4
    }
  },
  2: {
    name: "Room 2",
    description: "A damp cave with dripping water.",
    encounter: ["none", "monster"],
    exits: {
      north: 0
    }
  },
  3: {
    name: "Room 3",
    description: "A small chamber filled with bones.",
    encounter: ["none", "monster"],
    exits: {
      west: 1
    }
  },
  4: {
    name: "Room 4",
    description: "A hidden room with a locked chest.",
    encounter: ["none", "monster"],
    exits: {
      east: 1
    }
  }
};

// Another forest dungeon (placeholder)
export const forestLocation = {
  0: {
    name: "Forest Dungeon Entrance",
    description: "An ancient ruin hidden beneath the trees.",
    encounter: ["none"],
    exits: {
      north: 1,
      south: "overworld-forest"
    }
  }
};
