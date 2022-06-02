const path = require('path');
var utils = require(`${path.dirname(require.main.filename)}/utils.js`);

module.exports = function(bot) {

  var command = {
      prefix: '!' || bot.commander.options.prefix,
      cmd: 'mine',
      usage: '!mine (Mines the block in front of you)',
      description: 'Used to mine the block(s) in front of you.',
      handler: handler
    };

  function getCommand() {
    return command;
  }

  function handler(sender, input) {
    var mineCount = 0;

    async function dig() {
      var pickaxes = bot.inventory.items().filter(i => i.name.includes('pickaxe') && getRemainingDurability(i) > 10);

      // Eat
      var foodList = bot.registry.foodsByName
      const foodItems = bot.inventory.items().filter((item) => item.name in foodList).sort((a, b) => foodList[b.name]['foodPoints'] - foodList[a.name]['foodPoints'])
      if(bot.food < 12 && !foodItems.length) {
        return utils.notify('Miner Task', 'I am out of food.')
        console.log(`[Mine] I am out of food. Leaving the server.`)
        process.exit();
      }
      if(bot.food < 12) {
        let food = foodItems[0];
        console.log('I NEED FOOD.')
        await bot.equip(food)
        await bot.consume();
      }

      // End Eat

      if (bot.food < 2) process.exit(); // I don't want the bot to starve to death..
      if (!pickaxes.length) return utils.notify('Miner Task', 'I have 0 viable pickaxes left.')

      if(!pickaxes.includes(bot.heldItem)) await bot.equip(pickaxes[0])

      var block = bot.blockAtCursor(4);
      if (!block) return setTimeout(function() {
        dig();
      }, 100);
      await bot.dig(block, 'ignore', 'raycast') // 2nd param: true to 'snap at block' or 'ignore' to just not turn head
      mineCount++
      if (mineCount % 25 == 0) {
        var pickaxeCount = bot.inventory.items().filter(i => i.name.includes('pickaxe')).length;
        console.log(`I have mined ${mineCount} cobblestone. I have ${pickaxes.length} viable pickaxes left.`)
      }
      dig()
    }

    dig()

  }

  function getRemainingDurability(item) {
    if (!item) return 0;
    let durabilityMax = bot.registry.itemsByName[item.name].maxDurability
    let durabilityUsed = item.nbt.value.Damage.value;
    var durabilityLeft = durabilityMax - durabilityUsed;
    return durabilityLeft;
  }

  return getCommand;

}