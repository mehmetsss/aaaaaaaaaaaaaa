const Command = require("../../../inventory/base/Command");
const Discord = require("discord.js");
const queshem = require('../../../../../MODELS/queue');

const { play } = require("../../helpers/player");
const scrapeYt = require("scrape-yt");
const { getToken, allah } = require("../../helpers/functions");
const Spotify = require('spotify-web-api-js');
const low = require('lowdb');



class Play extends Command {

    constructor(client) {
        super(client, {
            name: "play",
            description: (language) => language.get(),
            usage: (language) => language.get(),
            examples: (language) => language.get(),
            category: "Music",
            enabled: true,
            aliases: ["p"],
            botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
            ownerOnly: false,
            cooldown: 3000,
            test: false
        });
    }

    async run(client, message, args, data) {

        client = this.client;

        const roller = await low(this.client.adapterroles);
        const kanallar = await low(this.client.adapterchannels);
        const util = await low(this.client.adapterutil);
        const emojis = await low(this.client.adapteremojis);

        const bot = client.bots.find(bot => !message.guild.members.cache.get(bot.user.id).voice.channel);
        if (!bot) return message.channel.send(`${emojis.get("error").value()} Şuan bütün müzik botları kullanımda!`);

        let token = await getToken();
        const spoti = new Spotify();
        spoti.setAccessToken(token);

        const { channel } = message.member.voice;
        if (!args.length) return;
        if (!channel) return;

        const embed = new Discord.MessageEmbed().setColor("#2f3136");
        const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
        const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
        const url = args[0];
        const urlValid = videoPattern.test(args[0]);
        let spotifylink = `${args[0]}`;

        let system = await queshem.findOne({ _id: bot.user.id });
        if (!system) {
            try {
                let attemt = await queshem({
                    _id: bot.user.id,
                    textChannel: message.channel,
                    channel: channel,
                    list: [],
                    loop: false,
                    volume: 80,
                    playing: true,
                    playingMessage: null,
                    no: 0
                });
                await attemt.save();
            } catch (error) {
                console.log(error);
            }
        };

        let str;
        if (spotifylink.includes(`https://open.spotify.com/track/`)) {
            let spotifylink = args[0];
            let urlComponents = new URL(spotifylink)
            let artistID = urlComponents.pathname
            str = artistID.substring(artistID.lastIndexOf("/") + 1);
            let asd = await spoti.getTrack(`${str}`);
            let trackname = `${asd.artists[0].name} - ${asd.name}`
            let songInfo = await scrapeYt.search(trackname)
            queshem.updateOne({ _id: bot.user.id }, { $push: { list: songInfo[0] } });
            await message.channel
                .send(embed.setDescription(`${emojis.get("spotify").value()} **${songInfo[0].title}** ${message.member} Tarafından Başarıyla Listeye Eklendi!`))
                .catch(console.error);
        } else if (spotifylink.includes(`https://open.spotify.com/playlist/`)) {
            let spotifylink = args[0];
            let urlComponents = new URL(spotifylink)
            let artistID = urlComponents.pathname
            str = artistID.substring(artistID.lastIndexOf("/") + 1);
            let spotifyvideos = [];
            let pPlaylist = await spoti.getPlaylist(str);
            let anan = await pPlaylist.tracks.items;
            spotifyvideos.push(...anan)
            //if (spotifyvideos.length >= 20) return message.channel.send(embed.setDescription(message.language.get("ERROR_MAX_QUEUE_LENGTH")));
            await Promise.all(spotifyvideos.map(async (video) => {
                let songspotifyss = await scrapeYt.search(`${video.track.artists[0].name} ${video.track.name}`);
                await queshem.updateOne({ _id: bot.user.id }, { $push: { list: songspotifyss[0] } });
            }));
            await message.channel.send(embed.setDescription(`${emojis.get("spotify").value()} **${spotifyvideos.length}** Adet Şarkı ${message.member} Tarafından Başarıyla Listeye Eklendi!`)).catch(console.error);
        } else if (playlistPattern.test(args[0])) {
            let videos = [];
            let seeerch = await allah(url);
            let songInfo = await scrapeYt.getPlaylist(seeerch);
            videos = await songInfo.videos;
            await Promise.all(await videos.map(async (video) => {
                let mpp = await scrapeYt.search(`https://www.youtube.com/watch?v=${video.id}`)[0];
                await queshem.updateOne({ _id: bot.user.id }, { $push: { list: mpp } });
            }));
            await message.channel.send(embed.setDescription(`${emojis.get("youtube").value()} **${videos.length}** Adet Şarkı ${message.member} Tarafından Başarıyla Listeye Eklendi!`)).catch(console.error);
        } else if (urlValid) {
            let songInfo = await scrapeYt.search(url);
            await queshem.updateOne({ _id: bot.user.id }, { $push: { list: songInfo[0] } });
            await message.channel
                .send(embed.setDescription(`${emojis.get("youtube").value()} **${songInfo[0].title}** ${message.member} Tarafından Başarıyla Listeye Eklendi!`))
                .catch(console.error);
        } else {
            const search = args.join(" ");
            let songInfo = await scrapeYt.search(search);
            await queshem.updateOne({ _id: bot.user.id }, { $push: { list: songInfo[0] } });
            await message.channel
                .send(embed.setDescription(`${emojis.get("youtube").value()} **${songInfo[0].title}** ${message.member} Tarafından Başarıyla Listeye Eklendi!`))
                .catch(console.error);
        };

        if (!system) {
            try {
                let jukee = await queshem.findOne({ _id: bot.user.id });
                play(jukee.list[0], message, bot);
            } catch (error) {
                console.error(`Şarkı oynatılamadı: ${error}`);
                await queshem.deleteOne({ _id: bot.user.id });
                await channel.leave();
                return message.channel.send(`Bir Hata oluştu...`).catch(console.error);
            }
        }
        
    }

}

module.exports = Play;