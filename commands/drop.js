module.exports = function(bot) {

  var command = {
    prefix: '!' || bot.commander.options.prefix,
    cmd: 'drop',
    usage: '!drop <item_name>',
    description: 'Used to drop items in your inventory.',
    handler: handler
  };

  function getCommand() {
    return command;
  }

  async function handler(sender, input, args) {

    var items = bot.inventory.items().filter(i => i.name === args[0]);
    if(!items) return console.log(`[Drop] I have no items matching ${args[0]}`);

    //var tossAmount = isNumeric(args[1]) ? Number(args[1]) : null; // This is simply number of stacks

    console.log(`[Drop] Dropping ${items.length} stack(s) of ${args[0]}`)

    for (var a = 0; a < items.length; a++) {
      var item = items[a];
      await bot.tossStack(item)
    }

  }

  function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

  return getCommand;

}