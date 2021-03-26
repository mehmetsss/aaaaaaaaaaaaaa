const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const low = require('lowdb');
const { tailor } = require("../../helpers/embedmaker");

class instaVer extends Command {

    constructor(client) {
        super(client, {
            name: "müzisyen",
            usage: "müzisyen etiket/id",
            examples: ["müzisyen 213617765095833600"],
            aliases: [],
            permLvl: ["manager","cmd-manager","cmd-rhode", "cmd-authority"],
            cooldown: 5000,
            enabled: true,
            adminOnly: false,
            ownerOnly: false,
            onTest: false,
            rootOnly: false,
            dmCmd: false
        });
    }

    async run(client, message, args, data) {

        let sexiboy;
        var sexiboyzz = message.mentions.members.first();
        if (sexiboyzz) {
            sexiboy = sexiboyzz;
        } else {
            sexiboy = message.guild.members.cache.get(args[0]);
            if (!sexiboy) return message.channel.send("Kullanıcı Bulunamadı.");
        }
        const roller = await low(this.client.adapterroles);
        const kanallar = await low(this.client.adapterchannels);
        const utiller = await low(this.client.adapterutil);
        const emojiler = await low(this.client.adapteremojis);
        const verilecek = roller.get("rub-müzisyen").value();
        const verilen = message.guild.roles.cache.get(verilecek);
        if (!sexiboy.roles.cache.has(verilecek)) {
            await message.channel.send(new Discord.MessageEmbed().setDescription(`**${verilen.name}** rolü başarıyla ${sexiboy} üyesine verildi!`));
            await sexiboy.roles.add(verilen.id);
            await message.guild.channels.cache.get(kanallar.get("cmd-ruby").value()).send(tailor(message, sexiboy, verilen));
            return;
        } else {
            await sexiboy.roles.remove(verilen.id);
            await message.channel.send(new Discord.MessageEmbed().setDescription(`**${verilen.name}** rolü başarıyla ${sexiboy} üyesinden alındı!`));
        }
        await message.react(emojiler.get("ok").value());


    }

}

module.exports = instaVer;