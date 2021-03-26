const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");

class Move extends Command {

    constructor(client) {
        super(client, {
            name: "taşı",
            description: (language) => language.get(),
            usage: (language) => language.get(),
            examples: (language) => language.get(),
            category: "moderation",
            enabled: true,
            aliases: ["yolla"],
            memberPermissions: [],
            botPermissions: [],
            ownerOnly: false,
            adminOnly: true,
            cooldown: 60000,
            permLvl: ["cmd-transport", "cmd-rhode"]
        });
    }

    async run(client, message, args, data) {

        let anan = args[0];
        let kanal = message.member.voice.channel.id;
        let sex = message.guild.channels.cache.get(kanal);

        //console.log(sex);
        await sex.members.forEach(mem => {
            mem.voice.setChannel(anan);
        });

     

    }

}

module.exports = Move;