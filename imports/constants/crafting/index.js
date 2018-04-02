export const getMaxCrafts = function getMaxCrafts(craftingLevel) {
  let maxCrafts = 2;

  if (craftingLevel >= 5) {
    maxCrafts = 3;
  }

  if (craftingLevel >= 15) {
    maxCrafts = 4;
  }

  if (craftingLevel >= 35) {
    maxCrafts = 5;
  }

  if (craftingLevel >= 60) {
    maxCrafts = 6;
  }

  return maxCrafts;
};
