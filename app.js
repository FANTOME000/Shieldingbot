const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Se connecter comme ${client.user.tag}!`);


});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('I am here !');
    }

  if (msg.content === "*pp") {
      msg.channel.send({
          embed: {
              color: 2550255,
              author: {
                  name: client.user.username,
                  icon_url: client.user.avatarURL
              },
              title: "**Votre Photo de profil**",
              url: msg.author.avatarURL,
              image: {
                  url: msg.author.avatarURL
              },

              timestamp: new Date(),
              footer: {
                  icon_url: client.user.avatarURL,
                  text: "©" + client.user.username + "™"
              }
          }
      });
  }

  if (msg.content === "*help") {
      msg.channel.send({
          embed: {
              color: 2550255,
              author: {
                  name: client.user.username,
                  icon_url: client.user.avatarURL
              },
              title: "Rejoindre le serveur officiel du BOT",
              url:
              "https://discord.gg/CBCN5S9",
              description: "les commande du bot",
              fields: [
                  {
                      name: "commande",
                      value:
                      ";blacklist, ;clean, ;clear, ;disconnect, ;id, ;joinserver, ;listids, ;np, ;pause, ;perms, ;play, ;pldump, ;queue, ;restart, ;resume, ;search, ;setavatar, ;setname, ;setnick, ;shuffle, ;shutdown, ;skip, ;stream, ;summon, ;volume."
                  },
                  {
                      name: "PS",
                      value: "Rejoignez le serveur Officiel du BOT pour plus d'aide."
                  },
                  {
                      name: "Merci",
                      value: "Bonne journee FANTOME"
                  }
              ],
              timestamp: new Date(),
              footer: {
                  icon_url: client.user.avatarURL,
                  text: client.user.username
              }
          }
      });
  }



// fin du code message
});

var bot = require("discord-music-bot");

var serverName = "DEV BOT NO NAME";
var textChannelName = "chat";
var voiceChannelName = "chat";
var aliasesFile = "lol";
var botToken = "NDAxMzc1MTI0MDkzMTQxMDEz.DWI5rw.q_r8vYTwhKy0tY_cr6SVwv5pbTQ";

bot.run(serverName, textChannelName, voiceChannelName, aliasesFile, botToken);

client.login('NDAxMzc1MTI0MDkzMTQxMDEz.DWI5rw.q_r8vYTwhKy0tY_cr6SVwv5pbTQ');