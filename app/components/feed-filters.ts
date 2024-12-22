import { Observable } from '@nativescript/core';
import { FeedFilterService } from '../services/feed-filter.service';

export class FeedFilters extends Observable {
  private _keywords: string = '';
  private _dayFilter: number = 7;

  constructor() {
    super();
  }

  get keywords(): string {
    return this._keywords;
  }

  set keywords(value: string) {
    if (this._keywords !== value) {
      this._keywords = value;
      this.notifyPropertyChange('keywords', value);
    }
  }

  get dayFilter(): number {
    return this._dayFilter;
  }

  set dayFilter(value: number) {
    if (this._dayFilter !== value) {
      this._dayFilter = value;
      this.notifyPropertyChange('dayFilter', value);
    }
  }

  applyFilters() {
    const keywordArray = this.keywords
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0);

    this.notify({
      eventName: 'filtersChanged',
      keywords: keywordArray,
      days: this.dayFilter
    });
  }
}