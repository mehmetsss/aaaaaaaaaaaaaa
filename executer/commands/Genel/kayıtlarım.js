const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const registries = require('../../../../../MODELS/registries');
const { checkDays } = require("../../helpers/functionz");
const low = require('lowdb');

class Confirm extends Command {

    constructor(client) {
        super(client, {
            name: "kayıtlarım",
            description: "Kayıt sayısını görmeye yarar",
            usage: "kayıtlarım",
            examples: ["kayıtlarım", "kayıtlarım 674565119161794560"],
            aliases: [],
            permLvl: [],
            cooldown: 3000,
            enabled: true,
            adminOnly: false,
            ownerOnly: false,
            onTest: false,
            rootOnly: false,
            dmCmd: false
        });
    }

    async run(client, message, args, data) {

        const utiller = low(this.client.adapterutil);
        const emojiler = low(this.client.adapteremojis);

        client = this.client;

        let sexiboy;
        var sexiboyzz = message.mentions.members.first();
        if (sexiboyzz) {
            sexiboy = sexiboyzz;
        } else {
            sexiboy = message.guild.members.cache.get(args[0]);
        }
        let dosyacık = 0;
        if (sexiboy) {
            let systeminv = await registries.findOne({ _id: sexiboy.user.id });
            if (!systeminv) {
                return message.channel.send(new Discord.MessageEmbed().setDescription("Hiçbir Kayıt Bulunamadı."))
            } else {
                var dosya = systeminv.get("registries");
                dosyacık = dosya.length;
            };

            var richyy = new Discord.MessageEmbed()
                .setColor("#000001")
                .setDescription(`${sexiboy} kişisinin toplamda ${dosyacık} kaydı bulunmaktadır.`);
            await message.channel.send(richyy);
            await message.react((await emojiler).get("ok").value().split(':')[2].replace('>', ''));

        } else {

            let systeminv = await registries.findOne({ _id: message.member.user.id });
            if (!systeminv) {
                return message.channel.send(new Discord.MessageEmbed().setDescription("Hiçbir Kayıt Bulunamadı."))
            } else {
                var dosya = systeminv.get("registries");
                dosyacık = dosya.length;
            };

            var richyy = new Discord.MessageEmbed()
                .setColor("#000001")
                .setDescription(`${message.member} kişisinin toplamda ${dosyacık} kaydı bulunmaktadır.`);
            await message.channel.send(richyy);
            await message.react((await emojiler).get("ok").value().split(':')[2].replace('>', ''));

        }


    }

}

module.exports = Confirm;