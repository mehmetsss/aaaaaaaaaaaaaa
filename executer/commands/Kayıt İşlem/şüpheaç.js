const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const low = require('lowdb');
const { tailor } = require("../../helpers/embedmaker");

class instaVer extends Command {

    constructor(client) {
        super(client, {
            name: "şüpheaç",
            description: "Şüpheli olan birisinin şüpheli rolünü alır.",
            usage: "şüpheaç etiket/id",
            examples: "şüpheaç 674565119161794560",
            aliases: ["şüphesiz", "şüphemyok"],
            permLvl: ["cmd-registry"],
            cooldown: 30000,
            enabled: true,
            adminOnly: false,
            ownerOnly: false,
            rootOnly: false,
            onTest: false,
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

        const yetkili = message.guild.roles.cache.get(roller.get("cmdregistry").value());
        const kanal = message.guild.channels.cache.get(kanallar.get("welcome").value());

        if (!sexiboy.roles.cache.has(roller.get("şüpheli").value())) return message.channel.send("Adam şüpheli değil!");

        const verilecek = roller.get("yeni").value();
        await sexiboy.roles.add(verilecek);
        const alınacak = roller.get("şüpheli").value();
        await sexiboy.roles.remove(alınacak);
        await message.react(emojiler.get("ok").value().replace('<', ''));
        await kanal.send(new Discord.MessageEmbed()
            .setAuthor("EXILIUM Sunucusuna Hoş Geldin", message.guild.iconURL())
            .setColor("#580000")
            .setFooter(`1 Ekim 2020'den İtibaren... | ${new Date(Date.now()).getUTCDate() + 1}.${new Date(Date.now()).getUTCMonth() + 1}.${new Date(Date.now()).getUTCFullYear()}`, client.user.displayAvatarURL())
            .setDescription(
                stripIndents`
            
         ${emojis.get("kalkan").value()} Kapılar ${sexiboy} için açıldı!

         ${emojis.get("balta").value()} Seninle beraber **${rain(message.guild.memberCount)}** kişiyiz.

         ${emojis.get("kalkan").value()} Seni içeri alan kişi: ${message.member}

         ${emojis.get("balta").value()} **Hesap:** ${rain(checkDays(sexiboy.user.createdAt))} gün önce açılmıştır.
         
         ${emojis.get("kalkan").value()} Kayıt olmak için ${yetkili} rolündeki yetkilileri etiketleyerek ses teyit odasına geçiniz!
        
        `)
            //.setImage(utiller.get("welcome").value())
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
        );



    }

}

module.exports = instaVer;