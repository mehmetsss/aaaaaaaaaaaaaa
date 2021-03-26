const Command = require("../../../inventory/base/Command");
const low = require('lowdb');
class Crush extends Command {

    constructor(client) {
        super(client, {
            name: "syneval",
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

        const roller = low(this.client.adapterroles);
        const kanallar = low(this.client.adapterchannels);
        const utiller = low(this.client.adapterutil);
        const emojiler = await low(this.client.adapteremojis);
        function clean(text) {
            if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else return text;
        }

        try {
            const code = message.content.split(' ').slice(1).join(' ');
            let evaled = eval("(async () => {" + code + "})()");

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            const all = await message.channel.send(clean(evaled), { code: "xl" });
            message.delete({ timeout: 1000 });
            all.delete({ timeout: 5000 });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``).then(msg => msg.delete({ timeout: 5000 }));
            message.delete({ timeout: 1000 });
        }


    }

}

module.exports = Crush;