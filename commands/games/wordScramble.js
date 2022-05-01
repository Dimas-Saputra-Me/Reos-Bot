const { Message, Client } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "wordscramble",
    aliases: ['ws'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (args.length === 0) { // Default mode
            const response = await fetch(
                `https://random-word-api.herokuapp.com/word?number=1`,
            );
            const data = await response.json();

            const answer = data[0];
            const answerScramble = data[0].shuffle();
            let userWord = [];
            let countTry = 0;

            // Board Output
            let output = ' ';
            for (let i = 0; i < answerScramble.length; i++) {
                output += answerScramble[i] + ' ';
            }

            const m = await message.channel.send(`**Word Scramble**\n<@${message.author.id}>\nThe word is \`${output}\``);

            const filter = (i) => {
                if (i.author.bot) return false; // Ignore bot message

                if (i.author.id !== message.author.id) return false; // Ignore other player message

                if (!(userWord.includes(i.content.toLowerCase()))) { // Ignore word answered before
                    return true;
                } else {
                    i.reply({
                        content: `You didnt even remember you already answer this, how you could win this haha :P`,
                    }).then(msg => {
                        setTimeout(() => {
                            msg.delete();
                        }, 3000);
                    });
                    return false;
                }
            }

            const collector = m.channel.createMessageCollector({ filter, time: 120000 })

            collector.on('collect', (i) => {

                //Check if user answer is correct
                if (i.content.toLowerCase() === answer) {
                    m.reply(`**Word Scramble**\n<@${message.author.id}> You WIN! with ${countTry} tries`)
                    collector.stop('game-end');
                    return;
                }

                //Wrong answer
                countTry++;
                userWord = userWord.concat(i.content.toLowerCase());
                m.edit(`**Word Scramble**\n<@${message.author.id}>\nThe word is \`${output}\`\nYou tries ${countTry} times`)
                collector.resetTimer();
            })

            collector.on('end', (collection, reason) => {
                if (reason === 'time') {
                    m.reply('You ran out of time');
                }
            })

        } else if (args[0] === 'custom') { // Custom word mode

            user = client.users.cache.get(message.author.id);

            const m = await user.send(`**HANGMAN**\nInput your word :`).catch(() => {
                message.reply(`I cant send DM to you, you have DM closed`);
            })

            const channel = client.channels.cache.get(m.channelId);

            const filter = m => {

                if (m.author.bot) return false; // Ignore bot message

                if (m.content.includes(' ')) { // Ignore if user sends two or more words
                    m.reply('You cant input two or more words, you have to input one word without a space');
                    return false;
                }

                if (/\d/.test(m.content)) { // Ignore if user input a number
                    m.reply('You cant input a number')
                    return false;
                }

                return true;
            };
            const collector = channel.createMessageCollector({ filter, time: 30000, max: 1 });
            collector.on('collect', message => {

            });
            collector.on('end', (message, reason) => {
                if (reason === 'time') {
                    m.edit('You ran out of time');
                    return;
                }

                wordScrambleCustom(message.first().content.toLowerCase());
            });

            async function wordScrambleCustom(word) {
                const answer = word;
                const answerScramble = word.shuffle();
                let userWord = [];
                let countTry = 0;

                // Board Output
                let output = ' ';
                for (let i = 0; i < answerScramble.length; i++) {
                    output += answerScramble[i] + ' ';
                }

                const m = await message.channel.send(`**Word Scramble**\nWord by : ${message.author.username}\nThe word is \`${output}\``);

                const filter = (i) => {
                    if (i.author.bot) return false; // Ignore bot message

                    if (i.author.id === message.author.id) return false; // Ignore custom word maker user message

                    if (!(userWord.includes(i.content.toLowerCase()))) { // Ignore word answered before
                        return true;
                    } else {
                        i.reply({
                            content: `You didnt even remember you already answer this, how you could win this haha :P`,
                        }).then(msg => {
                            setTimeout(() => {
                                msg.delete();
                            }, 3000);
                        });
                        return false;
                    }
                }

                const collector = m.channel.createMessageCollector({ filter, time: 120000 })

                collector.on('collect', (i) => {

                    //Check if user answer is correct
                    if (i.content.toLowerCase() === answer) {
                        m.reply(`**Word Scramble**\n<@${i.author.id}> You WIN! with ${countTry} tries`)
                        collector.stop('game-end');
                        return;
                    }

                    //Wrong answer
                    countTry++;
                    userWord = userWord.concat(i.content.toLowerCase());
                    m.edit(`**Word Scramble**\nWord by : ${message.author.tag}\nThe word is \`${output}\`\nYou tries ${countTry} times`)
                })

                collector.on('end', (collection, reason) => {
                    if (reason === 'time') {
                        m.reply('You ran out of time');
                    }
                })
            }

        } else if (args[0] === 'race') { //Race mode
            const response = await fetch(
                `https://random-word-api.herokuapp.com/word?number=1`,
            );
            const data = await response.json();

            const answer = data[0];
            const answerScramble = data[0].shuffle();
            let userWord = [];
            console.log(answer);

            // Board Output
            let output = ' ';
            for (let i = 0; i < answerScramble.length; i++) {
                output += answerScramble[i] + ' ';
            }

            const m = await message.channel.send(`**Word Scramble**\nRACE MODE\nThe word is \`${output}\``);

            const filter = (i) => {
                if (i.author.bot) return false; // Ignore bot message

                if (!(userWord.includes(i.content.toLowerCase()))) { // Ignore word answered before
                    return true;
                } else {
                    i.reply({
                        content: `You didnt even remember you already answer this, how you could win this haha :P`,
                    }).then(msg => {
                        setTimeout(() => {
                            msg.delete();
                        }, 3000);
                    });
                    return false;
                }
            }

            const collector = m.channel.createMessageCollector({ filter, time: 120000 })

            collector.on('collect', (i) => {

                //Check if user answer is correct
                if (i.content.toLowerCase() === answer) {
                    m.reply(`**Word Scramble**\nRACE MODE\n<@${i.author.id}> You WIN!`)
                    collector.stop('game-end');
                    return;
                }

                //Wrong answer
                userWord = userWord.concat(i.content.toLowerCase());
                m.edit(`**Word Scramble**\nRACE MODE\nThe word is \`${output}\``)
                collector.resetTimer();
            })

            collector.on('end', (collection, reason) => {
                if (reason === 'time') {
                    m.reply('You ran out of time');
                }
            })


        } else {
            message.reply('Game Mode doesnt exist')
        }
    },
};


/* Local */

String.prototype.shuffle = function () {
    var a = this.split(""),
        n = a.length;

    for (var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}