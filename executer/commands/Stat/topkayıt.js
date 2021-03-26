const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const invites = require('../../../../../MODELS/registries');
const { checkDays } = require("../../helpers/functionz");
const stringTable = require('string-table');
const low = require('lowdb');

class Confirm extends Command {

    constructor(client) {
        super(client, {
            name: "topkayıt",
            description: "Davet sayısını görmeye yarar",
            usage: "davetlerim",
            examples: ["davetlerim", "davetlerim 674565119161794560"],
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

        const utiller = low(this.client.adapterutil);
        const emojiler = low(this.client.adapteremojis);

        client = this.client;
        let dosyacık = 0;

        let sunucuda = 0;
        let docs = [];
        const models = await invites.find();
        const documents = models.filter(doc => doc.registries.length > 30).sort(function (a, b) {
            return a.get("registries").length - b.get("registries").length;
        }).reverse().slice(0, 10);
        for (let index = 0; index < documents.length; index++) {
            const element = documents[index];
            let fff = message.guild.members.cache.get(element._id);
            if (fff) {
                fff = fff.displayName;
            } else {
                fff = 'Bilinmiyor';
            };
            const shem = {
                no: index + 1,
                Kullanıcı: fff,
                miktar: element.registries.length
            }
            docs.push(shem)
        }
        //console.log(documents
        const embeddoc = stringTable.create(docs, {
            headers: ['no', 'Kullanıcı', 'miktar']
        });
        const embed = new Discord.MessageEmbed()
        message.channel.send(embed.setTitle("REGISTRY TOP LIST").setDescription(`\`\`\`md\n${embeddoc}\`\`\``))


        await message.react((await emojiler).get("tantoony").value().split(':')[2].replace('>', ''));


    }

}

module.exports = Confirm;