const data = [
  {
    title: "General Rules",
    points: [
      "A game is 5 levels long.",
      "Use the available set of moves to move the clock hand.",
      "The clock hand toggles whichever cell it lands on.",
      "The goal is for all lamps to be on.",
    ],
  },
  {
    title: "Points System",
    points: [
      "Each coin gives you 100 points.",
      "Each powerup can be sold for 200 points.",
      "Every move costs 10 points.",
      "Each undo costs 50 points.",
      "Each reset costs 200 points.",
      "Points are lost every second at a rate of one point for each minute.",
    ],
  },
  {
    title: "Lives System",
    points: [
      "Every time the timer runs out, a life will be lost and the timer will reset.",
      "After losing all lives, the game will be over.",
    ],
  },
  {
    title: "Powerups System",
    points: [
      "Powerups will randomly spawn and can be collected and stored in your inventory.",
      "Anytime during your playthrough you can decide to use one of your powerups or sell them.",
      "The HEART powerup gives you a life, useful if you've lost one.",
      "The TIME powerup adds 5 seconds to the level timer for the level AFTER the one you're currently on, useful if you want to prepare ahead.",
    ],
  },
];

export { data };
