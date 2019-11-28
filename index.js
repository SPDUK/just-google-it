const Discord = require('discord.js');

const client = new Discord.Client();
const googleIt = require('google-it');
const auth = require('./auth.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(auth.token);

const options = {};

client.on('message', async msg => {
  if (msg.content === 'ping') {
    const [{ title, link }, ...rest] = await googleIt({
      options,
      query: msg.content,
    });

    console.log(title, link);

    Promise.all([
      msg.reply(
        `Why didn't you just google it?
      ${title}
      ${link}`
      ),
      msg.react('🍎'),
      msg.react('🍊'),
      msg.react('🍇'),
    ]);
  }
});
