import { Grid } from './types';

export const GRID_SIZE = 8;

export function createGrid(): Grid {
  return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
}

const WATER = 0;
const SHIP = 1;
const HIT = 2;
const MISS = 3;

export function printGrid(grid: Grid, hideShips = false): void {
  console.log('   0 1 2 3 4 5 6 7');
  console.log('  -----------------');
  for (let y = 0; y < GRID_SIZE; y++) {
    let row = `${y} |`;
    for (let x = 0; x < GRID_SIZE; x++) {
      const cell = grid[y][x];
      if ((cell === SHIP && hideShips) || cell === WATER) row += ' ~';
      else if (cell === HIT) row += ' X';
      else if (cell === MISS) row += ' o';
      else if (cell === SHIP) row += ' S';
    }
    console.log(row);
  }
}

export function isGameOver(grid: Grid): boolean {
  return !grid.some((row) => row.includes(1));
}
