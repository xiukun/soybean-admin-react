// import { request } from '../request';

export const amisApi = {
  /** Get amis schema */
  fetchGetAmisSchema: async () => {
    const randomNum = Math.floor(Math.random() * 3) + 1;
    const schema = await import(`@/amis/json/${randomNum}.amis.json`);
    return schema.default;
  },
  fetchGetAmisBigScreenSchema: async () => {
    const randomNum = Math.floor(Math.random() * 3) + 1;
    const schema = await import(`@/amis/json/bigscreen.amis.json`);
    return schema.default;
  }
};
