const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const kerhane = require('../../helpers/kerhane');
const low = require('lowdb');

class ytagekle extends Command {

    constructor(client) {
        super(client, {
            name: "ytagekle",
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
            permLvl: ["root"],
            onTest: false,
            dmCmd: false
        });
    }

    async run(client, message, args, data) {

        const roller = await low(this.client.adapterroles);
        const kanallar = await low(this.client.adapterchannels);
        const utiller = await low(this.client.adapterutil);

        const saksocularım = utiller.get("yasaklıtag").value();
        const yis = args[0];

        let gakkoş = [];

        const saksocular = message.guild.members.cache.filter(saksocu => saksocu.user.username.includes(yis));
        await saksocular.forEach(element => {
            gakkoş.push(element);
        });

        const embedd = new Discord.MessageEmbed()
        .setDescription(`${yis} tagına sahip ${gakkoş.length} kişi bulunmaktadır. İşleminize devam etmekte emin misiniz?`);

        const uyari = await message.channel.send(embedd)
        try {
            await uyari.react("✅");
            await uyari.react("❌");
        } catch (error) {
            message.channel.send(`Bir hata görüyorum: ${error}`);
        }
        const filter = (reaction, user) => user.id !== message.client.user.id;
        const collector = uyari.createReactionCollector(filter, {
            time: 120000
        });
        let anan = '';
        collector.on("collect", async (reaction, user) => {

            if (user.id !== message.member.id) return reaction.users.remove(user);

            switch (reaction.emoji.name) {
                case "✅":
                    anan = 'tr';
                    collector.stop();
                    await message.channel.send("İşlem Başlatıldı..")
                    break;

                case "❌":
                    anan = 'np';
                    collector.stop();
                    await message.channel.send("İşlem İptal Edildi..")
                    break;

                default:
                    break;
            }
        });

        collector.on("end", async () => {
            await uyari.reactions.removeAll();
            await uyari.delete({ timeout: 1000 });
            if (anan === 'tr') {
                await utiller.get("yasaklıtag").push(yis);
                await kerhane.prototype.give(message, yis);
            } else {
                return;
            };
        });








    }

}

module.exports = ytagekle;