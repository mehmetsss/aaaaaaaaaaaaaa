const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const low = require('lowdb');
const { tailor } = require("../../helpers/embedmaker");

class instaVer extends Command {

    constructor(client) {
        super(client, {
            name: "düşür",
            description: "Etiketlenen kişiyi sağ tarafta düşürür",
            usage: "düşür @etiket/id",
            examples: ["düşür 674565119161794560"],
            category: "moderation",
            enabled: true,
            aliases: ["tenzil"],
            memberPermissions: [],
            botPermissions: [],
            ownerOnly: false,
            adminOnly: false,
            onTest: false,
            rootOnly:false,
            cooldown: 100000,
            permLvl: ["cmd-manager", "cmd-rhode"]
        });
    }

    async run(client, message, args, data) {


        const roller = await low(this.client.adapterroles);
        const kanallar = await low(this.client.adapterchannels);
        const emojiler = await low(this.client.adapteremojis);
        const emojis = emojiler.value()
        let sexiboy;
        var sexiboyzz = message.mentions.members.first();
        if (sexiboyzz) {
            sexiboy = sexiboyzz;
        } else {
            sexiboy = message.guild.members.cache.get(args[0]);
        }
        if (!sexiboy) return message.channel.send("Kullanıcı Bulunamadı.");
        const embed = new Discord.MessageEmbed().setColor('#2f3136');
        if (message.member.roles.highest.rawPosition <= sexiboy.roles.highest.rawPosition) return message.channel.send(embed.setDescription(`${emojis.warn} Bunu yapmak için yeterli yetkiye sahip değilsin`));

        const taglırol = message.guild.roles.cache.get(roller.get("th-taglı").value());

        const hoistroller = message.guild.roles.cache
            .filter(r => r.rawPosition > taglırol.rawPosition + 2)
            .filter(r => r.hoist)
            .filter(r => r.id !== roller.get("th-booster").value())
            .sort((a, b) => a.rawPosition - b.rawPosition).array().reverse();
        //oistroller.forEach(r => console.log(r.name));
        const rawrol = sexiboy.roles.cache.filter(r => r.hoist).sort((a, b) => a.rawPosition - b.rawPosition).array().reverse()[0];
        let currol = hoistroller.find(r => r.rawPosition < rawrol.rawPosition);
        let oldrol = hoistroller.find(r => r.rawPosition === rawrol.rawPosition);
        if (!currol) currol = hoistroller.reverse()[0];
        if (currol.rawPosition > message.guild.roles.cache.get(roller.get("cmd-manager").value()).rawPosition) return message.channel.send("Bu imkansız!");
        sexiboy.roles.add(currol.id);
        if (oldrol) sexiboy.roles.remove(oldrol.id);
        await message.channel.send(`Üzgünüm ${sexiboy}. Umarım ilerde tekrar yükselirsin..`);

        let embedsex = new Discord.MessageEmbed()
            .setAuthor(`Tantoony Hepinizi Seviyor`, message.guild.owner.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setColor("#000001")
            .setTitle("Bir rol verildi!")
            .setFooter("26 Ağustos 2020'den İtibaren...", client.user.displayAvatarURL())
            .addField("Komutu kullanan: ", message.member, true)
            .addField("Kullanıcı:", sexiboy, true)
            .addField("Verilen rol: ", currol, true)
            //.addField("Sebep: ", sebep, true)
            .setDescription(`${sexiboy} Kullanıcısına yetki verildi!`)
            .setTimestamp()
            .setThumbnail(sexiboy.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));

        await message.guild.channels.cache.get(kanallar.get("cmd-yetki").value()).send(embedsex);
        message.react(emojiler.get("okred").value().split(':')[2].replace('>', ''));
        //this.client.cmdCooldown[message.author.id][this.help.name] = Date.now() + this.info.cooldown;
    }

}

module.exports = instaVer;