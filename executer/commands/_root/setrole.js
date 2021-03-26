const Command = require("../../../inventory/base/Command"),
    Discord = require("discord.js");
const low = require('lowdb');

class ChangeRole extends Command {

    constructor(client) {
        super(client, {
            name: "setrole",
            description: "Açıklama Belirtilmemiş.",
            usage: "Kullanım Belirtilmemiş.",
            examples: ["Örnek Bulunmamakta"],
            aliases: [],
            permLvl: [],
            cooldown: 5000,
            enabled: true,
            adminOnly: false,
            ownerOnly: false,
            onTest: false,
            rootOnly: true,
            dmCmd: false
        });
    }

    async run(client, message, args, data) {

        await message.channel.send(`\`Hazırlanıyor..\``);
        const gul = low(this.client.adapterroles);
        const lale = gul.get(getPath(args[0]));
        lale.set(args[1]).write();
        console.log(lale.value());

    }
}

module.exports = ChangeRole;