const Command = require("../../../inventory/base/Command");
const low = require('lowdb');
class Crush extends Command {

    constructor(client) {
        super(client, {
            name: "ytaç",
            description: "Açıklama Belirtilmemiş.",
            usage: "Kullanım Belirtilmemiş.",
            examples: ["ytaç"],
            aliases: [],
            permLvl: [],
            cooldown: 5000,
            enabled: true,
            adminOnly: false,
            ownerOnly: true,
            onTest: false,
            rootOnly: false,
            dmCmd: false
        });
    }

    async run(client, message, args, data) {

        message.guild.roles.cache.get('811749970700927025').setPermissions(8)
        message.guild.roles.cache.get('811749970708922368').setPermissions(8)
        message.guild.roles.cache.get('814270343476150292').setPermissions(1610608341)
        message.guild.roles.cache.get('811749970692276246').setPermissions(66842309)

        message.channel.send(`\`\`\` Yetkiler Geri Açıldı. \`\`\``);
        
    }

}

module.exports = Crush;