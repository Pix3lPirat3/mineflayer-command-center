var fs = require('fs');

var command_files = fs.readdirSync(`${__dirname}/commands`).filter(file => file.endsWith('.js'));

module.exports = function(bot) {

  bot.commander = {
    options: {
      prefix: '!'
    },
    masters: ['WhatTheMeh'], // Used to set who can use commands, default is EVERYONE
    commands: []
  }

  bot.commander.load = function(files) {
    if (!files || files === 'all') {

      for (var a = 0; a < command_files.length; a++) {
        var cmd = require(`${__dirname}/commands/${command_files[a]}`)(bot)()
        bot.commander.commands.push(cmd) // { prefix: '!', cmd: 'mine', handler: func }
        console.log(`[DEBUG] Commander grabbed the command "${cmd.prefix}${cmd.cmd} | ${cmd.description}"`)
      }

    }
  }

  bot.on('chat', function(username, message) {
    if(username === bot.username) return;
    var command = bot.commander.commands.filter(cmd => message.startsWith(cmd.prefix) && message.slice(1).split(' ')[0] === cmd.cmd)[0]    
    if (!command) return; //console.log('There was no matched command.'); // There was no matched commands

    console.log(`[Command] "${username}" triggered command "${command.cmd}"`)
    var args = message.slice(command.prefix).trim().split(/ +/g).slice(1);
    if (!bot.commander.masters.length) return command.handler(username, message, args) // There are no masters 

    // There was at least 1 master loaded..
    if(!bot.commander.masters.includes(username)) return console.log(`"${username}" is not a master..`);
    if (bot.commander.masters.includes(username)) return command.handler(username, message, args);

  })

  const readline = require('node:readline')
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on("line", (message) => {
    try {

    var command = bot.commander.commands.filter(cmd => message.startsWith(cmd.prefix) && message.slice(1).split(' ')[0] === cmd.cmd)[0]    
      //if(!command) return; // There was no matched commands
      if (command) return command.handler('CONSOLE', message, message.slice(command.prefix).trim().split(/ +/g).slice(1))

      switch (message) {
        case 'mine':

        default:
          try {
          	console.log('Eval:')
            var results = eval(message)
            console.log(results)
          } catch (e) {
            console.log(e)
          }
      }
    } catch (e) {
      console.log(e)
    }
  })

}