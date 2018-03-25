
export const STORAGE = {
  costs(level, log) {
    const rawLogName = log.split('_')[0];
    return [{
      type: 'item',
      itemId: log,
      icon: `${rawLogName}Log.png`,
      name: rawLogName,
      amount: (level * 5) + 5,
      consumes: true
    }];
  }
}
