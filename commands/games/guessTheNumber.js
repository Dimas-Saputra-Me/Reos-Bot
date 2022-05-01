const { Message, Client } = require("discord.js");

module.exports = {
    name: "gtn",
    aliases: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let tryCount = 0;

        const m = message.reply(`**Guess The Number**\n<@${message.author.id}>\nGuess The Number between 1 to 100`)
        const answer = Math.floor(Math.random() * 100) + 1;

        const filter = (interraction) => {
            //Ignore bot interraction
            if(interraction.author.bot){
                return false;
            } 

            if(interraction.author.id == message.author.id){
                return true;
            } else {
                return false;
            }
        }
        const collector = message.channel.createMessageCollector({ filter, time: 120000 });

        collector.on('collect', m => {
            if(parseInt(m.content) < 1 || parseInt(m.content) > 100){
                message.reply('I said between 1 to 100 :<');
            } else if(parseInt(m.content) > answer){
                message.reply('Your number is too high');
            } else if(parseInt(m.content) < answer){
                message.reply('Your number is too low');
            } else if(parseInt(m.content) === answer){
                collector.stop(`game-end`);
            } else {
                message.reply('What kind of input is that lol, we only accept number');
            }
            tryCount++;
        });

        collector.on('end', (collected, reason) => {
            if (reason && reason === `game-end`) {
                message.reply(`**Guess The Number**\n<@${message.author.id}>\nCongratulations the number is ${answer}, with ${tryCount} tries`);
            } else if(reason === 'time'){
                message.reply('You ran out of time');
            } else {
                message.reply('Collector has NOT been stopped manually');
            }
        });
    },
};
