const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const low = require('lowdb');
const { rain, checkDays } = require("../../helpers/functionz");
/*
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
*/
class Confirm extends Command {

    constructor(client) {
        super(client, {
            name: "belgesiz",
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
            rootOnly: true,
            dmCmd: false
        });
    }

    async run(client, message, args, data) {
        const roller = low(this.client.adapterroles);
        const kanallar = low(this.client.adapterchannels);
        const utiller = low(this.client.adapterutil);
        const emojis = await low(this.client.adapteremojis);
        
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
        */
        
         const roller = await low(this.client.adapterroles);
         const array = message.guild.members.cache.filter(m => !m.roles.cache.has(roller.get("th-booster").value())).filter(m => m.roles.cache.has(roller.get("member").value())).array();
         for (let index = 0; index < array.length; index++) {
             const sexiboy = array[index];
             let system = await namedata.findOne({ _id: sexiboy.user.id });
             if (!system) {
                 let asd = 'Male';
                 let ism = sexiboy.displayName.slice(2);
                 let arrs = ism.split(" | ")[1];
                 let isim = ism.split(" | ")[0];
                 if (!sexiboy.roles.cache.has(roller.get("erkek").value()) && sexiboy.roles.cache.has(roller.get("kız").value())) asd = 'Female';
                 try {
                     let sex = await namedata({ _id: sexiboy.user.id, isim: isim, yaş: arrs, sex: asd, date: new Date() });
                     console.log(`${sexiboy.displayName} | Kişisinin kaydı kaydediliyor..`)
                     await sex.save();
                 } catch (error) {
                     throw error;
                 }
             } else console.log(sexiboy.displayName);
             // else message.channel.send(`${system.isim} | ${system.yaş} , ${system.sex}`);
 
         }
         

    }

}

module.exports = Confirm;