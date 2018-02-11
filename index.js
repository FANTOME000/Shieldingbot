const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require('./settings.json');
app.get("/", function(req, res) {
  res.send("Shielding lancer");
});

app.listen(port);

const request = require("request");
client.on("ready", () => {
  console.log(`Connecter a ${client.user.tag}!`);
});

client.on("message", msg => {
    if (msg.content === ";pp") {
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
                    url: username.tag.avatarURL
                },

                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "Client"
                }
            }
        });
    }
  });
client.login("musictestsdsfsfNDAxMzc1MTI0MDkzMTQxMDEz.DWI5rw.q_r8vYTwhKy0tY_cr6SVwv5pbTQ");
