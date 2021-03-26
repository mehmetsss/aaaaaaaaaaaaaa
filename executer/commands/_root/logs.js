const Command = require("../../../inventory/base/Command");
const low = require('lowdb');


class ChangeChannel extends Command {

    constructor(client) {
        super(client, {
            name: "logs",
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
        const kanallar = await low(this.client.adapterchannels);
        const utiller = low(this.client.adapterutil);

        const mod = await message.guild.channels.create("</> Moderation", {
            type: "category"
        });
        message.guild.channels.create('registry', { parent: mod }).then(c => kanallar.set(c.name, c.id).write());
        message.guild.channels.create('cmd-ban', { parent: mod }).then(c => kanallar.set(c.name, c.id).write());
        message.guild.channels.create('cmd-jail', { parent: mod }).then(c => kanallar.set(c.name, c.id).write());
        message.guild.channels.create('cmd-cmute', { parent: mod }).then(c => kanallar.set(c.name, c.id).write());
        message.guild.channels.create('cmd-vmute', { parent: mod }).then(c => kanallar.set(c.name, c.id).write());
        message.guild.channels.create('cmd-isim', { parent: mod }).then(c => kanallar.set(c.name, c.id).write());
        message.guild.channels.create('cmd-ret', { parent: mod }).then(c => kanallar.set(c.name, c.id).write());
        message.guild.channels.create('cmd-rol', { parent: mod }).then(c => kanallar.set(c.name, c.id).write());
        message.guild.channels.create('cmd-transport', { parent: mod }).then(c => kanallar.set(c.name, c.id).write());
        const reg = await message.guild.channels.create("</> Registry", {
            type: "category"
        });
        message.guild.channels.create('gk-gelen', { parent: reg }).then(c => kanallar.set(c.name, c.id).write());
        message.guild.channels.create('gk-giden', { parent: reg }).then(c => kanallar.set(c.name, c.id).write());
        message.guild.channels.create('gk-girçık', { parent: reg }).then(c => kanallar.set(c.name, c.id).write());
        message.guild.channels.create('gk-tag', { parent: reg }).then(c => kanallar.set(c.name, c.id).write());
        message.guild.channels.create('gk-rol', { parent: reg }).then(c => kanallar.set(c.name, c.id).write());
        message.guild.channels.create('gk-uyarı', { parent: reg }).then(c => kanallar.set(c.name, c.id).write());
        const grd = await message.guild.channels.create("</> Guard", {
            type: "category"
        });
        message.guild.channels.create('log-rol', { parent: reg }).then(c => kanallar.set(c.name, c.id).write());
        message.guild.channels.create('log-kanal', { parent: reg }).then(c => kanallar.set(c.name, c.id).write());
        message.guild.channels.create('log-url', { parent: reg }).then(c => kanallar.set(c.name, c.id).write());
        message.guild.channels.create('log-üye', { parent: reg }).then(c => kanallar.set(c.name, c.id).write());
        message.guild.channels.create('log-emoji', { parent: reg }).then(c => kanallar.set(c.name, c.id).write());
        message.guild.channels.create('log-ban-kick', { parent: reg }).then(c => kanallar.set(c.name, c.id).write());

    }
}

module.exports = ChangeChannel;