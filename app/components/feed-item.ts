import { Observable, PropertyChangeData } from '@nativescript/core';
import { formatDate } from '../utils/date-formatter';

export class FeedItem extends Observable {
  private _expanded: boolean = false;
  public title: string;
  public description: string;
  public pubDate: Date;
  public link: string;
  public imageUrl?: string;

  constructor(data: any) {
    super();
    Object.assign(this, data);
  }

  get expanded(): boolean {
    return this._expanded;
  }

  set expanded(value: boolean) {
    if (this._expanded !== value) {
      this._expanded = value;
      this.notifyPropertyChange('expanded', value);
    }
  }

  get formattedDate(): string {
    return formatDate(this.pubDate);
  }

  toggleExpanded(): void {
    this.expanded = !this.expanded;
  }
}