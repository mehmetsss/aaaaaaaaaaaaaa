const Command = require("../../../inventory/base/Command");
const util = require("util");
const fs = require("fs");
const readdir = util.promisify(fs.readdir);

class Reload extends Command {

    constructor (client) {
        super(client, {
            name: "reload",
            description: "Komutu yeniden yükler",
            usage: "rl (komut ismi)",
            examples: ["rl yardım"],
            aliases: ["rl"],
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

    async run (client, message, args, data) {
        let command = args[0];
        let i = 0;
        if (!args[0]) {
            let directories = await readdir("./executer/commands/");
            await client.logger.log(`Loading a total of ${directories.length} categories.`, "category");
            directories.forEach(async (dir) => {
                let commands = await readdir("./executer/commands/" + dir + "/");
                commands.filter((cmd) => cmd.split(".").pop() === "js").forEach(async (cmd) => {
                    //console.log(cmd)
                    cmd = this.client.commands.get(cmd.replace('.js', ''));
                    //console.log(cmd)
                    await this.client.unloadCommand(cmd.conf.location, cmd.help.name);
                    const response = this.client.loadCommand(cmd.conf.location, cmd.help.name);
                    //const response = client.loadCommand("./executer/commands/" + dir, cmd);
                    if (response) {
                        return client.logger.log(response, "error");
                    }
                    
                    i = i + 1;
                });
            });

            setTimeout(() => {
                client.logger.log(`${i} COMMANDS HAS BEEN RELOADED!`, "log");
                message.channel.send(`\`${i} Adet Komut Başarıyla Yüklendi!\``);
            }, 1000);

        } else {

            let cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
            if (!cmd) {
                //message.channel.send(message.language.get("RELOAD_ERR_NOT_FOUND", command));
                return message.channel.send(`\`Komut Bulunamadı\``)
            }
            await this.client.unloadCommand(cmd.conf.location, cmd.help.name);
            await this.client.loadCommand(cmd.conf.location, cmd.help.name);
            //message.channel.send(message.language.get("RELOAD_SUCCESS", cmd.help.name));
            message.channel.send(`\`Başarıyla Yenilendi\``);

        }
    }

}

module.exports = Reload;