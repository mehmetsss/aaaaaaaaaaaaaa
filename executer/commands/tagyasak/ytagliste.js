const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const low = require('lowdb');

class ytagliste extends Command {

    constructor(client) {
        super(client, {
            name: "ytagliste",
            description: (language) => language.get(),
            usage: (language) => language.get(),
            examples: (language) => language.get(),
            category: "moderation",
            enabled: true,
            aliases: [],
            memberPermissions: [],
            botPermissions: [],
            ownerOnly: true,
            adminOnly: true,
            cooldown: 60000,
            permLvl: ["root"]
        });
    }

    async run(client, message, args, data) {

        const roller = await low(this.client.adapterroles);
        const kanallar = await low(this.client.adapterchannels);
        const utiller = await low(this.client.adapterutil);

        //if (!message.member.roles.cache.has(roller.get("root").value())) return;
        if (!utiller.get("kkv").value().some(idz => message.member.user.id === idz)) return;

        const saksocularım = utiller.get("yasaklıtag").value();
        const xxx = new Discord.MessageEmbed();

        await saksocularım.forEach(ele => {
            const saksocular = message.guild.members.cache.filter(saksocu => saksocu.user.username.includes(ele));
            xxx.addField(`${ele} \`${saksocular.size} kişi bu taga sahip.\``, " \u200B", false)
        });
        if (saksocularım.length === 0) return message.channel.send(`Yasaklı bir tag bulunamadı.`);
        await message.channel.send(xxx);


    }

}

module.exports = ytagliste;