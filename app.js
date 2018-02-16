const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
    // log bot bien lancer
    console.log(`Se connecter comme ${client.user.tag}!`);
    // activiter du bot
    client.user.setPresence({ game: { name: "*" + "help" + " pour afficher l'aide", type: 0 } });
    // message de mise en route du bot
    client.channels.get("413027512122081280").sendMessage({
        embed: {
            title: "Bot ON,prêt a être utiliser !",
            color: 0x58D68D
        }
    });
});

client.on("message", msg => {
    if (msg.content === "ping") {
        msg.reply("I am here !");
    }
    // commande afficher l'image de profile
    if (msg.content === "*pp") {
        msg.channel.send({
            embed: {
                color: 0xE74C3C,
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
     // commande help
    if (msg.content === "*help") {
        msg.channel.send({
            embed: {
                color: 0x566573,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "Rejoindre le serveur officiel du BOT",
                url: "https://discord.gg/CBCN5S9",
                description: "les commande du bot",
                fields: [
                    {
                        name: "commande",
                        value: "*pp,tct"
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

    // Nouveaux membre
    client.on("guildMemberAdd", member => {
        client.channels.get("413027477598765056").send({
            embed: {
                title: "Un nouveaux Visiteurs sont nom, " + "@" + member.user.username,
                color: 0xECF0F1
            }
        });
        var role = member.guild.roles.find("name", "Visiteurs");
        member.addRole(role);
    });
    if (!message.guild) return;

    if (message.content === '/join') {
        if (message.member.voiceChannel) {
            message.member.voiceChannel.join()
                .then(connection => { 
                    message.reply('I have successfully connected to the channel!');
                })
                .catch(console.log);
        } else {
            message.reply('You need to join a voice channel first!');
        }
    }

    // fin du code message
});
// token du bot
client.login(process.env.TOKEN);