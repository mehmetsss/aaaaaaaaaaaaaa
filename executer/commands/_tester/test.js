const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const registries = require('../../../inventory/models/registries');
const { checkDays } = require("../../helpers/functionz");
const stats = require('../../../inventory/models/voicestat');
const namedata = require("../../../inventory/models/nameData");
const fs = require("fs");
const exporter = require('highcharts-export-server');
const low = require('lowdb');
const Canvas = require('canvas');
const Chart = require('chart.js');
const d3 = require('d3-shape')

class Confirm extends Command {

    constructor(client) {
        super(client, {
            name: "test",
            description: "Kanallardaki aktifliğe dayalı grafiği verir",
            usage: "oran gün @etiket/id",
            examples: ["oran 5", "oran 3 674565119161794560"],
            aliases: [],
            permLvl: [],
            cooldown: 3000,
            enabled: true,
            adminOnly: false,
            ownerOnly: false,
            onTest: false,
            rootOnly: false,
            dmCmd: false
        });
    }

    async run(client, message, args, data) {
        /* 
        const canvas = new Canvas.PNGStream();
        let grafik = new Chart(canvas, {
            type: 'pie',
            data: {
                labels: ["Pulic", "Private", "Streamer", "Alone", "Therapy", "Mediation", "Registry", "Authority", "Other"],
                datasets: [{
                    label: 'Deneme',
                    data: [15, 5, 10, 3, 12, 18, 10, 20, 13]
                }]
            }
        });
        fs.writeFileSync('./inventory/src/esle.png', grafik.stop())
     
        const roller = await low(this.client.adapterroles);
        const array = message.guild.members.cache.filter(m => !m.roles.cache.has(roller.get("th-booster").value())).filter(m => m.roles.cache.has(roller.get("member").value())).array();
        for (let index = 0; index < array.length; index++) {
            const sexiboy = array[index];
            let system = await namedata.findOne({ _id: sexiboy.user.id });
            if (!system) {
                return message.channel.send("Kayıt bulunamadı.")
            } else return message.channel.send(`${system.isim} | ${system.yaş} , ${system.sex}`);

        }
        */

        let sexiboy;
        var sexiboyzz = message.mentions.members.first();
        if (sexiboyzz) {
            sexiboy = sexiboyzz;
        } else {
            sexiboy = message.guild.members.cache.get(args[0]);
        }
        if (!sexiboy) sexiboy = message.member;
        let system = await namedata.findOne({ _id: sexiboy.user.id });
        if (!system) {
            return message.channel.send("Kayıt bulunamadı.")
        } else return message.channel.send(`${system.isim} | ${system.yaş} , ${system.sex}`);

    }

}

module.exports = Confirm;