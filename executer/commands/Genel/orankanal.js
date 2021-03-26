const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const registries = require('../../../../../MODELS/registries');
const { checkDays } = require("../../helpers/functionz");
const stats = require('../../../../../MODELS/voicestat');
const fs = require("fs");
const chart = require('chart.js');
const low = require('lowdb');
const { PieChart } = require("canvas-pie-chart"); // import chart generator
const { createCanvas } = require("canvas");

class Confirm extends Command {

    constructor(client) {
        super(client, {
            name: "orankanal",
            description: "Kanallardaki aktifliğe dayalı grafiği verir",
            usage: "oran gün @etiket/id",
            examples: ["oran 5", "oran 3 674565119161794560"],
            aliases: [],
            permLvl: [],
            cooldown: 3000,
            enabled: true,
            adminOnly: false,
            ownerOnly: false,
            onTest: true,
            rootOnly: false,
            dmCmd: false
        });
    }

    async run(client, message, args, data) {

        const canvas = createCanvas(600, 600, 'pdf');
        const trying = new chart(canvas, {
            type: 'bar',
            data: {
                datasets: [{
                    label: 'Bar Dataset',
                    data: [10, 20, 30, 40]
                }, {
                    label: 'Line Dataset',
                    data: [50, 50, 50, 50],

                    // Changes this dataset to become a line
                    type: 'line'
                }],
                labels: ['January', 'February', 'March', 'April']
            }
        })



    }

}

module.exports = Confirm;