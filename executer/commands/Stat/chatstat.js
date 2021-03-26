const { stripIndent } = require('common-tags');
const Discord = require('discord.js');
const low = require('lowdb');
const Command = require("../../../inventory/base/Command");
const stats = require('../../../../../MODELS/msgStat');
const { checkDays, sayi } = require('../../helpers/functionz');
const { PieChart } = require("canvas-pie-chart");
const stringTable = require('string-table');
const fs = require("fs");
class Call extends Command {

    constructor(client) {
        super(client, {
            name: "chatstat",
            description: "Metin istatistiklerinizi veya bahsedilen kişinin metin istatistiklerini gösterir.",
            usage: "chatstat",
            examples: ["chatstat gün (@etiket/id)"],
            aliases: ["cs"],
            permLvl: [],
            cooldown: 1000,
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
            sexiboy = message.guild.members.cache.get(args[1]);
        };
        if (!sexiboy) sexiboy = message.member;
        let gün = 7;
        if (args[0]) {
            if (!sayi(args[0])) {
                return message.channel.send(new Discord.MessageEmbed().setDescription(`Lütfen Geçerli Bir Gün Gir!`))
            } else {
                gün = args[0];
            };
        };
        let systeminv = await stats.findOne({ _id: sexiboy.user.id });
        if (!systeminv) {
            return message.channel.send(new Discord.MessageEmbed().setDescription("Hiçbir Veri Bulunamadı."))
        } else {
            let zz = 0;
            let aa;
            var dosya = await systeminv.get("messages");
            const veriler = dosya.filter(entry => checkDays(entry.date) <= gün);
            const msgdata = new Map();
            for (let index = 0; index < veriler.length; index++) {
                const veri = veriler[index];
                let loll = msgdata[veri.channel] || 0;
                msgdata[veri.channel] = loll + 1;

            }
            let docs = [];
            const birşey = Object.keys(msgdata);
            const birşeyin = Object.values(msgdata);
            let asd = 0;
            for (let index = 0; index < birşeyin.length; index++) {
                const element = birşey[index];
                console.log(element);
                let isim = 'Bilinmiyor';
                const kanal = message.guild.channels.cache.get(element);
                if (kanal) isim = kanal.name;
                const shem = {
                    Kanal: isim,
                    Mesaj: birşeyin[index]
                }
                asd = asd + birşeyin[index];
                docs.push(shem);
            };
            const logs = docs.sort(function (a, b) {
                return b.Mesaj - a.Mesaj;
            });
            let dokz = [];
            for (let index = 0; index < 5; index++) {
                const element = logs[index];
                dokz.push(element);
            }
            const embeddoc = stringTable.create(dokz, {
                headers: ['Kanal', 'Mesaj']
            });

            const Embed = new Discord.MessageEmbed().setDescription(stripIndent`
    
            ${sexiboy} kişisi **${gün} gün** içinde toplam **${asd}** mesajı bulunmaktadır.

            \`\`\`${embeddoc}\`\`\`

            `).setTitle(message.guild.name).setColor(utiller.get("embedcolor").value());
            message.channel.send(Embed);
        }

    }
}

module.exports = Call;