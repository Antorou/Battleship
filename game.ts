import { Grid, ShipData } from './types';
import { createGrid, printGrid, isGameOver } from './grid';
import { placeRandomShips, loadGameData, isValidPlacement, placeShip } from './ships';
import { ask, closeInterface } from './input';

export async function manualPlacement(grid: Grid, ships: ShipData[]): Promise<void> {
  for (const ship of ships) {
    for (let i = 0; i < ship.quantity; i++) {
      let placed = false;
      while (!placed) {
        console.log(`Placer: ${ship.name} (taille ${ship.length})`);
        const input = await ask('Entrez x,y orientation(h/v) (ex: 3,2 h): ');
        const [coord, orientation] = input.split(' ');
        const [xStr, yStr] = coord?.split(',') ?? [];
        const x = parseInt(xStr, 10);
        const y = parseInt(yStr, 10);
        const horizontal = orientation === 'h';

        if (Number.isNaN(x) || Number.isNaN(y)) {
          console.log('Coordonnées invalides.');
          continue;
        }

        if (!isValidPlacement(grid, x, y, ship.length, horizontal)) {
          console.log('Placement invalide, réessayez.');
          continue;
        }

        placeShip(grid, x, y, ship.length, horizontal);
        placed = true;
      }
    }
  }
}

export async function startGame(): Promise<void> {
  const args = process.argv.slice(2);
  let mode = 'simple';
  let number = 3;
  let dataFile: string | null = null;

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--mode':
        mode = args[i + 1];
        i++;
        break;
      case '--number':
        number = parseInt(args[i + 1], 10);
        i++;
        break;
      case '--data':
        dataFile = args[i + 1];
        i++;
        break;
      default:
        console.warn(`Argument inconnu ignoré: ${args[i]}`);
        break;
    }
  }

  const grid1 = createGrid();
  const grid2 = createGrid();

  if (mode === 'normal') {
    if (!dataFile) {
      console.error('Fichier JSON requis pour le mode normal.');
      process.exit(1);
    }
    const gameData = loadGameData(dataFile);
    console.log('Placement des bateaux pour Joueur 1:');
    await manualPlacement(grid1, gameData.ships);
    console.log('Placement des bateaux pour Joueur 2:');
    await manualPlacement(grid2, gameData.ships);
  } else {
    placeRandomShips(grid1, number);
    placeRandomShips(grid2, number);
  }

  let currentPlayer = 1;
  let isOver = false;

  while (!isOver) {
    const attacker = currentPlayer;
    const defenderGrid = attacker === 1 ? grid2 : grid1;

    console.log(`\nGrille ennemie du Joueur ${attacker}:`);
    printGrid(defenderGrid, true);

    const input = await ask(`Joueur ${attacker}, entrez x y ou x,y : `);
    const [xStr, yStr] = input.split(/\s|,/);
    const x = parseInt(xStr, 10);
    const y = parseInt(yStr, 10);

    if (Number.isNaN(x) || Number.isNaN(y)) {
      console.log('Coordonnées invalides...');
      continue;
    }

    const result = attack(defenderGrid, x, y);
    console.log(result);

    if (isGameOver(defenderGrid)) {
      console.log(`\n=== Joueur ${attacker} a gagné ! Tous les bateaux ennemis sont coulés. ===`);
      isOver = true;
    } else {
      currentPlayer = currentPlayer === 1 ? 2 : 1;
    }
  }

  closeInterface();
}

function attack(grid: Grid, x: number, y: number): string {
  const EMPTY = 0;
  const SHIP = 1;
  const HIT = 2;
  const MISS = 3;

  if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
    return 'Coordonnées hors limites !';
  }
  if (grid[y][x] === SHIP) {
    grid[y][x] = HIT;
    return 'Touché !';
  } if (grid[y][x] === EMPTY) {
    grid[y][x] = MISS;
    return 'Raté !';
  }
  return 'Tu as déjà attaqué ici...';
}
