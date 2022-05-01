const { Message, Client, MessageActionRow, MessageButton, } = require("discord.js");

module.exports = {
    name: "rps",
    aliases: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (message.mentions.users.first() === undefined) { // (Bot)
            let rps = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('rps_rock')
                        .setStyle('PRIMARY')
                        .setLabel('Rock')
                        .setEmoji('🗿')
                ).addComponents(
                    new MessageButton()
                        .setCustomId('rps_paper')
                        .setStyle('PRIMARY')
                        .setLabel('Paper')
                        .setEmoji('📃')
                ).addComponents(
                    new MessageButton()
                        .setCustomId('rps_scissors')
                        .setStyle('PRIMARY')
                        .setLabel('Scissors')
                        .setEmoji('✂️')
                );

            const m = await message.reply({
                content: `**Rock Papper Scissors**\n<@${message.author.id}>\nChoose :`,
                components: [rps]
            });

            const filter = (i) => {
                if (i.user.id === message.author.id) {
                    return true;
                } else {
                    i.reply({
                        content: `This button isn't for you!`,
                        ephemeral: true
                    }).then(msg => {
                        setTimeout(() => {
                            msg.delete();
                        }, 5000);
                    });;
                }
            };

            const collector = m.createMessageComponentCollector({
                filter: filter,
                max: 1,
                time: 30000
            })

            collector.on('collect', async (i) => {
                i.deferUpdate();

                //Winner output text
                const output = rpsWinner(i.customId);

                //Update message
                i.message.components[0].components.forEach((value) => {
                    if (value.customId === i.customId) {
                        value.setStyle('SUCCESS');
                    }
                })
                m.edit({
                    content: `**Rock Papper Scissors**\n<@${message.author.id}>\n${output}`,
                    components: [i.message.components[0]],
                })

            })

            collector.on('end', async (i, reason) => {
                if (reason === 'time') {
                    m.edit({
                        content: 'You ran out of time',
                        components: [],
                    })
                }
            });

        } else { // (Two Players)
            //Confirmation Challenge
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
                content: `**Rock Papper Scissors**\n<@${message.mentions.users.first().id}> you have been challenged by <@${message.author.id}>`,
                components: [button]
            });

            const filter = (i) => {
                if (i.user.id === message.mentions.users.first().id) {
                    //Check if button customId is correct
                    if(i.component.customId === 'rps_yes' || i.component.customId === 'rps_no') return true;
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
                        duelRps(message.author.id, message.mentions.users.first().id);
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

            async function duelRps(p1Id, p2Id) {
                    let rps = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setCustomId('rps_rock')
                                .setStyle('PRIMARY')
                                .setLabel('Rock')
                                .setEmoji('🗿')
                        ).addComponents(
                            new MessageButton()
                                .setCustomId('rps_paper')
                                .setStyle('PRIMARY')
                                .setLabel('Paper')
                                .setEmoji('📃')
                        ).addComponents(
                            new MessageButton()
                                .setCustomId('rps_scissors')
                                .setStyle('PRIMARY')
                                .setLabel('Scissors')
                                .setEmoji('✂️')
                        );

                    const m = await message.reply({
                        content: `**Rock Papper Scissors**\nDuel Rock Papper Scissors <@${p1Id}> vs <@${p2Id}>`,
                        components: [rps],
                    });

                    let isP1Turn = true; let isP2Turn = true;
                    const filter = (i) => {
                        if (i.user.id === p1Id || i.user.id === p2Id) {

                            //Check if player 1 and player 2 can choose
                            if((i.user.id === p1Id) && isP1Turn){
                                return true;
                            } else if((i.user.id === p2Id) && isP2Turn){
                                return true;
                            } else {
                                i.reply({
                                    content: `You already chose!\nWaiting for opponent...`,
                                    ephemeral: true
                                });
                                return false;
                            }
                            
                        } else {
                            i.reply({
                                content: `This button isn't for you!`,
                                ephemeral: true
                            });
                            return false;
                        }
                    }
                    const collectorDuel = m.createMessageComponentCollector({
                        filter: filter,
                        max: 2,
                        time: 60000,
                    });
                    collectorDuel.on('collect', i =>{
                        i.deferUpdate();
                        if(i.user.id === p1Id){
                            p1Choice = i.customId;
                            isP1Turn = false;
                        } else if(i.user.id === p2Id){
                            p2Choice = i.customId;
                            isP2Turn = false;
                        }
                    })
                    collectorDuel.on('end', (i, reason) => {
                        //Taking p1 and p2 choice from collection
                        let p1Choice, p2Choice;
                        i.forEach((value) => {
                            if(value.user.id === p1Id){
                                p1Choice = value.customId;
                            } else if(value.user.id === p2Id){
                                p2Choice = value.customId;
                            }
                        })

                        //Update message winner
                        if(p1Choice && p2Choice){
                            const output = rpsWinnerDuel(p1Choice, p2Choice, p1Id, p2Id);
                            m.edit({
                                content: `**Rock Papper Scissors**\n${output}`,
                                components: [],
                            });
                        }

                        //Message timeout
                        if (reason === 'time') {
                            message.reply("You ran out of time");
                        }
                    })
                }

        }
        /* Local Function */

        function rpsWinner(choice) {
            //User choice
            const userChoice = choice.replace('rps_', '');

            //Bot Choice
            const rps = ["rock", "paper", "scissors",];
            const botChoice = rps[Math.floor(Math.random() * rps.length)];

            //Output text
            let output = `You chose ${userChoice} \n Bot chose ${botChoice}`;

            if (userChoice === 'rock') {
                if (botChoice === 'rock') {
                    output += '\n Match draw!';
                } else if (botChoice === 'paper') {
                    output += '\n You Lose!';
                } else if (botChoice === 'scissors') {
                    output += '\n You win!';
                } else {
                    output = 'Match Invalid!';
                }
            } else if (userChoice === 'paper') {
                if (botChoice === 'rock') {
                    output += '\n You win!';
                } else if (botChoice === 'paper') {
                    output += '\n Match draw!';
                } else if (botChoice === 'scissors') {
                    output += '\n You Lose!';
                } else {
                    output = 'Match Invalid!';
                }
            } else if (userChoice === 'scissors') {
                if (botChoice === 'rock') {
                    output += '\n You Lose!';
                } else if (botChoice === 'paper') {
                    output += '\n You win!';
                } else if (botChoice === 'scissors') {
                    output += '\n Match draw!';
                } else {
                    output = 'Match Invalid!';
                }
            } else {
                output = 'Match Invalid!';
            }

            return output;
        }


        function rpsWinnerDuel(p1, p2, p1Id, p2Id) {
            //Player1 choice
            const p1Choice = p1.replace('rps_', '');

            //Player2 choice
            const p2Choice = p2.replace('rps_', '');

            //Output text
            let output = `<@${p1Id}> chose ${p1Choice} \n<@${p2Id}> chose ${p2Choice}`;

            if (p1Choice === 'rock') {
                if (p2Choice === 'rock') {
                    output += '\nMatch draw!';
                } else if (p2Choice === 'paper') {
                    output += `\n<@${p2Id}> Win!`;
                } else if (p2Choice === 'scissors') {
                    output += `\n<@${p1Id}> Win!`;
                } else {
                    output = 'Match Invalid!';
                }
            } else if (p1Choice === 'paper') {
                if (p2Choice === 'rock') {
                    output += `\n<@${p1Id}> Win!`;
                } else if (p2Choice === 'paper') {
                    output += '\nMatch draw!';
                } else if (p2Choice === 'scissors') {
                    output += `\n<@${p2Id}> Win!`;
                } else {
                    output = 'Match Invalid!';
                }
            } else if (p1Choice === 'scissors') {
                if (p2Choice === 'rock') {
                    output += `\n<@${p2Id}> Win!`;
                } else if (p2Choice === 'paper') {
                    output += `\n<@${p1Id}> Win!`;
                } else if (p2Choice === 'scissors') {
                    output += '\nMatch draw!';
                } else {
                    output = 'Match Invalid!';
                }
            } else {
                output = 'Match Invalid!';
            }

            return output;
        }

    },
};
