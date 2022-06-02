const { GoalNear, GoalBlock, GoalXZ, GoalY, GoalFollow, GoalPlaceBlock, GoalLookAtBlock } = require('mineflayer-pathfinder').goals

module.exports = function(bot) {

  var command = {
    prefix: '!' || bot.commander.options.prefix,
    cmd: 'click',
    usage: '!click',
    description: 'Used to attack entities',
    handler: handler
  };

  function getCommand() {
    return command;
  }

  async function handler(sender, input, args) {

  }

  return getCommand;

}