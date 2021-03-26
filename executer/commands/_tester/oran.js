const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const registries = require('../../../inventory/models/registries');
const { checkDays } = require("../../helpers/functionz");
const stats = require('../../../inventory/models/voicestat');
const fs = require("fs");
//const exporter = require('highcharts-export-server');
const low = require('lowdb');
const { PieChart } = require("canvas-pie-chart"); // import chart generator
//const d3 = require('d3-shape');
const Chart = require('chart.js');
const Canvas = require('canvas');

class Confirm extends Command {

    constructor(client) {
        super(client, {
            name: "oran",
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

        const chart = new PieChart({
            labels: [
                {
                    text: "Public",
                    size: 4
                },
                {
                    text: "Stream",
                    size: 7
                },
                {
                    text: "Alone",
                    size: 15
                }
            ],
            blackOrWhiteInvert: false,
            size: 4096
        });
        //console.log(chart);

        const canvas = Canvas.createCanvas(4096, 4096);
        const ctx = canvas.getContext("2d");
        
        
        // draw chart output
        const buffer = chart.draw();
        //fs.writeFileSync('./inventory/src/esle.png', buffer, {encoding: 'binary'});
        //document
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        console.log(allah);
        fs.writeFileSync('./inventory/src/desole.png', grafik.toBase64Image(), {
            encoding: 'base64'
        });




    }

}

module.exports = Confirm;