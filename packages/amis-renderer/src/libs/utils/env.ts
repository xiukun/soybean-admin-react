/* eslint-disable complexity */
import { makeTranslator, toast } from 'amis';
import type { RenderOptions } from 'amis-core';
import { attachmentAdpator, normalizeLink } from 'amis-core';
import { alert, confirm } from 'amis-ui';
import axios from 'axios';
import copy from 'copy-to-clipboard';
import { matchPath } from 'react-router-dom';

const __ = makeTranslator('zh');

const env: RenderOptions = {
  alert,
  confirm,
  copy: (content: string, options: any) => {
    copy(content, options);
    toast.success(__('System.copy'));
  },
  fetcher: async (api: any) => {
    let { config, data, headers, method, responseType, url } = api;
    config ||= {};

    // 将 /amis 开头链接，使用 amis文档 api
    if (typeof url === 'string' && url.startsWith('/amis/')) {
      url = url.replace(/^\/amis\//, 'https://aisuda.bce.baidu.com/amis/');
    }

    config.url = url;
    if (responseType) {
      config.responseType = responseType;
    }
    if (config.cancelExecutor) {
      config.cancelToken = new axios.CancelToken(config.cancelExecutor);
    }

    config.headers = headers || {};
    config.method = method;
    config.data = data;

    if (method === 'get' && data) {
      config.params = data;
    } else if (data && data instanceof FormData) {
      // config.headers['Content-Type'] = 'multipart/form-data';
    } else if (data && typeof data !== 'string' && !(data instanceof Blob) && !(data instanceof ArrayBuffer)) {
      data = JSON.stringify(data);
      config.headers['Content-Type'] = 'application/json';
    }

    // 支持返回各种报错信息
    // eslint-disable-next-line func-names
    config.validateStatus = function () {
      return true;
    };

    let response = await axios(config);
    response = await attachmentAdpator(response, __, api);

    if (response.status >= 400) {
      if (response.data) {
        // 主要用于 raw: 模式下，后端自己校验登录，
        if (response.status === 401 && response.data.location && response.data.location.startsWith('http')) {
          location.href = response.data.location.replace('{{redirect}}', encodeURIComponent(location.href));
          return new Promise(() => {});
        } else if (response.data.msg) {
          throw new Error(response.data.msg);
        } else {
          throw new Error(__('System.requestError') + JSON.stringify(response.data, null, 2));
        }
      } else {
        throw new Error(`${__('System.requestErrorStatus')} ${response.status}`);
      }
    }

    return response;
  },
  isCancel: (value: any) => axios.isCancel(value),
  isCurrentUrl: (to: string) => {
    if (!to) {
      return false;
    }
    const link = normalizeLink(to);
    return Boolean(
      matchPath(location.pathname, {
        exact: true,
        path: link
      } as any)
    );
  },
  jumpTo: (to: any, action: any) => {
    const normalizedTo = normalizeLink(to);

    if (action && action.actionType === 'url') {
      if (action.blank === true) {
        window.open(normalizedTo);
      } else window.location.href = normalizedTo;
      return undefined;
    }

    if (action && normalizedTo && action.target) {
      window.open(normalizedTo, action.target);
      return undefined;
    }

    if (/^https?:\/\//.test(normalizedTo)) {
      window.location.replace(normalizedTo);
    } else {
      location.href = normalizedTo;
    }
    return undefined;
  },
  loadTinymcePlugin: async (tinymce: any) => {
    // 参考：https://www.tiny.cloud/docs/advanced/creating-a-plugin/
    /*
          Note: We have included the plugin in the same JavaScript file as the TinyMCE
          instance for display purposes only. Tiny recommends not maintaining the plugin
          with the TinyMCE instance and using the `external_plugins` option.
        */
    tinymce.PluginManager.add('example', (editor: any, _url: any) => {
      const openDialog = () => {
        return editor.windowManager.open({
          body: {
            items: [
              {
                label: 'Title',
                name: 'title',
                type: 'input'
              }
            ],
            type: 'panel'
          },
          buttons: [
            {
              text: 'Close',
              type: 'cancel'
            },
            {
              primary: true,
              text: 'Save',
              type: 'submit'
            }
          ],
          onSubmit(api: { close: () => void; getData: () => any }) {
            const data = api.getData();
            /* Insert content when the window form is submitted */
            editor.insertContent(`Title: ${data.title}`);
            api.close();
          },
          title: 'Example plugin'
        });
      };
      /* Add a button that opens a window */
      editor.ui.registry.addButton('example', {
        onAction() {
          /* Open window */
          openDialog();
        },
        text: 'My button'
      });
      /* Adds a menu item, which can then be included in any menu via the menu/menubar configuration */
      editor.ui.registry.addMenuItem('example', {
        onAction() {
          /* Open window */
          openDialog();
        },
        text: 'Example plugin'
      });
      /* Return the metadata for the help plugin */
      return {
        getMetadata() {
          return {
            name: 'Example plugin',
            url: 'http://exampleplugindocsurl.com'
          };
        }
      };
    });
  },
  notify: (type: 'error' | 'info' | 'success' | 'warning', msg: any, conf: any) =>
    toast[type] ? toast[type](msg, conf) : console.warn('[Notify]', type, msg),
  replaceText: {
    AMIS_HOST: 'https://baidu.gitee.io/amis'
  },
  tracker(eventTrack: any) {
    console.debug('eventTrack', eventTrack);
  },
  updateLocation: (location: string, replace: any) => {
    console.log('updateLocation', {
      type: replace ? 'replace' : 'push',
      url: normalizeLink(location)
    });
  }
};

export { env };
export default env;
