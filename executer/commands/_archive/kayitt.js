const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const jailed = require('../../../../../MODELS/jailed');
const gendergiver = require('../../helpers/gendergiver');;
const low = require('lowdb');
const namedata = require('../../../../../MODELS/nameData');
const { temel } = require("../../helpers/embedTemel");

class Confirm extends Command {

    constructor(client) {
        super(client, {
            name: "kayit",
            description: (language) => language.get(),
            usage: (language) => language.get(),
            examples: (language) => language.get(),
            category: "registery",
            enabled: false,
            aliases: [],
            memberPermissions: [],
            botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            ownerOnly: false,
            adminOnly: false,
            cooldown: 3000,
            permLvl: ["cmd-registry", "cmd-rhode", "cmd-authority"],
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
        const erkekrol1 = roller.get("erkek").value();
        const üyerol = [roller.get("user").value(), roller.get("member").value()];
        const yenirol = roller.get("yeni").value();

        let giriş = [];
        giriş.push(kızrol1);
        giriş.push(üyerol);
        giriş.push(erkekrol1);
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

        if (utiller.get("taglıalım").value() && !sexiboy.user.username.includes('⚶')) {
            if (!sexiboy.roles.cache.has((await roller).get("th-vip").value())) {
                if (!sexiboy.roles.cache.has((await roller).get("th-booster").value())) {
                    return message.channel.send(new Discord.MessageEmbed()
                        .setColor("#2f3136")
                        .setDescription(`Üzgünüm, ama henüz taglı alımdayız. ${sexiboy} kullanıcısında vip veya booster rolü olmadığı koşulda onu içeri alamam..`)
                    );
                };
            };
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
            var reg= new RegExp("^\\d+$");
            var valid = reg.test(anan);
            return valid ;
        }

        if (!allah(yaş)) return message.channel.send('Lütfen Geçerli bir yaş gir!');
        if (!args) return message.channel.send("Kullanım: \`.kaydet <isim> <yaş>\`");
        
        let isim = asd.replace(yaş, `| ${yaş}`);

        let anan = '';
        if (sexiboy.user.username.includes('⚶')) {
            anan = '⚶';
            await sexiboy.roles.add(roller.get("th-taglı").value());
        } else {
            anan = '•';
        };
        await sexiboy.setNickname(`${anan} ${isim}`);

        const bela = await jailed.findOne({ _id: sexiboy.id });
        if (bela) {
            //console.log(bela);
            await sexiboy.roles.add(roller.get("jail").value());
            await sexiboy.roles.remove(yenirol);
            return message.channel.send(`Kurtulabileceğini mi sandın len ${sexiboy}`);
        };

        const embed = temel(message, "Kharon's Riverrun", "Lütfen cinsiyeti seçiniz. Eğer isim veya yaşı yanlış girmişseniz çarpı emojisine tıklayınız.");

        try {
            var colectembed = await message.channel.send(embed);
            await colectembed.react((await emojiler).get("erkek").value().split(`:`)[2].replace('>', ''));
            await colectembed.react((await emojiler).get("kiz").value().split(`:`)[2].replace('>', ''));
            await colectembed.react((await emojiler).get("error").value().split(`:`)[2].replace('>', ''));
        } catch (error) {
            console.log(error);
        }


        const filter = (reaction, user) => user.id !== message.client.user.id;
        const collector = colectembed.createReactionCollector(filter, {
            time: 30000
        });

        let asf = 0;
        collector.on("collect", async (reaction, user) => {

            if (user.id !== message.member.user.id) return reaction.users.remove(user);

            switch (reaction.emoji.id) {

                case (await emojiler).get("erkek").value().split(`:`)[2].replace('>', ''):
                    collector.stop();
                    gendergiver.prototype.erkek(colectembed, embed, sexiboy, message.member);
                    let systemo = await namedata.findOne({ _id: sexiboy.user.id });
                    if (!systemo) {
                        try {
                            let sex = await namedata({ _id: sexiboy.user.id, isim: isim });
                            await sex.save();
                        } catch (error) {
                            throw error;
                        }
                    }
                    asf = 1;
                    break;

                case (await emojiler).get("kiz").value().split(`:`)[2].replace('>', ''):
                    collector.stop();
                    gendergiver.prototype.kız(colectembed, embed, sexiboy, message.member);
                    let system = await namedata.findOne({ _id: sexiboy.user.id });
                    if (!system) {
                        try {
                            let sex = await namedata({ _id: sexiboy.user.id, isim: isim });
                            await sex.save();
                        } catch (error) {
                            throw error;
                        }
                    }
                    asf = 1;
                    break;

                case (await emojiler).get("error").value().split(`:`)[2].replace('>', ''):
                    collector.stop();
                    colectembed.delete({ timeout: 3000 });
                    break;

                default:
                    break;
            }
        });

        collector.on("end", async () => {
            await colectembed.reactions.removeAll();
            await message.react((await emojiler).get("ok").value().split(':')[2].replace('>', ''));
        });


    }

}

module.exports = Confirm;