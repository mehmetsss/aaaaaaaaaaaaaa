const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const low = require('lowdb');
const { tailor } = require("../../helpers/embedmaker");

class instaVer extends Command {

    constructor(client) {
        super(client, {
            name: "ytver",
            description: (language) => language.get(),
            usage: (language) => language.get(),
            examples: (language) => language.get(),
            category: "moderation",
            enabled: false,
            aliases: ["yetkiver"],
            memberPermissions: [],
            botPermissions: [],
            ownerOnly: true,
            adminOnly: false,
            cooldown: 1000,
            permLvl: ["cmd-authority", "cmd-rhode"]
        });
    }

    async run(client, message, args, data) {


        const roller = await low(this.client.adapterroles);
        const kanallar = await low(this.client.adapterchannels);
        let sexiboy;
        var sexiboyzz = message.mentions.members.first();
        if (sexiboyzz) {
            sexiboy = sexiboyzz;
        } else {
            sexiboy = message.guild.members.cache.get(args[0]);
        }
        if (!sexiboy) return message.channel.send("Kullanıcı Bulunamadı.");

        const taglırol = message.guild.roles.cache.get(roller.get("th-taglı").value());

        const hoistroller = message.guild.roles.cache
            .filter(r => r.rawPosition > taglırol.rawPosition + 2)
            .filter(r => r.hoist)
            .filter(r => r.id !== roller.get("th-booster").value())
            .sort((a, b) => a.rawPosition - b.rawPosition).array().reverse();
        //oistroller.forEach(r => console.log(r.name));
        const rawrol = sexiboy.member.roles.cache.filter(r => r.hoist).sort((a, b) => a.rawPosition - b.rawPosition).array().reverse()[0];
        let currol = hoistroller.reverse().find(r => r.rawPosition > rawrol.rawPosition);
        if (currol.rawPosition > roller.get(this.info.permLvl).value()) message.channel.send("Bu imkansız!");
        sexiboy.roles.add(currol.id);
        await message.channel.send(`Hayırlı Olsun ${sexiboy}, Artık ${rol.name} Rolüne Sahipsin :)`);

        let embedsex = new Discord.MessageEmbed()
            .setAuthor(`Tantoony Hepinizi Seviyor`, message.guild.owner.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setColor("#000101")
            .setTitle("Bir rol verildi!")
            .setFooter("26 Ağustos 2020'den İtibaren...", client.user.displayAvatarURL())
            .addField("Komutu kullanan: ", message.member, true)
            .addField("Kullanıcı:", sexiboy, true)
            .addField("Verilen rol: ", rol, true)
            //.addField("Sebep: ", sebep, true)
            .setDescription(`${sexiboy} Kullanıcısına yetki verildi!`)
            .setTimestamp()
            .setThumbnail(sexiboy.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));

        await message.guild.channels.cache.get(kanallar.get("verilenyetkiler").value()).send(embedsex);
        return console.log(currol);

        const sinir = [roller.get("mod-first").value(), roller.get("cmd-registry").value(), roller.get("yetkili").value()];
        const sinirli = [roller.get("mod-second").value(), roller.get("cmd-transport").value()];
        const start = message.guild.roles.cache.get(roller.get("mod-first").value());

        let rol;
        if (sexiboy.roles.cache.has(start.id)) {
            rol = message.guild.roles.cache.get(roller.get("mod-second").value());
            await sexiboy.roles.add(sinirli);
            await sexiboy.roles.remove(start);
        } else {
            if (!sexiboy.roles.cache.has(roller.get("yetkili").value())) {
                rol = message.guild.roles.cache.get(roller.get("mod-first").value());
                await sexiboy.roles.add(sinir);
            } else return;
        };



        /*
        let kumar = 0;
        if (sinir.some(rol => sexiboy.roles.cache.has(rol))) kumar = 1;
        if (sexiboy.roles.cache.has(roller.get("wrath").value())) kumar = 2;
        var pozisyonal = sexiboy.roles.highest.rawPosition
        if (pozisyonal > roller.get("wrath").value()) return;
        var allahımsanageliyom = pozisyonal + kumar;
        if (allahımsanageliyom === pozisyonal) return;
        if (!sexiboy.roles.cache.has(elmas)) sexiboy.roles.add(elmas);
        const yalarım = message.guild.roles.cache.find(r => r.rawPosition === allahımsanageliyom);
        try {
            sexiboy.roles.remove(sinir);
            sexiboy.roles.add(yalarım);
        } catch (err) {
            console.log(err);
        };
        if (yalarım.id === start) {
            sexiboy.roles.add()
        }
        */

        await message.channel.send(`Hayırlı Olsun ${sexiboy}, Artık ${rol.name} Rolüne Sahipsin :)`);

        let embedsex = new Discord.MessageEmbed()
            .setAuthor(`Tantoony Hepinizi Seviyor`, message.guild.owner.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setColor("#000101")
            .setTitle("Bir rol verildi!")
            .setFooter("26 Ağustos 2020'den İtibaren...", client.user.displayAvatarURL())
            .addField("Komutu kullanan: ", message.member, true)
            .addField("Kullanıcı:", sexiboy, true)
            .addField("Verilen rol: ", rol, true)
            //.addField("Sebep: ", sebep, true)
            .setDescription(`${sexiboy} Kullanıcısına yetki verildi!`)
            .setTimestamp()
            .setThumbnail(sexiboy.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));

        await message.guild.channels.cache.get(kanallar.get("verilenyetkiler").value()).send(embedsex);
        await message.react("721402955538104431");


    }

}

module.exports = instaVer;