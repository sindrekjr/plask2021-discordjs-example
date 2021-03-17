import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';

export class HeiCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'hei', // command name/keyword
      group: 'examples', // belongs to which command group
      memberName: 'hei', // command id within its group
      description: 'Replies with "Hei."',
    });
  }

  run(msg: CommandoMessage): Promise<Message> {
    return msg.reply('Hei. 😄');
  }
}
