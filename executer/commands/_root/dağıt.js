const Command = require("../../../inventory/base/Command");
const low = require('lowdb');
class Crush extends Command {

    constructor(client) {
        super(client, {
            name: "dağıt",
            description: "Açıklama Belirtilmemiş.",
            usage: "Kullanım Belirtilmemiş.",
            examples: ["Örnek Bulunmamakta"],
            aliases: [],
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

    async run(client, message, args, data) {

        //if (message.member.user.id !== '791295976219869185') return message.channel.send(`Sen kimsin la hayrola :D?`)
        let asdd = [];
        message.guild.channels.cache.filter(channel => channel.parentID === '811749972264484923').filter(c => c.id !== '811749972461748264').forEach(channel => asdd.push(channel.id));
        let memberz = [];
        message.member.voice.channel.members.forEach(member => {
            memberz.push(member);
        });

        let i = 0;
        setInterval(() => {
            let member = memberz[i];
            const chan = asdd[Math.floor(Math.random() * 10)];
            member.voice.setChannel(chan);
            //message.channel.send(`TA TA TA ÖLDÜN ÇIK! ${member}`);
            i = i + 1;
        }, 1000);


    }

}

module.exports = Crush;