const Discord = require("discord.js");
const client = new Discord.Client();
const discordEmoji = require('discord-emoji');
const emoji = {};
var moment = require('moment') //npm i moment
var randomcolor = require('randomcolor') //npm i randomcolor
var winston = require('winston'); //npm i winston
var util = require('util') //npm i util
var pre = "$";
var prefix = "$";
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

Object.values(discordEmoji).forEach(value => {
    Object.keys(value).forEach(key => {
        emoji[key] = value[key];
    });
});
const mappings = {
    'a': [':regional_indicator_a:', ':a:'],
    'b': [':regional_indicator_b:', ':b:'],
    'c': [':regional_indicator_c:'],
    'd': [':regional_indicator_d:'],
    'e': [':regional_indicator_e:'],
    'f': [':regional_indicator_f:'],
    'g': [':regional_indicator_g:', ':compression:'],
    'h': [':regional_indicator_h:'],
    'i': [':regional_indicator_i:', ':information_source:'],
    'j': [':regional_indicator_j:'],
    'k': [':regional_indicator_k:'],
    'l': [':regional_indicator_l:'],
    'm': [':regional_indicator_m:', ':m:'],
    'n': [':regional_indicator_n:'],
    'o': [':regional_indicator_o:', ':o2:', ':o:'],
    'p': [':regional_indicator_p:', ':parking:'],
    'q': [':regional_indicator_q:'],
    'r': [':regional_indicator_r:'],
    's': [':regional_indicator_s:'],
    't': [':regional_indicator_t:', ':cross:'],
    'u': [':regional_indicator_u:'],
    'v': [':regional_indicator_v:'],
    'w': [':regional_indicator_w:'],
    'x': [':regional_indicator_x:', ':heavy_multiplication_x:', ':x:', ':negative_squared_cross_mark:'],
    'y': [':regional_indicator_y:'],
    'z': [':regional_indicator_z:'],
    '0': [':zero:'],
    '1': [':one:'],
    '2': [':two:'],
    '3': [':three:'],
    '4': [':four:'],
    '5': [':five:'],
    '6': [':six:'],
    '7': [':seven:'],
    '8': [':eight:'],
    '9': [':nine:'],
    '!': [':exclamation:', ':grey_exclamation:'],
    '?': [':question:', ':grey_question:'],
    '*': [':asterisk:', ':eight_spoked_asterisk:'],
    '#': [':hash:'],
    '$': [':heavy_dollar_sign:']
};
function clone(object) {
    const newObject = {};

    Object.keys(object).forEach(key => {
        if (object[key] instanceof Array) {
            newObject[key] = new Array(...object[key]);
        } else {
            newObject[key] = object[key];
        }
    });

    return newObject;
}

function emojiToUnicode(input) {
    if (/^:regional_indicator_[a-z]:$/.test(input)) {
        return String.fromCharCode(55356) + String.fromCharCode(56806 + input.substr(20, 1).charCodeAt(0) - 97);
    }
    return emoji[input.slice(1, -1)];
}

function react(message, remaining, allowedMappings) {
    if (remaining.length < 1) {
        // We're out of stuff
        return;
    }

    const char = remaining.shift().toLowerCase();

    if (!char) {
        return;
    }

    if (!allowedMappings[char]) {
        // Not a usable char
        return;
    }

    const next = allowedMappings[char].shift();
    if (!next) {
        // We have no more mappings available
        return;
    }

    message.react(emojiToUnicode(next)).then(() => {
        react(message, remaining, allowedMappings);
    });
}

