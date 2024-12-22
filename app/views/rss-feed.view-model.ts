import { Observable } from '@nativescript/core';
import { RSSService } from '../services/rss.service';
import { RSSFeedModel, RSSItem } from '../models/rss-feed.model';
import { AutoUpdateService } from '../services/auto-update.service';
import { CacheManager } from '../utils/cache-manager';

export class RSSFeedViewModel extends Observable {
  private model: RSSFeedModel;
  private rssService: RSSService;

  constructor() {
    super();
    this.model = new RSSFeedModel();
    this.rssService = new RSSService();
    this.initializeFromCache();
  }

  private async initializeFromCache() {
    const cachedState = CacheManager.getFromCache('lastState');
    if (cachedState) {
      this.model.setState(cachedState);
      if (cachedState.url) {
        await this.loadFeed(false);
      }
    }
  }

  async loadFeed(showLoading: boolean = true) {
    const state = this.model.getState();
    
    if (!state.url) {
      this.model.setState({ error: 'Veuillez entrer une URL RSS valide' });
      return;
    }

    try {
      if (showLoading) {
        this.model.setState({ isLoading: true, error: null });
      }

      const items = await this.rssService.fetchFeed(state.url);
      this.model.setState({ items, isLoading: false });
      
      // Démarrer les mises à jour automatiques
      AutoUpdateService.startAutoUpdate(state.url, 15);
      
      // Sauvegarder l'état
      CacheManager.saveToCache('lastState', this.model.getState());
    } catch (error) {
      this.model.setState({ 
        error: error instanceof Error ? error.message : 'Erreur inconnue',
        isLoading: false 
      });
    }
  }

  onItemTap(args: { index: number; item: RSSItem }) {
    // Implémenter la logique de tap
  }
}