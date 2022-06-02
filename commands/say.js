module.exports = function(bot) {

  var command = {
    prefix: '!' || bot.commander.options.prefix,
    cmd: 'say',
    usage: '!say <message>',
    description: 'Say a message in chat.',
    handler: handler
  };

  function getCommand() {
    return command;
  }

  async function handler(sender, input, args) {
  	if(input.trim() === '!say') return console.log(`[Say] You must input a message to send..`);
  	var message = input.substr(input.indexOf(" ") + 1);
    console.log(`[Say] Sending the message "/${message}"`)
  	bot.chat(message)
  }

  return getCommand;

}