const client = require("../index");

client.on("messageCreate", async (message) => {
    //Respones if user mentions bot
    if (message.mentions.has(client.user.id) && !message.author.bot) {
        message.channel.send("Bot prefix is `" + client.config.prefix + "` try `" + client.config.prefix + "commands` to see list of commands");
    }

    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g).map((arg) => arg.toLocaleLowerCase());

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
});
