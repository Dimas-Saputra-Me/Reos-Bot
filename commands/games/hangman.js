const { Message, Client } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "hangman",
    aliases: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (args[0] === undefined) { //Random words
            const arrHangman = ["+---------+\n                 |\n                 |\n                 |\n                 |\n                 |\n==========", "+---------+\n       |         |\n                 |\n                 |\n                 |\n                 |\n==========", "+---------+\n       |         |\n      O        |\n                 |\n                 |\n                 |\n==========", "+--------+\n       |        |\n      O       |\n    /          |\n                 |\n                 |\n==========", "+--------+\n       |        |\n      O       |\n    / |        |\n                 |\n                 |\n==========", "+--------+\n       |        |\n      O       |\n    / | \\     |\n                 |\n                 |\n==========", "+--------+\n       |        |\n      O       |\n    / | \\     |\n     /          |\n                 |\n==========", "+--------+\n       |        |\n      O       |\n    / | \\     |\n     / \\      |\n                 |\n=========="]
            let answerChars = [];
            let userChars = []
            let outputChars = [];
            let life = 7;

            const response = await fetch(
                `https://random-word-api.herokuapp.com/word?number=1`,
            );
            const data = await response.json();

            for (var i = 0; i < data[0].length; i++) {
                answerChars.push(data[0][i]);
            }
            outputChars = new Array(data[0].length).fill('_');

            const m = await message.channel.send({ content: "**HANGMAN**\n" + arrHangman[7 - life] + "\n\n`" + outputChars.map(i => { return i + " " }).join(' ') + "`" })

            const filter = (i) => {
                if (!i.author.bot) {// To check if message sent not by a bot

                    if (i.content.length === 1) {// To message is a character

                        if (!userChars.includes(i.content.toLowerCase())) {//To check if message character already answered before
                            return true;
                        } else {
                            i.reply({
                                content: `You didnt even remember you already answer this, how you could win this haha :P`,
                            }).then(msg => {
                                setTimeout(() => {
                                    msg.delete();
                                }, 3000);
                            });
                        }

                    } else {
                        i.reply({
                            content: `You can only send a character!`,
                        }).then(msg => {
                            setTimeout(() => {
                                msg.delete();
                            }, 5000);
                        });
                    }
                }
            };

            const collector = m.channel.createMessageCollector({ filter, time: 120000 });

            collector.on('collect', i => {
                if (answerChars.includes(i.content.toLowerCase())) {// If the answer correct
                    const unAnsweredChars = answerChars.map((char, index) => {
                        if (char == i.content.toLowerCase()) {
                            outputChars[index] = i.content.toLowerCase();
                            userChars = userChars.concat(i.content.toLowerCase());
                            return "-";
                        }
                        return char;
                    });

                    //Update answerChars
                    answerChars = unAnsweredChars;

                } else { //If the answer incorrect
                    userChars = userChars.concat(i.content.toLowerCase());
                    life -= 1;
                }

                //Check if all chars already answered
                if (answerChars.every((char) => char === "-")) {
                    m.edit({ content: "**HANGMAN**\n" + arrHangman[7 - life] + "\n\n`" + outputChars.map(i => { return i + " " }).join(' ') + "`" })
                    m.reply({ content: "**HANGMAN**\n" + "**You Win!**\nThe answer is `" + outputChars.map(i => { return i + " " }).join(' ') + "`" })
                    collector.stop('game-end');
                    return;
                }

                //Check if user lose and doesnt have more life
                if (life === 0) {
                    //Update outputChars
                    answerChars.forEach((char, index) => {
                        if (char !== '-') {
                            outputChars[index] = char;
                        }
                        return;
                    })


                    m.reply({ content: "**HANGMAN**\n" + "**You Lose! haha :P**\nThe answer is `" + outputChars.map(i => { return i + " " }).join(' ') + "`" })
                    collector.stop('game-end');
                    return;
                }



                m.edit({ content: "** HANGMAN **\n" + arrHangman[7 - life] + "\n\n`" + outputChars.map(i => { return i + " " }).join(' ') + "`" })
            });

            collector.on('end', (collection, reason) => {
                if (reason === 'time') {
                    m.reply({ content: "You ran out of time" });
                }
            });
        } else if(args[0] === 'custom') { // Custom word from user
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

                hangman(message.first().content.toLowerCase());
            });


            async function hangman(userWord) {
                /* HANGMAN */
                const arrHangman = ["+---------+\n                 |\n                 |\n                 |\n                 |\n                 |\n==========", "+---------+\n       |         |\n                 |\n                 |\n                 |\n                 |\n==========", "+---------+\n       |         |\n      O        |\n                 |\n                 |\n                 |\n==========", "+--------+\n       |        |\n      O       |\n    /          |\n                 |\n                 |\n==========", "+--------+\n       |        |\n      O       |\n    / |        |\n                 |\n                 |\n==========", "+--------+\n       |        |\n      O       |\n    / | \\     |\n                 |\n                 |\n==========", "+--------+\n       |        |\n      O       |\n    / | \\     |\n     /          |\n                 |\n==========", "+--------+\n       |        |\n      O       |\n    / | \\     |\n     / \\      |\n                 |\n=========="]
                let answerChars = [];
                let userChars = []
                let outputChars = [];
                let life = 7;

                for (var i = 0; i < userWord.length; i++) {
                    answerChars.push(userWord[i]);
                }
                outputChars = new Array(userWord.length).fill('_');

                const m = await message.channel.send({ content: "**HANGMAN**\n" + `**Word by : ${message.author.tag}**\n` + arrHangman[7 - life] + "\n\n`" + outputChars.map(i => { return i + " " }).join(' ') + "`" })

                const filter = (i) => {
                    if (!i.author.bot) {// To check if message sent not by a bot

                        if (i.content.length === 1) {// To message is a character

                            if (!userChars.includes(i.content.toLowerCase())) {//To check if message character already answered before

                                if(!(i.author.id === message.author.id)){// Ignore if user answer their own word
                                    return true;
                                } else {
                                    message.channel.send({
                                        content: `<@${message.author.id}> You cant answer your own custom word :>`,
                                    }).then(msg => {
                                        setTimeout(() => {
                                            msg.delete();
                                        }, 3000);
                                    });
                                    i.delete();
                                }

                            } else {
                                i.reply({
                                    content: `You didnt even remember you already answer this, how you could win this haha :P`,
                                }).then(msg => {
                                    setTimeout(() => {
                                        msg.delete();
                                    }, 3000);
                                });
                            }

                        } else {
                            i.reply({
                                content: `You can only send a character!`,
                            }).then(msg => {
                                setTimeout(() => {
                                    msg.delete();
                                }, 5000);
                            });
                        }
                    }
                };

                const collector = m.channel.createMessageCollector({ filter, time: 120000 });

                collector.on('collect', i => {
                    if (answerChars.includes(i.content.toLowerCase())) {// If the answer correct
                        const unAnsweredChars = answerChars.map((char, index) => {
                            if (char == i.content.toLowerCase()) {
                                outputChars[index] = i.content.toLowerCase();
                                userChars = userChars.concat(i.content.toLowerCase());
                                return "-";
                            }
                            return char;
                        });

                        //Update answerChars
                        answerChars = unAnsweredChars;

                    } else { //If the answer incorrect
                        userChars = userChars.concat(i.content.toLowerCase());
                        life -= 1;
                    }

                    //Check if all chars already answered
                    if (answerChars.every((char) => char === "-")) {
                        m.edit({ content: "**HANGMAN**\n" + `**Word by : ${message.author.tag}**\n` + arrHangman[7 - life] + "\n\n`" + outputChars.map(i => { return i + " " }).join(' ') + "`" })
                        m.reply({ content: "**HANGMAN**\n" + `**Word by : ${message.author.tag}**\n` + "**You Win!**\nThe answer is `" + outputChars.map(i => { return i + " " }).join(' ') + "`" })
                        collector.stop('game-end');
                        return;
                    }

                    //Check if user lose and doesnt have more life
                    if (life === 0) {
                        //Update outputChars
                        answerChars.forEach((char, index) => {
                            if (char !== '-') {
                                outputChars[index] = char;
                            }
                            return;
                        })


                        m.reply({ content: "**HANGMAN**\n" + `**Word by : ${message.author.tag}**\n` + "**You Lose! haha :P**\nThe answer is `" + outputChars.map(i => { return i + " " }).join(' ') + "`" })
                        collector.stop('game-end');
                        return;
                    }



                    m.edit({ content: "** HANGMAN **\n" + `**Word by : ${message.author.tag}**\n` + arrHangman[7 - life] + "\n\n`" + outputChars.map(i => { return i + " " }).join(' ') + "`" })
                });

                collector.on('end', (collection, reason) => {
                    if (reason === 'time') {
                        m.reply({ content: "You ran out of time" });
                    }
                });
            }
        }

    },
};
