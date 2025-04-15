import * as fs from 'fs';
import { Grid, ShipData } from './types';

export function placeRandomShips(grid: Grid, numberOfShips: number): void {
  let shipsPlaced = 0;
  while (shipsPlaced < numberOfShips) {
    const x = Math.floor(Math.random() * grid[0].length);
    const y = Math.floor(Math.random() * grid.length);
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
      shipsPlaced++;
    }
  }
}

export function isValidPlacement(grid: Grid, x: number, y: number, length: number, horizontal: boolean): boolean {
  if (horizontal) {
    if (x + length > grid[0].length) return false;
    for (let i = 0; i < length; i++) {
      if (grid[y][x + i] !== 0) return false;
    }
  } else {
    if (y + length > grid.length) return false;
    for (let i = 0; i < length; i++) {
      if (grid[y + i][x] !== 0) return false;
    }
  }
  return true;
}

export function placeShip(grid: Grid, x: number, y: number, length: number, horizontal: boolean): void {
  for (let i = 0; i < length; i++) {
    if (horizontal) grid[y][x + i] = 1;
    else grid[y + i][x] = 1;
  }
}

export function loadGameData(path: string): { ships: ShipData[] } {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Erreur lors de la lecture du fichier JSON:', err);
    process.exit(1);
  }
}
