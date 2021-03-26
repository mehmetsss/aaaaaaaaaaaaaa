const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const low = require('lowdb');

class Jail extends Command {

    constructor(client) {
        super(client, {
            name: "teklif",
            description: "Etiketlenen kişiye çıkma teklifi eder.",
            usage: "teklif id <özel mesaj>",
            examples: ["teklif 328219762272239618 Seni seviyorum <3"],
            aliases: [],
            permLvl: [],
            cooldown: 60000,
            enabled: false,
            adminOnly: false,
            ownerOnly: false,
            onTest: true,
            rootOnly: false,
            dmCmd: true
        });
    }

    async run(client, message, args, data) {

        const roller = low(this.client.adapterroles);
        const kanallar = low(this.client.adapterchannels);
        const utiller = low(this.client.adapterutil);
        const emojiler = await low(this.client.adapteremojis);
        const emojis = emojiler.value();
        const embed = new Discord.MessageEmbed().setColor('#2f3136');

        const guild = client.guilds.cache.get(utiller.get("sunucu").value());

        let sexiboy = guild.members.cache.get(args[0]);
        if (!sexiboy) return message.channel.send("Kullanıcı Bulunamadı.");

        const seniseviyorum = embed.setDescription(`${message.author} seninle çıkmak istiyor.\n**Özel Mesajı:**  ${args[2] ? args.slice(1).join(' ') : '\`Yok\`'}`)
            .setFooter("Onaylamak için kalbe tıkla, reddetmek için çarpıya bas.").setAuthor("Tantoony ile Evlen Benimle", this.client.owner.displayAvatarURL()).setTitle("Talibin var!");

        try {
            var izdimesaj = await sexiboy.send(seniseviyorum);
            izdimesaj.react('790428165771231242');
            izdimesaj.react('787494263767433246');
        } catch (error) {
            message.channel.send("Bu kullanıcıya mesaj gönderemiyorum...")
        }

        const filter = (reaction, user) => user.id !== message.client.user.id;
        const collector = await izdimesaj.createReactionCollector(filter, { time: 20000 });

        const onayEmbed = embed.setDescription("Paravanlar açıldı, Kaderiniz gönlünüzle aynı yola çıktı! Hayırlı olsun!");
        const retEmbed = embed.setDescription("Üzgünüm dostum sen üzülme. Boş bir kalbi aslında bir tantuni de doldurabilir..")

        collector.on("collect", (reaction, user) => {
            console.log(reaction.emoji)
            switch (reaction.emoji.id) {
                case "790428165771231242":
                    message.author.send(onayEmbed);
                    guild.members.cache.get(message.author.id).roles.add(roller.get("couples").value());
                    sexiboy.roles.add(roller.get("couples").value());
                    collector.stop();
                    break;


                case "787494263767433246":
                    message.author.send(retEmbed);
                    collector.stop();
                    break;

                default:
                    break;
            }
        });

        collector.on("end", () => {
            izdimesaj.delete({ timeout: 5000 });
        });

    }

}

module.exports = Jail;