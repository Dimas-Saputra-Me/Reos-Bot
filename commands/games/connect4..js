const { Message, Client, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "connect4",
    aliases: ['c4'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.mentions.users.first() === undefined) { // Bot
            let board = [
                ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
                ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
                ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
                ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
                ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
                ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
            ];

            let output = '';
            board.forEach((i, index) => {
                let output2 = '';
                i.forEach((value, index) => {
                    if (index === 0) {
                        output2 += '| ' + value + ' ';
                    } else if (index === 6) {
                        output2 += value + ' |';
                    } else {
                        output2 += value + ' ';
                    }
                })
                if (index === 5) {
                    output += output2 + '\n';
                } else {
                    output += output2 + '\n';
                }

            })
            output += '\n| 🇦 🇧 🇨 🇩 🇪 🇫 🇬 |';


            const boardMessage = await message.channel.send(`**Connect4**\n${output}`);

            let allowedChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

            const filter = (i) => {
                if (i.author.bot) return false; // Ignore bot message

                if (i.author.id == message.author.id) { //Ignore other person message

                    if (i.content.length === 1) { // Ignore if user input word

                        if (allowedChars.includes(i.content.toLowerCase())) { // Ignore other character 

                            // Check if square line is empty
                            let index;
                            switch (i.content.toLowerCase()) {
                                case 'a':
                                    index = 0;
                                    break;
                                case 'b':
                                    index = 1;
                                    break;
                                case 'c':
                                    index = 2;
                                    break;
                                case 'd':
                                    index = 3;
                                    break;
                                case 'e':
                                    index = 4;
                                    break;
                                case 'f':
                                    index = 5;
                                    break;
                                case 'g':
                                    index = 6;
                                    break;
                            }

                            for (let i = 5; i >= 0; i--) {
                                if (board[i][index] === '⚪') {
                                    return true;
                                }
                            }

                            i.reply({
                                content: 'You cant choose filled line',
                            }).then(msg => {
                                setTimeout(() => {
                                    msg.delete();
                                }, 3000);
                            });
                            setTimeout(() => {
                                i.delete();
                            }, 3000);

                            return false;

                        } else {
                            i.reply({
                                content: 'You only can send alphabet from range a-g without space',
                            }).then(msg => {
                                setTimeout(() => {
                                    msg.delete();
                                }, 3000);
                            });
                            setTimeout(() => {
                                i.delete();
                            }, 7000);
                        }

                    } else {
                        i.reply({
                            content: 'You only can send alphabet from range a-g without space',
                        }).then(msg => {
                            setTimeout(() => {
                                msg.delete();
                            }, 3000);
                        });
                        setTimeout(() => {
                            i.delete();
                        }, 7000);
                    }

                } else {
                    setTimeout(() => {
                        i.delete();
                    }, 7000);
                    return false;
                }



            }

            const collector = boardMessage.channel.createMessageCollector({ filter, time: 60000 })

            collector.on('collect', (m) => {
                let index;

                /* User turn */
                switch (m.content.toLowerCase()) {
                    case 'a':
                        index = 0;
                        break;
                    case 'b':
                        index = 1;
                        break;
                    case 'c':
                        index = 2;
                        break;
                    case 'd':
                        index = 3;
                        break;
                    case 'e':
                        index = 4;
                        break;
                    case 'f':
                        index = 5;
                        break;
                    case 'g':
                        index = 6;
                        break;
                }


                // Update boards (User)
                for (let i = 5; i >= 0; i--) {
                    if (board[i][index] === '⚪') {
                        board[i][index] = '🔵'
                        break;
                    }

                }

                let output = '';
                board.forEach((i, index) => {
                    let output2 = '';
                    i.forEach((value, index) => {
                        if (index === 0) {
                            output2 += '| ' + value + ' ';
                        } else if (index === 6) {
                            output2 += value + ' |';
                        } else {
                            output2 += value + ' ';
                        }
                    })
                    if (index === 5) {
                        output += output2 + '\n';
                    } else {
                        output += output2 + '\n';
                    }

                })
                output += '\n| 🇦 🇧 🇨 🇩 🇪 🇫 🇬 |';

                boardMessage.edit(`**Connect4**\n${output}`);
                m.delete();

                //Check winner (User)
                if (chkWinner(board) != undefined) {
                    boardMessage.edit(`**Connect4**\nYou Win!\n${output}`);
                    boardMessage.reply(`**Connect4**\nYou Win!`);
                    collector.stop('game-end');
                    return;
                }

                //Check draw
                if (!(board.some((row) => row.includes('⚪')))) {
                    boardMessage.edit(`**Connect4**\nMatch Draw!\n${output}`);
                    boardMessage.reply(`**Connect4**\nMatch Draw!`);
                    collector.stop('game-end');
                    return;
                }

                /* Bot turn */
                let tmpIndex;
                let isAvailable = true;

                //Check availability square
                while (isAvailable) {
                    tmpIndex = Math.floor(Math.random() * 7);

                    for (let i = 5; i >= 0; i--) {
                        if (board[i][tmpIndex] === '⚪') {
                            isAvailable = false;
                            break;
                        }
                    }
                }

                // Update boards (Bot)
                for (let i = 5; i >= 0; i--) {
                    if (board[i][tmpIndex] === '⚪') {
                        board[i][tmpIndex] = '🔴'
                        break;
                    }

                }

                output = '';
                board.forEach((i, index) => {
                    output2 = '';
                    i.forEach((value, index) => {
                        if (index === 0) {
                            output2 += '| ' + value + ' ';
                        } else if (index === 6) {
                            output2 += value + ' |';
                        } else {
                            output2 += value + ' ';
                        }
                    })
                    if (index === 5) {
                        output += output2 + '\n';
                    } else {
                        output += output2 + '\n';
                    }

                })
                output += '\n| 🇦 🇧 🇨 🇩 🇪 🇫 🇬 |';

                boardMessage.edit(`**Connect4**\n${output}`);

                //Check winner (Bot)
                if (chkWinner(board) != undefined) {
                    boardMessage.edit(`**Connect4**\nYou Lose!\n${output}`);
                    boardMessage.reply(`**Connect4**\nYou Lose!`);
                    collector.stop('game-end');
                    return;
                }

                collector.resetTimer();
            })
        } else { // Duel Two Players
            let button = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('rps_yes')
                        .setStyle('SUCCESS')
                        .setLabel('ACCEPT')
                ).addComponents(
                    new MessageButton()
                        .setCustomId('rps_no')
                        .setStyle('DANGER')
                        .setLabel('DECLINE')
                )

            const m = await message.reply({
                content: `<@${message.mentions.users.first().id}> you have been challenged by <@${message.author.id}>`,
                components: [button]
            });

            const filter = (i) => {
                if (i.user.id === message.mentions.users.first().id) {
                    //Check if button customId is correct
                    if (i.component.customId === 'rps_yes' || i.component.customId === 'rps_no') return true;
                    return false;
                } else {
                    i.reply({
                        content: `This button isn't for you!`,
                        ephemeral: true
                    });
                }
            }

            const collector = m.createMessageComponentCollector({
                filter: filter,
                max: 1,
                time: 30000,
            })

            collector.on('collect', async (i) => {
                i.deferUpdate();
                if (i.component.customId === 'rps_yes') {
                    m.edit({ content: '**Challenge ACCEPTED**', components: [] });
                    duelC4(message.author.id, message.mentions.users.first().id);
                    setTimeout(() => {
                        m.delete();
                    }, 5000);
                } else {
                    m.edit('**Challenge DECLINED**');
                }
            })

            collector.on('end', (i, reason) => {
                if (reason === 'time') {
                    m.edit({
                        content: 'You ran out of time',
                        components: [],
                    })
                }
            })
        }

        async function duelC4(p1Id, p2Id) {
            let board = [
                ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
                ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
                ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
                ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
                ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
                ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
            ];
            let allowedChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
            let isP1Turn = true, isP2Turn = false;

            let output = '';
            board.forEach((i, index) => {
                let output2 = '';
                i.forEach((value, index) => {
                    if (index === 0) {
                        output2 += '| ' + value + ' ';
                    } else if (index === 6) {
                        output2 += value + ' |';
                    } else {
                        output2 += value + ' ';
                    }
                })
                if (index === 5) {
                    output += output2 + '\n';
                } else {
                    output += output2 + '\n';
                }

            })
            output += '\n| 🇦 🇧 🇨 🇩 🇪 🇫 🇬 |';

            const boardMessage = await message.channel.send(`**Connect4**\n<@${p1Id}> VS <@${p2Id}>\n<@${p1Id}> Turn\n${output}`);

            const filter = (i) => {
                if (i.author.bot) return false; // Ignore bot message

                if (i.author.id === p1Id || i.author.id === p2Id) { // Accept message only from both player

                    if (((i.author.id === p1Id) && isP1Turn) || ((i.author.id === p2Id) && isP2Turn)) { // Check if its player turn

                        if (i.content.length === 1) { // Ignore if user input word

                            if (allowedChars.includes(i.content.toLowerCase())) { // Ignore other character 

                                // Check if square line is empty
                                let index;
                                switch (i.content.toLowerCase()) {
                                    case 'a':
                                        index = 0;
                                        break;
                                    case 'b':
                                        index = 1;
                                        break;
                                    case 'c':
                                        index = 2;
                                        break;
                                    case 'd':
                                        index = 3;
                                        break;
                                    case 'e':
                                        index = 4;
                                        break;
                                    case 'f':
                                        index = 5;
                                        break;
                                    case 'g':
                                        index = 6;
                                        break;
                                }

                                for (let i = 5; i >= 0; i--) {
                                    if (board[i][index] === '⚪') {
                                        return true;
                                    }
                                }

                                i.reply({
                                    content: 'You cant choose filled line',
                                }).then(msg => {
                                    setTimeout(() => {
                                        msg.delete();
                                    }, 3000);
                                });
                                setTimeout(() => {
                                    i.delete();
                                }, 7000);

                                return false;

                            } else {
                                i.reply({
                                    content: 'You only can send alphabet from range a-g without space',
                                }).then(msg => {
                                    setTimeout(() => {
                                        msg.delete();
                                    }, 3000);
                                });
                                setTimeout(() => {
                                    i.delete();
                                }, 7000);
                            }

                        } else {
                            i.reply({
                                content: 'You only can send alphabet from range a-g without space',
                            }).then(msg => {
                                setTimeout(() => {
                                    msg.delete();
                                }, 3000);
                            });
                            setTimeout(() => {
                                i.delete();
                            }, 7000);
                        }

                    } else {
                        i.reply({
                            content: `It's not your turn!`,
                        }).then(msg => {
                            setTimeout(() => {
                                msg.delete();
                            }, 5000);
                        });
                        setTimeout(() => {
                            i.delete();
                        }, 7000);
                    }

                } else {
                    setTimeout(() => {
                        i.delete();
                    }, 7000);
                }
            }

            const collector = boardMessage.channel.createMessageCollector({ filter, });

            collector.on('collect', (m) => {

                let index;

                /* User turn */
                switch (m.content.toLowerCase()) {
                    case 'a':
                        index = 0;
                        break;
                    case 'b':
                        index = 1;
                        break;
                    case 'c':
                        index = 2;
                        break;
                    case 'd':
                        index = 3;
                        break;
                    case 'e':
                        index = 4;
                        break;
                    case 'f':
                        index = 5;
                        break;
                    case 'g':
                        index = 6;
                        break;
                }


                // Update boards
                for (let i = 5; i >= 0; i--) {
                    if (board[i][index] === '⚪') {
                        board[i][index] = (isP1Turn) ? '🔵' : '🔴';
                        break;
                    }

                }

                let output = '';
                board.forEach((i, index) => {
                    let output2 = '';
                    i.forEach((value, index) => {
                        if (index === 0) {
                            output2 += '| ' + value + ' ';
                        } else if (index === 6) {
                            output2 += value + ' |';
                        } else {
                            output2 += value + ' ';
                        }
                    })
                    if (index === 5) {
                        output += output2 + '\n';
                    } else {
                        output += output2 + '\n';
                    }

                })
                output += '\n| 🇦 🇧 🇨 🇩 🇪 🇫 🇬 |';

                //Check winner
                if (chkWinner(board) != undefined) {
                    boardMessage.edit(`**Connect4**\n<@${(isP1Turn) ? p1Id : p2Id}> Win!\n${output}`);
                    boardMessage.reply(`**Connect4**\n<@${(isP1Turn) ? p1Id : p2Id}> Win!`);
                    collector.stop('game-end');
                    return;
                }

                //Check draw
                if (!(board.some((row) => row.includes('⚪')))) {
                    boardMessage.edit(`**Connect4**\nMatch Draw!\n${output}`);
                    boardMessage.reply(`**Connect4**\nMatch Draw!`);
                    collector.stop('game-end');
                    return;
                }

                //Update P1 and P2 Turn
                isP1Turn = !isP1Turn;
                isP2Turn = !isP2Turn;

                boardMessage.edit(`**Connect4**\n<@${p1Id}> VS <@${p2Id}>\n<@${(isP1Turn) ? p1Id : p2Id}> Turn\n${output}`);
                m.delete();

            })
        }

    },
};


/* LOCAL FUNCTION */
function chkLine(a, b, c, d) {
    // Check first cell non-zero and all cells match
    return ((a != '⚪') && (a == b) && (a == c) && (a == d));
}

function chkWinner(bd) {
    // Check down
    for (r = 0; r < 3; r++)
        for (c = 0; c < 7; c++)
            if (chkLine(bd[r][c], bd[r + 1][c], bd[r + 2][c], bd[r + 3][c]))
                return bd[r][c];

    // Check right
    for (r = 0; r < 6; r++)
        for (c = 0; c < 4; c++)
            if (chkLine(bd[r][c], bd[r][c + 1], bd[r][c + 2], bd[r][c + 3]))
                return bd[r][c];

    // Check down-right
    for (r = 0; r < 3; r++)
        for (c = 0; c < 4; c++)
            if (chkLine(bd[r][c], bd[r + 1][c + 1], bd[r + 2][c + 2], bd[r + 3][c + 3]))
                return bd[r][c];

    // Check down-left
    for (r = 3; r < 6; r++)
        for (c = 0; c < 4; c++)
            if (chkLine(bd[r][c], bd[r - 1][c + 1], bd[r - 2][c + 2], bd[r - 3][c + 3]))
                return bd[r][c];

}