const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const jailed = require('../../../../../MODELS/tempjails');
const low = require('lowdb');

class Confirm extends Command {

    constructor(client) {
        super(client, {
            name: "isim",
            description: "Kullanıcının ismini kayıt etmek için kullanılır",
            usage: "isim etiket/id isim yaş",
            examples: ["isim 674565119161794560 orhan yalın 20"],
            aliases: ["i", "ism"],
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
        const yenirol = roller.get("yeni").value();

        let giriş = [];
        giriş.push(kızrol1);
        giriş.push(kızrol2);
        giriş.push(erkekrol1);
        giriş.push(erkekrol2);
        //console.log(giriş);

        const genelkanal = kanallar.get("genel").value();
        const logkanal = kanallar.get("kayıt").value();
        let sexiboy;
        var sexiboyzz = message.mentions.members.first();
        if (sexiboyzz) {
            sexiboy = sexiboyzz;
        } else {
            sexiboy = message.guild.members.cache.get(args[0]);
            if (!sexiboy) return message.channel.send("Kullanıcı Bulunamadı.");
        }
        if (giriş.some(idd => sexiboy.roles.cache.some(r => r.id === idd))) {
            message.channel.send("Zaten Kayıtlı!").then(msg => msg.delete({ timeout: 3000 }));
            return message.delete({ timeout: 2000 });
        };

        let yarrak = message.content.split(' ').slice(2);
        let asd = "";
        await yarrak.forEach(ism => {
            ism = ism[0].toUpperCase() + ism.slice(1).toLowerCase();
            asd = asd + ism + ' ';
        });
        //console.log(asd);
        if (!asd) {
            message.channel.send("Adını yazmadın adamın alooo").then(msg => msg.delete({ timeout: 3000 }));
            return message.delete({ timeout: 2000 });
        };

        let yaş = args[args.length - 1];
        function allah(anan) {
            var reg = new RegExp("^\\d+$");
            var valid = reg.test(anan);
            return valid;
        }

        if (!allah(yaş)) return message.channel.send('Lütfen Geçerli bir yaş gir!');
        if (!args) return message.channel.send("Kullanım: \`.kaydet <isim> <yaş>\`");
        let isim = asd.replace(yaş, `| ${yaş}`);

        let anan = '';
        if (sexiboy.user.username.includes((await utiller).get("tag").value())) {
            anan = (await utiller).get("tag");
        } else {
            anan = '•';
        };
        sexiboy.setNickname(`${anan} ${isim}`);

        const bela = await jailed.findOne({ _id: sexiboy.id });
        if (bela) {
            //console.log(bela);
            sexiboy.roles.add(roller.get("jail").value());
            sexiboy.roles.remove(yenirol);
            message.channel.send(`Kurtulabileceğini mi sandın len ${sexiboy}`);
            return;
        };

        var richyy = new Discord.MessageEmbed()
            .setColor("#000001")
            .setDescription(`Kullanıcının adı başarıyla ayarlandı.`)
        message.channel.send(richyy);

        var allahım = new Discord.MessageEmbed()
            .setColor("#000001")
            .addField(`İsim | Yaş ⇨ ${isim}`, `${message.member} tarafından ${sexiboy} kişisinin kullanıcı adı başarıyla değiştirildi.`, false)

        message.guild.channels.cache.get((await kanallar).get("cmd-isim").value()).send(allahım);
        message.react((await emojiler).get("tantoony").value().split(':')[2].replace('>', ''));

    }

}

module.exports = Confirm;