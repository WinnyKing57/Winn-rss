import { Http } from '@nativescript/core';
import { RSSItem } from '../models/rss-feed.model';
import { URLValidator } from '../utils/url-validator';
import { ErrorHandler } from '../utils/error-handler';
import * as xml2js from 'xml2js';

export class RSSService {
  async fetchFeed(url: string): Promise<RSSItem[]> {
    if (!URLValidator.isValidRSSURL(url)) {
      throw new Error('INVALID_RSS');
    }

    try {
      const response = await Http.getString(url);
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(response);
      
      return this.parseRSSItems(result);
    } catch (error) {
      throw new Error(ErrorHandler.handleError(error as Error, 'RSSService'));
    }
  }

  private parseRSSItems(data: any): RSSItem[] {
    try {
      if (!data?.rss?.channel?.[0]?.item) {
        throw new Error('INVALID_RSS');
      }

      const channel = data.rss.channel[0];
      return channel.item.map(this.mapRSSItem);
    } catch (error) {
      console.error('Error parsing RSS items:', error);
      return [];
    }
  }

  private mapRSSItem(item: any): RSSItem {
    return {
      title: item.title?.[0] || 'Sans titre',
      description: item.description?.[0] || '',
      pubDate: new Date(item.pubDate?.[0] || Date.now()),
      link: item.link?.[0] || '',
      imageUrl: item.enclosure?.[0]?.$.url || null
    };
  }
}