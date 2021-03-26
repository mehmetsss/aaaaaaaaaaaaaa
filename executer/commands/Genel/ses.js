const Discord = require('discord.js');
const Command = require("../../../inventory/base/Command");
const { checkHours, sayi, rain } = require("../../helpers/functionz");
const { stripIndents } = require("common-tags");
const low = require('lowdb');
class Call extends Command {

    constructor(client) {
        super(client, {
            name: "ses",
            description: "Sunucunun ses istatistiklerini",
            usage: "ses",
            examples: ["ses"],
            aliases: [],
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

        const roller = low(this.client.adapterroles);
        const kanallar = low(this.client.adapterchannels);
        const utiller = low(this.client.adapterutil);
        const emojis = await low(this.client.adapteremojis);

        const embed = new Discord.MessageEmbed().setColor('#2f3136');
        embed.setDescription(
            stripIndents`
            
        ${emojis.get("staries").value()} **Tagdaki Üye**  ${rain(message.guild.members.cache.filter(m => m.user.username.includes(utiller.get("tag").value())).size)}

        ${emojis.get("staries").value()} **Sesteki üye**  ${rain(message.guild.members.cache.filter(m => m.voice.channel).size)}

        ${emojis.get("staries").value()} **Seste ve Tagda**  ${rain(message.guild.members.cache.filter(m => m.voice.channel).filter(m => m.user.username.includes(utiller.get("tag").value())).size)}


        `);

        message.channel.send(embed);

    }
}

module.exports = Call;