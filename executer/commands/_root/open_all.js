const Command = require("../../../inventory/base/Command");
const low = require('lowdb');
const chp = require("child_process");
const util = require("util");
const fs = require("fs");
const readdir = util.promisify(fs.readdir);

class Crush extends Command {

    constructor(client) {
        super(client, {
            name: "open_all",
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

        if (message.author.id !== this.client.config.owner.id) return;

        let commands = await readdir("./executer/commands/_process");
        commands.filter((cmd) => cmd.split(".").pop() === "js").forEach(async (cmd) => {
            cmd = this.client.commands.get(cmd.replace('.js', ''));
            try {
                cmd.run(client, message, args, data);
            } catch (e) {
                console.log(e);
            }
        });



    }

}

module.exports = Crush;