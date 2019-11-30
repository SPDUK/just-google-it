const Discord = require('discord.js');

const client = new Discord.Client();
const googleIt = require('google-it');
const auth = require('./auth.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(auth.token);

const options = {};

const BAD_WORDS = ['jquery', 'jqueery', 'jqeury', 'jqry', 'jqerty', 'jqueri'];

const lowerTrim = s => s.toLowerCase().trim();

const arrIncludesStr = arr => str =>
  arr.some(el => lowerTrim(str).includes(lowerTrim(el)));

const includesBadWords = arrIncludesStr(BAD_WORDS);

client.on('message', async msg => {
  if (msg.author.bot) return;

  if (includesBadWords(msg.content)) {
    const [{ title, link }, ...rest] = await googleIt({
      options,
      query: msg.content,
    });

    msg.reply(
      `Why didn't you just google it? 
      ${title}
      ${link}`
    );
  }
});
