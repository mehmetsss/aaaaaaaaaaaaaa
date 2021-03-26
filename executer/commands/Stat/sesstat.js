const { stripIndent } = require('common-tags');
const Discord = require('discord.js');
const low = require('lowdb');
const Command = require("../../../inventory/base/Command");
const stats = require('../../../../../MODELS/voicestat');
const { checkDays, sayi } = require('../../helpers/functionz');
const { PieChart } = require("canvas-pie-chart");
const stringTable = require('string-table');
const fs = require("fs");
class Call extends Command {

    constructor(client) {
        super(client, {
            name: "sesstat",
            description: "Ses istatistiklerinizi veya bahsedilen kişinin ses istatistiklerini gösterir.",
            usage: "sesstat",
            examples: ["sesstat gün (@etiket/id)"],
            aliases: ["ss"],
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

        const reducer = (accumulator, currentValue) => accumulator.dur + currentValue.dur;
        let video = 0;
        let stream = 0;
        let serverdeaf = 0;
        let selfdeaf = 0;
        let mutes = 0;
        let servermutes = 0;
        let total = 0;

        let aa = 0;
        let ab = 0;
        let ac = 0;
        let ad = 0;
        let ae = 0;
        let af = 0;
        let ax = 0;
        let az = 0;
        let aq = 0;
        let aw = 0;
        const objj = {
            "ST_PUBLIC": "Genel",
            "ST_ACTIVITY": "Etkinlik",
            "ST_GAMING": "Oyun",
            "ST_THERAPY": "Terapi",
            "ST_MEDIATION": "Sorun Çözme",
            "ST_REGISTRY": "Teyit",
            "ST_ALONE": "Tekli",
            "ST_STREAM": "Yayıncı",
            "ST_PRIVATE": "Özel"
        };
        function statconv(sayi) {
            sayi = sayi.replace((sayi), d => {
                return objj[d];
            });
            return sayi;
        };
        let arrey = [];
        let errey = [];
        let systeminv = await stats.findOne({ _id: sexiboy.user.id });
        if (!systeminv) {
            return message.channel.send(new Discord.MessageEmbed().setDescription("Hiçbir Veri Bulunamadı."))
        } else {
            let zz = 0;
            let aa;
            var dosya = await systeminv.get("logs");
            const veriler = dosya.filter(entry => checkDays(entry.int) <= gün);
            Object.keys(objj).forEach(async (key) => {
                let yy = 0;
                veriler.filter(entry => entry.channelType === key.toString()).forEach(verim => { yy = yy + verim.duration / 60000; });
                zz = zz + yy;
            });
            Object.keys(objj).forEach(async (key) => {
                let yy = 0;
                veriler.filter(entry => entry.channelType === key.toString()).forEach(verim => { yy = yy + verim.duration / 60000; });
                arrey.push({
                    text: `${statconv(key)} %${Math.floor(yy * 100 / zz)}`,
                    size: yy
                })
            });
            //arrey.filter(x => x.text === 'Genel').forEach(x => aa = aa + x.size);
            let oran = 0;
            arrey.forEach(sample => {
                if (sample.size / zz < 1 / 10) {
                    oran = oran + sample.size;
                } else {
                    errey.push(sample);
                }
            });
            errey.push({
                text: "Diğer",
                size: oran
            });


            veriler.forEach(veri => {
                let dur = Math.floor(veri.duration / 60000);
                if (veri.selfMute) mutes = mutes + dur;
                if (veri.serverMute) servermutes = servermutes + dur;
                if (veri.streaming) stream = stream + dur;
                if (veri.selfVideo) video = video + dur;
                if (veri.selfDeaf) selfdeaf = selfdeaf + dur;
                if (veri.serverdeaf) serverdeaf = serverdeafs + dur;
                total = total + dur;

                const kanal = veri.channelType;
                if (kanal === "ST_PUBLIC") {
                    aa = aa + dur;
                } else if (kanal === "ST_PRIVATE") {
                    ab = ab + dur;
                } else if (kanal === "ST_ACTIVITY") {
                    ac = ac + dur;
                } else if (kanal === "ST_GAMING") {
                    ad = ad + dur;
                } else if (kanal === "ST_THERAPY") {
                    ae = ae + dur;
                } else if (kanal === "ST_MEDIATION") {
                    af = af + dur;
                } else if (kanal === "ST_REGISTRY") {
                    ax = ax + dur;
                } else if (kanal === "ST_ALONE") {
                    az = az + dur;
                } else if (kanal === "ST_STREAM") {
                    aq = aq + dur;
                } else aw = aw + dur;

            });

        };
        /*
        const chart = new PieChart({
            labels: [
                {
                    text: "Public",
                    size: aa
                },
                {
                    text: "Yayın",
                    size: aq
                },
                {
                    text: "Alone",
                    size: az
                },
                {
                    text: "Özel Odalar",
                    size: ab
                },
                {
                    text: "Diğer",
                    size: (ac + aw)
                },
                {
                    text: "Oyun",
                    size: ad
                },
                {
                    text: "Terapi",
                    size: ae
                },
                {
                    text: "Sorun Çözme",
                    size: af
                },
                {
                    text: "Kayıt",
                    size: ax
                }
            ],
            blackOrWhiteInvert: true,
            size: 4096
        });
        */

        const chart = new PieChart({
            labels: errey,
            blackOrWhiteInvert: true,
            size: 4096
        });

        let docs = [];
        let net = total - mutes;
        let grv = af + ax + ae;
        let arrry = [net, video, stream, grv];
        let durm = ["mic-open", "cam-open", "Stream", "On-Duty"];
        for (let index = 0; index < arrry.length; index++) {
            const element = arrry[index];
            const shem = {
                '%??': `%${Math.floor(element * 100 / total)}`,
                'Durum': durm[index],
                'Saat': Math.floor(element / 60),
                'Dk': element
            }
            docs.push(shem)
        }
        //console.log(documents
        const embeddoc = stringTable.create(docs, {
            headers: ['%??', 'Durum', 'Saat', 'Dk']
        });

        const buffer = chart.draw();
        let att = new Discord.MessageAttachment(buffer, 'Stat.png');
        //fs.writeFileSync(`./inventory/src/${sexiboy.user.id}.png`, buffer);
        const Embed = new Discord.MessageEmbed().setDescription(stripIndent`
        
        ${sexiboy} kişisi **${gün} gün** içinde toplam **${Math.floor(total / 60)} saat** seste durmuştur.

        \`\`\`${embeddoc}\`\`\`

        `).setTitle(message.guild.name).setColor(utiller.get("embedcolor").value()).setImage("attachment://Stat.png").attachFiles(att);
        message.channel.send(Embed);

    }
}

module.exports = Call;