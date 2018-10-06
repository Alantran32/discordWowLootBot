module.exports = var helperSpace = {
                    function (bot, channelID) {
                        bot.sendMessage({
                            to: channelID,
                            message: 'Pong!'
                        });
                    }
                }