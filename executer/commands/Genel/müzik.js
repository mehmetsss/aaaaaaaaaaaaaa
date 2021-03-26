const Discord = require('discord.js');
const Command = require("../../../inventory/base/Command");
const low = require('lowdb');
class Call extends Command {

    constructor(client) {
        super(client, {
            name: "müzik",
            description: "BMüzik botlarının listesini çıkarır",
            usage: "müzik",
            examples: ["müzik"],
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
        const emojiler = await low(this.client.adapteremojis);
        const emojis = emojiler.value()
        const embed = new Discord.MessageEmbed().setColor('#2f3136');

        let asd = [];
        (await utiller).get("musicbots").value().forEach(id => {
            const anan = message.guild.members.cache.get(id);
            if (anan) asd.push(anan);
        });

        for (let index = 0; index < asd.length; index++) {
            const element = asd[index];
            let hehe = "BOŞTA"
            if (element.voice && element.voice.channel) hehe = element.voice.channel.name
            embed.addField(hehe, element, false)
        }
        message.channel.send(embed)


    }
}

module.exports = Call;