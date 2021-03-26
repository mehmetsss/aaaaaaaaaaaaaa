const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const injail = require('./injail');

module.exports = class {

    constructor(message, client) {
        this.client = client;
    }

    async give(message, tag) {
        const adapterroles = new FileSync(message.client.adapterroles);
        const roller = low(adapterroles);

        const saksocular = message.guild.members.cache.filter(saksocu => saksocu.user.username.includes(tag));

        saksocular.forEach(async (member) => {

            if (!member.roles.cache.has(roller.get("yasaklı").value())) {
                //console.log('f');
                message.channel.send(`${member} :D?`);
                injail.prototype.give(member, "Yasaklı Tag", message.member);
                //console.log(member.displayName);
                return member.roles.add(roller.get("yasaklı").value());
            }

        });
    };

    async take(message, tag) {
        const adapterroles = new FileSync(message.client.adapterroles);
        const roller = low(adapterroles);

        const saksocular = message.guild.members.cache.filter(saksocu => saksocu.user.username.includes(tag));

        saksocular.forEach(async (member) => {

            if (!yarak.some(tag => newUser.username.includes(tag))) {
                if (meri.roles.cache.has(roller.get("yasaklı").value())) {
                    let meri = guild.members.cache.get(newUser.id);
                    //console.log('f');
                    injail.prototype.take(meri);
                    return member.roles.remove(roller.get("yasaklı").value());
                }
            }

        });
    }

}  