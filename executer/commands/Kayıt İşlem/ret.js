const Discord = require('discord.js');
const Command = require("../../../inventory/base/Command.js");
const low = require('lowdb');

class Ret extends Command {

  constructor(client) {
    super(client, {
      name: "ret",
      description: "Reddetmek için kullanılır",
      usage: "ret etiket/id sebep",
      examples: ["reddet 674565119161794560 sebep"],
      aliases: ["reddet"],
      permLvl: ["cmd-registry"],
      cmdChannel: "cmd-kayıt",
      cooldown: 30000,
      enabled: false,
      adminOnly: false,
      ownerOnly: false,
      rootOnly: false,
      onTest: false,
      dmCmd: false
    });
  }

  async run(client, message, args) {

    const member = message.member;
    const channel = message.channel;

    const roller = low(this.client.adapterroles);
    const kanallar = low(this.client.adapterchannels);
    const utiller = low(this.client.adapterutil);
    const emojiler = low(this.client.adapteremojis);

    //if (channel.id != config.serverset.channels.confirmation.chat) return client.channels.cache.get(config.serverset.channels.logs.bot.err).send("Yanlış Kanal Kullanıldı -Confirmation");
    let sexiboy;
    var sexiboyzz = message.mentions.members.first();
    if (sexiboyzz) {
      sexiboy = sexiboyzz;
      if (!sexiboy) return message.channel.send("Tamam iyi diyorsun da kimi reddedeceğim?");
    } else {
      sexiboy = message.guild.members.cache.get(args[0]);;
    }
    if (!sexiboy) return message.channel.send("Kullanıcı Bulunamadı.")

    const aram = [(await roller).get("kiz").value(), (await roller).get("erkek").value()];
    if (aram.some(r => sexiboy.roles.cache.has(r))) return message.channel.send('Reddetmek istediğiniz kişi çoktan aramızda.');

    if (!sexiboy.roles.cache.has((await roller).get("yeni").value())) return;
    if (message.member.roles.highest.rawPosition <= sexiboy.roles.highest.rawPosition) {
      return message.channel.send('Bu ne cürret?');
    };

    await message.channel.send(
      `Burası sanırım sana göre değil ${sexiboy}.`
    );

    const userr = message.guild.members.cache.get(sexiboy.id);

    userr.ban({ days: 1 });

    var embed = new Discord.MessageEmbed()
      .setAuthor("Λ S T Я Λ C I Λ Nüfus Müdürlüğü", `${userr.user.displayAvatarURL()}`)
      .setTitle('Başarıyla Reddedildi!')
      .setColor('#77bbb5')
      .setThumbnail(`${userr.user.displayAvatarURL()}`)
      .addField('**Reddedilen Kullanıcı:**', `${sexiboy.user.tag}`, true)
      .addField('**Reddeden Yetkili:** ', `${member}`, true)
      .setFooter('Başarıyla Banlandı!')
      .setTimestamp();
    client.channels.cache.get((await kanallar).get("ret").value()).send(embed);

    this.client.cmdCooldown[message.author.id][this.help.name] = Date.now() + this.info.cooldown

  }
}

module.exports = Ret;