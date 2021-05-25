const Command = require("../../../inventory/base/Command");
const low = require('lowdb');
const izin = require('../../../../../MODELS/izin');
const Discord = require('discord.js');
const { sayi } = require("../../helpers/functionz");
class Izinver extends Command {

    constructor(client) {
        super(client, {
            name: "izinver",
            description: "Açıklama Belirtilmemiş.",
            usage: "Kullanım Belirtilmemiş.",
            examples: ["Örnek Bulunmamakta"],
            aliases: [],
            permLvl: [],
            cooldown: 5000,
            enabled: true,
            adminOnly: false,
            ownerOnly: false,
            onTest: false,
            rootOnly: false,
            kkvOnly: true,
            dmCmd: false
        });
    }

    async run(client, message, args, data) {

        const roller = await low(this.client.adapterroles);
        const kanallar = await low(this.client.adapterchannels);
        const utiller = await low(this.client.adapterutil);

        let sexiboy;
        var sexiboyzz = message.mentions.members.first();
        if (sexiboyzz) {
            sexiboy = sexiboyzz;
        } else {
            sexiboy = message.guild.members.cache.get(args[0]);
        }
        if (!sexiboy) return message.channel.send("Kullanıcı Bulunamadı.");

        let kel;
        if (args[1] === "emoji") kel = "emoji";
        if (args[1] === "rol") kel = "role";
        if (args[1] === "kanal") kel = "channel";
        if (!kel) return message.channel.send(new Discord.MessageEmbed().setDescription(`Efekt olarak emoji, rol veya kanal yazmalısın!`));
        let eyup;
        if (args[2] === "ekle") eyup = "create";
        if (args[2] === "sil") eyup = "delete";
        if (args[2] === "yenile") eyup = "update";
        if (!eyup) return message.channel.send(new Discord.MessageEmbed().setDescription(`Tür olarak ekle, sil veya yenile yazmalısın!`));
        if (!sayi(args[3])) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sayı olarak kaç tane ${args[0]} için işlem yapılacağını belirtmelisin!`));
        if (!sayi(args[4])) return message.channel.send(new Discord.MessageEmbed().setDescription(`Sayı olarak bu iznin kaç dakika süreceğini yazmalısın!`));
        if (args[4] > 5) return message.channel.send(new Discord.MessageEmbed().setDescription(`5 dakikadan fazlasına izin veremem!`));
        const system = await izin.findOne({ _id: sexiboy.user.id });
        if (system) return message.channel.send(new Discord.MessageEmbed().setDescription(`${sexiboy} üyesi için şuan varolan bir **${system.effect}** izini bulunmaktadır!`));
        try {
            const sex = await izin({ _id: sexiboy.user.id, count: args[3], type: eyup, effect: kel, created: new Date(), time: args[4] });
            await sex.save();
        } catch (error) {
            console.log(error);
        };
        message.channel.send(new Discord.MessageEmbed().setDescription(`İzin başarıyla oluşturuldu!`));




    }
}

module.exports = Izinver;