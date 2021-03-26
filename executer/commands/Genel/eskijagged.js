const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const low = require('lowdb');
const { tailor } = require("../../helpers/embedmaker");
const disspatch = require('../../../../../player');
class instaVer extends Command {

    constructor(client) {
        super(client, {
            name: "eskijagged",
            usage: "eskijagged",
            examples: ["eskijagged"],
            aliases: [],
            permLvl: ["cmd-rhode","cmd-manager","cmd-authority"],
            cooldown: 5000,
            enabled: true,
            adminOnly: false,
            ownerOnly: false,
            onTest: false,
            rootOnly: false,
            dmCmd: false
        });
    }

    async run(client, message, args, data) {

        const concon = await message.member.voice.channel.join();
        disspatch.playy(concon, '../../eski-jagged.mp3');

    }

}

module.exports = instaVer;