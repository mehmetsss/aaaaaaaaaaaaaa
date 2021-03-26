const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const namedata = require("../../../../../MODELS/nameData");
const low = require('lowdb');
const { sayi } = require("../../helpers/functionz");


class Banclass extends Command {

    constructor(client) {
        super(client, {
            name: "veridüzelt",
            description: "Varolan bir kimlik verisini düzeltir",
            usage: "veridüzelt etiket/id isim yaş cinsiyet",
            examples: ["veridüzelt 674565119161794560 orhan yalın 20 erkek"],
            aliases: ["edit"],
            permLvl: ["cmd-registry", "cmd-rhode", "cmd-authority"],
            cooldown: 120000000,
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
        const emojiler = low(this.client.adapteremojis);
        client = this.client;
        let sexiboy;
        var sexiboyzz = message.mentions.members.first();
        if (sexiboyzz) {
            sexiboy = sexiboyzz;
        } else {
            sexiboy = message.guild.members.cache.get(args[0]);
        }
        if (!sexiboy) return message.channel.send("Kullanıcı Bulunamadı.");

        const embed = new Discord.MessageEmbed()
            .setColor("#2f3136")
            .setFooter("10.12.20");

        let yarrak = message.content.split(' ').slice(2);
        let asd = "";
        await yarrak.forEach(ism => {
            ism = ism[0].toUpperCase() + ism.slice(1).toLowerCase();
            asd = asd + ism + ' ';
        });
        asd = asd.split(' ').slice(0, args.length - 3).join(' ');
        //console.log(asd);
        if (!asd) {
            message.channel.send("Adını yazmadın adamın alooo").then(msg => msg.delete({ timeout: 3000 }));
            return message.delete({ timeout: 2000 });
        };

        let yaş = args[args.length - 2];
        let cinsiyet = args[args.length - 1];
        let ysex;
        if (!sayi(yaş)) return message.channel.send('Lütfen Geçerli bir yaş gir!');
        if (!args) return message.channel.send("Kullanım: \`.veridüzelt @etiket/id <isim> <yaş> <erkek/kız>\`");
        if (cinsiyet === 'erkek') {
            ysex = 'Male';
        } else if (cinsiyet === 'kız') {
            ysex = 'Female';
        } else return message.channel.send(embed.setDescription(`${(await emojiler).get("error").value()} "erkek" veya "kız" yazmalısın.`))
        let isim = asd.replace(` ${yaş}`, ``).replace(` ${cinsiyet}`, ``);
        //return message.channel.send(`${isim} ${yaş}`)

        let anan = '';
        if (sexiboy.user.username.includes((await utiller).get("tag").value())) {
            anan = (await utiller).get("tag");
        } else {
            anan = '•';
        };
        try {
            sexiboy.setNickname(`${anan} ${isim} | ${yaş}`);
        } catch (error) {
            console.log(error);
        };
        const dosyam = await namedata.findOne({ _id: sexiboy.user.id });
        if (!dosyam) {
            try {
                let sex = await namedata({
                    _id: sexiboy.user.id,
                    isim: isim,
                    yaş: yaş,
                    sex: ysex,
                    date: new Date()
                })
                await sex.save();
            } catch (error) {
                console.log(error);
            }
            return message.channel.send('Veeri Başarıyla Oluşturuldu!');
        };
        await namedata.updateOne({ _id: sexiboy.user.id }, { isim: isim, yaş: yaş, sex: ysex })

        message.channel.send(embed.setDescription(`${sexiboy} kişisinin verileri ${message.member} tarafından düzenlendi.`));
        message.guild.channels.cache.get((await kanallar).get("cmd_kayıt").value()).send(new Discord.MessageEmbed()
            .setDescription(`${sexiboy} kişisinin verileri başarıyla **düzenlendi**.`).setColor('#96e7f4')
            .addField("Cinsiyet:", "Erkek", true).addField("İsim:", isim, true).addField("Yaş", yaş, true));


    }

}

module.exports = Banclass;