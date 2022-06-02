module.exports = function(bot) {

  var command = {
    prefix: '!' || bot.commander.options.prefix,
    cmd: 'cmd',
    usage: '!cmd <cmd>',
    description: 'Say a command in chat, same as !say, just prepends a /',
    handler: handler
  };

  function getCommand() {
    return command;
  }

  async function handler(sender, input, args) {
  	if(input.trim() === '!cmd') return console.log(`[Say] You must input a command to send..`);
  	var command = input.substr(input.indexOf(" ") + 1);
    console.log(`[Cmd] Sending the command "/${command}"`)
  	bot.chat(`/${command}`)
  }

  return getCommand;

}