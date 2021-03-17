import { HTTPError, Message, MessageEmbed } from 'discord.js';
import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { Quote, QuotesApiProxy } from '../../proxies/quotes.api';

export class QuoteCommand extends Command {
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
          oneOf: QuotesApiProxy.categories,
        }
      ],
    });
  }

  async run(msg: CommandoMessage, { category }: { category: string }): Promise<Message> {
    try {
      const quote = await QuotesApiProxy.getQuoteOfDay(category);
      if (quote) return msg.say(this.formatMessageEmbed(quote));
    } catch (error) {
      if (error instanceof HTTPError) {
        if (error.code === 429) return msg.say(error.message);
      }

      console.error(error);
    }

    return msg.say('Failed to get quote.');
  }

  private formatMessageEmbed(quoteData: Quote): MessageEmbed {
    const { author, quote, image, attribution: { title, thumbnail, href, footer } } = quoteData;
    const embed = new MessageEmbed();
    embed.setTitle(title);
    embed.setURL(href);
    embed.setAuthor(author);
    embed.setDescription(quote);
    embed.setThumbnail(image);
    embed.setFooter(footer, thumbnail);
    return embed;
  }
}
