const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");

class Moove extends Command {

    constructor(client) {
        super(client, {
            name: "çek",
            description: (language) => language.get(),
            usage: (language) => language.get(),
            examples: (language) => language.get(),
            category: "moderation",
            enabled: true,
            aliases: [],
            memberPermissions: [],
            botPermissions: [],
            ownerOnly: false,
            adminOnly: false,
            cooldown: 60000,
            permLvl: ["cmd-transport", "cmd-rhode", "cmd-authority"]
        });
    }

    async run(client, message, args, data) {

        message.channel.send(this.conf.dirname)

        /*

        let kişi = message.mentions.members.first();
        
        let kanal = message.member.voice.channel.id;

        kişi.voice.setChannel(kanal);
        */
    
    }

}

module.exports = Moove;