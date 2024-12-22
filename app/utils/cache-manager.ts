import { ApplicationSettings } from '@nativescript/core';

export class CacheManager {
  private static CACHE_PREFIX = 'rss_cache_';
  private static CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  static saveToCache(key: string, data: any): void {
    const cacheItem = {
      data,
      timestamp: new Date().getTime()
    };
    ApplicationSettings.setString(
      this.CACHE_PREFIX + key,
      JSON.stringify(cacheItem)
    );
  }

  static getFromCache(key: string): any | null {
    const cached = ApplicationSettings.getString(this.CACHE_PREFIX + key);
    if (!cached) return null;

    const cacheItem = JSON.parse(cached);
    const now = new Date().getTime();
    
    if (now - cacheItem.timestamp > this.CACHE_DURATION) {
      this.removeFromCache(key);
      return null;
    }

    return cacheItem.data;
  }

  static removeFromCache(key: string): void {
    ApplicationSettings.remove(this.CACHE_PREFIX + key);
  }

  static clearCache(): void {
    const keys = ApplicationSettings.getAllKeys();
    keys.forEach(key => {
      if (key.startsWith(this.CACHE_PREFIX)) {
        ApplicationSettings.remove(key);
      }
    });
  }
}