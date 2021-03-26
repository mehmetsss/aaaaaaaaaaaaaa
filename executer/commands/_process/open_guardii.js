const Command = require("../../../inventory/base/Command");
const low = require('lowdb');
const chp = require("child_process");

class Crush extends Command {

    constructor(client) {
        super(client, {
            name: "open_guardii",
            description: "3. Guard botunu açar",
            usage: "open_guardii",
            examples: ["open_guardii"],
            aliases: ["ogii"],
            permLvl: [],
            cooldown: 9999999999999999999999999,
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

        function Process() {
            var ls = chp.exec("cd C:/Users/Administrator/Documents/TantoonyFiles/Tantoony/BOTS/Executioner && node --max-old-space-size=2048 index.js");
            ls.stdout.on('data', function (data) {
                console.log(data);
            });
            ls.stderr.on('data', function (data) {
                console.log(data);
            });
            ls.on('close', function (code) {
                if (code == 0)
                    console.log('Stop_exguard');
                else
                    console.log('Start_exguard');
            });
        };
        Process();



    }

}

module.exports = Crush;