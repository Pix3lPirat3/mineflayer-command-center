module.exports = function(bot) {

  var command = {
    prefix: '!' || bot.commander.options.prefix,
    cmd: 'inventory',
    usage: '!inventory <item>',
    description: 'Shows you the items in your inventory.',
    handler: handler
  };

  function getCommand() {
    return command;
  }

  async function handler(sender, input, args) {

    var items = args[0] ? bot.inventory.items().filter(i => i.name === args[0]) : bot.inventory.items();
    if (!items) return console.log(`[Drop] I have no items matching ${args[0]}`);

    var prepend = `=======================[ Inventory [${items.length} Items] ]=======================`;

    console.log(prepend)

    console.log(items.map(function(i) {
      var msg = `[${i.slot}] ${i.count}x ${i.displayName} (${i.name})`;
      if (isTool(i)) {
        let durabilityMax = bot.registry.itemsByName[i.name].maxDurability
        let durabilityUsed = i.nbt.value.Damage.value;
        var durabilityLeft = durabilityMax - durabilityUsed;
        msg += ` [Durability: ${durabilityLeft} / ${durabilityMax}]`
      }
      return msg;
    }).join(',\n'))
    
    console.log('='.repeat(prepend.length))

  }

  function isTool(item) {
    if (item.name.includes('sword')) return true
    if (item.name.includes('pickaxe')) return true
    if (item.name.includes('shovel')) return true
    if (item.name.includes('axe')) return true
    if (item.name.includes('hoe')) return true
    return false
  }

  return getCommand;

}