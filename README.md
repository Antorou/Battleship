# 🚢 Battleship Game (Node.js + TypeScript)

Welcome to **Battleship**, the classic strategy game — now in your terminal! 🎯  
This simple command-line version lets you either go with randomized ships or fully customize your setup with a JSON file.

## 🛠️ Setup

Make sure you have [Node.js](https://nodejs.org/) and [TypeScript](https://www.typescriptlang.org/) installed.

1. Clone the repo:
   git clone https://github.com/antorou/battleship.git
   cd battleship

2. Compile the TypeScript code:
    tsc index.ts


## 🚢How to Play
You can run the game in Simple or Normal mode using the terminal.

###Simple mode
Ships are placed randomly. You only choose how many ships to play with.

`node index.js --mode simple --number 5`

(--number: How many ships you want to place randomly on the board.)

### Normal Mode
You define ship positions using a JSON file.

`node index.js --mode normal --data ships.json`

(--data: Path to a JSON file that contains ship positions.)

## ❤️ Contributing

Feel free to fork and suggest improvements! Open issues, pull requests, or just share your feedback.

##📜 License
MIT — use it freely!