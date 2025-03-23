import { AgGlobalConfig } from '@sa/amis-renderer';
import { AlertComponent, ToastComponent } from 'amis';

import { RouterProvider } from '@/features/router';

import { LazyAnimate } from './features/animate';
import { AntdContextHolder, AntdProvider } from './features/antdConfig';
import { LangProvider } from './features/lang';
import { ThemeProvider } from './features/theme';
import '@/amis/styles/index.css';
import '@/amis/styles/amis.scss';

// eslint-disable-next-line no-new
new AgGlobalConfig();
(() => {
  // 定义的通用window方法，供amis设计器使用
  const newJsFunc = {
    /**
     * 浏览器动态列缓存
     *
     * @param ctx amis context上下文
     * @param event amis event事件
     * @param clear 是否清除 默认false
     */
    dynimicColumnCache: (_ctx: any, _event: any, _clear: boolean = false) => {},
    dynimicColumnSave: (_ctx: any, _event: any, _clear: boolean = false) => {}
  };

  Object.assign((window as any).__JSFunc, newJsFunc);
})();

const App = () => {
  return (
    <ThemeProvider>
      <LangProvider>
        <AntdProvider>
          <AntdContextHolder>
            <LazyAnimate>
              <ToastComponent key="toast" />
              <AlertComponent key="alert" />
              <RouterProvider />
            </LazyAnimate>
          </AntdContextHolder>
        </AntdProvider>
      </LangProvider>
    </ThemeProvider>
  );
};

export default App;
