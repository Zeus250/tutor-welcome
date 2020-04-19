const http = require('http');
const express = require('express');
const app = express();
const queue = new Map();
const Discord = require("discord.js");
const fs = require("fs");
const superagent = require("superagent");
const request = require("request");
const { registerFont } = require("canvas");
const { Canvas } = require("canvas-constructor");
const canvas  = require("canvas");
const snekfetch = require("snekfetch");
const sql = require("sqlite");
const fetch = require("node-superfetch");
const client = new Discord.Client({ disableEveryone: true });
client.login(process.env.TOKEN);
const config = require("./config.json");

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping ");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);



client.on("ready", async () => {
  console.log(
    `Bots is ready and working in ${client.guilds.size} servers with ${client.users.size} users!`
  );
});

client.on("ready", async member => {
  try {
    let link = await client.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
  } catch (e) {
    console.log(e.stack);
  }

  client.user.setStatus("Online");

  //WELCOME IMAGE ==================================================================================================================
  client.on("message", message => {
    if (message.content === ">test") {
      client.emit("guildMemberAdd", message.member);
    }
  });

  client.on("guildMemberAdd", async member => {
    let welcome = JSON.parse(fs.readFileSync("./database/welcome.json", "utf8"));
    let welcomeset = JSON.parse(fs.readFileSync("./database/welcomeset.json", "utf8"));
    if (!welcomeset[member.guild.id]) {
      welcomeset[member.guild.id] = {
        checker: 0
      };
    }
    let value = welcomeset[member.guild.id].checker;
    if (value === undefined) return;
    if (value === 0) return;
    if (value === 1) {
      let channelid = welcome[member.guild.id].role;
      const channel = member.guild.channels.cache.find(ch => ch.id === channelid);
      if (!channel) return;

      //SET BACKGROUND ===============================================================================================================================
      let defaultback ="https://cdn.discordapp.com/attachments/680027253756657683/693064245138685982/dv2LnYdWxqU.png";
      let background = JSON.parse(fs.readFileSync("./database/backgroundwelcome.json", "utf8"));

      if (!background[member.guild.id]) {
        background[member.guild.id] = {
          backgrounds: defaultback
        };
      }
      let backimg = background[member.guild.id].backgrounds;
      
      let nameLimit = member.user.username;
      let username = nameLimit.length > 25 ? nameLimit.substring(0, 23) + "" : nameLimit;
      
      async function createCanvas() {
        let { body: background } = await superagent.get(backimg); 
        let { body: avatar } = await superagent.get(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));

        return new Canvas(1000, 500) //(1024, 450)
            .addImage(background, 0, 0, 1000, 500) // BACKGROUN
            .setShadowColor("rgba(22, 22, 22, 1)")
            .setShadowOffsetY(5)
            .setShadowBlur(10)
            .setColor(`${color}`)
            .addCircle(150, 160, 125)
            .addCircularImage(avatar, 150, 160, 120) // PROFILE
        
            .setTextFont("bold 40px sans-serif'")
            .setTextAlign("center")
            .addText(`${username}#${member.user.discriminator}`, 500, 435) 

            .setTextFont("bold 75px sans-serif")
            .setTextAlign("center")
            .addText("WELCOME", 500, 385) 

            .setTextFont("bold 30px sans-serif")
            .setTextAlign("center")
            .addText(`${member.guild.name}`, 500, 475) 
            .toBufferAsync()
      }
  
      channel.send(msg, {
        files: [{
            attachment: await createCanvas(),
            name: "welcome.png"
          }]
      });
    };
  });
});

client.on("message", async message => {
  
 if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = config.prefix;
  let msg = message.content.toLowerCase();
  let args = message.content.slice(prefix.length).trim().split(" ");
  let cmd = args.shift().toLowerCase();
  let sender = message.author;

  if (!msg.startsWith(prefix)) return;
  if (sender.bot) return;

  try {
    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args, prefix);
  } catch (e) {
    console.log(e.message);
  } finally {
    console.log(
      `${message.author.username} ran the command: ${cmd} on ${message.guild.name}`
    );
  } 
    if (cmd === `!dm`) {
    let dUser =
      message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!dUser) return message.channel.send("Can't find user!");
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.reply("You can't you that command!");
    let dMessage = args.join(" ").slice(22);
    if (dMessage.length < 1) return message.reply("You must supply a message!");

    dUser.send(`${dUser} A moderator from WP Coding Club sent you: ${dMessage}`);
    message.author.send(`${message.author} You have sent your message to ${dUser}`);
  };
});


          

