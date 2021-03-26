const { Client, Collection, Intents } = require("discord.js"),
    util = require("util"),
    path = require("path");
const intentler = new Intents(Intents.ALL);

const FileSync = require('lowdb/adapters/FileSync');
const low = require('lowdb');
// Creates Tantoony class
class Tantoony extends Client {

    constructor(options) {
        super({
            ws: {
                intents: intentler.remove([
                    "GUILD_INTEGRATIONS",
                    "GUILD_BANS",
                    "GUILD_EMOJIS",
                    "DIRECT_MESSAGE_REACTIONS",
                    "GUILD_MESSAGE_TYPING",
                    "DIRECT_MESSAGE_TYPING",
                    "GUILD_WEBHOOKS",
                    "GUILD_INVITES"
                ])
            }
        });
        this.autoUpdateDocs = require('../HELPERS/updater');
        this.config = require("../../../../BASE/config"); // Load the config file
        this.commands = new Collection(); // Creates new commands collection
        this.aliases = new Collection(); // Creates new command aliases collection
        this.logger = require("../helpers/logger"); // Load the logger file
        this.wait = util.promisify(setTimeout); // client.wait(1000) - Wait 1 second
        this.functions = require("../helpers/functions"); // Load the functions file

        this.adapterroles = new FileSync('../../BASE/roller.json');
        this.adapterchannels = new FileSync('../../BASE/kanallar.json');
        this.adapteremojis = new FileSync('../../BASE/emojiler.json');
        this.adapterutil = new FileSync('../../BASE/utiller.json');
        this.cmdCooldown = new Object();
        
        this.musicone = new Client();
        this.musictwo = new Client();
        this.musictre = new Client();
        this.musicfor = new Client();
        this.musicfve = new Client();
        this.bots = [
            this.musicone,
            this.musictwo,
            this.musictre,
            this.musicfor,
            this.musicfve
        ];
        this.databaseCache = {};
        this.databaseCache.users = new Collection();
        this.databaseCache.guilds = new Collection();
        this.databaseCache.members = new Collection();
    }

    // This function is used to load a command and add it to the collection
    loadCommand(commandPath, commandName) {
        try {
            const props = new (require(`../../${commandPath}${path.sep}${commandName}`))(this);
            this.logger.log(`Loading Command: ${props.help.name}. 👌`, "load");
            props.conf.location = commandPath;
            props.conf.dirname = commandPath.split("/").slice(3)[0];
            //console.log(props.conf.dirname);
            if (props.init) {
                props.init();
            }
            this.commands.set(props.help.name, props);
            props.info.aliases.forEach((alias) => {
                this.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (e) {
            return `Unable to load command ${commandName}: ${e}`;
        }
    }

    // This function is used to unload a command (you need to load them again)
    async unloadCommand(commandPath, commandName) {
        let command;
        if (this.commands.has(commandName)) {
            command = this.commands.get(commandName);
        } else if (this.aliases.has(commandName)) {
            command = this.commands.get(this.aliases.get(commandName));
        }
        if (!command) {
            return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;
        }
        if (command.shutdown) {
            await command.shutdown(this);
        }
        delete require.cache[require.resolve(`../../${commandPath}${path.sep}${commandName}.js`)];
        return false;
    }

    // This function is used to find a user data or create it
    async findOrCreateUser({ id: userID }, isLean) {
        return new Promise(async (resolve) => {
            if (this.databaseCache.users.get(userID)) {
                resolve(isLean ? this.databaseCache.users.get(userID).toJSON() : this.databaseCache.users.get(userID));
            } else {
                let userData = (isLean ? await this.usersData.findOne({ id: userID }).lean() : await this.usersData.findOne({ id: userID }));
                if (userData) {
                    resolve(userData);
                } else {
                    userData = new this.usersData({ id: userID });
                    await userData.save();
                    resolve((isLean ? userData.toJSON() : userData));
                }
                this.databaseCache.users.set(userID, userData);
            }
        });
    }

    // This function is used to find a guild data or create it
    async findOrCreateGuild({ id: guildID }, isLean) {
        return new Promise(async (resolve) => {
            if (this.databaseCache.guilds.get(guildID)) {
                resolve(isLean ? this.databaseCache.guilds.get(guildID).toJSON() : this.databaseCache.guilds.get(guildID));
            } else {
                let guildData = (isLean ? await this.guildsData.findOne({ id: guildID }).populate("members").lean() : await this.guildsData.findOne({ id: guildID }).populate("members"));
                if (guildData) {
                    resolve(guildData);
                } else {
                    guildData = new this.guildsData({ id: guildID });
                    await guildData.save();
                    resolve(isLean ? guildData.toJSON() : guildData);
                }
                this.databaseCache.guilds.set(guildID, guildData);
            }
        });
    }


    // This function is used to resolve a user from a string
    async resolveUser(search) {
        let user = null;
        if (!search || typeof search !== "string") return;
        // Try ID search
        if (search.match(/^<@!?(\d+)>$/)) {
            let id = search.match(/^<@!?(\d+)>$/)[1];
            user = this.users.fetch(id).catch((err) => { });
            if (user) return user;
        }
        // Try username search
        if (search.match(/^!?(\w+)#(\d+)$/)) {
            let username = search.match(/^!?(\w+)#(\d+)$/)[0];
            let discriminator = search.match(/^!?(\w+)#(\d+)$/)[1];
            user = this.users.find((u) => u.username === username && u.discriminator === discriminator);
            if (user) return user;
        }
        user = await this.users.fetch(search).catch(() => { });
        return user;
    }

    async resolveMember(search, guild) {
        let member = null;
        if (!search || typeof search !== "string") return;
        // Try ID search
        if (search.match(/^<@!?(\d+)>$/)) {
            let id = search.match(/^<@!?(\d+)>$/)[1];
            member = await guild.members.fetch(id).catch(() => { });
            if (member) return member;
        }
        // Try username search
        if (search.match(/^!?(\w+)#(\d+)$/)) {
            guild = await guild.fetch();
            member = guild.members.find((m) => m.user.tag === search);
            if (member) return member;
        }
        member = await guild.members.fetch(search).catch(() => { });
        return member;
    }

    async resolveRole(search, guild) {
        let role = null;
        if (!search || typeof search !== "string") return;
        // Try ID search
        if (search.match(/^<@&!?(\d+)>$/)) {
            let id = search.match(/^<@&!?(\d+)>$/)[1];
            role = guild.roles.get(id);
            if (role) return role;
        }
        // Try name search
        role = guild.roles.find((r) => search === r.name);
        if (role) return role;
        role = guild.roles.get(search);
        return role;
    }

    async kanalbul(kanal) {
        const adapterchannels = this.adapterchannels;
        const kanallar = low(adapterchannels);
        
        var sonuc = kanallar.get(kanal).value();
        console.log(sonuc);

        return sonuc;

    }
    
    async rolbul(rol) {
        const adapterroles = this.adapterroles;
        const roller = low(adapterroles);
        
        var sonuc = roller.get(rol).value();
        console.log(sonuc);

        return sonuc;

    }

}

module.exports = Tantoony;