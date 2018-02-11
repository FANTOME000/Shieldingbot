const Discord = require("discord.js");
const client = new Discord.Client();
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function () {
console.log("Listening on Port 3000");
});

client.on('ready', () => {
    console.log(`Se connecter comme ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('I am here !');
  }
});

client.login('NDAxMzc1MTI0MDkzMTQxMDEz.DWI5rw.q_r8vYTwhKy0tY_cr6SVwv5pbTQ');