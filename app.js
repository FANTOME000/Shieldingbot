const Discord = require("discord.js");
const client = new Discord.Client();
var moment = require('moment') //npm i moment
var randomcolor = require('randomcolor') //npm i randomcolor
var winston = require('winston'); //npm i winston
var util = require('util') //npm i util
var pre = "$";
client.on("ready", () => {
    // log bot bien lancer
    console.log(`Se connecter comme ${client.user.tag}!`);
    console.log(`Server: ${client.guilds.size}`);
    console.log(`Channels: ${client.channels.size}`);
    console.log(`Users: ${client.users.size}`);
    // activiter du bot
    client.user.setGame(pre + "help pour afficher les cmd", 'https://www.twitch.tv/$')
    // message de mise en route du bot
    client.channels.get("413027512122081280").send({
        embed: {
            title: "Bot ON,prêt a être utiliser !",
            color: 0x58D68D
        }
    });
});

client.on("message", msg => {

    let prefix = "$";
    let channel = msg.channel;
    let guild = msg.guild;
    let text = msg.content;
    let args = text.split(" ");
    let command = text.substring(prefix.length, args[0].length).toLowerCase();
    // commande afficher l'image de profile
    if (msg.content === "$pp") {
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

    // commande inviter le bot
    if (msg.content === "$add") {
        msg.channel.send({
            embed: {
                color: 0xFAA61A,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "Clique ici pour ajouter " + client.user.username + " a ton serveur",
                url: "https://discordapp.com/oauth2/authorize?client_id=401375124093141013&scope=bot&permissions=8",

                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "©" + client.user.username + "™"
                }
            }
        });
    }


    // commande info serv
    if (msg.content === '$serv') {
        msg.channel.send({
            embed: {
                color: 0x566573,
                author: {
                    name: client.user.username,
                    icon_url: client.user.avatarURL
                },
                title: "Informations du serveur **" + msg.guild.name + "**",
                color: 0x0FFF00,
                fields: [
                    {
                        name: "Nombres de salont dans le serveur **" + msg.guild.name + "**.",
                        value: "Il y a actuellement " + "**" + msg.guild.channels.size + "** " + "channels dans **" + msg.guild.name + "**."
                    },
                    {
                        name: "Nombres de Membres dans le Serveur **" + msg.guild.name + "**.",
                        value: "Il y a exactement " + "**" + msg.guild.members.size + "** " + "membres dans ce serveur."
                    },
                    {
                        name: "Date de créations du serveur **" + msg.guild.name + "**.",
                        value: "Le serveur **" + msg.guild.name + "** " + "a été crée le: " + "**" + msg.guild.createdAt + "**."
                    },
                    {
                        name: "Nombres de serveur où-es " + client.user.username,
                        value: "Je suis present dans " + "**" + client.guilds.size + "**" + " serveurs."
                    },
                    {
                        name: "L'administrateur du serveur **" + msg.guild.name + "**" + " ès " + "**" + msg.guild.owner.user.username + "#" + msg.guild.owner.user.discriminator + "**.",
                        value: "**" + msg.guild.owner.user.username + "#" + msg.guild.owner.user.discriminator + "** ès une personne trop puissante respecter la."
                    },
                    //{
                    // name: "Nombres de messages envoyez par " + client.user.username,
                    //value: "**" + "%s message" + "** messages envoyez par le bot"
                    //},
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: client.user.username
                }
            }
        });
    }
    // commande info membre

    if (command == "info") {
        var mention = msg.mentions.users.first();
        if (msg.mentions.users.size === 0) {
            return msg.channel.send(":x: | Pleas mentionne un membre.")
        }
        var embed = new Discord.RichEmbed();
        embed.addField("Username", `${mention.username}#${mention.discriminator}`, true).addField("ID", `${mention.id}`, true).setColor(randomcolor())
            .setThumbnail(`${mention.avatarURL}`).setURL(`${mention.avatarURL}`).addField('Actuellement', `${mention.presence.status.toUpperCase()}`, true).addField('Game', `${mention.presence.game === null ? "No Game" : mention.presence.game.name}`, true)
            .addField('Discord rejoins le', `${moment(mention.createdAt).format('MM.DD.YY')}`, true).addField('Ces un Bot', `${msg.author.bot.toString().toUpperCase()}`, true)
        msg.channel.sendEmbed(
            embed, {
                disableEveryone: true
            }
        );
    }
    // commande changer de name
    if (msg.content.startsWith("$setname " && msg.author.id === "317375697700126720")) {
        if (msg.content.replace("$setname ", "")) {
            client.user.setUsername(msg.content.replace("$setname ", ""));
            msg.channel.send({
                embed: {
                    title: "Nom changer vers > " + client.user.username,
                    color: 0x00FF0C
                }
            });
        } else {
            msg.channel.send({
                embed: {
                    title: "Tu na pas les droits pour changer mon nom",
                    color: 0xFF214A
                }
            });
            
        }
    }
    // commande changer de nickname
    if (msg.content.startsWith("$setnick ")) {
        if (msg.content.replace("$setnick ", "")) {
            msg.guild.me.setNickname(msg.content.replace("$setnick ", ""));
            msg.channel.send({
                embed: {
                    title: "Nom changer vers > " + msg.content.replace("$setnick ", ""),
                    color: 0x00FF0C
                }
            });
        } else {
            msg.channel.send({
                embed: {
                    title: "Je n'ai pas les droits pour changer mon pseudo",
                    color: 0xFF214A
                }
            })
        }
    }
    
    // commande help
    if (msg.content === "$help") {
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
                        value: pre + "add," + pre + "serv," + pre + "help," + pre + "pp"
                    },
                    {
                        name: "PS",
                        value: "Rejoignez le serveur Officiel du BOT pour plus d'aide."
                    },
                    {
                        name: "Merci",
                        value: "Bonne journée"
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
// Membre qui rejoins le serveur
client.on("guildMemberAdd", member => {
    var role = member.guild.roles.find("name", "Visiteurs");
    client.channels.get("413027477598765056").send({
        embed: {
            title: "Un nouveaux Visiteurs sont nom, @" + member.user.username + ".",
            color: 0x0FFF00
        }
    });
    member.addRole(role);
});

// Membre qui quite le Serveur
client.on("guildMemberRemove", member => {
    client.channels.get("413027477598765056").send({
        embed: {
            title: member.user.username + ", A quitter le Serveur.",
            color: 0xFF0000
        }
    });
});
// token du bot
client.login(process.env.TOKEN);