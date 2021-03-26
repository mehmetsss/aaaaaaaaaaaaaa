const { stripIndent } = require('common-tags');
const Discord = require('discord.js');
const low = require('lowdb');
const Command = require("../../../inventory/base/Command");
const stats = require('../../../../../MODELS/msgStat');
const statz = require('../../../../../MODELS/voicestat');
const { checkDays, sayi } = require('../../helpers/functionz');
const { PieChart } = require("canvas-pie-chart");
const stringTable = require('string-table');
const fs = require("fs");
class Call extends Command {

    constructor(client) {
        super(client, {
            name: "stat",
            description: "Ses istatistiklerinizi veya bahsedilen kişinin ses istatistiklerini gösterir.",
            usage: "stat",
            examples: ["stat gün (@etiket/id)"],
            aliases: [],
            permLvl: [],
            cooldown: 300000,
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
        var dosya = await systeminv.get("messages");
        const veriler = dosya.filter(entry => checkDays(entry.date) <= gün);
        const msgdata = new Map();
        for (let index = 0; index < veriler.length; index++) {
            const veri = veriler[index];
            let loll = msgdata[veri.channel] || 0;
            msgdata[veri.channel] = loll + 1;
        }
        let systeminvi = await statz.findOne({ _id: sexiboy.user.id });
        var dosyam = await systeminvi.get("logs");
        const verileri = dosyam.filter(entry => checkDays(entry.int) <= gün);
        const voiceData = new Map();
        for (let index = 0; index < verileri.length; index++) {
            const veri = verileri[index];
            let loll = voiceData[veri.channelID] || 0;
            voiceData[veri.channelID] = loll + Math.floor(veri.duration / 3600000);
        }
        let docs = [];
        let docz = [];
        const birşey = Object.keys(msgdata);
        const birşeyin = Object.values(msgdata);
        let asd = 0;
        let asdf = 0;
        const ikişey = Object.keys(voiceData);
        const ikişeyin = Object.values(voiceData);
        for (let index = 0; index < birşeyin.length; index++) {
            const element = birşey[index];
            //console.log(element);
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
        for (let index = 0; index < ikişeyin.length; index++) {
            const element = ikişey[index];
            //console.log(element);
            let isim = 'Bilinmiyor';
            const kanal = message.guild.channels.cache.get(element);
            if (kanal) isim = kanal.name;
            const shem = {
                Kanal: isim,
                Saat: ikişeyin[index]
            }
            asdf = asdf + ikişeyin[index];
            docz.push(shem);
        };
        const logs = docs.sort(function (a, b) {
            return b.Mesaj - a.Mesaj;
        });
        const lokz = docz.sort(function (a, b) {
            return b.Saat - a.Saat;
        });
        let dokz = ``;
        let seks = ``;
        for (let index = 0; index < 5; index++) {
            const element = logs[index];
            let str = stripIndent`**${element.Kanal}:**        \`${element.Mesaj}\` Mesaj`;
            dokz = dokz + `\n${emojiler.get("textchannel").value()} ${str}`
        };
        for (let index = 0; index < 5; index++) {
            const element = lokz[index];
            let str = `**${element.Kanal}:** \`${element.Saat}\` Saat`;
            seks = seks + `\n${emojiler.get("allowedvoice").value()} ${str}`
        }
        const Embed = new Discord.MessageEmbed().setDescription(stripIndent`

        ${sexiboy} kişisi **${gün} gün** içinde toplam;
        
        ${(await emojiler).get("staff").value()} **${asd}** mesajı bulunmaktadır.
        ${(await emojiler).get("staff").value()} **${asdf}** saat seste durmuştur.
        ${dokz}

        ${seks}


        `).setTitle(message.guild.name).setColor(utiller.get("embedcolor").value()).setFooter(sexiboy.displayName);
        message.channel.send(Embed);


    }
}

module.exports = Call;