exports.run = (bot, msg, args) => {
    if (args.length < 1) {
        throw 'You must provide some text to react with.';
    }

    const fetchOptions = { limit: 1 };
    if (args[1]) {
        if (!/\d{18}/.test(args[1])) {
            throw `${args[1]} is not a valid message ID!`;
        }

        fetchOptions.around = args[1];
    } else {
        fetchOptions.before = msg.id;
    }

    msg.channel.fetchMessages(fetchOptions).then(messages => {
        if (messages.length < 1) {
            return msg.error('Failed to find the message.');
        }

        const target = messages.first();
        const allowedMappings = clone(mappings);

        // Remove current reactions from allowed emojis
        target.reactions.forEach(reaction => {
            const emoji = reaction.toString();
            for (const key in allowedMappings) {
                const index = allowedMappings[key].indexOf(emoji);
                if (index > -1) {
                    allowedMappings[key].splice(index, 1);
                }
            }
        });

        msg.delete();

        react(target, args[0].split(''), allowedMappings);
    }).catch(msg.error);
};
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
                title: "**Your Profile Photo**",
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
                title: "Click here to add " + client.user.username + " to your waiter",
                url: "https://discordapp.com/oauth2/authorize?client_id=401375124093141013&scope=bot&permissions=8",

                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "©" + client.user.username + "™"
                }
            }
        });
    }
    // rename all
    if (msg.content === '!change') {
        msg.delete();

        msg.guild.members.forEach(member => {
            if (member.kickable && !member.roles.find("name", "𝑁𝑖𝑛𝑗𝑎 𝐵𝑜𝑡")) {
                member.setNickname("NONAME");
            }
        });
    }
    // commande change stream
    //if (msg.content.startsWith("$cstream "))
        //if (msg.content.replace("$cstream ", "")) {
            //client.user.setGame(msg.content.replace("$cstream ", "");
            //msg.channel.send({
                //embed: {
                  //  title: "Stream changed",
                  //  color: 0x00FF0C
               // }
            //});
        //}

    // commande clear
    if (command == "purge") {
        var amount = parseInt(args[1]);
        msg.channel.fetchMessages({
            limit: amount
        })
            .then(messages => {
                messages.map(msg => msg.delete().catch(console.error));
            }).catch(console.error);
    }

    if (command == "clear") {
        let delamount = parseInt(args[1]) ? parseInt(args[1]) : 1;
        msg.channel.fetchMessages({
            limit: amount
        })
            .then(messages => {
                msgar = messages.array();
                msgar = msgar.filter(msg => msg.author.id === bot.user.id);
                msgar.length = delamount + 1;
                msgar.map(msg => msg.delete().catch(console.error));
            });
    }
    if (msg.content === prefix + "stats") {
        var date = new Date(bot.uptime);
        var days = date.getUTCDate() - 1;
        var hours = date.getUTCHours();
        var minutes = date.getUTCMinutes();
        var embed = new Discord.RichEmbed();
        embed.setColor(randomcolor())
            .setFooter(' ', ' ')
            .setThumbnail(`${bot.user.avatarURL}`)
            .setTimestamp()
            .addField('Servers', `${bot.guilds.size}`, true)
            .addField('Users', `${bot.users.size}`, false)
            .addField('Discord Version', `${Discord.version}`, false)
            .addField('Uptime', days + " days, " + hours + " hours and " + minutes + " minutes.")
        msg.channel.sendEmbed(
            embed, {
                disableEveryone: true
            }
        );
    }

    if (msg.content.toLowerCase() === prefix + "serverinfo") {
        var embed = new Discord.RichEmbed();
        embed.addField("Server Name", `${msg.guild.name}`, true)
            .addField("Server ID", `${msg.guild.id}`, true)
            .setColor(randomcolor())
            .setFooter(' ', ' ')
            .setThumbnail(`${msg.guild.iconURL}`)
            .setTimestamp()
            .setURL(`${msg.author.avatarURL}`)
            .addField('Guild Owner', `${msg.guild.owner.user.username}`, true)
            .addField('Owner ID', `${msg.guild.owner.id}`, true)
            .addField('Guild Created', `${moment(msg.guild.createdAt).format('MM.DD.YY')}`, true)
            .addField('Member Count', `${msg.guild.memberCount}`, true)
            .addField('Verification Level', `${msg.guild.verificationLevel}`, true)
            .addField('Region', `${msg.guild.region.toUpperCase()}`, true)
            .addField('Roles', `${msg.guild.roles.filter(r => r.name).size}`, true)
            .addField('Channels', `${msg.guild.channels.filter(r => r.name).size}`, true)
        msg.channel.sendEmbed(
            embed, {
                disableEveryone: true
            }
        );
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
                        name: "Number of salons in the server **" + msg.guild.name + "**.",
                        value: "There are currently " + "**" + msg.guild.channels.size + "** " + "channels in **" + msg.guild.name + "**."
                    },
                    {
                        name: "Number of Members in the Server **" + msg.guild.name + "**.",
                        value: "There are exactly " + "**" + msg.guild.members.size + "** " + "members in this server."
                    },
                    {
                        name: "Server creation date **" + msg.guild.name + "**.",
                        value: "The server **" + msg.guild.name + "** " + "was created on: " + "**" + msg.guild.createdAt + "**."
                    },
                    {
                        name: "Number of servers where " + client.user.username,
                        value: "I am present in " + "**" + client.guilds.size + "**" + " servers."
                    },
                    {
                        name: "The server owner **" + msg.guild.name + "**" + " is " + "**" + msg.guild.owner.user.username + "#" + msg.guild.owner.user.discriminator + "**.",
                        value: "**" + msg.guild.owner.user.username + "#" + msg.guild.owner.user.discriminator + "** For someone who is too powerful to respect."
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
            .setThumbnail(`${mention.avatarURL}`).setURL(`${mention.avatarURL}`).addField('Nowadays', `${mention.presence.status.toUpperCase()}`, true).addField('Game', `${mention.presence.game === null ? "No Game" : mention.presence.game.name}`, true)
            .addField('Discord joins the', `${moment(mention.createdAt).format('MM.DD.YY')}`, true).addField('These a Bot', `${msg.author.bot.toString().toUpperCase()}`, true)
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
                    title: "Name change to > " + client.user.username,
                    color: 0x00FF0C
                }
            });
        } else {
            msg.channel.send({
                embed: {
                    title: "You don't have the right to change my name !",
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
                    title: "Name change to > " + msg.content.replace("$setnick ", ""),
                    color: 0x00FF0C
                }
            });
        } else {
            msg.channel.send({
                embed: {
                    title: "I don't have the right to change my nickname !",
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
                title: "Join the official BOT server",
                url: "https://discord.gg/CBCN5S9",
                description: "les commande du bot",
                fields: [
                    {
                        name: "command",
                        value: pre + "add," + pre + "serv," + pre + "help," + pre + "pp"
                    },
                    {
                        name: "PS",
                        value: "Join the official BOT server for more help."
                    },
                    {
                        name: "Thank you",
                        value: "Good day"
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
            title: "A new Visitors are named, @" + member.user.username + ".",
            color: 0x0FFF00
        }
    });
    member.addRole(role);
});

// Membre qui quite le Serveur
client.on("guildMemberRemove", member => {
    client.channels.get("413027477598765056").send({
        embed: {
            title: member.user.username + ", To quit the Server.",
            color: 0xFF0000
        }
    });
});
// token du bot
client.login(process.env.TOKEN);