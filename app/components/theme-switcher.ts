import { Observable, EventData, Page } from '@nativescript/core';
import { ThemeManager } from '../styles/themes';

export class ThemeSwitcher extends Observable {
  constructor() {
    super();
  }

  switchTheme(args: EventData) {
    const button = args.object as any;
    const themeName = button.get('data-theme');
    ThemeManager.setTheme(themeName);
    
    const page = button.page as Page;
    this.applyThemeToPage(page, themeName);
  }

  private applyThemeToPage(page: Page, themeName: string) {
    // Supprimer les classes de thème existantes
    page.classList.remove('theme-light', 'theme-dark', 'theme-forest', 'theme-ocean');
    // Ajouter la nouvelle classe de thème
    page.classList.add(`theme-${themeName}`);
  }
}