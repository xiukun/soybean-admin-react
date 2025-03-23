import { currentLocale } from 'i18n-runtime';
import { createContext, createElement, useContext } from 'react';
import { create } from 'zustand';
// import { immer } from 'zustand/middleware/immer'

import type { Action, DataKey, State } from '../types/amis-store';

/** amis设计器 状态管理 */
const useAmisStore = create<State & Action>((set: any) => ({
  customThemeVars: undefined, // 自定义主题变量 {}
  isMobile: false,
  isProview: false,
  language: localStorage.getItem('suda-i18n-locale') || currentLocale() || 'zh-CN',
  /**
   * 切换语言，local storage保存
   *
   * @param value zh-CN | en-US
   */
  onChangeLocale: (value: string) => {
    localStorage.setItem('suda-i18n-locale', value);
    window.location.reload();
  },
  /**
   * 设置数据
   *
   * @param key 变更的属性名称
   * @param value 变更的属性值
   */
  setData: (key: DataKey, value: any) => {
    set(() => ({ [key]: value }));
  },
  theme: 'antd', // 自定义主题变量 'antd' | 'cxd' | 'dark'
  title: ''
}));

/** 定义 */
const AmisStoreContext = createContext<any>({
  onAsyncChange: () => {},
  onChange: () => {},
  onClear: () => {},
  onDictionarySave: () => {},
  onSave: () => {},
  setSchemaJson: () => {}
});

const AmisStoreProvider = ({ children, value }: { children: any; value: any }) =>
  createElement(AmisStoreContext.Provider, { value }, children);

const useAmisStoreContext = () => useContext(AmisStoreContext);
export { AmisStoreContext, AmisStoreProvider, useAmisStore, useAmisStoreContext };
export default useAmisStore;
