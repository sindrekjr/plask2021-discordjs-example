import dotenv from 'dotenv';
import { CommandoClient } from 'discord.js-commando';
import { SvadaCommand } from './commands';

dotenv.config();

const { BOT_OWNER, BOT_TOKEN } = process.env;

const client = new CommandoClient({
  commandPrefix: '/',
  owner: BOT_OWNER,
});

client.registry
  .registerDefaults()
  .registerCommand(SvadaCommand);

client.login(BOT_TOKEN);
