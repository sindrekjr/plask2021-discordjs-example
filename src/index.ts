import dotenv from 'dotenv';
import { TextChannel } from 'discord.js';
import { CommandoClient } from 'discord.js-commando';
import { QuoteCommand, SvadaCommand } from './commands';

// We use dotenv to initialize local envs for development (see untracked file: .env)
dotenv.config();
// We fetch the environment variables we need
const { BOT_OWNER, BOT_TOKEN, CMD_PREFIX } = process.env;


// We initialize the CommandoClient from discord.js-commando
// The client structure contains everything we need to interact fluently with the Discord API
const client = new CommandoClient({
  commandPrefix: CMD_PREFIX,
  owner: BOT_OWNER,
});


// The registry property of the client handles active commands and their configurations
client.registry
  .registerDefaults()
  .registerGroup('examples', 'Examples')
  .registerCommands([QuoteCommand, SvadaCommand]);


// Log in to Discord with a valid bot token
client.login(BOT_TOKEN);


/**
 * @ignore
 * Below we set various event listeners that demonstrate the power of the Discord API
 */
client.on('ready', () => console.log(`Logged in to: ${client.guilds.cache.array().join(', ')}`));

client.on('message', msg => {
  const includesPLASK = msg.content.toLowerCase().includes('plask');
  const needsCoffee = msg.content.toLowerCase().includes('trøtt');

  if (includesPLASK) msg.react('❤️');
  if (needsCoffee) msg.react('☕');
});

client.on('messageDelete', msg => {
  const authoredByBot = msg.author?.id === client.user?.id;
  if (authoredByBot) msg.channel.send('😮');
});

client.on('typingStart', (channel, user) => {
  (channel as TextChannel).send(`I see you, ${user}.`);
});
