const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const low = require('lowdb');
const { tailor } = require("../../helpers/embedmaker");

class instaVer extends Command {

    constructor(client) {
        super(client, {
            name: "yetkiver6",
            description: "6. yetkiyi permler ile beraber vermek için kullanılır.",
            usage: "yetkiver6 etiket/id",
            examples: ["yetkiver6 213617765095833600"],
            aliases: [],
            permLvl: ["cmd-manager", "cmd-rhode", "cmd-authority"],
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
        const verilecek = [roller.get("cmd-vmuter").value(), roller.get("cmd-transport").value(), roller.get("cmd-registry").value(), roller.get("perm6").value(), roller.get("yetkili").value(), roller.get("cmd-cmuter").value(), roller.get("cmd-jailor").value(), roller.get("cmd-banner").value()];
        let verilenler = [];
        verilecek.forEach(element => {
            verilenler.push(element)
        });
        await sexiboy.roles.add(verilecek);
        await sexiboy.roles.remove([roller.get("perm5").value(),roller.get("perm4").value(), roller.get("perm3").value(), roller.get("perm2").value(), roller.get("perm1").value()]);
        let embedsex = new Discord.MessageEmbed()
            .setAuthor(`Tantoony Hepinizi Seviyor`, message.guild.owner.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setColor("#ffffff")
            .setTitle("Bir rol verildi!")
            .setFooter("26 Ağustos 2020'den İtibaren...", client.user.displayAvatarURL())
            .addField("Komutu kullanan: ", message.member, true)
            .addField("Kullanıcı:", sexiboy, true)
            .addField("Verilen rol: ", verilenler.join(', '), true)
            //.addField("Sebep: ", sebep, true)
            .setDescription(`${sexiboy} Kullanıcısına yetki verildi!`)
            .setTimestamp()
            .setThumbnail(sexiboy.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));

        await message.guild.channels.cache.get(kanallar.get("cmd-yetki").value()).send(embedsex);


        message.react(emojiler.get("okred").value().split(':')[2].replace('>', ''));
        this.client.cmdCooldown[message.author.id][this.help.name] = Date.now() + this.info.cooldown;




        // 564141092979605514 448915498185392140


    }

}

module.exports = instaVer;