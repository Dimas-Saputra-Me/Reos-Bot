const { Message, Client, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
    name: "ptb",
    aliases: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle('PRIMARY')
                    .setCustomId('ptb_1')
                    .setLabel('1')
            ).addComponents(
                new MessageButton()
                    .setStyle('PRIMARY')
                    .setCustomId('ptb_2')
                    .setLabel('2')
            ).addComponents(
                new MessageButton()
                    .setStyle('PRIMARY')
                    .setCustomId('ptb_3')
                    .setLabel('3')
            ).addComponents(
                new MessageButton()
                    .setStyle('PRIMARY')
                    .setCustomId('ptb_4')
                    .setLabel('4')
            ).addComponents(
                new MessageButton()
                    .setStyle('PRIMARY')
                    .setCustomId('ptb_5')
                    .setLabel('5')
            )
        let userScore = 0;

        //Generate random number
        let ranNum = [];
        for (let i = 1; i <= 3; i++) {
            ranNum = ranNum.concat(Math.floor(Math.random() * 5) + 1);
        }

        const m = await message.reply({ content: `**PRESS THE BUTTON**\n<@${message.author.id}>\nYour score is : ${userScore}\nGet high score as high as possible`, components: [button] });

        const filter = (i) => {
            if (i.user.bot) return false; // Ignore bot interaction

            if (i.user.id == message.author.id) { // Ignore another user interaction
                return true;
            } else {
                i.reply({
                    content: 'You cant click other user button',
                    ephemeral: true,
                })
            }
        }
        const collector = m.createMessageComponentCollector({ filter, time: 60000 });
        collector.on('collect', (i) => {
            i.deferUpdate();

            buttonIndex = i.component.customId.replace('ptb_', '');
            let isReturn = false;
            ranNum.forEach((num) => {
                if (num == buttonIndex) { // If user click the wrong button

                    //Update button style
                    i.message.components[0].components.map((button) => {
                        if (button.customId === `ptb_${buttonIndex}`) {
                            button.setStyle('DANGER');
                        }
                    });

                    m.edit({ content: `**PRESS THE BUTTON**\n<@${message.author.id}>\nYou Lose!\nYour score is : ${userScore}`, components: i.message.components });
                    isReturn = true;
                    collector.stop('game-end');
                }
            })

            // Stop collecting
            if(isReturn){
                return false;
            }

            /* If user click the correct button */
            userScore++;

            /* NEXT STAGE */
            //Update wrong button
            ranNum = [];
            for (let i = 1; i <= 3; i++) {
                ranNum = ranNum.concat(Math.floor(Math.random() * 5) + 1);
            }
            
            m.edit({ content: `**PRESS THE BUTTON**\n<@${message.author.id}>\nYour score is : ${userScore}\nGet score as high as possible`, components: [button] });

            // Reset timeout time
            collector.resetTimer();
        })

        collector.on('end', (i, reason) => {
            if(reason === 'time'){
                m.edit({content: 'You ran out of time', components: []});
            }
        })


    },
};
