var sessionManager = require('../mineflayer.js')

module.exports = function(bot) {

  var command = {
    prefix: '!' || bot.commander.options.prefix,
    cmd: 'relog',
    usage: '!relog',
    description: 'Disconnects and connects to the server.',
    handler: handler
  };

  function getCommand() {
    return command;
  }

  async function handler(sender, input, args) {
  	console.log(`[Relog] Gracefully disconnecting from the server..`);
  	if(bot.entity) bot.quit();
  	console.log(`[Relog] Connecting to the server..`);
  	sessionManager.start()
  }

  return getCommand;

}