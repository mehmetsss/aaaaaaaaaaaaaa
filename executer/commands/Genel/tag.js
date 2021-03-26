const Discord = require('discord.js');
const Command = require("../../../inventory/base/Command");
const low = require('lowdb');
class Call extends Command {

    constructor(client) {
        super(client, {
            name: "tag",
            description: "sunucunun tagını gönderir",
            usage: "tag",
            examples: ["tag"],
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
        const utiller = await low(this.client.adapterutil);
        const emojiler = low(this.client.adapteremojis);
        
        message.channel.send(utiller.get("tag").value());

    }
}

module.exports = Call;