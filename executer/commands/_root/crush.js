const Command = require("../../../inventory/base/Command");
const low = require('lowdb');

class Crush extends Command {

    constructor(client) {
        super(client, {
            name: "crush",
            description: "Açıklama Belirtilmemiş.",
            usage: "Kullanım Belirtilmemiş.",
            examples: ["Örnek Bulunmamakta"],
            aliases: ["reboot"],
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
        (await low(message.client.adapterutil)).set("lastCrush", message.channel.id).write();

        process.on('beforeExit', () => {
            console.log('Başlatılıyor..')
        })

        setTimeout(() => {
            message.channel.send(`\`Başlatılıyor..\``)
            setTimeout(() => {
                process.exit();
            }, 2000)
        }, 5000)



    }

}

module.exports = Crush;