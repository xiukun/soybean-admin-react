import { AlertComponent, ToastComponent } from 'amis';
import { useAmisStore } from '../store/amis-store';
import { AgGlobalConfig } from '@ag-neptune/bu-ui';

interface MessageProps {}

export const AmisMessage = ({}: MessageProps) => {
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
  const theme = useAmisStore(state => state.theme);
  const locale = useAmisStore(state => state.language);

  return (
    <>
      <ToastComponent key="toast" theme={theme} locale={locale} />
      <AlertComponent key="alert" theme={theme} locale={locale} />
    </>
  );
};
