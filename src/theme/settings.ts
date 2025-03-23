import settingsSchema from './settings.json';
/** Default theme settings */
export const themeSettings: App.Theme.ThemeSetting = settingsSchema as any;

/**
 * Override theme settings
 *
 * If publish new version, use `overrideThemeSettings` to override certain theme settings
 */
export const overrideThemeSettings: Partial<App.Theme.ThemeSetting> = {
  watermark: {
    text: 'SoybeanAdmin',
    visible: false
  }
};
