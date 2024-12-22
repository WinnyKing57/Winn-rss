import { ApplicationSettings } from '@nativescript/core';

export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

export const themes: Record<string, Theme> = {
  light: {
    name: 'Light',
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    text: '#000000',
    accent: '#FF2D55'
  },
  dark: {
    name: 'Dark',
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#000000',
    text: '#FFFFFF',
    accent: '#FF375F'
  },
  forest: {
    name: 'Forest',
    primary: '#2D862D',
    secondary: '#1A4D1A',
    background: '#F0F7F0',
    text: '#0A260A',
    accent: '#FF6B6B'
  },
  ocean: {
    name: 'Ocean',
    primary: '#0077B6',
    secondary: '#023E8A',
    background: '#F0F8FF',
    text: '#03045E',
    accent: '#FF9E00'
  }
};

export class ThemeManager {
  private static readonly THEME_KEY = 'selected_theme';
  private static currentTheme: Theme = themes.light;

  static getCurrentTheme(): Theme {
    const savedTheme = ApplicationSettings.getString(this.THEME_KEY, 'light');
    return themes[savedTheme] || themes.light;
  }

  static setTheme(themeName: string): void {
    if (themes[themeName]) {
      ApplicationSettings.setString(this.THEME_KEY, themeName);
      this.currentTheme = themes[themeName];
    }
  }
}