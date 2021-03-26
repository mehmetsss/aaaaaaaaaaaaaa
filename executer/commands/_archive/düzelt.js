const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const low = require('lowdb');
const jailed = require('../../../../../MODELS/tempjails');
class Banclass extends Command {

    constructor(client) {
        super(client, {
            name: "düzelt",
            description: (language) => language.get(),
            usage: (language) => language.get(),
            examples: (language) => language.get(),
            dirname: __dirname,
            enabled: true,
            aliases: [],
            memberPermissions: [],
            botPermissions: [],
            ownerOnly: false,
            adminOnly: false,
            permLvl: ["cmdmuter"]
        });
    }

    async run(client, message, args, data) {

        const roller = low(this.client.adapterroles);
        const kanallar = low(this.client.adapterchannels);
        const utiller = low(this.client.adapterutil);
        const emojiler = low(this.client.adapteremojis);

        client = this.client;

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
        if (yaş === NaN) return message.channel.send('Lütfen yaş için sayı falan yaz. Sayı olur ya yaş hani..');
        if (!args) return message.channel.send("Kullanım: \`.kaydet <isim> <yaş>\`");
        let isim = asd.replace(yaş, `| ${yaş}`);

        let anan = '';
        if (sexiboy.user.username.includes('✯')) {
            anan = '✯';
            await sexiboy.roles.add(roller.get("taglı").value());
        } else {
            anan = '•';
        };
        await sexiboy.setNickname(`${anan} ${isim}`);

        const bela = await jailed.findOne({ _id: sexiboy.id });
        if (bela) {
            //console.log(bela);
            await sexiboy.roles.add(roller.get("jail").value());
            await sexiboy.roles.remove(yenirol);
            await message.channel.send(`Kurtulabileceğini mi sandın len ${sexiboy}`);
            return;
        };
        var richyy = new Discord.MessageEmbed()
            .setAuthor("Tantoony was here", message.guild.iconURL())
            .setColor("#170319")
            .setFooter("26 Ağustos 2020'den İtibaren...", client.user.displayAvatarURL())
            .setTimestamp()
            .setTitle("Isim Başarıyla Değiştirildi!")
            .setDescription(`Ìsim ve yaş başarıyla ${isim} olarak ayarlandı`)
        await message.channel.send(richyy);
        await message.react((await emojiler).get("tantoony").value());

    }

}

module.exports = Banclass;