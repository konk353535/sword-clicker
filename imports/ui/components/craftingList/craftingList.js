import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import moment from 'moment';
import _ from 'underscore';

import './craftingList.html';

Template.craftingList.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.craftingList.events({
})

Template.craftingList.helpers({

  miscRecipes() {
    const instance = Template.instance();

    return instance.data.recipes.filter((recipe) => {
      if (recipe.category === 'crafting') {
        if (/bar/.test(recipe.name)) {
          return false;
        } else if (/polished/.test(recipe.name)) {
          return false;
        } else if (/sculpture/.test(recipe.name)) {
          return false;
        } else if (/wall/.test(recipe.name)) {
          return false;
        } else if (/pylon/.test(recipe.name)) {
          return false;
        } else if (/furnace/.test(recipe.name)) {
          return false;
        }
      } else if (_.contains(['mining', 'woodcutting', 'pigment', 'paper', 'book', 'magic_book', 'tome', 'enchantment'], recipe.category)) {
        return false;
      } else if (_.intersection(recipe.tags, ['armor', 'weapon', 'staff', 'amulet']).length > 0) {
        return false;
      }

      return true;
    });
  },

  paperRecipes() {
    const instance = Template.instance();

    return instance.data.recipes.filter((recipe) => {
      return recipe.category === 'paper';
    });
  },

  bookRecipes() {
    const instance = Template.instance();

    return instance.data.recipes.filter((recipe) => {
      return recipe.category === 'book';
    });
  },

  magicBookRecipes() {
    const instance = Template.instance();

    return instance.data.recipes.filter((recipe) => {
      return recipe.category === 'magic_book';
    });
  },

  pigmentRecipes() {
    const instance = Template.instance();

    return instance.data.recipes.filter((recipe) => {
      return recipe.category === 'pigment';
    });
  },

  pigmentRecipes() {
    const instance = Template.instance();

    return instance.data.recipes.filter((recipe) => {
      return recipe.category === 'pigment';
    });
  },

  enchantmentRecipes() {
    const instance = Template.instance();

    return instance.data.recipes.filter((recipe) => {
      return recipe.category === 'enchantment';
    });
  },

  enchantmentArmorRecipes() {
    const instance = Template.instance();

    return instance.data.recipes.filter((recipe) => {
      return _.contains(recipe.tags, 'enchant_armor');
    });
  },

  abilityRecipes() {
    const instance = Template.instance();

    return instance.data.recipes.filter((recipe) => {
      return recipe.category === 'tome';
    });
  },

  barRecipes() {
    const instance = Template.instance();

    return instance.data.recipes.filter((recipe) => {
      return recipe.category === 'crafting' && /bar/.test(recipe.name);
    });
  },

  goldRecipes() {
    const instance = Template.instance();

    return instance.data.recipes.filter((recipe) => {
      return recipe.category === 'crafting' && (/polished/.test(recipe.name) || /sculpture/.test(recipe.name));
    });
  },

  xpRecipes() {
    const instance = Template.instance();

    return instance.data.recipes.filter((recipe) => {
      return recipe.category === 'crafting' && (/wall/.test(recipe.name) || /pylon/.test(recipe.name));
    });
  },

  furnaceRecipes() {
    const instance = Template.instance();

    return instance.data.recipes.filter((recipe) => {
      return recipe.category === 'crafting' && /furnace/.test(recipe.name);
    });
  },

  miningRecipes() {
    const instance = Template.instance();

    return instance.data.recipes.filter((recipe) => {
      return recipe.category === 'mining';
    });
  },

  woodcuttingRecipes() {
    const instance = Template.instance();

    return instance.data.recipes.filter((recipe) => {
      return recipe.category === 'woodcutting';
    });
  },

  armorRecipes() {
    const instance = Template.instance();

    return instance.data.recipes.filter((recipe) => {
      return _.contains(recipe.tags, 'armor');
    });
  },

  weaponRecipes() {
    const instance = Template.instance();

    return instance.data.recipes.filter((recipe) => {
      return _.contains(recipe.tags, 'weapon');
    });
  },

  isInscription() {
    return Template.instance().data.isInscription;
  },

  staffRecipes() {
    const instance = Template.instance();

    return instance.data.recipes.filter((recipe) => {
      return _.contains(recipe.tags, 'staff');
    });
  },

  amuletRecipes() {
    const instance = Template.instance();

    return _.sortBy(instance.data.recipes.filter((recipe) => {
      return _.contains(recipe.tags, 'amulet');
    }), 'xp');
  }
});
