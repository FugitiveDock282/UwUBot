var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
let ninadScore=0;
let monalisaScore=0;
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
        //remove first element
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            //!score
            case 'score':
                bot.sendMessage({
                    to: channelID,
                    message: `Ninad: ${ninadScore} Monalisa: ${monalisaScore}`
                });
            break;
            //!add
            case 'add':
                let cmd1 = args[0];
                switch(cmd1) {
                    //Ninad
                    case 'ninad' :
                        ninadScore++;
                        bot.sendMessage({
                            to: channelID,
                            message: "Added 1 to Ninad's score!"
                        });
                    break;
                    //Monalisa
                    case 'monalisa' :
                        monalisaScore++;
                        bot.sendMessage({
                            to: channelID,
                            message: "Added 1 to Monalisa's score!"
                        });
                    break;
                    //Wrong syntax
                    default:
                        bot.sendMessage({
                            to: channelID,
                            message: "Wrong syntax. Use !add Ninad or !add Monalisa"
                        });
                }
                
			break;
			default: bot.sendMessage({
				to:channelID,
				message: "Please use either !add [name] or !score"
			});
         }
     }
});