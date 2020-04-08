const fs = require("fs");
const Discord = require("discord.js");
const config = require("../config.json");

exports.run = async (bot, message, args, member ) => {
  if (
    !message.member.hasPermission("MANAGE_CHANNELS") &&
    message.author.id === id_lu)


    return message.reply("Maaf kamu tidak bisa menggunakan perintah ini!");
  let m = args.join(" ");
  if (!m) {
     } else {
    if (m.match("set")) {
      let r = JSON.parse(fs.readFileSync("./database/welcome.json", "utf8"));

      let ro = message.mentions.channels.first();
      if (!ro) return message.channel.send(`**Tolong Mentions Channels**`);
      if (ro) {
        r[message.guild.id] = {
          role: ro.id
        };
        fs.writeFile(
          "./database/welcome.json",
          JSON.stringify(r, null, 2),
          err => {
            if (err) console.log(err);
          }
        );
        console.log(r);

        let dis = new Discord.RichEmbed()
          .setDescription(`:white_check_mark: WELCOME Di Set Ke ${ro}`)
          .setColor("RANDOM");
        message.channel.send(dis);
      }
    }
  }
  if (m.match("on")) {
    let log = JSON.parse(fs.readFileSync("./database/welcomeset.json", "utf8"));
    log[message.guild.id] = {
      checker: 1
    };
    console.log(log);
    fs.writeFile(
      "./database/welcomeset.json",
      JSON.stringify(log, null, 2),
      err => {
        if (err) console.log(err);
      }
    );
    let ms = new Discord.RichEmbed()
      .setDescription(`:white_check_mark: Welcome sudah di aktifkan`)
      .setColor(`RANDOM`);
    message.channel.send(ms);
  }
  if (m.match("off")) {
    let log = JSON.parse(fs.readFileSync("./database/welcomeset.json", "utf8"));
    log[message.guild.id] = {
      checker: 0
    };
    console.log(log);
    fs.writeFile(
      "./database/welcome.json",
      JSON.stringify(log, null, 2),
      err => {
        if (err) console.log(err);
      }
    );
    let m = new Discord.RichEmbed()
      .setDescription(`<:emoji_28:666116417715830815> welcome udah gw aktifin`)
      .setColor("RANDOM");
    message.channel.send(m);
  }
  if (m.match("bg")) {
    let backgroundset = JSON.parse(
      fs.readFileSync("./database/backgroundwelcome.json")
    );
    let setback = "";

    if ((setback = message.attachments.first())) {
      setback = message.attachments.first().url;
    } else {
      setback = args[1];
    }

    if (!setback)
      return message.reply("**UNGGAH** atau masukkan **LINK** gambar nya dulu lah tod :v");
    backgroundset[message.guild.id] = {
      backgrounds: setback
    };

    console.log(backgroundset);
    fs.writeFile("./database/backgroundwelcome.json",JSON.stringify(backgroundset, null, 2), err => {
        if (err) console.log(err);
      });
    message.channel.send(":white_check_mark: Background udah gw ganti");
  };
  

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "welcome"
};
