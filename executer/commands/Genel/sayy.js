const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const low = require('lowdb');
const { stripIndents } = require('common-tags');
class Banclass extends Command {

    constructor(client) {
        super(client, {
            name: "sayy",
            description: "Sunucu bilgilerini görüntüler.",
            usage: "sayy",
            examples: ["sayy"],
            category: "moderation",
            enabled: true,
            aliases: [],
            memberPermissions: [],
            botPermissions: [],
            ownerOnly: false,
            adminOnly: false,
            permLvl: ["cmd-rhode"],
            cooldown: 60000,
            onTest: false
        });
    }

    async run(client, message, args, data) {


        const roller = await low(this.client.adapterroles);
        const emojiler = low(this.client.adapteremojis);
        const kanallar = await low(this.client.adapterchannels);


        //sunucudaki üye
        let emük = message.guild.memberCount;
        //console.log(emük);

        //çevrimiçi üye
        let anan = await message.guild.members.cache.filter(mem => mem.presence.status !== 'offline').size;

        //console.log(anan);

        //tagdaki üye
        let ilksen = await message.guild.members.cache.filter(mem => mem.user.username.includes('ψ')).size;

        //console.log(ilksen)

        //sesteki üye
        let inter = 0;
        await message.guild.members.cache.forEach(async (mem) => {
            if (mem.voice.channel) inter = inter + 1;
        });
        //console.log(inter);

        //Boost basan üye
        let tak = 0;
        await message.guild.members.cache.forEach(async (mem) => {
            if (mem.roles.cache.has((await roller).get("th-booster").value())) tak = tak + 1;
        });


        const embed = new Discord.MessageEmbed().setColor('#2f3136')
            .setDescription(
                stripIndents`

${emojiler.get("toplamuye").value()} Sunucumuzda **toplam** \`${emük}\` üye bulunmaktadır.
${emojiler.get("anlikaktif").value()} Anlık olarak **aktif** \`${anan}\` kullanıcı bulunmaktadır.
${emojiler.get("staries").value()} **Tagımızda** \`${ilksen}\` kullanıcı bulunmaktadır.
${emojiler.get("boost").value()} Sunucumuzda \`${tak}\` tane **booster** bulunmaktadır.
${emojiler.get("ses").value()} **Ses kanallarında** \`${inter}\` kişi bulunmaktadır.
`
            )
            //.setFooter(message.author.tag)
            .setAuthor(message.guild.name, message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
            .setFooter(message.author.tag, message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }))

            //.setTimestamp()

        message.channel.send(embed);
        await message.react((await emojiler).get("tantoony").value().split(':')[2].replace('>', ''));


    }

}

module.exports = Banclass;