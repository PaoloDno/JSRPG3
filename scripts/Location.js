import { processEncounter } from "./Monster.js";

// Main location handler
export function processLocation(locations, location, app, bot, ui) {
  app.innerHTML = `
    <div class="full flex column center">
      <h1>${location.name}</h1>
      <p>${location.description}</p>
      <div class="exits"></div>
    </div>
  `;

  bot.innerHTML = `<div class="flex full"></div>`;

  processEncounter(app, location.encounter || ["none"], location.monsterLvl, () => {
    // process Encoutner fight
    renderExits(app.querySelector(".exits"), locations, location.exits, bot, (next) => {
    
      processLocation(locations, next, app, bot, ui);
    });
  });
}

// Exit Renderer
function renderExits(container, locations, exits, bot, onMove) {
  container.innerHTML = `<h3>Exits</h3>`;

  const exitButtons = Object.keys(exits)
    .map(dir => `<button data-dir="${dir}">${dir}</button>`)
    .join("");

  bot.innerHTML = `
    <div class="control-panel">
      ${exitButtons}
    </div>
  `;

  bot.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const dir = btn.getAttribute("data-dir");
      const exit = exits[dir];

      // special exits (switch map)
      if (exit === "overworld-forest") {
        onMove(worldLocations[1]); // back to overworld
        return;
      }
      if (exit === "guildDungeon") {
        onMove(guildDungeonLocation[0]);
        return;
      }
      if (exit === "forestDungeon") {
        onMove(forestLocation[0]);
        return;
      }

      // normal dungeon/world movement
      if (locations[exit]) {
        onMove(locations[exit]);
      }
    });
  });
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
    },
    monsterLvl: 0
    
  },
  1: {
    name: "Room 1",
    description: "A narrow corridor with strange carvings.",
    encounter: ["none", "monster"],
    exits: {
      south: 0,
      east: 3,
      west: 4
    },
    monsterLvl: 0
  },
  2: {
    name: "Room 2",
    description: "[hallway 1st-floor].",
    encounter: ["none", "monster"],
    exits: {
      north: 0
    },
    monsterLvl: 0
  },
  3: {
    name: "Room 3",
    description: "[A small chamber-1st floor]",
    encounter: ["none", "monster", "monster"],
    exits: {
      west: 1,
    },
    monsterLvl: 1
  },
  4: {
    name: "Room 4",
    description: "[Empty room - 1st floor]",
    encounter: ["none", "monster", "monster"],
    exits: {
      east: 1,
      north: 5
    },
    monsterLvl: 0
  },
  5: {
    name: "Room 5",
    description: "[narrow hallway - 1st floor]",
    encounter: ["none"],
    exits: {
      east: 6,
      south: 4,
      north: 7
    },
    monsterLvl: 0
  },
  6: {
    name: "Room 6",
    description: "[empty room - 1st floor]",
    encounter: ["none"],
    exits: {
      east: 9,
      west: 5
    },
    monsterLvl: 0
  },
  7: {
    name: "Room 7",
    description: "[Staircase - Balcony  - 1st floor]",
    encounter: ["none"],
    exits: {
      east: 8,
      south: 5
    },
    monsterLvl: 0
  },
  8: {
    name: "Room 8",
    description: "[Staircase - Balcony  - 1st floor]",
    encounter: ["none"],
    exits: {
      east: 8,
      south: 5
    },
    monsterLvl: 0
  },
  9: {
    name: "Room 9",
    description: "[Corner Room  - 1st floor]",
    encounter: ["none", "monster"],
    exits: {
      west: 6,
      south: 10
    },
    monsterLvl: 2
  },
  10: {
    name: "Room 10",
    description: "[Mezzanines - 1st floor]",
    encounter: ["none"],
    exits: {
      east: 11,
      north: 9,
      south: 3
    },
    monsterLvl: 2
  },
  11: {
    name: "Room 10",
    description: "[Boss Room - 1st floor]",
    encounter: ["none"],
    exits: {
      east: 10
    },
    monsterLvl: 2
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
    },
    monsterLvl: 0
  }
};
