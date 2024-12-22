import { LocalNotifications } from '@nativescript/local-notifications';
import { Vibrate } from '@nativescript/core';
import { RSSItem } from '../models/rss-feed.model';

export class NotificationService {
  static async initialize() {
    await LocalNotifications.requestPermission();
  }

  static async notifyNewItem(item: RSSItem) {
    await LocalNotifications.schedule([{
      id: Date.now(),
      title: 'Nouvel article',
      body: item.title,
      sound: true,
      badge: 1
    }]);
    
    // Vibration
    Vibrate.vibrate(100);
  }
}