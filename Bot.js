var Discord = require('discord.io');
var winston = require('winston');
var auth = require('./auth.json');
var botHelper = require('./helper.js');

// Configure logger settings
const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });
//logger.remove(logger.transports.Console);
//logger.add(logger.transports.Console, {
//    colorize: true
//});
//logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: false
});
logger.info('test');
bot.connect();
logger.info('after connection');
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '?') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        var item = args[1];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                botHelper(bot, channelID);
            break;
            case 'roll':
                var rollNum = (Math.round(Math.random() * 100));
                bot.sendMessage({
                    to: channelID,
                    message: user + " rolled " + rollNum
                });

            break;
            case 'offer':
                bot.sendMessage({
                    to: channelID,
                    message: item + "is being offered up for rolls. Rolling will last for 60 seconds."
                });
                //TODO: Make a method to store usernames with their rolls. Also a 60 second timer.
                setTimeout(Function(), 60000);
            break;
            
            // Just add any case commands if you want to..
         }
     }
});