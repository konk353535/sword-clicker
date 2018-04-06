import { Items } from '/imports/api/items/items.js';
import { UserGames } from '/imports/api/users/users.js';
import { Skills } from '/imports/api/skills/skills.js';

export const determineRequiredItems = function determineRequiredItems(recipe) {

  let hasSkillRequirements = false;
  let hasItemRequirements = false;
  let hasConsumeItemRequirements = false;
  let maxCraftable = Infinity;
  let notMet = false;

  const recipeItems = recipe.required.map((requiredItem) => {
    requiredItem.notMet = false;

    if (requiredItem.type === 'gold') {
      const userGame = UserGames.findOne();
      const usersGold = userGame.gold;
      const requiredGold = requiredItem.amount;
      if (usersGold < requiredGold) {
        requiredItem.notMet = true;
        notMet = true;
      } else {
        const requiredItemMaxCraftable = Math.floor(usersGold / requiredGold);
        if (requiredItemMaxCraftable < maxCraftable) {
          maxCraftable = requiredItemMaxCraftable;          
        }
      }
    } else if (requiredItem.type === 'skill') {
      hasSkillRequirements = true;
      const requiredSkill = Skills.findOne({ type: requiredItem.name });
      if (!requiredSkill || requiredSkill.level < requiredItem.level) {
        requiredItem.notMet = true;
        notMet = true;
      }
    } else if (requiredItem.type === 'item') {
      const hasItem = Items.findOne({ itemId: requiredItem.itemId, equipped: false });

      if (!hasItem || hasItem.amount < requiredItem.amount) {
        requiredItem.currentAmount = 0;
        requiredItem.notMet = true;
        notMet = true;
        if (!hasItem) {
          requiredItem.currentAmount = 0;
        } else {
          requiredItem.currentAmount = hasItem.amount;
        }
      } else {
        requiredItem.currentAmount = hasItem.amount;
      }

      if (requiredItem.consumes) {
        hasConsumeItemRequirements = true;
        if (hasItem) {
          const requiredItemMaxCraftable = Math.floor(hasItem.amount / requiredItem.amount);
          if (requiredItemMaxCraftable < maxCraftable) {
            maxCraftable = requiredItemMaxCraftable;          
          }
        }
      } else {
        hasItemRequirements = true;          
      }

    }

    return requiredItem;
  });

  if (notMet) {
    maxCraftable = 0;
  }

  return {
    recipeItems,
    hasSkillRequirements,
    hasConsumeItemRequirements,
    hasItemRequirements,
    maxCraftable,
    notMet
  }
}
