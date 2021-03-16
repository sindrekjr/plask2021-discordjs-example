import dotenv from 'dotenv';
import { CommandoClient } from 'discord.js-commando';

import { QuoteCommand, SvadaCommand } from './commands';

/**
 * @ignore
 * We use dotenv to initialize local envs for development (see untracked file: .env)
 */
dotenv.config();

/**
 * @ignore
 * We fetch the environment variables we need
 */
const { BOT_OWNER, BOT_TOKEN, CMD_PREFIX } = process.env;


/**
 * @ignore
 * We initialize the CommandoClient from discord.js-commando
 * The client structure contains everything we need to interact fluently with the Discord API
 */
const client = new CommandoClient({
  commandPrefix: CMD_PREFIX,
  owner: BOT_OWNER,
});

/**
 * @ignore
 * The registry property of the client handles active commands and their configurations
 */
client.registry
  .registerDefaults()
  .registerGroup('examples', 'Examples')
  .registerCommands([QuoteCommand, SvadaCommand]);

client.login(BOT_TOKEN);
