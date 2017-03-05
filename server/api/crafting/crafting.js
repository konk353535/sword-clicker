import { Meteor } from 'meteor/meteor';
import { Crafting } from '/imports/api/crafting/crafting';
import { Users } from '/imports/api/users/users';
import { Skills } from '/imports/api/skills/skills';

import { CRAFTING } from '/server/constants/crafting.js';
import { ITEMS } from '/server/constants/items.js';

Meteor.methods({
  'crafting.craftItem'(recipeId, amount) {
    
  },

  'crafting.fetchRecipes'(craftingLevel) {
    const craftingSkill = Skills.findOne({
      owner: Meteor.userId(),
      type: 'crafting'
    });

    const recipesArray = Object.keys(CRAFTING.recipes).map((craftingKey) => {
      const recipeConstant = CRAFTING.recipes[craftingKey];
      const itemConstant = ITEMS[recipeConstant.produces];
      recipeConstant.icon = itemConstant.icon;
      recipeConstant.description = itemConstant.description;
      return recipeConstant;
    }).filter((recipe) => {
      // Only show recipes we can craft, or recipes close to what we can craft ( 1 level away )
      if (craftingSkill.level + 1 >= recipe.requiredCraftingLevel) {
        return true;
      }

      return false;
    });

    return recipesArray;
  }
});
