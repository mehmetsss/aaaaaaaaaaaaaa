const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const low = require('lowdb');

class ytaglistele extends Command {

    constructor(client) {
        super(client, {
            name: "ytaglistele",
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

        if (!message.member.roles.cache.has(roller.get("root").value())) {
            if (message.member.id !== '674565119161794560') {
                return;
            }
        }

        const yis = args[0];
        const xxx = new Discord.MessageEmbed();

        const saksocular = message.guild.members.cache.filter(saksocu => saksocu.user.username.includes(yis));
        let freo = [];
        await saksocular.forEach(ele => {
            freo.push(ele)
        });
        let i = 0;
        let erey0 = [];
        let erey1 = [];
        let erey2 = [];
        let erey3 = [];
        let erey4= [];
        let erey5 = [];
        let arayım;
        freo.forEach(ele => {
            if (i >= 0) arayım = erey0;
            if (i >= 20) arayım = erey1;
            if (i >= 40) arayım = erey2;
            if (i >= 60) arayım = erey3;
            if (i >= 80) arayım = erey4;
            if (i >= 100) arayım = erey5;
            arayım.push(ele);
            i = i + 1;
        });

        if (erey0.length > 0) await message.channel.send(erey0.join(', '));
        if (erey1.length > 0) await message.channel.send(erey1.join(', '));
        if (erey2.length > 0) await message.channel.send(erey2.join(', '));
        if (erey3.length > 0) await message.channel.send(erey3.join(', '));
        if (erey4.length > 0) await message.channel.send(erey4.join(', '));
        if (erey5.length > 0) await message.channel.send(erey5.join(', '));
        await message.react("721402955538104431");

    }

}

module.exports = ytaglistele;