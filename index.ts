import { startGame } from './game';

startGame().catch((err) => {
  console.error('Erreur lors du lancement du jeu:', err);
  process.exit(1);
});
