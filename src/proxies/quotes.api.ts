import { HTTPError } from 'discord.js';
import fetch from 'node-fetch';

export interface Quote {
  author: string;
  quote: string;
  tags: string[];
  image: string;
  attribution: {
    title: string;
    thumbnail: string;
    href: string;
    footer: string;
  }
}

export interface QuoteOfDay {
  quotes: Quote[];
}

export interface QuoteCategories {
  categories: Record<string, string>;
}

export interface QuotesApiResponseBody<T> {
  error?: {
    code: number;
    message: string;
  }
  success: {
    total: number;
  };
  contents: T;
}

export class QuotesApiProxy {
  public static categories: string[] = ['inspire', 'management', 'sports', 'life', 'funny', 'love', 'art', 'students'];

  private static baseUrl = 'https://quotes.rest/';
  private static attribution = {
    title: 'They Said So®',
    thumbnail: 'https://theysaidso.com/branding/theysaidso.png',
    footer: 'Powered by quotes from theysaidso.com',
    href: 'https://theysaidso.com',
  }

  static async getQuoteOfDay(category?: string): Promise<Quote | undefined> {
    const response = await fetch(category ? `${this.baseUrl}qod?category=${category}&language=en` : `${this.baseUrl}qod?language=en`);
    const json: QuotesApiResponseBody<QuoteOfDay> = await response.json();
    if (json.error) throw new HTTPError(json.error.message, 'HTTPError', json.error.code, 'GET', 'QuotesApiProxy');

    const { success: { total }, contents: { quotes } } = json;
    if (total) {
      return {
        ...quotes[0],
        attribution: this.attribution,
      };
    }
  }

  static async getCategories(): Promise<string[]> {
    const response = await fetch(`${this.baseUrl}qod/categories?language=en&detailed=false`);
    const json: QuotesApiResponseBody<QuoteCategories> = await response.json();
    const { contents: { categories } } = json;
    return Object.keys(categories);
  }
}
