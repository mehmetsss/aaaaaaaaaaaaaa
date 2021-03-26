const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const jailed = require('../../../../MODELS/tempjails');

module.exports = class {

    constructor(client) {
        this.client = client;
    }

    async give(member, sebep, exe, süre) {
        const adapterroles = new FileSync('../../BASE/roller.json');
        const roller = low(adapterroles);
        let rolz = [];
        let rolidleri = [];
        let system = await jailed.findOne({ _id: member.user.id });
        await member.roles.cache.forEach(async (ele) => {
            if (ele.id !== roller.get("th-booster").value()) {
                rolz.push(ele.name);
                rolidleri.push(ele.id);
            };
        });
        await member.roles.remove(rolidleri);
        await member.roles.add(roller.get("th-jail").value());
        if (!system) {
            try {
                let doggy = await jailed({ _id: member.user.id, sebep: sebep, executor: exe.user.id, rolz: rolz, created: new Date(), süre: süre });
                await doggy.save();
            } catch (error) {
                if (error.code !== 5904) {
                    throw error;
                }
            }
        };
    };

    async take(member) {
        const adapterroles = new FileSync('../../BASE/roller.json');
        const roller = low(adapterroles);
        let dog = await jailed.findOne({ _id: member.user.id });
        let salakmısın = dog.get("rolz");
        let yaratık = [];
        await salakmısın.forEach(ele => {
            let anancı = member.guild.roles.cache.find(r => r.name === ele);
            if (anancı) {
                yaratık.push(anancı.id);
            }
        });
        await member.roles.add(yaratık);
        await jailed.deleteOne({ _id: member.user.id });
        await member.roles.remove(roller.get("th-jail").value());
        setTimeout(async () => {
            await member.roles.remove(roller.get("th-jail").value());
        }, 1000);
    };
}  