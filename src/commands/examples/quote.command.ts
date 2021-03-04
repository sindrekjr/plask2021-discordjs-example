import { Message } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { QuotesApiProxy } from '../../proxies/quotes.api';

export class QuoteCommand extends Command {
  private categories: string[] = [];

  constructor(client: CommandoClient) {
    super(client, {
      name: 'quote',
      group: 'examples',
      memberName: 'quote',
      description: 'Returns the quote of the day.',
      args: [
        {
          key: 'category',
          label: 'category',
          prompt: 'What quote category would you like to fetch?',
          type: 'string',
          default: '',
          validate: (text: string) => !text || this.categories.includes(text.toLowerCase()),
        }
      ],
    });

    QuotesApiProxy.getCategories().then(categories => this.categories = categories);
  }

  async run(msg: CommandoMessage, { category }: { category: string }): Promise<Message> {
    const quote = await QuotesApiProxy.getQuoteOfDay(category);
    return quote
      ? msg.reply(quote)
      : msg.reply('Failed to get quote.');
  }
}