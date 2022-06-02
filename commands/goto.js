const { GoalNear, GoalBlock, GoalXZ, GoalY, GoalFollow, GoalPlaceBlock, GoalLookAtBlock } = require('mineflayer-pathfinder').goals

module.exports = function(bot) {

  var command = {
    prefix: '!' || bot.commander.options.prefix,
    cmd: 'goto',
    usage: '!goto <player|xyz>',
    description: 'Used to navigate to players and coordinates.',
    handler: handler
  };

  function getCommand() {
    return command;
  }

  async function handler(sender, input, args) {
  	if(args.length === 1) {
  		var target = bot.players[args[0]]?.entity;
  		if(!target) return console.log(`[Goto] I cannot see a player named "${args[0]}"`);
  		console.log(`[Goto] Going to "${target.username}"`)
  		var pos = target.position;
      try {
  		  await bot.pathfinder.goto(new GoalBlock(pos.x, pos.y, pos.z));
  		  await bot.look(target.yaw, target.pitch, false);
      } catch (e) {
        console.log(`[Goto] There was an issue completing my path..`);
      }

  	}

  	if(args.length === 2) {
  		// Specified !goto x z
  	}

  	if(args.length === 3) {
  		// Specified !goto x y z
  	}


  }

  function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

  return getCommand;

}