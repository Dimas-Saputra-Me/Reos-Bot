const { Message, Client, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "ttt",
    aliases: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const row1 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ttt_0')
                    .setStyle('SECONDARY')
                    .setLabel('-')
                    .setEmoji('')
            ).addComponents(
                new MessageButton()
                    .setCustomId('ttt_1')
                    .setStyle('SECONDARY')
                    .setLabel('-')
                    .setEmoji('')
            ).addComponents(
                new MessageButton()
                    .setCustomId('ttt_2')
                    .setStyle('SECONDARY')
                    .setLabel('-')
                    .setEmoji('')
            );
        const row2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ttt_3')
                    .setStyle('SECONDARY')
                    .setLabel('-')
                    .setEmoji('')
            ).addComponents(
                new MessageButton()
                    .setCustomId('ttt_4')
                    .setStyle('SECONDARY')
                    .setLabel('-')
                    .setEmoji('')
            ).addComponents(
                new MessageButton()
                    .setCustomId('ttt_5')
                    .setStyle('SECONDARY')
                    .setLabel('-')
                    .setEmoji('')
            );
        const row3 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('ttt_6')
                    .setStyle('SECONDARY')
                    .setLabel('-')
                    .setEmoji('')
            ).addComponents(
                new MessageButton()
                    .setCustomId('ttt_7')
                    .setStyle('SECONDARY')
                    .setLabel('-')
                    .setEmoji('')
            ).addComponents(
                new MessageButton()
                    .setCustomId('ttt_8')
                    .setStyle('SECONDARY')
                    .setLabel('-')
                    .setEmoji('')
            );

        let tttBoard = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
        let turn = 0;

        if (message.mentions.users.first() === undefined) { // (Bot)
            const m = await message.reply({ content: `**Tic Tac Toe**\n<@${message.author.id}>`, components: [row1, row2, row3] });

            const filter = (i) => {
                if ((i.user.id === message.author.id)) {
                    if (i.component.label === '-') {
                        return true;
                    } else {
                        i.reply({
                            content: `You cant click filled square!`,
                            ephemeral: true,
                        });
                    }
                } else {
                    i.reply({
                        content: `These buttons aren't for you!`,
                        ephemeral: true,
                    });
                }
            };

            const collector = m.createMessageComponentCollector({
                filter: filter,
                time: 120000,
            })

            collector.on('collect', i => {
                i.deferUpdate();

                //Update Message (User)
                index = i.customId.replace('ttt_', '')
                tttBoard[index] = 'X';

                if (index >= 0 && index <= 2) {
                    i.message.components[0].components[index % 3]
                        .setStyle('PRIMARY')
                        .setLabel('X');
                } else if (index >= 3 && index <= 5) {
                    i.message.components[1].components[index % 3]
                        .setStyle('PRIMARY')
                        .setLabel('X');
                } else if (index >= 6 && index <= 8) {
                    i.message.components[2].components[index % 3]
                        .setStyle('PRIMARY')
                        .setLabel('X');
                }

                m.edit({
                    content: `**Tic Tac Toe**\n<@${message.author.id}>*`,
                    components: i.message.components,
                })

                //Check if there is a winner (User)
                let winner = tttWinner(tttBoard);
                winner = tttWinner(tttBoard);
                if (winner) {
                    for (let a = 0; a < 3; a++) {
                        let index = winner[1][a];
                        if (index >= 0 && index <= 2) {
                            i.message.components[0].components[index % 3].setStyle(`${(winner[0] === 'X') ? 'SUCCESS' : 'DANGER'
                                }`)
                        } else if (index >= 3 && index <= 5) {
                            i.message.components[1].components[index % 3].setStyle(`${(winner[0] === 'X') ? 'SUCCESS' : 'DANGER'
                                }`)
                        } else if (index >= 6 && index <= 8) {
                            i.message.components[2].components[index % 3].setStyle(`${(winner[0] === 'X') ? 'SUCCESS' : 'DANGER'
                                }`)
                        }
                    }
                    m.edit({
                        content: `**Tic Tac Toe**\n<@${message.author.id}>${(winner[0] === 'X') ? `You win!` : `You lose! haha :P`
                            }`,
                        components: i.message.components,
                    })
                    collector.stop('game-end');
                    return;
                }

                //Check if all square filled (User)
                if (!(tttBoard.includes('-'))) {
                    m.edit({
                        content: `**Tic Tac Toe**\n**Match Draw**\n<@${message.author.id}>`,
                    })
                    collector.stop('game-end');
                    return;
                }

                // Update Message (Bot)
                let botIndex = Math.floor(Math.random() * 9);
                while (tttBoard[botIndex] != '-' && turn != 4) {
                    botIndex = Math.floor(Math.random() * 9);
                }
                tttBoard[botIndex] = 'O';

                if (botIndex >= 0 && botIndex <= 2) {
                    i.message.components[0].components[botIndex % 3]
                        .setStyle('PRIMARY')
                        .setLabel('O');
                } else if (botIndex >= 3 && botIndex <= 5) {
                    i.message.components[1].components[botIndex % 3]
                        .setStyle('PRIMARY')
                        .setLabel('O');
                } else if (botIndex >= 6 && botIndex <= 8) {
                    i.message.components[2].components[botIndex % 3]
                        .setStyle('PRIMARY')
                        .setLabel('O');
                }

                m.edit({
                    content: `**Tic Tac Toe**\n<@${message.author.id}>`,
                    components: i.message.components,
                })

                //Check if there is a winner (Bot)
                winner = tttWinner(tttBoard);
                if (winner) {
                    for (let a = 0; a < 3; a++) {
                        let index = winner[1][a];
                        if (index >= 0 && index <= 2) {
                            i.message.components[0].components[index % 3].setStyle(`${(winner[0] === 'X') ? 'SUCCESS' : 'DANGER'
                                }`)
                        } else if (index >= 3 && index <= 5) {
                            i.message.components[1].components[index % 3].setStyle(`${(winner[0] === 'X') ? 'SUCCESS' : 'DANGER'
                                }`)
                        } else if (index >= 6 && index <= 8) {
                            i.message.components[2].components[index % 3].setStyle(`${(winner[0] === 'X') ? 'SUCCESS' : 'DANGER'
                                }`)
                        }
                    }
                    m.edit({
                        content: `**Tic Tac Toe**\n${(winner[0] === 'X') ? `You win!` : `You lose! haha :P`
                            }`,
                        components: i.message.components,
                    })
                    collector.stop('game-end');
                    return;
                }

                //Update turn value
                turn++;
            })
            collector.on('end', (i, reason) => {
                if (reason === 'time') {
                    m.reply({
                        content: 'You ran out of time',
                        components: [],
                    });
                    m.edit({
                        content: 'Timeout'
                    })
                }
            })
        } else { // (Two Players)
            // Confirmation challenge
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
                    return true;
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
                if (i.component.customId === 'rps_yes' || i.component.customId === 'rps_no') {
                    i.deferUpdate();
                    if (i.component.customId === 'rps_yes') {
                        m.edit({ content: '**Challenge ACCEPTED**', components: [] });
                        isChallenge = true;
                        duelTtt(message.author.id, message.mentions.users.first().id);
                        setTimeout(() => {
                            m.delete();
                        }, 5000);
                    } else {
                        m.edit('**Challenge DECLINED**');
                    }
                    collector.stop();
                }
            })

            collector.on('end', (i, reason) => {
                if (reason === 'time') {
                    m.reply("You ran out of time");
                    m.edit({
                        content: 'Timeout',
                        components: [],
                    })
                }
            })


            async function duelTtt(p1Id, p2Id) {
                const m = await message.reply({
                    content: `**Tic Tac Toe**\n<@${p1Id}> VS <@${p2Id}>\n<@${p1Id}> Turn`,
                    components: [row1, row2, row3]
                });

                const filter = (i) => {
                    if (i.user.id === p1Id || i.user.id === p2Id) {
                        //Check if player click filled square
                        if (i.component.label != '-') {
                            i.reply({
                                content: `This square is already filled`,
                                ephemeral: true
                            });
                            return false;
                        }

                        //Check turn
                        if ((i.user.id === p1Id) && (turn % 2 === 0)) {
                            return true;
                        } else if ((i.user.id === p2Id) && (turn % 2 === 1)) {
                            return true;
                        } else {
                            i.reply({
                                content: `It's not your turn!`,
                                ephemeral: true
                            });
                        }
                    } else {
                        i.reply({
                            content: `This button isn't for you!`,
                            ephemeral: true
                        });
                    }
                }
                const collector = m.createMessageComponentCollector({
                    filter: filter,
                    time: 120000,
                });
                collector.on('collect', (i) => {
                    i.deferUpdate();

                    //Update ttboard
                    let index = i.component.customId.replace('ttt_', '');
                    tttBoard[index] = (turn % 2 === 0) ? 'X' : 'O';

                    //Update Message
                    if (index >= 0 && index <= 2) {
                        i.message.components[0].components[index % 3]
                            .setStyle('PRIMARY')
                            .setLabel(
                                (turn % 2 === 0) ? 'X' : 'O',
                            );
                    } else if (index >= 3 && index <= 5) {
                        i.message.components[1].components[index % 3]
                            .setStyle('PRIMARY')
                            .setLabel(
                                (turn % 2 === 0) ? 'X' : 'O',
                            );
                    } else if (index >= 6 && index <= 8) {
                        i.message.components[2].components[index % 3]
                            .setStyle('PRIMARY')
                            .setLabel(
                                (turn % 2 === 0) ? 'X' : 'O',
                            );
                    }

                    //Update turn value
                    turn++;

                    m.edit({
                        content: `**Tic Tac Toe**\n<@${p1Id}> VS <@${p2Id}>\n<@${(turn % 2 === 0) ? p1Id : p2Id
                            }> Turn`,
                        components: i.message.components,
                    })

                    //Check if there is a winner
                    let winner = tttWinner(tttBoard);
                    if (winner) {
                        for (let a = 0; a < 3; a++) {
                            let index = winner[1][a];
                            if (index >= 0 && index <= 2) {
                                i.message.components[0].components[index % 3].setStyle('SUCCESS')
                            } else if (index >= 3 && index <= 5) {
                                i.message.components[1].components[index % 3].setStyle('SUCCESS')
                            } else if (index >= 6 && index <= 8) {
                                i.message.components[2].components[index % 3].setStyle('SUCCESS')
                            }
                        }
                        m.edit({
                            content: `**Tic Tac Toe**\n<@${(winner[0] === 'X') ? p1Id : p2Id
                                }> win!\n<@${(winner[0] === 'X') ? p2Id : p1Id
                                }> lose! haha :P`,
                            components: i.message.components,
                        })

                        collector.stop('game-end');
                        return;
                    }

                    //Check if all square is already filled
                    if (!(tttBoard.includes('-'))) {
                        m.edit({
                            content: `**Match Draw**`,
                        })
                        collector.stop('game-end');
                        return;
                    }

                })
                collector.on('end', (i, reason) => {
                    if (reason === 'time') {
                        m.reply({
                            content: 'You ran out of time',
                            components: [],
                        });
                        m.edit({
                            content: 'Timeout'
                        })
                    }
                })
            }
        }
    },
};

/* Local Function */

function tttWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            if (squares[a] != '-') {
                return [squares[a], lines[i]];
            }
        }
    }
    return null;
}