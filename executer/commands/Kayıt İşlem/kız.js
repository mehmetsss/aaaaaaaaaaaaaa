const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const Memberz = require('../../../../../MODELS/members');
const jailed = require('../../../../../MODELS/tempjails');
const { checkDays } = require("../../helpers/functionz");
const low = require('lowdb');
const registries = require("../../../../../MODELS/registries");
const namedata = require("../../../../../MODELS/nameData");
const dutyreg = require("../../../../../MODELS/duty_registry");
const duties = require("../../../../../MODELS/userXp");
const gendergiver = require('../../helpers/gendergiver');

class Confirm extends Command {

    constructor(client) {
        super(client, {
            name: "kız",
            description: "İsmi ayarladıktan sonra kişiyi kız olarak kayıt eder",
            usage: "kız etiket/id",
            examples: ["kız 674565119161794560"],
            aliases: ["k", "kz", "kiz", "kadın", "bayan"],
            permLvl: ["cmd-registry"],
            cmdChannel: "cmd-kayıt",
            cooldown: 3000,
            enabled: true,
            adminOnly: false,
            ownerOnly: false,
            rootOnly: false,
            onTest: false,
            dmCmd: false
        });
    }

    async run(client, message, args, data) {

        const roller = low(this.client.adapterroles);
        const kanallar = low(this.client.adapterchannels);
        const utiller = low(this.client.adapterutil);
        const emojiler = low(this.client.adapteremojis);

        client = this.client;

        const kızrol1 = roller.get("kız").value();
        const kızrol2 = roller.get("kızi").value();
        const erkekrol1 = roller.get("erkek").value();
        const erkekrol2 = roller.get("erkeki").value();
        const lpgrol1 = roller.get("lgbt").value();
        const lpgrol2 = roller.get("lgbti").value();
        const yenirol = roller.get("yeni").value();

        let giriş = [];
        giriş.push(kızrol1);
        giriş.push(kızrol2);
        giriş.push(erkekrol1);
        giriş.push(erkekrol2);
        giriş.push(lpgrol1);
        giriş.push(lpgrol2);
        //console.log(giriş);

        const genelkanal = kanallar.get("genel").value();
        const logkanal = kanallar.get("kayıt").value();
        let sexiboy;
        var sexiboyzz = message.mentions.members.first();
        if (sexiboyzz) {
            sexiboy = sexiboyzz;
        } else {
            sexiboy = message.guild.members.cache.get(args[0]);
        }
        if (!sexiboy) return message.channel.send("Kullanıcı Bulunamadı.");
        if (giriş.some(idd => sexiboy.roles.cache.some(r => r.id === idd))) {
            message.channel.send("Zaten Kayıtlı!").then(msg => msg.delete({ timeout: 3000 }));
            return message.delete({ timeout: 2000 });
        };

        if (sexiboy.displayName === sexiboy.user.username) return message.channel.send(`İsim eşleşme hatası!`)

        const bela = await jailed.findOne({ _id: sexiboy.id });
        if (bela) {
            await sexiboy.roles.add(roller.get("th-jail").value());
            await sexiboy.roles.remove(yenirol);
            return message.channel.send(`Kurtulabileceğini mi sandın len ${sexiboy}`);
        };

        if ((await utiller).get("taglıalım").value()) {
            if (!sexiboy.user.username.includes((await utiller).get("tag").value())) {
                if (!sexiboy.roles.cache.has((await roller).get("th-vip").value())) {
                    if (!sexiboy.roles.cache.has((await roller).get("th-booster").value())) {
                        return message.channel.send(new Discord.MessageEmbed()
                            .setColor("#2f3136")
                            .setDescription(`Üzgünüm, ama henüz taglı alımdayız. ${sexiboy} kullanıcısında vip veya booster rolü olmadığı koşulda onu içeri alamam..`)
                        );
                    };
                };
            };
        };

        const embed = new Discord.MessageEmbed()
            .setColor("#fbb2b6")
            .setFooter("10.12.20");

        let ism = sexiboy.displayName.split(" ").slice(1).join(" ");
        let arrs = ism.split(" | ")[1];
        let isim = ism.split(" | ")[0];

        await sexiboy.roles.add([roller.get("kız").value(), roller.get("member").value(), roller.get("kızi").value(), roller.get("memberi").value()]);
        await sexiboy.roles.remove(roller.get("yeni").value());
        if (sexiboy.user.username.includes((await utiller).get("tag").value())) sexiboy.roles.add(roller.get("th-taglı").value());

        let invarray = [];
        let dosyacık = 0;
        let dosya;
        let systeminv = await registries.findOne({ _id: message.member.user.id });
        const shem = {
            invited: sexiboy.user.id,
            created: new Date()
        }

        invarray.push(shem);
        if (!systeminv) {
            try {
                let sex = await registries({ _id: message.member.user.id, registries: invarray });
                await sex.save();
            } catch (error) {
                throw error;
            }
            dosya = invarray;
            dosyacık = 1;
        } else {
            dosya = systeminv.get("registries");
            dosyacık = dosya.length;
            if (!dosya.some(dos => dos.invited === sexiboy.user.id)) {
                await registries.updateOne({ _id: message.member.user.id }, { $push: { registries: shem } });
                dosyacık = dosya.length + 1;
            };
        };
        let system = await namedata.findOne({ _id: sexiboy.user.id });
        if (!system) {
            try {
                let sex = await namedata({ _id: sexiboy.user.id, isim: isim, yaş: arrs, sex: "Female", date: new Date() });
                await sex.save();
            } catch (error) {
                throw error;
            }
        };
        let ecrin = await dutyreg.findOne({ _id: message.member.user.id });
        if (ecrin) {
            if (checkDays(ecrin.created) > ecrin.expiresIn) await dutyreg.deleteOne({ _id: message.member.user.id });
            await dutyreg.updateOne({ _id: message.member.user.id }, { $inc: { processx: 1 } });
            ecrin = await dutyreg.findOne({ _id: message.member.user.id });
            if (ecrin.count === ecrin.processx) await dutyreg.deleteOne({ _id: message.member.user.id });
            const shem = {
                date: new Date(),
                type: 'Kayıt',
                count: ecrin.count
            };
            let lewanch = await duties.findOne({ _id: message.member.user.id });
            if (!lewanch) {
                let laden = [];
                laden.push(shem);
                let sex = await lewanch({ _id: message.member.user.id, complated: laden });
                await sex.save();
            } else {
                duties.updateOne({ _id: message.member.user.id }, { $push: { complated: shem } });
            };
        };
        message.channel.send(embed.setDescription(`${sexiboy} kişisinin kaydı ${message.member} tarafından gerçekleştirildi.\nBu kişinin kayıt sayısı: \`${dosyacık}\``));
        message.guild.channels.cache.get((await kanallar).get("cmd_kayıt").value()).send(new Discord.MessageEmbed()
            .setDescription(`${sexiboy} kişisinin verileri başarıyla işlenmiştir.`).setColor('#fbb2b6')
            .addField("Cinsiyet:", "Kadın", true).addField("İsim:", isim, true).addField("Yaş", arrs, true));

    }

}

module.exports = Confirm;