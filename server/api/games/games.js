import { Games } from '/imports/api/games/games';
import { Users, UserGames } from '/imports/api/users/users';
import { Floors } from '/imports/api/floors/floors';

export const createGame = function createGame(name, owner, mainGame = false) {
  const gameId = Games.insert({
    name,
    mainGame,
    members: owner ? [owner] : []
  });

  // Create associated first floor
  Floors.insert({
    game: gameId,
    createdAt: new Date(),
    floor: 1,
    points: 0,
    pointsMax: 1000,
    health: 1000,
    healthMax: 1000,
    floorComplete: false
  });
}
