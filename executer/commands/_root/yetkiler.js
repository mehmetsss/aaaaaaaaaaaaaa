const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const low = require('lowdb');
const { tailor } = require("../../helpers/embedmaker");

class instaVer extends Command {

    constructor(client) {
        super(client, {
            name: "yetkiler",
            description: (language) => language.get(),
            usage: (language) => language.get(),
            examples: (language) => language.get(),
            category: "moderation",
            enabled: true,
            aliases: [],
            memberPermissions: [],
            botPermissions: [],
            ownerOnly: false,
            rootOnly: false,
            adminOnly: false,
            cooldown: 1000,
            permLvl: ["cmd-authority", "cmd-rhode"]
        });
    }

    async run(client, message, args, data) {


        const roller = await low(this.client.adapterroles);
        const kanallar = await low(this.client.adapterchannels);


        const taglırol = message.guild.roles.cache.get(roller.get("th-booster").value());

        const hoistroller = message.guild.roles.cache
            .filter(r => r.rawPosition > taglırol.rawPosition + 2)
            .filter(r => r.hoist)
            .filter(r => r.id !== roller.get("th-booster").value())
            .sort((a, b) => a.rawPosition - b.rawPosition).array().reverse();
        //hoistroller.forEach(r => console.log(r.name));

        for (let indexs = 0; indexs < hoistroller.length; indexs++) {
            const sexiboy = hoistroller[indexs];

            const freo = sexiboy.members.array();

            message.channel.send(new Discord.MessageEmbed().setDescription(`\`\`\`${sexiboy.name} Rolüne Sahip Toplamda ${freo.length} Kişi Bulunmaktadır \`\`\`\n${freo.join(', ')}`));


        }



    }

}

module.exports = instaVer;