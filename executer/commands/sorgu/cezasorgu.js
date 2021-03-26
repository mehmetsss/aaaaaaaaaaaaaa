const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const functionz = require("../../helpers/functionz");
const low = require('lowdb');
const jailed = require('../../../../../MODELS/jailed');

class Jail extends Command {

    constructor(client) {
        super(client, {
            name: "cezasorgu",
            description: "Bir üyenin hapis dosyasını açar",
            usage: "cezasorgu etiket/id",
            examples: "cezasorgu 674565119161794560",
            aliases: ["csorgu"],
            permLvl: ["cmd-jailor", "cmd-rhode", "cmd-authority"],
            cooldown: 60000,
            enabled: true,
            adminOnly: false,
            ownerOnly: false,
            onTest: false,
            rootOnly: false,
            dmCmd: false
        });
    }

    async run(client, message, args, data) {

        const roller = low(this.client.adapterroles);
        const kanallar = low(this.client.adapterchannels);

        if (message.channel.id !== (await kanallar).get("cmdkanal").value()) return message.delete();

        let sexiboy;
        var sexiboyzz = message.mentions.members.first();
        if (sexiboyzz) {
            sexiboy = sexiboyzz;
        } else {
            sexiboy = message.guild.members.cache.get(args[0]);
            if (!sexiboy) return message.channel.send("Kullanıcı Bulunamadı.");
        }

        let system = await jailed.findOne({ _id: sexiboy.user.id });
        if (!system) return message.channel.send("Belge Bulunamadı.");
        let sebep = system.get("sebep");
        let executor = system.get("executor");
        const yetkili = message.guild.members.cache.get(executor);

        const embed = new Discord.MessageEmbed().setDescription(`${sexiboy} kişisi, ${yetkili} tarafından **${sebep}** Sebebiyle jaile uçmuştur.`);
        message.channel.send(embed);

    }

}

module.exports = Jail;