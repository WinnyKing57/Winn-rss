import { RSSService } from './rss.service';
import { NotificationService } from './notification.service';
import { CacheManager } from '../utils/cache-manager';
import { RSSItem } from '../models/rss-feed.model';

export class AutoUpdateService {
  private static intervals: Map<string, number> = new Map();

  static startAutoUpdate(url: string, intervalMinutes: number) {
    if (this.intervals.has(url)) {
      this.stopAutoUpdate(url);
    }

    const intervalId = setInterval(async () => {
      try {
        const rssService = new RSSService();
        const newItems = await rssService.fetchFeed(url);
        const cachedItems = CacheManager.getFromCache(url) || [];
        
        // Vérifier les nouveaux articles
        const newArticles = this.findNewArticles(newItems, cachedItems);
        
        // Notifier pour chaque nouvel article
        for (const item of newArticles) {
          await NotificationService.notifyNewItem(item);
        }
        
        // Mettre à jour le cache
        CacheManager.saveToCache(url, newItems);
      } catch (error) {
        console.error('Erreur lors de la mise à jour automatique:', error);
      }
    }, intervalMinutes * 60 * 1000);

    this.intervals.set(url, intervalId);
  }

  static stopAutoUpdate(url: string) {
    const intervalId = this.intervals.get(url);
    if (intervalId) {
      clearInterval(intervalId);
      this.intervals.delete(url);
    }
  }

  private static findNewArticles(newItems: RSSItem[], cachedItems: RSSItem[]): RSSItem[] {
    const cachedUrls = new Set(cachedItems.map(item => item.link));
    return newItems.filter(item => !cachedUrls.has(item.link));
  }
}