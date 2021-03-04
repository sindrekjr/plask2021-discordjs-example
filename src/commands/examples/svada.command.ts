import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

import { getSvada } from '../../utils';

export class SvadaCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'svada',
      group: 'examples',
      memberName: 'svada',
      description: 'Returns Norwegian "svada" based on svadagenerator.no.',
    });
  }

  run(msg: CommandoMessage): Promise<Message> {
    return msg.say(getSvada());
  }
}