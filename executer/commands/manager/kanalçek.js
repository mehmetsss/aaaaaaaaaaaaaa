const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");

class MoveChannel extends Command {

    constructor(client) {
        super(client, {
            name: "kanalçek",
            description: (language) => language.get(),
            usage: (language) => language.get(),
            examples: (language) => language.get(),
            category: "moderation",
            enabled: true,
            aliases: [],
            memberPermissions: [],
            botPermissions: [],
            ownerOnly: true,
            adminOnly: true,
            cooldown: 60000,
            permLvl: ["cmd-transport", "cmd-rhode", "cmd-authority"]
        });
    }

    async run(client, message, args, data) {

        let anan = args[0];
        let kanal = message.member.voice.channel.id;
        let anani = message.guild.channels.cache.get(anan);
        let sex = message.guild.channels.cache.get(kanal);

        //console.log(sex);
        await anani.members.forEach(mem => {
            mem.voice.setChannel(sex);
        });

     

    }

}

module.exports = MoveChannel;