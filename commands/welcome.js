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

        let dis = new Discord.MessageEmbed()
          .setDescription(`:white_check_mark: **Welcome berhasil di Set Ke** ${ro}`)
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
    let ms = new Discord.MessageEmbed()
      .setDescription(`:white_check_mark: **Welcome sudah Di Aktifkan**`)
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
    let m = new Discord.MessageEmbed()
      .setDescription(`<:emoji_28:666116417715830815> **Welcome Sudah Di Matikan**`)
      .setColor("RANDOM");
    message.channel.send(m);
  }
  if (m.match("bg")) {
    let backgroundset = JSON.parse(
      fs.readFileSync("./database/backgroundwelcome.json")
    );
    let setback = "";

    if (setback = message.attachments.array()[0]) {
      setback = message.attachments.array()[0].url;
    } else {
      setback = args[1];
    }

    if (!setback)
      return message.reply("**UNGGAH** atau masukkan **LINK** gambar nya dulu dek :v");
    backgroundset[message.guild.id] = {
      backgrounds: setback
    };

    console.log(backgroundset);
    fs.writeFile("./database/backgroundwelcome.json",JSON.stringify(backgroundset, null, 2), err => {
        if (err) console.log(err);
      });
    message.channel.send(":white_check_mark: Background sudah di ganti");
  };
 
  if (m.match("color")) {
    if (!message.member.hasPermission("MANAGE_GUILD") && message.author.id !== "412855529501753344")
     return message.reply("❌ **Anda memerlukan izin \`MANAGE_GUILD\` untuk melakukan perintah ini!**");
    let colorset = args.slice(1).join();
    if (!colorset) return message.reply(`❎ Silahkan masukkan warna terlebih dahulu, gunakan \`${config.prefix}welcome color <white>\``
      );
    let database = JSON.parse(fs.readFileSync("./database/color.json", "utf8"));
    database[message.guild.id] = {
      colors: `${colorset}`
    };
    fs.writeFile(
      "./database/color.json",
      JSON.stringify(database, null, 2),
      err => {
        if (err) console.log(err);
      }
    );
    message.channel.send(
      `✅ **${message.author.tag}**, Warna Welcome berhasil di ganti. **sudah berubah!**`
    );
  }
};

exports.help = {
  name: "welcome"
};
