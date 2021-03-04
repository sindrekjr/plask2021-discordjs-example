import dotenv from 'dotenv';
import { CommandoClient } from 'discord.js-commando';

import { QuoteCommand, SvadaCommand } from './commands';

dotenv.config();

const { BOT_OWNER, BOT_TOKEN, CMD_PREFIX } = process.env;

const client = new CommandoClient({
  commandPrefix: CMD_PREFIX,
  owner: BOT_OWNER,
});

client.registry
  .registerDefaults()
  .registerGroup('examples', 'Examples')
  .registerCommands([QuoteCommand, SvadaCommand]);

client.login(BOT_TOKEN);
