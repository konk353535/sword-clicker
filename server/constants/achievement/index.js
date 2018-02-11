console.log('importing achievement/crafting.js CRAFTING_ACHIEVEMENTS');
import { CRAFTING_ACHIEVEMENTS } from './crafting';
console.log('importing achievement/magic.js MAGIC_ACHIEVEMENTS');
import { MAGIC_ACHIEVEMENTS } from './magic';
console.log('importing achievement/pq.js PQ_ACHIEVEMENTS');
import { PQ_ACHIEVEMENTS } from './pq';
console.log('importing achievement/tower.js TOWER_ACHIEVEMENTS');
import { TOWER_ACHIEVEMENTS } from './tower';

export const ACHIEVEMENTS = Object.assign(
	CRAFTING_ACHIEVEMENTS,
	MAGIC_ACHIEVEMENTS,
 	PQ_ACHIEVEMENTS,
 	TOWER_ACHIEVEMENTS
);