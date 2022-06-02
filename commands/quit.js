module.exports = function(bot) {

  var command = {
    prefix: '!' || bot.commander.options.prefix,
    cmd: 'quit',
    usage: '!quit',
    description: 'Gracefully disconnects from the server',
    handler: handler
  };

  function getCommand() {
    return command;
  }

  async function handler(sender, input, args) {
  	console.log(`[Quit] Gracefully disconnecting from the server..`);
  	bot.quit();
  }

  return getCommand;

}