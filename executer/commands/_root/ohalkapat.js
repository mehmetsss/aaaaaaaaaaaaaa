const Command = require("../../../inventory/base/Command"),
    Discord = require("discord.js");
const low = require('lowdb');


class ChangeChannel extends Command {

    constructor(client) {
        super(client, {
            name: "ohalkapat",
            description: "Açıklama Belirtilmemiş.",
            usage: "Kullanım Belirtilmemiş.",
            examples: ["Örnek Bulunmamakta"],
            aliases: ["ok"],
            permLvl: [],
            cooldown: 5000,
            enabled: true,
            adminOnly: false,
            ownerOnly: false,
            onTest: false,
            rootOnly: true,
            dmCmd: false
        });
    }

    async run(client, message, args, data) {

        const utiller = await low(this.client.adapterutil);

        utiller.set("ohal", false).write();

        message.channel.send(new Discord.MessageEmbed().setDescription(`Rol güncellenmesi yeniden devam ettirildi.`))


    }
}

module.exports = ChangeChannel;