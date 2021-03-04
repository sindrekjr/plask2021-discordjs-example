import fetch from 'node-fetch';

export interface Quote {
  author: string;
  quote: string;
  tags: string[];
  image: string;
}

export interface QuoteOfDay {
  quotes: Quote[];
}

export interface QuoteCategories {
  categories: Record<string, string>;
}

export interface QuotesApiResponseBody<T> {
  success: {
    total: number;
  };
  contents: T;
}

export class QuotesApiProxy {
  private static baseUrl = 'https://quotes.rest/';

  static async getQuoteOfDay(category?: string): Promise<string | undefined> {
    const response = await fetch(category ? `${this.baseUrl}qod?category=${category}&language=en` : `${this.baseUrl}qod?language=en`);
    const json: QuotesApiResponseBody<QuoteOfDay> = await response.json();
    const { success: { total }, contents: { quotes } } = json;

    if (total) {
      const { quote } = quotes[0];
      return quote;
    }
  }

  static async getCategories(): Promise<string[]> {
    const response = await fetch(`${this.baseUrl}qod/categories?language=en&detailed=false`);
    const json: QuotesApiResponseBody<QuoteCategories> = await response.json();
    const { contents: { categories } } = json;
    return Object.keys(categories);
  }
}
