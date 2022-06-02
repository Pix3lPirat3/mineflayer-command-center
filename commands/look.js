const { GoalNear, GoalBlock, GoalXZ, GoalY, GoalFollow, GoalPlaceBlock, GoalLookAtBlock } = require('mineflayer-pathfinder').goals

module.exports = function(bot) {

  var command = {
    prefix: '!' || bot.commander.options.prefix,
    cmd: 'look',
    usage: '!look',
    description: 'Used to look at positions or entities',
    handler: handler
  };

  function getCommand() {
    return command;
  }

  async function handler(sender, input, args) {
    if(args.length === 1) {
      if(args[0] === 'north') return await bot.lookAt(0, 0, false);
      // TODO: Complete
    }


  	var target = bot.players[args[0]]?.entity;
  	if(!target) return console.log(`I cannot see the player "${args[0]}"`)

  }

  return getCommand;

}