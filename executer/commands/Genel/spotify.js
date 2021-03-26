const Discord = require('discord.js');
const Command = require("../../../inventory/base/Command");
const low = require('lowdb');
const { stripIndents } = require('common-tags');
class Call extends Command {

    constructor(client) {
        super(client, {
            name: "spotify",
            description: "spotifyda ne dinlediğini söyler",
            usage: "spotify",
            examples: ["spotify"],
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

        const roller = await low(this.client.adapterroles);
        const kanallar = await low(this.client.adapterchannels);
        const embed = new Discord.MessageEmbed().setColor("#2f3136");
        const utiller = await low(this.client.adapterutil);
        const emojiler = await low(this.client.adapteremojis);
        const veri = message.member.presence.activities.find(a => a.name === 'Spotify');
        if (!veri) return message.channel.send(embed.setDescription(`Hiçbir Şarkı Dinlemiyorsun..`))
        embed.setDescription(stripIndents`
        **Şarkı Adı:** ${veri.details}

        **Müzisyen:** ${veri.state}
        `)
        message.channel.send(embed);

    }
}

module.exports = Call;