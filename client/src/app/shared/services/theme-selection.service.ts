import { CssHelper } from './../utils/css-helper';
import { AuthService } from './../auth/auth.service';
import { Injectable, Renderer2, RendererFactory2, Inject } from '@angular/core';
import { ThemeInfo } from '../models/theme-info';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class ThemeSelectionService {

  public static readonly DARK = 'seq-dark-theme';
  public static readonly LIGHT = 'seq-light-theme';

  themeList: ThemeInfo[] = [
    { name: ThemeSelectionService.DARK, displayName: 'Dark', primary: '#7d8890', accent: '#555b0d', background: '#303030' },
    { name: ThemeSelectionService.LIGHT, displayName: 'Light', primary: '#7d8890', accent: '#555b0d', background: '#dcdcdc' },
  ];

  defaultTheme = ThemeSelectionService.LIGHT;

  currentTheme = this.defaultTheme;

  baseColorHex = '#fff';
  baseColorRgb = 'rgb(255, 255, 255)';

  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document, private authService: AuthService) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  updateBaseColor() {
    const tmp = CssHelper.getCssRule('.' + this.currentTheme + ' .highcharts-color-10');
    if (tmp.style.fill !== undefined && tmp.style.fill !== null) {
      this.baseColorHex = tmp.style.fill;
      this.baseColorRgb = CssHelper.hexToRgb(this.baseColorHex);
    } else {
      this.baseColorHex = '#fff';
      this.baseColorRgb = CssHelper.hexToRgb(this.baseColorHex);
    }
  }

  setTheme(theme = '') {
    if (theme !== '') {
      this.renderer.removeClass(this.document.body, this.currentTheme);
      this.renderer.addClass(this.document.body, theme);
      this.currentTheme = theme;
    } else { // initial setup or reset
      const userSelectedTheme = localStorage.getItem('themeSelection'); // check if user has preferred theme
      if (userSelectedTheme && userSelectedTheme !== '') {
        this.renderer.removeClass(this.document.body, this.currentTheme);
        this.renderer.addClass(this.document.body, userSelectedTheme);
        this.currentTheme = userSelectedTheme;
      } else { // no selected theme, use default
        localStorage.setItem('themeSelection', this.defaultTheme); // store the default theme
        this.renderer.removeClass(this.document.body, this.currentTheme);
        this.renderer.addClass(this.document.body, this.defaultTheme);
      }
    }
    this.updateBaseColor();
  }

  saveDefaultThemeSelection(theme: string) {
    if (theme !== '') {
      this.renderer.removeClass(this.document.body, this.currentTheme);
      this.renderer.addClass(this.document.body, theme);
      this.currentTheme = theme;
      localStorage.setItem('themeSelection', theme);
    }
  }
}
