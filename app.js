﻿const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
    // log bot bien lancer
    console.log(`Se connecter comme ${client.user.tag}!`);
    // activiter du bot
    client.user.setPresence({
        game: { name: "*" + "help" + " pour afficher l'aide", type: 0 }
    });
    // message de mise en route du bot
    client.channels.get("413027512122081280").sendMessage({
        embed: {
            title: "Bot ON,prêt a être utiliser !",
            color: 0x58d68d
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
                color: 0xe74c3c,
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
        var role = member.guild.roles.find("name", "Visiteurs");
        client.channels.get("413027477598765056").send({
            embed: {
                title: "Un nouveaux Visiteurs sont nom, @" + member.user.username + ".",
                color: 0x0fff00
            }
        });
        member.addRole(role);
    });

    // Membre qui quite le Serveur
    client.on("guildMemberRemove", member => {
        client.channels.get("413027477598765056").send({
            embed: {
                title: member.user.username + ", A quitter le Serveur ou à etait ban.",
                color: 0xff0000
            }
        });
    });

    // fin du code message
});
// token du bot
client.login(process.env.TOKEN);
