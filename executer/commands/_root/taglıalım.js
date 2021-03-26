const Command = require("../../../inventory/base/Command"),
    Discord = require("discord.js");
const low = require('lowdb');

class ChangeRole extends Command {

    constructor(client) {
        super(client, {
            name: "taglıalım",
            description: "Açıklama Belirtilmemiş.",
            usage: "Kullanım Belirtilmemiş.",
            examples: ["Örnek Bulunmamakta"],
            aliases: [],
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
        const emojiler = await low(this.client.adapteremojis);
        let komut;
        if (!args[0]) {
            if (utiller.get("taglıalım").value()) {
                komut = false;
            } else {
                komut = true;
            }
        } else {
            if (args[0] === "aç") {
                komut = true;
            } else if (args[0] === "kapat") {
                komut = false;
            }
        };
        let durum = "Belirsiz";
        if (komut) {
            durum = "Başlatıldı";
        } else {
            durum = "Bitirildi";
        }

        utiller.set("taglıalım", komut).write();
        await message.channel.send(new Discord.MessageEmbed().setDescription(`${emojiler.get("fire_0").value()} | **Taglı Alım Süreci** \`${durum}\``).setColor("#2f3136"))

    }
}

module.exports = ChangeRole;