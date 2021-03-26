const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const low = require('lowdb');
const { tailor } = require("../../helpers/embedmaker");

class instaVer extends Command {

    constructor(client) {
        super(client, {
            name: "yetkial",
            description: (language) => language.get(),
            usage: (language) => language.get(),
            examples: (language) => language.get(),
            category: "moderation",
            enabled: false,
            aliases: [],
            memberPermissions: [],
            botPermissions: [],
            ownerOnly: false,
            adminOnly: false,
            cooldown: 1000,
            permLvl: ["cmd-authority"]
        });
    }

    async run(client, message, args, data) {

        const embeddd = new Discord.MessageEmbed()
            .setColor('#000001')
            .setAuthor('Yetki falan mı alıyoruz hayırdır?', message.guild.iconURL())
            .setDescription("İşlemi durdurmak için ✅ emojisine tıklayınız")
            .setFooter('Unutmayın ki umudun bittiği yerde tantuni vardır.')


        if (!args[0]) return;

        let sexiboy;
        var sexiboyzz = message.mentions.members.first();
        if (sexiboyzz) {
            sexiboy = sexiboyzz;
        } else {
            sexiboy = message.guild.members.cache.get(args[0]);
            if (!sexiboy) return message.channel.send("Kullanıcı Bulunamadı.");
        }

        if (!sexiboy.user.username.includes("†")) return;
        try {
            var ananmesaj = await message.channel.send(embeddd);
            await ananmesaj.react('❓');
            await ananmesaj.react('🔇');
            await ananmesaj.react('🚫');
            await ananmesaj.react('⛔');
            await ananmesaj.react('✅');
        } catch (error) {
            console.log(error)
        };
        const roller = await low(this.client.adapterroles);
        const kanallar = await low(this.client.adapterchannels);

        const filter = (reaction, user) => user.id !== message.client.user.id;

        const collector = ananmesaj.createReactionCollector(filter, {
            time: 120000
        });

        collector.on("collect", async (reaction, user) => {
            if (message.member.id !== user.id) {
                return reaction.users.remove(user)
            }

            switch (reaction.emoji.name) {

                case "❓":
                    await sexiboy.roles.remove(roller.get("cmdregistry").value())
                    break;

                case "🔇":
                    await sexiboy.roles.remove(roller.get("cmdmuter").value())
                    break;

                case "🚫":
                    await sexiboy.roles.remove(roller.get("cmdjailor").value())
                    break;

                case "⛔":
                    await sexiboy.roles.remove(roller.get("cmdbanner").value())
                    break;

                case "✅":
                    collector.stop();
                    break;

                default:
                    break;
            }
        });


        collector.on("end", () => {
            ananmesaj.reactions.removeAll();
            ananmesaj.delete({ timeout: 5000 });
        });

    }

}

module.exports = instaVer;