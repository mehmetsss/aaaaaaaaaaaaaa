const Command = require("../../../inventory/base/Command");
const low = require('lowdb');
const { closeall } = require("../../helpers/functionz");
class Crush extends Command {

    constructor(client) {
        super(client, {
            name: "ytkapat",
            description: "Açıklama Belirtilmemiş.",
            usage: "Kullanım Belirtilmemiş.",
            examples: ["ytkapat"],
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

        closeall(message.guild, ["ADMINISTRATOR", "BAN_MEMBERS", "MANAGE_CHANNELS", "KICK_MEMBERS", "MANAGE_GUILD", "MANAGE_WEBHOOKS", "MANAGE_ROLES"]);
        
    }

}

module.exports = Crush;