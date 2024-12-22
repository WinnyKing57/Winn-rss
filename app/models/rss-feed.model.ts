export interface RSSItem {
  title: string;
  description: string;
  pubDate: Date;
  link: string;
  imageUrl?: string | null;
}

export interface RSSFeedState {
  url: string;
  items: RSSItem[];
  isLoading: boolean;
  error: string | null;
}

export class RSSFeedModel {
  private state: RSSFeedState = {
    url: '',
    items: [],
    isLoading: false,
    error: null
  };

  getState(): RSSFeedState {
    return { ...this.state };
  }

  setState(newState: Partial<RSSFeedState>): void {
    this.state = { ...this.state, ...newState };
  }
}