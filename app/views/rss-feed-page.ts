import { EventData, Page } from '@nativescript/core';
import { RSSFeedModel, RSSItem } from '../models/rss-feed.model';
import { RSSService } from '../services/rss.service';

export function onNavigatingTo(args: EventData) {
  const page = <Page>args.object;
  const viewModel = new RSSFeedViewModel();
  page.bindingContext = viewModel;
}

class RSSFeedViewModel extends RSSFeedModel {
  private rssService: RSSService;

  constructor() {
    super();
    this.rssService = new RSSService();
  }

  async loadFeed() {
    if (!this.url) {
      this.error = 'Please enter a valid RSS URL';
      return;
    }

    try {
      this.isLoading = true;
      this.error = '';
      const items = await this.rssService.fetchFeed(this.url);
      this.items = items;
    } catch (error) {
      this.error = 'Failed to load RSS feed';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  onItemTap(args: { index: number; item: RSSItem }) {
    // Implement Tasker integration here
    // Example: Send data to Tasker
    const item = args.item;
    // TODO: Add Tasker plugin API integration
  }
}