const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const low = require('lowdb');
const jailed = require("../../../../../MODELS/permajails");
const sicil = require("../../../../../MODELS/sicil");

class Sexx extends Command {

    constructor(client) {
        super(client, {
            name: "sextime",
            description: "Açıklama Belirtilmemiş.",
            usage: "Kullanım Belirtilmemiş.",
            examples: ["Örnek Bulunmamakta"],
            aliases: ["sex"],
            permLvl: [],
            cooldown: 5000,
            enabled: true,
            adminOnly: false,
            ownerOnly: false,
            onTest: true,
            rootOnly: false,
            dmCmd: false
        });
    }

    async run(client, message, args, data) {

        client = this.client;
        

        const roller = low(this.client.adapterroles);
        const kanallar = low(this.client.adapterchannels);
        const utiller = low(this.client.adapterutil);
        const emojiler = await low(this.client.adapteremojis);
        const emojis = emojiler.value()
        const embed = new Discord.MessageEmbed().setColor('#2f3136');
        /*
        await message.guild.members.cache.forEach(async (mem) => {
            if (mem.user.username.includes('✫')) {
                return;
            } else {
                if (mem.user.bot) return;
                let zar = mem.displayName;
                let anan = zar.replace('✫', '•');
                if (!anan) return;
                await mem.setNickname(anan);
                console.log(anan);
            }
        });
        */

        /*
       const adapterroles = new FileSync('../../BASE/roller.json');
       const roller = low(adapterroles);
       console.log((await roller).value())
       */
        /*
        let array = message.guild.members.cache.filter(mem => mem.roles.cache.size === 1);
        console.log(array.size);
        array.forEach(element => {
            element.roles.add('777866175899107349')
        });
        */

        /*
        let anan = rain(args[0])
        message.channel.send(stripIndents`Sayı: ${anan}`).toString();


        await message.channel.send(`\`BAŞARILI\``);
        */

        /*
        await message.guild.members.cache.forEach(async (mem) => {
            if (mem.roles.cache.some(r => r.id === roles.kız)) return;
            if (mem.roles.cache.some(r => r.id === roles.erkek)) return;
            setInterval(async () => {
                await mem.roles.add(roles.yeni);
            }, 250);
        });
        */


        //let sexiboy = message.mentions.members.first()

        /*
       await message.channel.send(
        stripIndents`<a:dnendiscord:748235840311787592> **INFERNO'ya Hoş Geldin,**


        ⠀⠀⠀⠀⠀⠀<a:infernotag2:748233588515930152> ${message.member} **Aramıza Hoş Geldin!**

        ⠀⠀⠀⠀⠀⠀<a:infernotag2:748233588515930152> Seninle beraber **${message.guild.members.cache.size}** kişiyiz.

        ⠀⠀⠀⠀⠀⠀<a:infernotag2:748233588515930152> **Hesap:** \`${checkDays(message.member.user.createdAt)}\` gün önce kurulmuştur. (${message.member.user.createdAt})

        ⠀⠀⠀⠀⠀⠀<a:infernotag2:748233588515930152> \`Kayıt kanallarına\` giriş yaparsan eğer <@&698359613732552705> rolünde ki yetkililer seninle ilgilenecektir! `
    );
        */

        // profil fotosuna am koydu: 276831122929876992
        // troll yapıyor: 710800494079115315

        /*
        const utiller = low(this.client.adapterutil);

        utiller.get('yardımcılar').push(sexiboy.user.id).write();
        console.log(utiller.get('yardımcılar').value());

        (await utiller).write();
        */

        //const utiller = low(this.client.adapterutil);
        //const roller = low(this.client.adapterroles);
        let yarak = utiller.get("yasaklıtag").value();

        const saksocular = message.guild.members.cache.filter(saksocu => yarak.some(tag => saksocu.user.username.includes(tag)));
        const saksocular2 = message.guild.members.cache.filter(saksocu => !yarak.some(tag => saksocu.user.username.includes(tag)));

        /*
         function sleep(ms) {
             return new Promise((resolve) => setTimeout(resolve, ms));
         }
 
         message.guild.members.cache.filter(f => f.roles.cache.has("765702078223220737")).forEach(async (ele) => {
             let anan = '';
             if (ele.user.username.includes('⸸')) {
                 anan = '⸸';
             } else {
                 anan = '•';
             };
             //console.log(ele.user.username);
             let system = await nameData.findOne({ _id: ele.user.id });
             if (!system) return;
             ele.setNickname(`${anan} ${system.get("isim")}`).then(console.log(ele.displayName));
             sleep(250);
             //console.log(system.get("isim"))
         });
         */

        //message.channel.send(message.guild.bannerURL({ size: 4096 }))



        saksocular.forEach(async (sexiboy) => {

            //console.log('f');
            const sebep = "YASAKLI TAG";
            let rolz = [];
            let rolidleri = [];
            let system = await jailed.findOne({ _id: sexiboy.user.id });
            await sexiboy.roles.cache.forEach(async (ele) => {
                if (ele.id !== roller.get("th-booster").value()) {
                    rolz.push(ele.name);
                    rolidleri.push(ele.id);
                };
            });
            sexiboy.roles.remove(rolidleri);
            await sexiboy.roles.add(roller.get("th-jail").value());
            if (!system) {
                try {
                    let doggy = await jailed({ _id: sexiboy.user.id, sebep: sebep, executor: message.member.user.id, rolz: rolz, created: new Date() });
                    await doggy.save();
                } catch (error) {
                    if (error.code !== 5904) {
                        throw error;
                    }
                }
            };
            if (message.guild.member(sexiboy).voice && message.guild.member(sexiboy).voice.channel) message.guild.member(sexiboy).voice.setChannel(null);
            message.channel.send(`${emojis.jailed} ${sexiboy} Başarıyla ${message.member} tarafından cezalıya atıldı!`);
            const embedd = embed.setTitle(`Jaile Gönderildi`).setDescription(`${emojis.jailed} ${sexiboy} kişisi ${message.member} tarafından cezalıya atıldı`)
                .addField("Sebep:", sebep, true).addField("Süre", `**Perma**`, true).setThumbnail(sexiboy.user.displayAvatarURL({ dynamic: true }))
                .setAuthor(message.member.displayName, message.member.user.displayAvatarURL({ dynamic: true }))
                .setFooter(`Tantoony Bots`).setTimestamp();
            message.guild.channels.cache.get((await kanallar).get("cmd-jail").value()).send(embedd);
            const obje = {
                date: new Date(),
                type: `PermaJail`,
                executor: message.member.user.id,
                reason: sebep
            }
            let invarray = [];
            let gg = invarray.push(obje);
            let systemm = await sicil.findOne({ _id: sexiboy.user.id });
            if (!systemm) {
                try {
                    let doffy = await sicil({ _id: sexiboy.user.id, punishes: gg });
                    await doffy.save();
                } catch (error) {
                    if (error.code !== 5904) {
                        throw error;
                    }
                }
            } else {
                await sicil.updateOne({ _id: sexiboy.user.id }, { $push: { punishes: obje } });
            }
            message.react(emojiler.get("okred").value().split(':')[2].replace('>', ''));
            console.log(sexiboy.displayName);
            setTimeout(async () => {
                message.channel.send(`${sexiboy} seni de unutmadık :D`)
                await sexiboy.roles.add(roller.get("yasaklı").value());
            }, 500);

        });

        /*

        saksocular2.forEach(async (member) => {

            if (member.roles.cache.has(roller.get("yasaklı").value())) {
                //console.log('f');
                injail.prototype.take(member);
                console.log(member.displayName);
                member.roles.remove(roller.get("yasaklı").value());
            }

        });

        /*
        const kızrol1 = roller.get("kız1").value();
        const kızrol2 = roller.get("kız2").value();
        const kızrol3 = roller.get("kız3").value();
        const kızrol4 = roller.get("kız4").value();
        const kızrol5 = roller.get("kız5").value();
        const erkekrol1 = roller.get("erkek1").value();
        const erkekrol2 = roller.get("erkek2").value();
        const erkekrol3 = roller.get("erkek3").value();
        const erkekrol4 = roller.get("erkek4").value();
        const erkekrol5 = roller.get("erkek5").value();
        const yenirol = roller.get("yeni").value();
        const areyrol = [erkekrol1, erkekrol2, erkekrol3, erkekrol4, erkekrol5, kızrol1, kızrol2, kızrol3, kızrol4, kızrol5];


        message.guild.members.cache.forEach(ele => {

            if (!ele.user.username.includes('⸸')) {
                ele.roles.remove(roller.get("taglı").value());
                ele.roles.remove(areyrol);
                ele.roles.add(yenirol);
            }
            if (!ele.roles.cache.length === 0) {
                ele.roles.add(roller.get("yeni").value())
            }
        });
        */
        //message.guild.channels.cache.get('752630237887463484').join();
        /*
        let system = await jailed.findOne({ _id: args[0]});
        let salakmısın = system.get("rol");
        console.log(salakmısın);
        */
    }

}

module.exports = Sexx;