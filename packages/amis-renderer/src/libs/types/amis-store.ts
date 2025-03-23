export interface State {
  // 主题
  customThemeVars?: Record<string, string>; // 自定义主题变量
  isMobile: boolean; // 浏览模式 默认false
  isProview: boolean; // 是否预览 默认false
  language?: string; // 显示语言
  theme: 'antd' | 'cxd' | 'dark'; // 自定义主题变量
  title?: string; // 页面标题
}

export interface Action {
  onChangeLocale: (_e: any) => void;
  setData: (_key: DataKey, _value: any) => void;
}

export type DataKey =
  | 'customThemeVars'
  | 'defaultSchema'
  | 'isMobile'
  | 'isProview'
  | 'language'
  | 'shortcutKey'
  | 'theme'
  | 'title';
