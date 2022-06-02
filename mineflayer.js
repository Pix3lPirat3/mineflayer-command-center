var mineflayer = require('mineflayer');
const {
  pathfinder,
  Movements
} = require('mineflayer-pathfinder')
var moment = require('moment');
require('moment-precise-range-plugin');

module.exports = {
  start: function() {

    var accounts = ['Pix3lPirat3']
    var servers = ['localhost']

    var bot = mineflayer.createBot({
      host: servers[0],
      version: '1.18.2',
      username: accounts[0],
      auth: 'microsoft'
    })

    bot.on('kicked', console.log)
    bot.on('error', console.log)

    var sessionStart;
    bot.once('spawn', function() {
      sessionStart = moment(Date.now());

      bot.loadPlugin(pathfinder)

      const defaultMove = new Movements(bot, bot.registry)
      defaultMove.allow1by1towers = false; // Do not build 1x1 towers when going up
      defaultMove.canDig = false;
      bot.pathfinder.setMovements(defaultMove)

      bot.loadPlugin(require('./commander.js'))

      bot.commander.load()
      console.log(`[Spawn] "${bot.username}" has spawned on the server..`)
    })

    bot.on('messagestr', function(message) {
      console.log(message)
    })

    bot.once('end', function(e) {
      if (!sessionStart) return console.log('[Error] Unable to start the client:', e)
      var sessionEnd = moment(Date.now());
      console.log(`[Status] [END] I was online for ${moment.preciseDiff(sessionStart, sessionEnd)}`);
    })

    setInterval(function() {
      var timeDiffString = moment.preciseDiff(sessionStart, Date.now());
      console.log(`[Status] [Running] I have been online for ${timeDiffString}`)
    }, 1000 * 60);

  }
}