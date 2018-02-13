﻿const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Se connecter comme ${client.user.tag}!`);
    client.user.setPresence({ game: { name: "*" + "help" + " pour afficher l'aide", type: 0 } });
    client.channels.get("412656091613102080").sendMessage({
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

    client.on("guildMemberAdd", member => {
        client.channels.get("412656091613102080").send({
            embed: {
                title: "Un nouveaux Visiteurs sont nom " + member.user.username,
                color: 0xECF0F1
            }
        });
        var role = member.guild.roles.find("name", "Visiteurs");
        member.addRole(role);
    });
    // fin du code message
});

client.login("NDAxMzc1MTI0MDkzMTQxMDEz.DWI5rw.q_r8vYTwhKy0tY_cr6SVwv5pbTQ");
