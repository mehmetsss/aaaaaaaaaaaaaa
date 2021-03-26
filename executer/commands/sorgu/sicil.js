const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const functionz = require("../../helpers/functionz");
const low = require('lowdb');
const sicil = require('../../../../../MODELS/sicil');
const stringTable = require('string-table');
const { checkDays, sayi } = require("../../helpers/functionz");
const { stripIndent } = require("common-tags");
class Jail extends Command {

    constructor(client) {
        super(client, {
            name: "sicil",
            description: "Bir üyenin dosyaslarını açar",
            usage: "sicil etiket/id",
            examples: ["sicil 674565119161794560"],
            aliases: [],
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
        const utiller = low(this.client.adapterutil);
        const emojiler = await low(this.client.adapteremojis);
        const emojis = emojiler.value();
        const embed = new Discord.MessageEmbed().setColor('#2f3136');

        let sexiboy;
        var sexiboyzz = message.mentions.members.first();
        if (sexiboyzz) {
            sexiboy = sexiboyzz;
        } else {
            sexiboy = message.guild.members.cache.get(args[0]);
        }
        if (!sexiboy) sexiboy = message.member;

        const doc = await sicil.findOne({ _id: sexiboy.user.id });
        if (!doc) return message.channel.send("Dosya bulunamadı!")
        const scl = await doc.get("punishes").reverse();
        let asdf = [];
        for (let index = 0; index < scl.length - 1; index++) {
            const element = scl[index];
            //console.log(element)
            const shem = {
                no: index + 1,
                tür: element.type,
                gün: checkDays(element.date)
            };
            asdf.push(shem);
        };
        const embeddoc = stringTable.create(asdf, {
            headers: ['no', 'tür', 'gün']
        })
        if (!args[1]) return message.channel.send(embed.setDescription(`\`\`\`md\n${embeddoc}\`\`\``).setFooter(sexiboy.user.username).setTitle('SİCİL KONTROL'));
        if (!sayi(args[1])) return message.channel.send(embed.setDescription(`Lütfen bir sayı belirle!`))
        const ecrin = scl[args[1]];
        const ecrinim = embed.setDescription(stripIndent`
        **Tür:** \`${ecrin.type}\`
        **Sebep:**  \`${ecrin.reason}\`
        **Sorumlu:**  ${message.guild.members.cache.get(ecrin.executor) || "Bilinmiyor"}
        **Zaman:** \`${checkDays(ecrin.date)} gün önce\`
        `).setFooter(sexiboy.displayName).setTitle("HUB EMNIYET");
        message.channel.send(ecrinim);
    }

}

module.exports = Jail;