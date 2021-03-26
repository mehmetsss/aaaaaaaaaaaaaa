const Discord = require('discord.js');
const Command = require("../../../inventory/base/Command");
class Call extends Command {

    constructor(client) {
        super(client, {
            name: "userinfo",
            description: "Kullanıcı hakkında bazı bilgileri görmek için kullanılır",
            usage: "userinfo (etiket)",
            examples: ["userinfo @etiket"],
            aliases: [],
            permLvl: [],
            cooldown: 3000,
            enabled: true,
            adminOnly: false,
            ownerOnly: false,
            onTest: true,
            rootOnly: false,
            dmCmd: false
        });
    }

    async run(client, message, args, data) {

        let sexiboy;
        if (message.mentions.members) {
            sexiboy = message.mentions.members.first();
        } else {
            sexiboy = message.member;
        };

        const embed = new Discord.MessageEmbed()
            .setTitle("Kullanıcı Bilgileri")
            .setThumbnail(sexiboy.user.displayAvatarURL({ dynamic: true }))
            .setFooter(`1 Ekim 2020'den İtibaren... | ${new Date(Date.now()).getUTCDate() + 1}.${new Date(Date.now()).getUTCMonth() + 1}.${new Date(Date.now()).getUTCFullYear()}`, client.user.displayAvatarURL())
            .addField()

        await message.channel.send(embed);

    }
}

module.exports = Call;