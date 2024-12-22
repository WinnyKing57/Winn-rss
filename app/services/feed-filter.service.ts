import { RSSItem } from '../models/rss-feed.model';

export class FeedFilterService {
  static filterByKeywords(items: RSSItem[], keywords: string[]): RSSItem[] {
    if (!keywords.length) return items;
    
    return items.filter(item => {
      const content = `${item.title} ${item.description}`.toLowerCase();
      return keywords.some(keyword => 
        content.includes(keyword.toLowerCase())
      );
    });
  }

  static filterByDate(items: RSSItem[], days: number): RSSItem[] {
    const now = new Date();
    const timeLimit = now.getTime() - (days * 24 * 60 * 60 * 1000);
    
    return items.filter(item => 
      new Date(item.pubDate).getTime() > timeLimit
    );
  }
}