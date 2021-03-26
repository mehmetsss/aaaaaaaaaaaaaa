const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const low = require('lowdb');

class MoveClass extends Command {

    constructor(client) {
        super(client, {
            name: "terapist",
            description: (language) => language.get(),
            usage: (language) => language.get(),
            examples: (language) => language.get(),
            category: "moderation",
            enabled: true,
            aliases: [],
            memberPermissions: [],
            botPermissions: [],
            ownerOnly: false,
            cooldown: 1000,
            permLvl: ["mod-cterapist"],
            onTest: false
        });
    }

    async run(client, message, args, data) {
        const roller = low(this.client.adapterroles);

        if (!message.member.roles.cache.has((await roller).get("mod-cterapist").value())) return;

        let sexiboy;
        var sexiboyzz = message.mentions.members.first();
        if (sexiboyzz) {
            sexiboy = sexiboyzz;
        } else {
            sexiboy = message.guild.members.cache.get(args[0]);
        }
        if (!sexiboy) return message.channel.send("Kullanıcı Bulunamadı.");

        const verilecek = roller.get("mod-terapist").value();
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

module.exports = MoveClass;